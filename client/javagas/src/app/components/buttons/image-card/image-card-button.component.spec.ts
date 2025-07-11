import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardButtonComponent } from './image-card-button.component';
import { provideRouter } from '@angular/router';

describe('ImageCard', () => {
  let component: ImageCardButtonComponent;
  let fixture: ComponentFixture<ImageCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCardButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCardButtonComponent);
    component = fixture.componentInstance;
    let ref = fixture.componentRef;
    ref.setInput('imageUrl', '/images/candidate.webp');
    ref.setInput('imageAlt', 'Candidate Image');
    ref.setInput('imageHeight', '150');
    ref.setInput('imageWidth', '126');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
