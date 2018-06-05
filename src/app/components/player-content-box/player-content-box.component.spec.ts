import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerContentBoxComponent } from './player-content-box.component';

describe('PlayerContentBoxComponent', () => {
  let component: PlayerContentBoxComponent;
  let fixture: ComponentFixture<PlayerContentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerContentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
