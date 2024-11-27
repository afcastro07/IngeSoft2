import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSiniestroComponent } from './registro-siniestro.component';

describe('RegistroSiniestroComponent', () => {
  let component: RegistroSiniestroComponent;
  let fixture: ComponentFixture<RegistroSiniestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSiniestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
