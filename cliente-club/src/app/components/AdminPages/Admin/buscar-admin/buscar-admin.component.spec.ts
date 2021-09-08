import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAdminComponent } from './buscar-admin.component';

describe('BuscarAdminComponent', () => {
  let component: BuscarAdminComponent;
  let fixture: ComponentFixture<BuscarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
