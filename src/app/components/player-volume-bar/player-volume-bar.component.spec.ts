import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVolumeBarComponent } from './player-volume-bar.component';

describe('PlayerVolumeBarComponent', () => {
  let component: PlayerVolumeBarComponent;
  let fixture: ComponentFixture<PlayerVolumeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerVolumeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVolumeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
