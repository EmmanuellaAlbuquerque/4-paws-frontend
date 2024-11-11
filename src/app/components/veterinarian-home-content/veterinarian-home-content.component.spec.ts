import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianHomeContentComponent } from './veterinarian-home-content.component';

describe('VeterinarianHomeContentComponent', () => {
  let component: VeterinarianHomeContentComponent;
  let fixture: ComponentFixture<VeterinarianHomeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarianHomeContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarianHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
