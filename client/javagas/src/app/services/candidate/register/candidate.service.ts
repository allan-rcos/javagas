import { Injectable } from '@angular/core';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { environment } from '../../../../environments/environment';
import {
  RegisterCandidateRequest
} from '../../../types/http/body/RegisterCandidateRequest';
import { HttpService } from '../../../types/services/classes/http/http.service';
import {
  IRegisterHttpService
} from '../../../types/services/interfaces/http/register-http.service';

/**
 * Service for handling candidate registration operations.
 * This service provides methods to register a candidate
 * and manage the registration process.
 * @group Services
 * @group CandidateService
 * @version 0.2
 * @since 0.2
 * @example
 * import { CandidateService } from './candidate.service';
 * const candidateService = new CandidateService();
 * const user!: RegisterCandidateRequest; // set the user details
 * candidateService.registerCandidate(user)
 *  .subscribe(response => {
 *  console.log(response.message); // Handle the response message
 *  });
 */
@Injectable({
  providedIn: 'root',
})
export class CandidateService
  extends HttpService
  implements IRegisterHttpService
{
  /**
   * The URL endpoint for the candidate registration API.
   * @override {@link HttpService.URL} A abstract class to Http Methods
   * @protected
   * @since 0.2
   */
  override URL = environment.apiUrl.concat('/auth/candidate/register');

  /**
   * Registers a candidate with the provided registration request.
   * This method sends a POST request to the candidate registration endpoint
   * with the candidate details.
   * @param candidate The registration request containing candidate details.
   * @returns An observable of the message response from the server.
   * @implements {@link IRegisterHttpService.register}
   * @since 0.2
   */
  public register(candidate: RegisterCandidateRequest) {
    return this.http.post<MessageResponse>(this.URL, candidate, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
