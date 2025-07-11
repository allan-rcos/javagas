import { Observable } from 'rxjs';
import { IHttpService } from './http.service';
import { IHasLocalStorage } from '../local/has-local-storage.service';
import { TokenResponse } from '../../../http/response/TokenResponse';

/**
 * Interface for a login HTTP service.
 * This service is responsible for handling user login operations,
 * including sending login requests and managing authentication tokens.
 *
 * @template bodyT - The type of the request body for the login operation.
 * @template responseT - The type of the response returned after a successful login.
 * @extends IHttpService
 * @since 0.2
 * @version 0.2
 */
export interface ILoginHttpService<
  bodyT extends Object,
  responseT extends TokenResponse,
> extends IHttpService {
  /**
   * Alias of {@link IHasLocalStorage.stored}.
   * @returns The authentication token or null if not found.
   * @since 0.2
   */
  get token(): string | null;

  /**
   * Checks if the user is logged in by verifying if the authentication token exists.
   * This method returns true if the token is not null, indicating that the user is authenticated.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   * @since 0.2
   */
  get isAuthenticated(): boolean;

  /**
   * Logs in a user.
   * This method sends a POST request to the backend with the user login details.
   * @param body The user login request containing necessary details.
   * @returns An Observable that emits a response object of type T containing the result of the login.
   * @since 0.2
   * @version 0.2
   */
  login(body: bodyT): Observable<responseT>;
}
