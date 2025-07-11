import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DefaultLayout', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DefaultLayoutComponent],
    });
    TestBed.overrideComponent(DefaultLayoutComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
