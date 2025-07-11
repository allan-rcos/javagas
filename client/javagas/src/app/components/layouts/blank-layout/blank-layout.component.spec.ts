import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankLayoutComponent } from './blank-layout.component';
import { provideRouter } from '@angular/router';

describe('BlankLayout', () => {
  let component: BlankLayoutComponent;
  let fixture: ComponentFixture<BlankLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
