import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSocioComponent } from './home-socio.component';

describe('HomeSocioComponent', () => {
  let component: HomeSocioComponent;
  let fixture: ComponentFixture<HomeSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
