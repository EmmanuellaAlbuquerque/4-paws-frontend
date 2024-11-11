import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistHomeContentComponent } from './receptionist-home-content.component';

describe('ReceptionistHomeContentComponent', () => {
  let component: ReceptionistHomeContentComponent;
  let fixture: ComponentFixture<ReceptionistHomeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistHomeContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
