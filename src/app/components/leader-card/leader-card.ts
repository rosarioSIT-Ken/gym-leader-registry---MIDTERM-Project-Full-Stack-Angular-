import { Component, computed, input, output, signal } from '@angular/core';
import { GymLeader } from '../../models/gym-leader.model';

// how many pictures are in public/images/random/ (1.jpg, 2.jpg, 3.jpg, ...)
const RANDOM_IMAGE_COUNT = 5;

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

  // which picture to show: the leader's own, a random one, or the first letter
  imageStep = signal<'own' | 'random' | 'letter'>('own');

  // own picture from the name, e.g. "Brock" -> /images/brock.jpg
  ownImage = computed(() => {
    const fileName = this.leader().name.trim().toLowerCase().replace(/\s+/g, '-');
    return `/images/leaders/${fileName}.jpg`;
  });

  // random picture picked from the leader's _id, so it stays the same after a refresh
   // picture picked from the end of the leader's _id, so it stays the same after a refresh
  randomImage = computed(() => {
    const id = this.leader()._id ?? '';
    const value = parseInt(id.slice(-6), 16) || 0;
    const number = (value % RANDOM_IMAGE_COUNT) + 1;
    return `/images/leaders/random/${number}.jpg`;
  });

  imagePath = computed(() => (this.imageStep() === 'own' ? this.ownImage() : this.randomImage()));

  // first letter shown when there is no picture at all
  initial = computed(() => this.leader().name.charAt(0).toUpperCase());

  onImageError(): void {
    if (this.imageStep() === 'own') {
      this.imageStep.set('random');
    } else {
      this.imageStep.set('letter');
    }
  }

  onEdit(): void {
    this.edit.emit(this.leader()._id ?? '');
  }

  onRemove(): void {
    this.remove.emit(this.leader()._id ?? '');
  }
}