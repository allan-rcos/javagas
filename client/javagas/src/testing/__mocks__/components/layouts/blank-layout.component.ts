import { Component } from '@angular/core';

/**
 * Mock component for BlankLayoutComponent used in tests.
 * This component serves as a placeholder for the actual BlankLayoutComponent
 * to avoid importing the real component in unit tests.
 * @version 0.2
 * @since 0.2
 * @internal
 */
@Component({
  selector: 'app-blank-layout',
  template: '<ng-content></ng-content>',
})
export class MockedBlankLayoutComponent {
  // This component can be empty for the purpose of this test
}
