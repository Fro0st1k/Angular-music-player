import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFeaturedComponent } from './player-featured.component';

describe('PlayerFeaturedComponent', () => {
  let component: PlayerFeaturedComponent;
  let fixture: ComponentFixture<PlayerFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
