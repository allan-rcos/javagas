import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Mock component for testing purposes.
 * @internal
 * @see FieldComponent
 */
@Component({
  selector: 'app-field',
  template: '',
})
export class MockedFieldComponent {
  @Output() fieldValueChanged = new EventEmitter<string>();
  @Input() options!: any[];
  @Input() fieldLabel!: string;
  @Input() fieldValue!: string;
  @Input() fieldMode!: string;
  @Input() fieldHelperText!: string;
  @Input() fieldType!: string;
  @Input() fieldPlaceholder!: string;
  @Input() required!: boolean;
  @Input() fieldName!: string;
  @Input() fieldIconLeft!: string;
  @Input() fieldIconRight!: string;
}
