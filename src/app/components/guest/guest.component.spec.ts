import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCodigoInvitadoComponent } from './guest.component';

describe('IngresoCodigoInvitadoComponent', () => {
  let component: IngresoCodigoInvitadoComponent;
  let fixture: ComponentFixture<IngresoCodigoInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoCodigoInvitadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoCodigoInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
