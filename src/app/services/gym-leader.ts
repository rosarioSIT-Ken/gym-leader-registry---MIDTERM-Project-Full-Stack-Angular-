import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymLeader } from '../models/gym-leader.model';

@Injectable({
  providedIn: 'root'
})
export class GymLeaderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/leaders';

  // all leaders from the API
  leaders = signal<GymLeader[]>([]);

  // counts per region
  kantoCount = computed(() => this.leaders().filter((l) => l.region === 'Kanto').length);
  johtoCount = computed(() => this.leaders().filter((l) => l.region === 'Johto').length);
  hoennCount = computed(() => this.leaders().filter((l) => l.region === 'Hoenn').length);

  // GET all
  fetchLeaders(): void {
    this.http.get<GymLeader[]>(this.apiUrl).subscribe((data) => {
      this.leaders.set(data);
    });
  }

  // GET one
  getLeader(id: string): Observable<GymLeader> {
    return this.http.get<GymLeader>(`${this.apiUrl}/${id}`);
  }

  // POST
  addLeader(leader: GymLeader): Observable<GymLeader> {
    return this.http.post<GymLeader>(this.apiUrl, leader);
  }

  // PUT
  updateLeader(id: string, leader: GymLeader): Observable<GymLeader> {
    return this.http.put<GymLeader>(`${this.apiUrl}/${id}`, leader);
  }

  // DELETE
  deleteLeader(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}