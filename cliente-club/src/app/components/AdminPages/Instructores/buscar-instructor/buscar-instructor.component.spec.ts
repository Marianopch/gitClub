import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarInstructorComponent } from './buscar-instructor.component';

describe('BuscarInstructorComponent', () => {
  let component: BuscarInstructorComponent;
  let fixture: ComponentFixture<BuscarInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
