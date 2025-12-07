export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  assignedTo: string[]; // User IDs who share this item
}

export interface ReceiptParticipant {
  id: string;
  name: string;
  totalAmount: number;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    sharePercentage: number; // What % of the item this person pays for
    amount: number;
  }[];
}

export interface Receipt {
  id: string;
  imageUrl?: string;
  items: ReceiptItem[];
  totalAmount: number;
  participants: ReceiptParticipant[];
  barName?: string;
  date?: Date;
  parsed: boolean;
}
