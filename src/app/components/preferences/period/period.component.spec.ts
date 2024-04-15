import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodComponent } from './period.component';

describe('PeriodComponent', () => {
  let component: PeriodComponent;
  let fixture: ComponentFixture<PeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PeriodComponent]
});
    fixture = TestBed.createComponent(PeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
