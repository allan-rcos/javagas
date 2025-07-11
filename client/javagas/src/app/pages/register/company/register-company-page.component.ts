import { Component, inject, OnInit } from '@angular/core';
import {
  FieldComponent,
  FieldOptions,
  SelectOption
} from '../../../components/form/field/field.component';
import { StringService } from '../../../services/utils/string.service';
import {
  IndustryService
} from '../../../services/enums/industries/industry.service';
import { RegisterRequest } from '../../../types/http/body/RegisterRequest';
import {
  CompanyService
} from '../../../services/company/register/company.service';
import {
  RegisterUserPageComponent
} from '../../../components/register/user/register-user-page.component';
import {
  RegisterCompanyRequest
} from '../../../types/http/body/RegisterCompanyRequest';
import {
  RegisterService
} from '../../../services/auth/register/register.service';

/**
 * Simple component that represents the Company registration page of the application.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-register-company-page',
  imports: [FieldComponent, RegisterUserPageComponent],
  templateUrl: './register-company-page.component.html',
})
export class RegisterCompanyPage implements OnInit {
  /**
   * List of industries to be displayed in the registration form.
   * ItSpec is populated by the IndustryService.
   * @since 0.2
   */
  protected industries!: string[];
  /**
   * Field options for the name input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected fullName: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the description TextArea.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected description: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the Website URL input.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected websiteUrl: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Field options for the Industry Select.
   * This includes the value, mode, and helper text.
   * @since 0.2
   * @protected
   */
  protected industry: FieldOptions = {
    value: '',
    mode: 'DEFAULT',
    helper: '',
  };
  /**
   * Event emitter to handle the registration process.
   * This emitter is used to emit the registration request
   * in the {@link RegisterService}, to {@link RegisterUserPageComponent}.
   * @since 0.2
   * @private
   */
  private service = inject(RegisterService);
  /**
   * IndustryService instance to fetch the list of industries.
   * This service is used to populate the industries dropdown in the registration form.
   * @since 0.2
   * @private
   */
  private industryService: IndustryService = inject(IndustryService);
  /**
   * CompanyService instance to handle company-related operations.
   * This service is used to register a new company.
   * @since 0.2
   * @private
   */
  private companyService: CompanyService = inject(CompanyService);

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It fetches the list of industries and subscribes to the submit event
   * from the RegisterService to handle form submission.
   * @since 0.2
   */
  ngOnInit() {
    this.industryService.getAll().subscribe((response: string[]) => {
      this.industries = response;
    });
    this.service.submit.subscribe((user) => this.submit(user));
  }

  /**
   * Method to handle form submission.
   * @param user - The user registration request containing all necessary fields.
   * @since 0.2
   */
  submit(user: RegisterRequest) {
    this.clearErrors();
    if (this.fieldsAreInvalid()) {
      return;
    }
    let body: RegisterCompanyRequest = {
      ...user,
      name: this.fullName.value,
      description: this.description.value,
      websiteUrl: this.websiteUrl.value,
      industry: this.industry.value,
    };
    this.companyService.register(body).subscribe({
      next: (response) => (this.service.success = response),
      error: (error) => (this.service.error = error),
    });
  }

  /**
   * Method to clear all error messages and reset field modes to default.
   * This is useful when the form is submitted and needs to be reset.
   * @since 0.2
   */
  clearErrors() {
    this.fullName.mode = 'DEFAULT';
    this.fullName.helper = '';
    this.description.mode = 'DEFAULT';
    this.description.helper = '';
    this.websiteUrl.mode = 'DEFAULT';
    this.websiteUrl.helper = '';
    this.industry.mode = 'DEFAULT';
    this.industry.helper = '';
  }

  /**
   * Method to get industry options for the select field.
   * @returns Array of select options for industries.
   * @since 0.2
   */
  getIndustryOptions(): SelectOption[] {
    if (!this.industries || this.industries.length === 0) {
      return [];
    }
    return this.industries.map((industry) => ({
      value: industry,
      label: StringService.titleCase(industry, '_'),
    }));
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
    if (!this.fullName.value) {
      this.fullName.mode = 'DANGER';
      this.fullName.helper = 'Full Name is required.';
      hasError = true;
    }
    if (!this.websiteUrl.value) {
      if (!StringService.isValidURL(this.websiteUrl.value)) {
        this.websiteUrl.mode = 'DANGER';
        this.websiteUrl.helper = 'Invalid URL format.';
        hasError = true;
      }
    }
    if (!this.industry.value.trim().length) {
      this.industry.mode = 'DANGER';
      this.industry.helper = 'Select an Industry.';
      hasError = true;
    } else if (!this.industries.includes(this.industry.value)) {
      this.industry.mode = 'DANGER';
      this.industry.helper = 'Invalid Industry selected.';
      hasError = true;
    }
    return hasError;
  }
}
