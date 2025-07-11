import { EventEmitter, Injectable } from '@angular/core';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { RegisterRequest } from '../../../types/http/body/RegisterRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormService } from '../../../types/services/form/form.service';

/**
 * Service for handling user registration.
 * This service is used in the user registration page to handle the registration process.
 * ItSpec provides an interface for components to listen for registration events.
 * ItSpec emits the following events:
 * <ul>
 *   <li> `onSubmit`: Emitted when the registration form is submitted with a `RegisterRequest` object.</li>
 *   <li> `onError`: Emitted when there is an error during the registration process, passing the error details.</li>
 *   <li> `onSuccess`: Emitted when the registration is successful, passing a `MessageResponse` object with success details.</li>
 * </ul>
 * @group Services
 * @group RegisterService
 * @version 0.2
 * @since 0.2
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterService implements IFormService<RegisterRequest> {
  /**
   * Emitter that will notify when user form is submitted.
   * @param {RegisterRequest} response - The response containing only user data.
   * @since 0.2
   */
  private onSubmit: EventEmitter<RegisterRequest> =
    new EventEmitter<RegisterRequest>();
  /**
   * Emitter that will notify when there is an error during registration.
   * @since 0.2
   */
  private onError: EventEmitter<HttpErrorResponse> =
    new EventEmitter<HttpErrorResponse>();
  /**
   * Emitter that will notify when registration is successful.
   * This will emit a `MessageResponse` object containing the success message.
   * @private
   */
  private onSuccess: EventEmitter<MessageResponse> =
    new EventEmitter<MessageResponse>();

  get submit(): Observable<RegisterRequest> {
    return this.onSubmit.asObservable();
  }

  set submit(request: RegisterRequest) {
    this.onSubmit.emit(request);
  }

  get error(): Observable<HttpErrorResponse> {
    return this.onError.asObservable();
  }

  set error(error: any) {
    this.onError.emit(error);
  }

  get success(): Observable<MessageResponse> {
    return this.onSuccess.asObservable();
  }

  set success(response: MessageResponse) {
    this.onSuccess.emit(response);
  }
}
