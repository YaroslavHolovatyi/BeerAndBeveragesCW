import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Comment {
  id: number;
  user: string;
  userImage?: string;
  comment: string;
  date: Date;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input.required<Comment>();

  defaultUserImage = 'races_images/dwarf_m.png';
}
