import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getClassMode, ModeType } from '../../../types/components/modetype';

/**
 * FieldTypes is a type that represents the different services of fields that can be used in a form.
 * ItSpec includes text, email, password, number, textarea, and select.
 * @version 0.2
 * @since 0.2
 */
export type FieldTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'custom'
  | 'url';
/**
 * _FieldType is a type that represents the different HTML elements that can be used in a form field.
 * ItSpec includes HTMLSelectElement, HTMLInputElement, and HTMLTextAreaElement.
 * @version 0.2
 * @since 0.2
 */
type _FieldType = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

/**
 * Interface to Organize the field options.
 * @version 0.2
 * @since 0.2
 */
export interface FieldOptions {
  /**
   * The value of the field.
   * @since 0.2
   */
  value: string;
  /**
   * The mode of the field.
   * Define if it is an error, success, etc...
   * @see ModeType Types Available.
   * @since 0.2
   */
  mode: ModeType;
  /**
   * The Helper Text of the field.
   * A simple and optional text that helps the user to understand
   * about the field or errors.
   * @since 0.2
   * @optional Can be an empty string.
   */
  helper: string;
}

/**
 * SelectOption is an interface that represents an option in a select field.
 * @version 0.2
 * @since 0.2
 */
export interface SelectOption {
  /**
   * The value of the option tag.
   * @since 0.2
   */
  value: string;
  /**
   * The inner text of the option tag.
   * @since 0.2
   */
  label: string;
}

