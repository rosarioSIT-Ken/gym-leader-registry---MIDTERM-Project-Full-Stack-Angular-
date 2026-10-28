import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';
import { LeaderCard } from '../../components/leader-card/leader-card';

@Component({
  selector: 'app-leader-list',
  imports: [LeaderCard, RouterLink],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  private leaderService = inject(GymLeaderService);
  private router = inject(Router);

  regions = ['All', 'Kanto', 'Johto', 'Hoenn'];
  selectedRegion = signal('All');
  leaders = this.leaderService.leaders;

  // list shown on screen, based on the selected region
  filteredLeaders = computed(() => {
    const region = this.selectedRegion();
    if (region === 'All') {
      return this.leaders();
    }
    return this.leaders().filter((l) => l.region === region);
  });

  ngOnInit(): void {
    this.leaderService.fetchLeaders();
  }

  selectRegion(region: string): void {
    this.selectedRegion.set(region);
  }

  onEdit(id: string): void {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  onRemove(id: string): void {
    const leader = this.leaders().find((l) => l._id === id);
    if (!leader) {
      return;
    }
    if (confirm(`Remove ${leader.name} from the registry?`)) {
      this.leaderService.deleteLeader(id).subscribe(() => {
        this.leaderService.fetchLeaders();
      });
    }
  }
}
