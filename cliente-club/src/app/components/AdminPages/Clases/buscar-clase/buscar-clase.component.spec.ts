import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarClaseComponent } from './buscar-clase.component';

describe('BuscarClaseComponent', () => {
  let component: BuscarClaseComponent;
  let fixture: ComponentFixture<BuscarClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
