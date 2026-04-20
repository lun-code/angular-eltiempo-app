import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTiempo } from './tabla-tiempo';

describe('TablaTiempo', () => {
  let component: TablaTiempo;
  let fixture: ComponentFixture<TablaTiempo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTiempo],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaTiempo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
