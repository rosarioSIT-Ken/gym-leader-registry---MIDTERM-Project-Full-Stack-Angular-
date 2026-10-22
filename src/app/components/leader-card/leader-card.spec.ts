import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderCard } from './leader-card';

describe('LeaderCard', () => {
  let component: LeaderCard;
  let fixture: ComponentFixture<LeaderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
