import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarActividadComponent } from './buscar-actividad.component';

describe('BuscarActividadComponent', () => {
  let component: BuscarActividadComponent;
  let fixture: ComponentFixture<BuscarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
