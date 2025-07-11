import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModeType } from '../../../../app/types/components/modetype';

/**
 * Mock component for FormLayoutComponent used in tests.
 * This component serves as a placeholder for the actual FormLayoutComponent
 * to avoid importing the real component in unit tests.
 * @version 0.2
 * @since 0.2
 * @internal
 */
@Component({
  selector: 'app-form-layout',
  template: '<ng-content></ng-content>',
})
export class MockedFormLayoutComponent {
  @Output() primaryButtonClick = new EventEmitter<MouseEvent>();
  @Output() secondaryButtonClick = new EventEmitter<MouseEvent>();

  @Input() title!: string;

  @Input() mode!: ModeType;

  @Input() message!: string;

  @Input() primaryButtonText!: string;

  @Input() secondaryButtonText!: string;
}
