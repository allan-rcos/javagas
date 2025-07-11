import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlankLayoutComponent } from '../blank-layout/blank-layout.component';
import { getClassMode, ModeType } from '../../../types/components/modetype';
import { NgClass } from '@angular/common';

/**
 * FormMessageOptions is an interface that represents the options for the form message.
 * ItSpec includes the message and the mode of the message.
 * @version 0.2
 * @since 0.2
 */
export interface FormMessageOptions {
  /**
   * The message to be displayed in the form layout.
   * This can be used to show additional information, instructions or errors.
   * And have the mode defined in {@link FormLayoutComponent.mode}.
   * @since 0.2
   */
  message: string;

  /**
   * The mode of the form layout message.
   * This can be used to define the style of the message,
   * @since 0.2
   */
  mode: ModeType;
}

/**
 * FormLayoutComponent is a simple component that represents a form layout.
 * Used in Login and Register pages.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-form-layout',
  imports: [BlankLayoutComponent, NgClass],
  templateUrl: './form-layout.component.html',
})
export class FormLayoutComponent {
  /**
   * Event emitter for primary button click.
   * @since 0.2
   */
  @Output() primaryButtonClick = new EventEmitter<MouseEvent>();
  /**
   * Event emitter for secondary button click.
   * @since 0.2
   */
  @Output() secondaryButtonClick = new EventEmitter<MouseEvent>();

  /**
   * The title of the form layout.
   * @since 0.2
   */
  private _title!: string;

  /**
   * The title of the form layout.
   * @since 0.2
   */
  get title(): string {
    return this._title;
  }

  /**
   * The title of the form layout.
   * @since 0.2
   */
  @Input() set title(value: string) {
    this._title = value;
  }

  /**
   * The mode of the form layout message.
   * This can be used to define the style of the message,
   * @since 0.2
   * @private
   */
  private _mode: ModeType = 'DEFAULT';
  /**
   * The mode of the form layout message.
   * This can be used to define the style of the message,
   * @since 0.2
   */
  get mode(): ModeType {
    return this._mode;
  }

  /**
   * The mode of the form layout message.
   * This can be used to define the style of the message,
   * @since 0.2
   */
  @Input() set mode(value: ModeType) {
    this._mode = value;
  }

  /**
   * The CSS class for the form layout based on the mode.
   * This is used to apply different styles to the form layout based on the mode.
   * @since 0.2
   */
  get ngClass(): string {
    return getClassMode(this.mode);
  }

  /**
   * The message to be displayed in the form layout.
   * This can be used to show additional information, instructions or errors.
   * And have the mode defined in {@link FormLayoutComponent.mode}.
   * @since 0.2
   * @private
   */
  private _message = '';
  /**
   * The message to be displayed in the form layout.
   * This can be used to show additional information, instructions or errors.
   * And have the mode defined in {@link FormLayoutComponent.mode}.
   * @since 0.2
   */
  get message(): string {
    return this._message;
  }

  /**
   * The message to be displayed in the form layout.
   * This can be used to show additional information, instructions or errors.
   * And have the mode defined in {@link FormLayoutComponent.mode}.
   * This will also scroll to the top of the page when set.
   * @since 0.2
   */
  @Input() set message(value: string) {
    this._message = value;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /**
   * The Primary Button text. That will be used such submit button.
   * @private
   * @since 0.2
   */
  private _primaryButtonText!: string;
  /**
   * The Primary Button text. That will be used such submit button.
   * @since 0.2
   */
  get primaryButtonText(): string {
    return this._primaryButtonText;
  }

  /**
   * The Primary Button text. That will be used such submit button.
   * @since 0.2
   */
  @Input() set primaryButtonText(value: string) {
    this._primaryButtonText = value;
  }

  /**
   * The Secondary Button text. That will be used such link to register page.
   * @private
   * @since 0.2
   */
  private _secondaryButtonText!: string;
  /**
   * The Secondary Button text. That will be used such link to register page.
   * @since 0.2
   */
  get secondaryButtonText(): string {
    return this._secondaryButtonText;
  }

  /**
   * The Secondary Button text. That will be used such link to register page.
   * @since 0.2
   */
  @Input() set secondaryButtonText(value: string) {
    this._secondaryButtonText = value;
  }
}
