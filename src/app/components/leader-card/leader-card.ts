import { Component, computed, input, output, signal } from '@angular/core';
import { GymLeader } from '../../models/gym-leader.model';

@Component({
  selector: 'app-leader-card',
  imports: [],
  templateUrl: './leader-card.html',
  styleUrl: './leader-card.css'
})
export class LeaderCard {
  leader = input.required<GymLeader>();
  edit = output<string>();
  remove = output<string>();

  // true when the leader's image file is missing
  imageFailed = signal(false);

  // image path from the name, e.g. "Brock" -> /images/brock.jpg
  imagePath = computed(() => {
    const fileName = this.leader().name.trim().toLowerCase().replace(/\s+/g, '-');
    return `/images/${fileName}.jpg`;
  });

  // first letter shown when there is no image
  initial = computed(() => this.leader().name.charAt(0).toUpperCase());

  onImageError(): void {
    this.imageFailed.set(true);
  }

  onEdit(): void {
    this.edit.emit(this.leader()._id ?? '');
  }

  onRemove(): void {
    this.remove.emit(this.leader()._id ?? '');
  }
}