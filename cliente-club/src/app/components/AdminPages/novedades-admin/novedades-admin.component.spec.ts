import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesAdminComponent } from './novedades-admin.component';

describe('NovedadesAdminComponent', () => {
  let component: NovedadesAdminComponent;
  let fixture: ComponentFixture<NovedadesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