/**
 * FieldComponent is a simple component that represents a field in a form.
 * ItSpec can be used to create input fields, text areas, etc.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-field',
  imports: [NgClass, FormsModule],
  templateUrl: './field.component.html',
})
export class FieldComponent {
  /**
   * Event emitter that emits the value of the field when it changes.
   * ItSpec is used to communicate with the parent component.
   * @since 0.2
   */
  @Output() fieldValueChanged = new EventEmitter<string>();

  /**
   * The options for a select field, it is used to set the placeholder and other
   * options for the field when it is a Select.
   * @since 0.2
   * @private
   */
  private _options?: SelectOption[];

  /**
   * The options for a select field, it is used to set the placeholder and other
   * options for the field when it is a Select.
   * @since 0.2
   */
  get options(): SelectOption[] {
    if (!this._options) {
      return [];
    }
    return this._options;
  }

  /**
   * The options for a select field, it is used to set the placeholder and other
   * options for the field when it is a Select.
   * @since 0.2
   */
  @Input() set options(value: SelectOption[]) {
    let placeholder: SelectOption = {
      label: this.fieldPlaceholder,
      value: ' ',
    };
    this._options = [placeholder, ...value];
    if (this.fieldType !== 'select') {
      console.warn(
        'The options property is only used for select fields. ' +
          'ItSpec will not have any effect on other field services.',
      );
    }
  }

  /**
   * The ngClass to be applied to the field.
   * ItSpec can be used to apply additional classes to the field.
   * @since 0.2
   */
  get ngClass(): string {
    return getClassMode(this.fieldMode);
  }

  /**
   * The text from field label.
   * @since 0.2
   * @private
   */
  private _fieldLabel!: string;

  /**
   * The text from field label.
   * @since 0.2
   */
  get fieldLabel(): string {
    return this._fieldLabel;
  }

  /**
   * The text from field label.
   * @since 0.2
   */
  @Input() set fieldLabel(value: string) {
    this._fieldLabel = value;
  }

  /**
   * The name of the field.
   * @since 0.2
   * @private
   */
  private _fieldName!: string;

  /**
   * The name of the field.
   * @since 0.2
   */
  get fieldName(): string {
    return this._fieldName;
  }

  /**
   * The name of the field.
   * @since 0.2
   */
  @Input() set fieldName(value: string) {
    this._fieldName = value;
  }

  /**
   * The Mode of the field, it is the Bulma colors
   * (danger, success, default, etc...).
   * @see ModeType Types Available.
   * @since 0.2
   * @private
   */
  private _fieldMode: ModeType = 'DEFAULT';

  /**
   * The Mode of the field, it is the Bulma colors
   * (danger, success, default, etc...).
   * @see ModeType Types Available.
   * @since 0.2
   */
  get fieldMode(): ModeType {
    return this._fieldMode;
  }

  /**
   * The Mode of the field, it is the Bulma colors
   * (danger, success, default, etc...).
   * @see ModeType Types Available.
   * @since 0.2
   */
  @Input() set fieldMode(value: ModeType) {
    this._fieldMode = value;
  }

  /**
   * The placeholder of the field.
   * @since 0.2
   * @private
   */
  private _fieldPlaceholder = '';

  /**
   * The placeholder of the field.
   * @since 0.2
   */
  get fieldPlaceholder(): string {
    return this._fieldPlaceholder;
  }

  /**
   * The placeholder of the field.
   * @since 0.2
   */
  @Input() set fieldPlaceholder(value: string) {
    this._fieldPlaceholder = value;
  }

  /**
   * The type of the field, it is the HTML input services.
   * @see FieldTypes Types Available.
   * @since 0.2
   * @private
   */
  private _fieldType!: FieldTypes;

  /**
   * The type of the field, it is the HTML input services.
   * @see FieldTypes Types Available.
   * @since 0.2
   */
  get fieldType(): FieldTypes {
    return this._fieldType;
  }

  /**
   * The type of the field, it is the HTML input services.
   * @see FieldTypes Types Available.
   * @since 0.2
   */
  @Input() set fieldType(value: FieldTypes) {
    this._fieldType = value;
    if (!this.options) {
      console.warn(
        'The options property is not set. ' +
          'ItSpec will not have any effect on the field type: ' +
          value +
          '. ' +
          'If you are using a select field, please set the options property.',
      );
    }
  }

  /**
   * The value of the field.
   * When it changes, it emits the fieldValueChanged event.
   * @since 0.2
   * @private
   */
  private _fieldValue = '';

  /**
   * The value of the field.
   * When it changes, it emits the fieldValueChanged event.
   * @since 0.2
   */
  get fieldValue(): string {
    return this._fieldValue;
  }

  /**
   * The value of the field.
   * When it changes, it emits the fieldValueChanged event.
   * @since 0.2
   */
  @Input() set fieldValue(value: string) {
    this._fieldValue = value;
  }

  /**
   * The helper text of the field.
   * A little text that helps the user to understand about the field or errors.
   * @since 0.2
   * @private
   */
  private _fieldHelperText = '';

  /**
   * The helper text of the field.
   * A little text that helps the user to understand about the field or errors.
   * @since 0.2
   */
  get fieldHelperText(): string {
    return this._fieldHelperText;
  }

  /**
   * The helper text of the field.
   * A little text that helps the user to understand about the field or errors.
   * @since 0.2
   */
  @Input() set fieldHelperText(value: string) {
    this._fieldHelperText = value;
  }

  /**
   * The icon to be displayed on the left side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   * @private
   */
  private _fieldIconLeft = '';

  /**
   * The icon to be displayed on the left side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   */
  get fieldIconLeft(): string {
    return this._fieldIconLeft;
  }

  /**
   * The icon to be displayed on the left side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   */
  @Input() set fieldIconLeft(value: string) {
    this._fieldIconLeft = value;
  }

  /**
   * The icon to be displayed on the right side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   * @private
   */
  private _fieldIconRight = '';

  /**
   * The icon to be displayed on the right side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   */
  get fieldIconRight(): string {
    return this._fieldIconRight;
  }

  /**
   * The icon to be displayed on the right side of the field.
   * ItSpec can be used to indicate the type of the field or to provide additional
   * information. Uses FontAwesome icons.
   * @since 0.2
   * @example fa-envelope
   */
  @Input() set fieldIconRight(value: string) {
    this._fieldIconRight = value;
  }

  /**
   * Indicates if the field is required.
   * If true, the field will be marked as required.
   * @since 0.2
   * @private
   */
  private _required = false;

  /**
   * Indicates if the field is required.
   * If true, the field will be marked as required.
   * @since 0.2
   */
  get required(): boolean {
    return this._required;
  }

  /**
   * Indicates if the field is required.
   * If true, the field will be marked as required.
   * @since 0.2
   */
  @Input() set required(value: boolean) {
    this._required = value;
  }

  /**
   * Method to emit the value of the field when it changes.
   * @param event
   * @since 0.2
   * @protected
   */
  protected emitValue(event: any) {
    this.fieldValue = (event.target as _FieldType).value;
    this.fieldValueChanged.emit(this.fieldValue);
  }
}
