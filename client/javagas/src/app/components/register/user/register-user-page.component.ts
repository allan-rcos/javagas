import { Component, inject, Input, OnInit } from '@angular/core';
import { FieldComponent, FieldOptions } from '../../form/field/field.component';
import {
  FormLayoutComponent,
  FormMessageOptions
} from '../../layouts/form-layout/form-layout.component';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { Router } from '@angular/router';
import {
  RegisterService
} from '../../../services/auth/register/register.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { StringService } from '../../../services/utils/string.service';

/**
 * Component for the user registration page.
 * This component handles user registration by providing a form with fields for email, username, password, and confirm password.
 * It uses the RegisterService to handle the registration logic and displays messages based on the success or failure of the registration.
 * Used in Register Pages like [Candidate]{@link RegisterCandidatePage} and [Company]{@link RegisterCompanyPage} pages.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-register-user-page',
  imports: [FieldComponent, FormLayoutComponent],
  templateUrl: './register-user-page.component.html',
  styles: ``,
})
export class RegisterUserPageComponent implements OnInit {
  /**
   * Field options for the email input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected email: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the username input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected username: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the password input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected password: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the Confirm Password input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected confirmPassword: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Form message options for displaying messages to the user.
   * @since 0.2
   * @protected
   */
  protected form: FormMessageOptions = {
    mode: 'DEFAULT',
    message: '',
  };
  /**
   * Service for handling user registration.
   * This service will emit Form Submission and handle the request response.
   * @since 0.2
   * @private
   */
  private registerService: RegisterService = inject(RegisterService);
  /**
   * Router instance to navigate to different routes.
   * @private
   * @since 0.2
   */
  private router: Router = inject(Router);

  /**
   * Title of the registration page.
   * This is used to display the title in the form layout.
   * @since 0.2
   * @private
   */
  private _title: string = 'Register User';

  /**
   * Title of the registration page.
   * This is used to display the title in the form layout.
   * @since 0.2
   */
  get title(): string {
    return this._title;
  }

  /**
   * Title of the registration page.
   * This is used to display the title in the form layout.
   * @since 0.2
   */
  @Input() set title(value: string) {
    this._title = value;
  }

  /**
   * Method runed when the component is initialized.
   * This method is used to set up event listeners for the registration service.
   */
  ngOnInit() {
    this.registerService.error.subscribe((error: HttpErrorResponse) => {
      this.handleError(error);
    });
    this.registerService.success.subscribe((response: MessageResponse) => {
      this.handleSuccess(response);
    });
  }

  /**
   * Method to handle form submission.
   * @since 0.2
   */
  submit() {
    this.clearErrors();
    if (this.fieldsAreInvalid()) {
      return;
    }
    this.registerService.submit = {
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
    };
  }

  /**
   * Method to clear all error messages and reset field modes to default.
   * This is useful when the form is submitted and needs to be reset.
   * @since 0.2
   */
  clearErrors() {
    this.email.mode = 'DEFAULT';
    this.email.helper = '';
    this.username.mode = 'DEFAULT';
    this.username.helper = '';
    this.password.mode = 'DEFAULT';
    this.password.helper = '';
    this.confirmPassword.mode = 'DEFAULT';
    this.confirmPassword.helper = '';
    this.form.mode = 'DEFAULT';
    this.form.message = '';
  }

  /**
   * Method to navigate to the login page.
   * @since 0.2
   */
  async navigateToLogin() {
    await this.router.navigate(['/login']);
  }

  /**
   * Method to handle successful registration.
   * This method will be called when the registration request is successful.
   * ItSpec will update the form mode and message, and redirect the user to the login page after a delay.
   * @since 0.2
   * @param _response - The response from the registration request.
   */
  private handleSuccess(_response: MessageResponse) {
    this.form.mode = 'SUCCESS';
    this.form.message =
      'Company registered successfully. Redirecting to Login page...';
    setTimeout(() => this.navigateToLogin(), 3000);
  }

  /**
   * Method to handle errors during registration.
   * This method will be called when the registration request fails.
   * ItSpec will update the form mode and message to indicate an error.
   * @since 0.2
   * @param error - The error object from the registration request.
   */
  private handleError(error: HttpErrorResponse) {
    this.form.mode = 'DANGER';
    switch (error.status) {
      case HttpStatusCode.Conflict:
        let message: string = error.error.message;
        if (message.toLowerCase().includes('email')) {
          this.email.mode = 'DANGER';
          this.email.helper = 'Email already exists.';
        } else if (message.toLowerCase().includes('username')) {
          this.username.mode = 'DANGER';
          this.username.helper = 'Username already exists.';
        } else {
          this.form.message = message;
        }
        break;
      case HttpStatusCode.InternalServerError:
        this.form.message =
          'Internal server error. Please try again later or contact support.';
        break;
      default:
        this.form.message = 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Method to validate the form fields.
   * This checks if all required fields are filled out correctly
   * and sets appropriate error messages.
   * This method uses regular expressions to validate the email and password formats.
   * @since 0.2
   * @returns {boolean} - Returns if any field is invalid, false otherwise.
   * @example
   * if (this.fieldsAreInvalid()) {
   *   console.error('Form fields are invalid');
   * }
   * @private
   */
  private fieldsAreInvalid(): boolean {
    let hasError = false;
    if (!this.email.value) {
      this.email.mode = 'DANGER';
      this.email.helper = 'Email is required.';
      hasError = true;
    } else if (!StringService.isValidEmail(this.email.value)) {
      this.email.mode = 'DANGER';
      this.email.helper = 'Invalid email format.';
      hasError = true;
    }
    if (!this.username.value) {
      this.username.mode = 'DANGER';
      this.username.helper = 'Username is required.';
      hasError = true;
    }
    if (!this.password.value) {
      this.password.mode = 'DANGER';
      this.password.helper = 'Password is required.';
      hasError = true;
    } else if (!StringService.isStrongerPassword(this.password.value)) {
      this.password.mode = 'DANGER';
      this.password.helper =
        'Too weak password. Must contain at least 8 characters, one uppercase ' +
        'letter, one lowercase letter, one number, and one special character.';
      hasError = true;
    }
    if (!this.confirmPassword.value) {
      this.confirmPassword.mode = 'DANGER';
      this.confirmPassword.helper = 'Confirm Password is required.';
      hasError = true;
    } else if (this.confirmPassword.value !== this.password.value) {
      this.confirmPassword.mode = 'DANGER';
      this.confirmPassword.helper = 'Passwords do not match.';
      hasError = true;
    }
    return hasError;
  }
}
