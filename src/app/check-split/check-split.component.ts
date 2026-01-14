import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receipt, ReceiptItem, ReceiptParticipant } from '../shared/receipt.model';
import { D20Dice } from '../d20-dice/d20-dice';

@Component({
  selector: 'app-check-split',
  standalone: true,
  imports: [CommonModule, FormsModule, D20Dice],
  templateUrl: './check-split.component.html',
  styleUrl: './check-split.component.css',
})
export class CheckSplitComponent implements OnInit {
  @ViewChild(D20Dice) diceComponent?: D20Dice;

  receipt: Receipt | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isUploading = false;
  isParsing = false;

  newParticipantName = '';
  participants: ReceiptParticipant[] = [];

  selectedItemId: string | null = null;
  editingShares: { [key: string]: { [participantId: string]: number } } = {};

  // D20 Game state
  showDiceGame = false;
  diceGameActive = false;
  participantNumbers: { id: string; name: string; number: number | null }[] = [];
  currentRollingIndex = 0;
  gameWinner: string | null = null;

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

        // Real receipt data from Babo Gardens
        this.receipt.items = [
          {
            id: '1',
            name: 'Піцца з курки, гриби',
            quantity: 1,
            unitPrice: 160.0,
            totalPrice: 160.0,
            assignedTo: {},
          },
          {
            id: '2',
            name: 'Цибуля та печінки',
            quantity: 1,
            unitPrice: 120.0,
            totalPrice: 120.0,
            assignedTo: {},
          },
          {
            id: '3',
            name: 'Цибуля та гриби',
            quantity: 1,
            unitPrice: 80.0,
            totalPrice: 80.0,
            assignedTo: {},
          },
          {
            id: '4',
            name: 'Меселдо з бараниною',
            quantity: 1,
            unitPrice: 220.0,
            totalPrice: 220.0,
            assignedTo: {},
          },
          {
            id: '5',
            name: 'Салат зі слив',
            quantity: 1,
            unitPrice: 160.0,
            totalPrice: 160.0,
            assignedTo: {},
          },
          {
            id: '6',
            name: 'Торт КИЇВ',
            quantity: 1,
            unitPrice: 870.0,
            totalPrice: 870.0,
            assignedTo: {},
          },
          {
            id: '7',
            name: 'Коктейль Raspberry Fizz',
            quantity: 1,
            unitPrice: 250.0,
            totalPrice: 250.0,
            assignedTo: {},
          },
          {
            id: '8',
            name: 'Коктейль Aperol Spritz',
            quantity: 1,
            unitPrice: 180.0,
            totalPrice: 180.0,
            assignedTo: {},
          },
          {
            id: '9',
            name: 'Коктейль Clover to Apple',
            quantity: 1,
            unitPrice: 150.0,
            totalPrice: 150.0,
            assignedTo: {},
          },
          {
            id: '10',
            name: 'Коктейль Clover Garden',
            quantity: 1,
            unitPrice: 250.0,
            totalPrice: 250.0,
            assignedTo: {},
          },
          {
            id: '11',
            name: 'Коктейль French 75',
            quantity: 1,
            unitPrice: 180.0,
            totalPrice: 180.0,
            assignedTo: {},
          },
          {
            id: '12',
            name: 'Коктейль Aperol Spritz',
            quantity: 1,
            unitPrice: 260.0,
            totalPrice: 260.0,
            assignedTo: {},
          },
          {
            id: '13',
            name: 'До сплати',
            quantity: 1,
            unitPrice: 600.0,
            totalPrice: 600.0,
            assignedTo: {},
          },
        ];

