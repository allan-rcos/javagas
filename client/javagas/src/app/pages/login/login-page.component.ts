import { Component, inject } from '@angular/core';
import {
  FormLayoutComponent,
  FormMessageOptions,
} from '../../components/layouts/form-layout/form-layout.component';
import {
  FieldComponent,
  FieldOptions,
} from '../../components/form/field/field.component';
import { Router } from '@angular/router';
import { LoginRequest } from '../../types/http/body/LoginRequest';
import { LoginService } from '../../services/auth/login/login.service';
import { TokenResponse } from '../../types/http/response/TokenResponse';

/**
 * LoginPage is a simple component that represents the login page of the application.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-login-page',
  imports: [FormLayoutComponent, FieldComponent],
  providers: [LoginService],
  templateUrl: './login-page.component.html',
})
export class LoginPage {
  /**
   * FieldOptions object that represents the email field in the login form.
   * @since 0.2
   */
  protected username: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * FieldOptions object that represents the password field in the login form.
   * @since 0.2
   */
  protected password: FieldOptions = {
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
   * Router instance to navigate to different routes in the application.
   * Will be used to navigate to the register page when the user clicks on the
   * Secondary button and to redirect user after login successfully.
   * @since 0.2
   */
  private router: Router = inject(Router);
  /**
   * LoginService instance to handle login requests.
   * This service will be used to send the login request to the backend.
   * @since 0.2
   */
  private loginService: LoginService = inject(LoginService);

  /**
   * submit method is called when the user clicks on the primary button.
   * @since 0.2
   */
  submit() {
    this.clearErrors();
    if (this.fieldsAreInvalid()) {
      return;
    }
    let body: LoginRequest = {
      username: this.username.value,
      password: this.password.value,
    };
    this.loginService.login(body).subscribe({
      next: (r) => this.handleSuccess(r),
      error: (r) => this.handleError(r),
    });
  }

  /**
   * navigateToRegister method is called when the user clicks on the secondary button.
   * ItSpec navigates the user to the register page.
   * @since 0.2
   */
  async navigateToRegister() {
    await this.router.navigate(['register']);
  }

  /**
   * Method to clear all error messages and reset field modes to default.
   * This is useful when the form is submitted and needs to be reset.
   * @since 0.2
   */
  clearErrors() {
    this.username.mode = 'DEFAULT';
    this.username.helper = '';
    this.password.mode = 'DEFAULT';
    this.password.helper = '';
    this.form.mode = 'DEFAULT';
    this.form.message = '';
  }

  /**
   * Method to handle successful registration.
   * This method will be called when the registration request is successful.
   * ItSpec will update the form mode and message, and redirect the user to the login page after a delay.
   * @since 0.2
   * @param _response - The response from the registration request.
   */
  private handleSuccess(_response: TokenResponse) {
    this.form.mode = 'SUCCESS';
    this.form.message = 'Login successful! Redirecting to Hello page...';
    setTimeout(() => this.router.navigate(['/hello']), 3000);
  }

  /**
   * Method to handle errors during registration.
   * This method will be called when the registration request fails.
   * ItSpec will update the form mode and message to indicate an error.
   * @since 0.2
   * @param error - The error object from the registration request.
   */
  private handleError(error: any) {
    this.form.mode = 'DANGER';
    this.form.message = 'Failed login, try again.';
    console.error(error);
  }

  /**
   * Method to validate the form fields.
   * This checks if all required fields are filled out correctly
   * and sets appropriate error messages.
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
    if (!this.username.value) {
      this.username.mode = 'DANGER';
      this.username.helper = 'Username is required.';
      hasError = true;
    }
    if (!this.password.value) {
      this.password.mode = 'DANGER';
      this.password.helper = 'Password is required.';
      hasError = true;
    }
    return hasError;
  }
}
