export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  assignedTo: { [participantId: string]: number }; // participantId -> quantity assigned
}

export interface ReceiptParticipant {
  id: string;
  name: string;
  totalAmount: number;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
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
