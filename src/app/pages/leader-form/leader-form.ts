import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  selector: 'app-leader-form',
  imports: [ReactiveFormsModule],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private leaderService = inject(GymLeaderService);

  regions = ['Kanto', 'Johto', 'Hoenn'];
  leaderId = signal<string | null>(null);
  isEditMode = computed(() => this.leaderId() !== null);
  isLoading = signal(false);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('^[0-9]+$')]],
    motto: ['', Validators.maxLength(150)]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // edit mode: load the leader and fill the form
    if (id) {
      this.leaderId.set(id);
      this.isLoading.set(true);
      this.leaderService.getLeader(id).subscribe({
        next: (leader) => {
          this.form.patchValue(leader);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Gym Leader not found.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const leader = this.form.getRawValue();
    const id = this.leaderId();
    const request = id
      ? this.leaderService.updateLeader(id, leader)
      : this.leaderService.addLeader(leader);

    request.subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/leaders']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/leaders']);
  }
}
