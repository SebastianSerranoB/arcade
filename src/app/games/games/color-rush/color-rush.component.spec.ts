import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRushComponent } from './color-rush.component';

describe('ColorRushComponent', () => {
  let component: ColorRushComponent;
  let fixture: ComponentFixture<ColorRushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorRushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorRushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
