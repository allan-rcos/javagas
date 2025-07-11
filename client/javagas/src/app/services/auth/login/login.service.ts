import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../../types/http/body/LoginRequest';
import { TokenResponse } from '../../../types/http/response/TokenResponse';
import { HttpService } from '../../../types/services/classes/http/http.service';
import {
  ILoginHttpService
} from '../../../types/services/interfaces/http/login-http.service';
import { TokenService } from '../../storage/token/token.service';

/**
 * Service for handling user login operations.
 * This service provides methods to log in a user and manage the authentication token.
 * ItSpec uses Angular's HttpClient to make HTTP requests to the backend.
 * @version 0.2
 * @since 0.2
 * @example
 * import { LoginService } from './login.service';
 * const loginService = new LoginService();
 * loginService.login({ username: 'user', password: 'pass' })
 *   .subscribe(response => {
 *     console.log(response.token); // Handle the response token
 *   });
 */
@Injectable()
export class LoginService
  extends HttpService
  implements ILoginHttpService<LoginRequest, TokenResponse>
{
  /**
   * The TokenService is injected to manage the authentication token.
   * This service is responsible for storing and retrieving the token from local storage.
   * @since 0.2
   * @type {TokenService}
   * @protected
   */
  tokenService: TokenService = inject(TokenService);
  /**
   * The URL endpoint for the login API.
   * This is constructed using the environment's API URL.
   * @since 0.2
   * @override {@link HttpService.URL} A abstract class to Http Methods
   * @protected
   */
  override URL = environment.apiUrl.concat('/auth/login');

  /**
   * @interface ILoginHttpService Interface for the login HTTP service.
   * @since 0.2
   */
  get token() {
    return this.tokenService.stored;
  }

  /**
   * Checks if the user is authenticated by verifying if a token is stored.
   * @interface ILoginHttpService Interface for the login HTTP service.
   * @returns {boolean} True if the user is authenticated, false otherwise.
   * @since 0.2
   */
  get isAuthenticated() {
    return this.tokenService.stored !== null;
  }

  /**
   * Logs in a user by sending a POST request to the login endpoint.
   * The user's credentials are sent in the request body, and the response contains a token.
   * The token is stored using the TokenService.
   * @param {LoginRequest} user - The user's login credentials.
   * @interface ILoginHttpService Interface for the login HTTP service.
   * @since 0.2
   */
  login(user: LoginRequest) {
    return this.http
      .post<TokenResponse>(this.URL, user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response) => {
          this.tokenService.stored = response.token;
        }),
      );
  }
}
