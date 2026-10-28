import { Component, ElementRef, OnInit, computed, effect, inject, signal, viewChild } from '@angular/core';
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

  // carousel
  track = viewChild<ElementRef<HTMLDivElement>>('track');
  atStart = signal(true);
  atEnd = signal(true);

  // re-check the arrows whenever the list changes
  private syncArrows = effect(() => {
    this.filteredLeaders();
    setTimeout(() => this.updateArrows());
  });

  ngOnInit(): void {
    this.leaderService.fetchLeaders();
  }

  selectRegion(region: string): void {
    this.selectedRegion.set(region);
    this.track()?.nativeElement.scrollTo({ left: 0 });
  }

  scroll(direction: number): void {
    const el = this.track()?.nativeElement;
    if (!el) {
      return;
    }
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  updateArrows(): void {
    const el = this.track()?.nativeElement;
    if (!el) {
      return;
    }
    this.atStart.set(el.scrollLeft <= 4);
    this.atEnd.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
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
