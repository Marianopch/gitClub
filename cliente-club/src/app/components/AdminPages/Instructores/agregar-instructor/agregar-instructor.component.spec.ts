import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInstructorComponent } from './agregar-instructor.component';

describe('AgregarInstructorComponent', () => {
  let component: AgregarInstructorComponent;
  let fixture: ComponentFixture<AgregarInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
