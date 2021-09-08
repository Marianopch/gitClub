import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClaseComponent } from './agregar-clase.component';

describe('AgregarClaseComponent', () => {
  let component: AgregarClaseComponent;
  let fixture: ComponentFixture<AgregarClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
