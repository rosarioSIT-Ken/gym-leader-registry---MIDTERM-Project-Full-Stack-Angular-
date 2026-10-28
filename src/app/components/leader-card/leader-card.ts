import { Component, input, output } from '@angular/core';
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

  onEdit(): void {
    this.edit.emit(this.leader()._id ?? '');
  }

  onRemove(): void {
    this.remove.emit(this.leader()._id ?? '');
  }
}
