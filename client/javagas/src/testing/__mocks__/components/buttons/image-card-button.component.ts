import { Component, Input } from '@angular/core';

/**
 * Mock component for ImageCardButtonComponent used in tests.
 * This component serves as a placeholder for the actual ImageCardButtonComponent
 * to avoid importing the real component in unit tests.
 * @version 0.2
 * @since 0.2
 * @internal
 */
@Component({
  selector: 'app-image-card-button',
  template: '<button>Image Card Button</button>',
})
export class MockedImageCardButtonComponent {
  @Input() imageUrl!: string;
  @Input() imageAlt!: string;
  @Input() title!: string;
  @Input() imageHeight!: string;
  @Input() imageWidth!: string;
  @Input() routerLink!: string;
}
