import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { environment } from '../../../../environments/environment';

import { RegisterCompanyRequest } from '../../../types/http/body/RegisterCompanyRequest';
import { HttpService } from '../../../types/services/classes/http/http.service';
import { IRegisterHttpService } from '../../../types/services/interfaces/http/register-http.service';

/**
 * Service for handling company registration operations.
 * This service provides methods to register a new company.
 * ItSpec uses Angular's HttpClient to make HTTP requests to the backend.
 * @group Services
 * @group CompanyService
 * @version 0.2
 * @since 0.2
 * @example
 * import { CompanyService } from './company.service';
 * const companyService = new CompanyService();
 * const user!: RegisterCompanyRequest;
 * companyService.registerCompany(user)
 *  .subscribe(response => {
 *  console.log(response.message); // Handle the response message
 *  });
 */
@Injectable({
  providedIn: 'root',
})
export class CompanyService
  extends HttpService
  implements IRegisterHttpService
{
  /**
   * Base URL for the Company Service.
   * @override
   */
  override URL = environment.apiUrl.concat('/auth/company/register');

  /**
   * Registers a new company.
   * This method sends a POST request to the backend with the company registration details.
   * @param company The company registration request containing necessary details.
   * @returns An Observable that emits a MessageResponse containing the result of the registration.
   * @since 0.2
   */
  register(company: RegisterCompanyRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.URL, company, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
