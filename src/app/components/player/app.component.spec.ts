import { Router } from '@angular/router';
import { PaginationService } from '../../services/pagination/pagination.service';
import { BackgroundChangerService } from '../../services/background-changer/background-changer.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

describe('AppComponent', () => {
  @Component({ selector: 'router-outlet', template: '' })
  class RouterOutletStubComponent {}

  let backgroundChangerServiceStab: Partial<BackgroundChangerService>;
  let paginationServiceStub: Partial<PaginationService>;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['events']);
  backgroundChangerServiceStab = { renderBackground() {} };
  paginationServiceStub = { getNextData() {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterOutletStubComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: BackgroundChangerService,
        use: backgroundChangerServiceStab
      },
      {
        provide: PaginationService,
        use: paginationServiceStub
      },
      {
        provide: Router,
        useValue: routerSpy
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));
});
