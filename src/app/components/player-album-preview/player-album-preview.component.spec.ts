import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAlbumPreviewComponent } from './player-album-preview.component';

describe('PlayerAlbumPreviewComponent', () => {
  let component: PlayerAlbumPreviewComponent;
  let fixture: ComponentFixture<PlayerAlbumPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAlbumPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAlbumPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
