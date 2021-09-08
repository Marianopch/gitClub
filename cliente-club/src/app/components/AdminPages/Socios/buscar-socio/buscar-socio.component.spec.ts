import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSocioComponent } from './buscar-socio.component';

describe('BuscarSocioComponent', () => {
  let component: BuscarSocioComponent;
  let fixture: ComponentFixture<BuscarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarSocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