        this.receipt.totalAmount = 3740.0;
        this.receipt.barName = 'Babo Gardens';
        this.receipt.date = new Date('2024-08-02T20:59:44');

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
      if (item.assignedTo[participantId]) {
        delete item.assignedTo[participantId];
      }
    });

    this.calculateTotals();
  }

  assignItemQuantity(itemId: string, participantId: string, quantity: number) {
    if (!this.receipt) return;

    const item = this.receipt.items.find((i) => i.id === itemId);
    if (!item) return;

    if (quantity > 0) {
      item.assignedTo[participantId] = quantity;
    } else {
      delete item.assignedTo[participantId];
    }

    this.calculateTotals();
  }

  getAssignedQuantity(itemId: string, participantId: string): number {
    if (!this.receipt) return 0;
    const item = this.receipt.items.find((i) => i.id === itemId);
    return item?.assignedTo[participantId] || 0;
  }

  getTotalAssignedQuantity(itemId: string): number {
    if (!this.receipt) return 0;
    const item = this.receipt.items.find((i) => i.id === itemId);
    if (!item) return 0;
    return Object.values(item.assignedTo).reduce((sum, qty) => sum + qty, 0);
  }

  getRemainingQuantity(itemId: string): number {
    if (!this.receipt) return 0;
    const item = this.receipt.items.find((i) => i.id === itemId);
    if (!item) return 0;
    const assigned = this.getTotalAssignedQuantity(itemId);
    return item.quantity - assigned;
  }

  isItemAssignedTo(itemId: string, participantId: string): boolean {
    if (!this.receipt) return false;
    const item = this.receipt.items.find((i) => i.id === itemId);
    return item ? (item.assignedTo[participantId] || 0) > 0 : false;
  }

  calculateTotals() {
    if (!this.receipt) return;

    // Reset all participant totals
    this.receipt.participants.forEach((p) => {
      p.totalAmount = 0;
      p.items = [];
    });

    // Calculate split for each item based on assigned quantities
    this.receipt.items.forEach((item) => {
      const assignedParticipants = Object.keys(item.assignedTo);
      if (assignedParticipants.length === 0) return;

      // Calculate total assigned quantity
      const totalAssignedQty = Object.values(item.assignedTo).reduce((sum, qty) => sum + qty, 0);

      if (totalAssignedQty === 0) return;

      // Calculate amount per each assigned participant based on their quantity
      assignedParticipants.forEach((participantId) => {
        const assignedQty = item.assignedTo[participantId];
        const amount = item.unitPrice * assignedQty;

        const participant = this.receipt!.participants.find((p) => p.id === participantId);
        if (participant) {
          participant.totalAmount += amount;
          participant.items.push({
            itemId: item.id,
            itemName: item.name,
            quantity: assignedQty,
            amount,
          });
        }
      });
    });
  }

  getAssignedParticipantsCount(itemId: string): number {
    if (!this.receipt) return 0;
    const item = this.receipt.items.find((i) => i.id === itemId);
    return item ? Object.keys(item.assignedTo).length : 0;
  }

  // D20 Game Methods
  startDiceGame() {
    if (!this.receipt || this.receipt.participants.length === 0) {
      alert('Please add participants first!');
      return;
    }

    this.showDiceGame = true;
    this.diceGameActive = false;
    this.gameWinner = null;
    this.currentRollingIndex = 0;

    // Initialize participant numbers
    this.participantNumbers = this.receipt.participants.map((p) => ({
      id: p.id,
      name: p.name,
      number: null,
    }));
  }

  rollForParticipants() {
    if (!this.receipt || this.participantNumbers.length === 0) return;

    this.diceGameActive = true;
    this.currentRollingIndex = 0;
    this.gameWinner = null;

    // Reset all numbers
    this.participantNumbers.forEach((p) => (p.number = null));

    // Start rolling for first participant
    this.rollNextParticipant();
  }

  rollNextParticipant() {
    if (this.currentRollingIndex < this.participantNumbers.length && this.diceComponent) {
      this.diceComponent.roll();
    }
  }

  onDiceRollComplete(result: number) {
    if (!this.diceGameActive || this.currentRollingIndex >= this.participantNumbers.length) {
      return;
    }

    // Assign the result to current participant
    this.participantNumbers[this.currentRollingIndex].number = result;
    this.currentRollingIndex++;

    // Check if we need to roll for more participants
    if (this.currentRollingIndex < this.participantNumbers.length) {
      // Wait a bit before rolling for next participant
      setTimeout(() => {
        this.rollNextParticipant();
      }, 1500);
    } else {
      // All participants have rolled, determine winner (highest number)
      this.determineWinner();
    }
  }

  determineWinner() {
    if (this.participantNumbers.length === 0) return;

    // Find participant with highest number
    let maxNumber = -1;
    let winnerId = '';

    this.participantNumbers.forEach((p) => {
      if (p.number !== null && p.number > maxNumber) {
        maxNumber = p.number;
        winnerId = p.id;
      }
    });

    if (winnerId) {
      const winner = this.participantNumbers.find((p) => p.id === winnerId);
      if (winner) {
        this.gameWinner = winner.name;
        this.diceGameActive = false;
      }
    }
  }

  closeDiceGame() {
    this.showDiceGame = false;
    this.diceGameActive = false;
    this.gameWinner = null;
    this.participantNumbers = [];
    this.currentRollingIndex = 0;
  }

  getCurrentRollingParticipant(): string | null {
    if (this.diceGameActive && this.currentRollingIndex < this.participantNumbers.length) {
      return this.participantNumbers[this.currentRollingIndex].name;
    }
    return null;
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
        summary += `  - ${item.itemName} (x${item.quantity}): ₴${item.amount.toFixed(2)}\n`;
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
