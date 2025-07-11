import { IHttpService } from './http.service';
import { RegisterRequest } from '../../../http/body/RegisterRequest';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../http/response/MessageResponse';

/**
 * Interface for HTTP services that handle user registration.
 * This interface extends the base IHttpService
 * and defines a method for registering a new user.
 * @since 0.2
 * @version 0.2
 */
export interface IRegisterHttpService extends IHttpService {
  /**
   * Registers a new user.
   * This method sends a POST request to the backend with the user registration details.
   * @param body The user registration request containing necessary details.
   * @returns An Observable that emits a MessageResponse containing the result of the registration.
   * @since 0.2
   */
  register(body: RegisterRequest): Observable<MessageResponse>;
}
