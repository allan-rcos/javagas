import { Component, inject, OnInit } from '@angular/core';
import {
  FieldComponent,
  FieldOptions
} from '../../../components/form/field/field.component';
import { RegisterRequest } from '../../../types/http/body/RegisterRequest';
import {
  CandidateService
} from '../../../services/candidate/register/candidate.service';
import {
  RegisterUserPageComponent
} from '../../../components/register/user/register-user-page.component';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import {
  RegisterCandidateRequest
} from '../../../types/http/body/RegisterCandidateRequest';
import {
  RegisterService
} from '../../../services/auth/register/register.service';
import { StringService } from '../../../services/utils/string.service';

/**
 * RegisterCandidatePage is a simple component that represents the candidate
 * registration page of the application.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-candidate-page',
  imports: [FieldComponent, RegisterUserPageComponent],
  templateUrl: './register-candidate-page.component.html',
})
export class RegisterCandidatePage implements OnInit {
  /**
   * Fields for the candidate registration form.
   * These fields include first name, last name, LinkedIn URL, and biography.
   * Each field has its own options for value, mode, and helper text.
   * @since 0.2
   */
  protected firstName: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Fields for the candidate registration form.
   * These fields include first name, last name, LinkedIn URL, and biography.
   * Each field has its own options for value, mode, and helper text.
   * @since 0.2
   */
  protected lastName: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Fields for the candidate registration form.
   * These fields include first name, last name, LinkedIn URL, and biography.
   * Each field has its own options for value, mode, and helper text.
   * @since 0.2
   */
  protected linkedinUrl: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Fields for the candidate registration form.
   * These fields include first name, last name, LinkedIn URL, and biography.
   * Each field has its own options for value, mode, and helper text.
   * @since 0.2
   */
  protected biograph: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Register Service instance to handle user registration.
   * This service will be used to subscribe in form submission and
   * to send the response to the parent component.
   * @since 0.2
   * @private
   */
  private service: RegisterService = inject(RegisterService);
  /**
   * CompanyService instance to handle company-related operations.
   * This service is used to register a new company.
   * @since 0.2
   * @private
   */
  private candidateService: CandidateService = inject(CandidateService);

  /**
   * Method to handle form submission.
   * @since 0.2
   */
  submit(user: RegisterRequest) {
    this.clearErrors();
    if (this.fieldsAreInvalid()) {
      return;
    }
    let body: RegisterCandidateRequest = {
      ...user,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      linkedinUrl: this.linkedinUrl.value,
      bio: this.biograph.value,
    };
    this.candidateService.register(body).subscribe({
      next: (response: MessageResponse) => (this.service.success = response),
      error: (error: any) => (this.service.error = error),
    });
  }

  /**
   * Method to clear all error messages and reset field modes to default.
   * This is useful when the form is submitted and needs to be reset.
   * @since 0.2
   */
  clearErrors() {
    this.firstName.mode = 'DEFAULT';
    this.firstName.helper = '';
    this.lastName.mode = 'DEFAULT';
    this.lastName.helper = '';
    this.linkedinUrl.mode = 'DEFAULT';
    this.linkedinUrl.helper = '';
    this.biograph.mode = 'DEFAULT';
    this.biograph.helper = '';
  }

  /**
   * OnInit lifecycle hook to initialize the component.
   * This method will subscribe into the submission event.
   * @since 0.2
   */
  ngOnInit() {
    this.service.submit.subscribe((user) => this.submit(user));
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
    if (!this.firstName.value) {
      this.firstName.mode = 'DANGER';
      this.firstName.helper = 'Full Name is required.';
      hasError = true;
    }
    if (!this.lastName.value) {
      this.lastName.mode = 'DANGER';
      this.lastName.helper = 'Full Name is required.';
      hasError = true;
    }
    if (this.linkedinUrl.value) {
      if (!StringService.isValidURL(this.linkedinUrl.value)) {
        this.linkedinUrl.mode = 'DANGER';
        this.linkedinUrl.helper = 'Invalid URL format.';
        hasError = true;
      }
    }
    return hasError;
  }
}
