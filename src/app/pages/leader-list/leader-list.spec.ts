import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderList } from './leader-list';

describe('LeaderList', () => {
  let component: LeaderList;
  let fixture: ComponentFixture<LeaderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderList],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
