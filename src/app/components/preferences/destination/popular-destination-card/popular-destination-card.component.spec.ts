import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDestinationCardComponent } from './popular-destination-card.component';

describe('PopularDestinationCardComponent', () => {
  let component: PopularDestinationCardComponent;
  let fixture: ComponentFixture<PopularDestinationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PopularDestinationCardComponent]
});
    fixture = TestBed.createComponent(PopularDestinationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
