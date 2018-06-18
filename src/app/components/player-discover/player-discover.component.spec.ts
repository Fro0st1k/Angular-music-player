import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDiscoverComponent } from './player-discover.component';

describe('PlayerDiscoverComponent', () => {
  let component: PlayerDiscoverComponent;
  let fixture: ComponentFixture<PlayerDiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
