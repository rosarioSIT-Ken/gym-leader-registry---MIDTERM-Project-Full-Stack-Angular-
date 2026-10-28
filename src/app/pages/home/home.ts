import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private leaderService = inject(GymLeaderService);

  kantoCount = this.leaderService.kantoCount;
  johtoCount = this.leaderService.johtoCount;
  hoennCount = this.leaderService.hoennCount;

  ngOnInit(): void {
    this.leaderService.fetchLeaders();
  }
}
