import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receipt, ReceiptItem, ReceiptParticipant } from '../shared/receipt.model';

@Component({
  selector: 'app-check-split',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-split.component.html',
  styleUrl: './check-split.component.css',
})
export class CheckSplitComponent implements OnInit {
  receipt: Receipt | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isUploading = false;
  isParsing = false;

  newParticipantName = '';
  participants: ReceiptParticipant[] = [];

  selectedItemId: string | null = null;
  editingShares: { [key: string]: { [participantId: string]: number } } = {};

  constructor() {}

  ngOnInit() {
    // Initialize with empty receipt
    this.initializeReceipt();
  }

  initializeReceipt() {
    this.receipt = {
      id: Date.now().toString(),
      items: [],
      totalAmount: 0,
      participants: [],
      parsed: false,
    };
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  async uploadAndParseReceipt() {
    if (!this.selectedImage || !this.receipt) return;

    this.isParsing = true;

    try {
      // TODO: Implement actual API call to ChatGPT
      // For now, simulate the parsing with mock data
      await this.simulateReceiptParsing();

      this.receipt.parsed = true;
      this.calculateTotals();
    } catch (error) {
      console.error('Error parsing receipt:', error);
      alert('Failed to parse receipt. Please try again.');
    } finally {
      this.isParsing = false;
    }
  }

  private async simulateReceiptParsing(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.receipt) return;

        // Mock parsed receipt data
        this.receipt.items = [
          {
            id: '1',
            name: 'Lvivske Beer (0.5L)',
            quantity: 3,
            unitPrice: 45,
            totalPrice: 135,
            assignedTo: [],
          },
          {
            id: '2',
            name: 'Caesar Salad',
            quantity: 2,
            unitPrice: 120,
            totalPrice: 240,
            assignedTo: [],
          },
          {
            id: '3',
            name: 'Grilled Chicken',
            quantity: 1,
            unitPrice: 180,
            totalPrice: 180,
            assignedTo: [],
          },
          {
            id: '4',
            name: 'French Fries',
            quantity: 2,
            unitPrice: 60,
            totalPrice: 120,
            assignedTo: [],
          },
          {
            id: '5',
            name: 'Espresso',
            quantity: 2,
            unitPrice: 35,
            totalPrice: 70,
            assignedTo: [],
          },
        ];

        this.receipt.totalAmount = 745;
        this.receipt.barName = "The Dragon's Tavern";
        this.receipt.date = new Date();

        resolve();
      }, 2000);
    });
  }

  addParticipant() {
    if (!this.newParticipantName.trim() || !this.receipt) return;

    const participant: ReceiptParticipant = {
      id: Date.now().toString(),
      name: this.newParticipantName.trim(),
      totalAmount: 0,
      items: [],
    };

    this.receipt.participants.push(participant);
    this.newParticipantName = '';
  }

  removeParticipant(participantId: string) {
    if (!this.receipt) return;

    this.receipt.participants = this.receipt.participants.filter((p) => p.id !== participantId);

    // Remove participant from all items
    this.receipt.items.forEach((item) => {
      item.assignedTo = item.assignedTo.filter((id) => id !== participantId);
    });

    this.calculateTotals();
  }

  toggleItemAssignment(itemId: string, participantId: string) {
    if (!this.receipt) return;

    const item = this.receipt.items.find((i) => i.id === itemId);
    if (!item) return;

    const index = item.assignedTo.indexOf(participantId);
    if (index > -1) {
      item.assignedTo.splice(index, 1);
    } else {
      item.assignedTo.push(participantId);
    }

    this.calculateTotals();
  }

  isItemAssignedTo(itemId: string, participantId: string): boolean {
    if (!this.receipt) return false;
    const item = this.receipt.items.find((i) => i.id === itemId);
    return item ? item.assignedTo.includes(participantId) : false;
  }

  updateItemShare(itemId: string, participantId: string, percentage: number) {
    if (!this.editingShares[itemId]) {
      this.editingShares[itemId] = {};
    }
    this.editingShares[itemId][participantId] = percentage;
    this.calculateTotals();
  }

  calculateTotals() {
    if (!this.receipt) return;

    // Reset all participant totals
    this.receipt.participants.forEach((p) => {
      p.totalAmount = 0;
      p.items = [];
    });

    // Calculate split for each item
    this.receipt.items.forEach((item) => {
      if (item.assignedTo.length === 0) return;

      // Check if there are custom shares for this item
      const hasCustomShares = this.editingShares[item.id];

      if (hasCustomShares) {
        // Use custom shares
        const totalShares = Object.values(this.editingShares[item.id]).reduce(
          (sum, val) => sum + val,
          0
        );

        item.assignedTo.forEach((participantId) => {
          const share = this.editingShares[item.id][participantId] || 0;
          const sharePercentage = totalShares > 0 ? (share / totalShares) * 100 : 0;
          const amount = (item.totalPrice * share) / totalShares;

          const participant = this.receipt!.participants.find((p) => p.id === participantId);
          if (participant) {
            participant.totalAmount += amount;
            participant.items.push({
              itemId: item.id,
              itemName: item.name,
              quantity: item.quantity,
              sharePercentage,
              amount,
            });
          }
        });
      } else {
        // Equal split among assigned participants
        const sharePerPerson = item.totalPrice / item.assignedTo.length;
        const sharePercentage = 100 / item.assignedTo.length;

        item.assignedTo.forEach((participantId) => {
          const participant = this.receipt!.participants.find((p) => p.id === participantId);
          if (participant) {
            participant.totalAmount += sharePerPerson;
            participant.items.push({
              itemId: item.id,
              itemName: item.name,
              quantity: item.quantity,
              sharePercentage,
              amount: sharePerPerson,
            });
          }
        });
      }
    });
  }

  getAssignedParticipantsCount(itemId: string): number {
    if (!this.receipt) return 0;
    const item = this.receipt.items.find((i) => i.id === itemId);
    return item ? item.assignedTo.length : 0;
  }

  resetReceipt() {
    this.selectedImage = null;
    this.imagePreview = null;
    this.participants = [];
    this.editingShares = {};
    this.initializeReceipt();
  }

  exportSummary() {
    if (!this.receipt) return;

    let summary = `Receipt Split Summary\n`;
    summary += `Bar: ${this.receipt.barName || 'Unknown'}\n`;
    summary += `Date: ${this.receipt.date?.toLocaleDateString() || 'Unknown'}\n`;
    summary += `Total Amount: ₴${this.receipt.totalAmount.toFixed(2)}\n\n`;

    summary += `Participants:\n`;
    this.receipt.participants.forEach((p) => {
      summary += `\n${p.name}: ₴${p.totalAmount.toFixed(2)}\n`;
      p.items.forEach((item) => {
        summary += `  - ${item.itemName} (${item.sharePercentage.toFixed(
          0
        )}%): ₴${item.amount.toFixed(2)}\n`;
      });
    });

    // Create and download text file
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-split-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
