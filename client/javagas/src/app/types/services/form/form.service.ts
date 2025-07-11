import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageResponse } from '../../http/response/MessageResponse';

/**
 * Interface for a form service that handles submission, success, and error states.
 * This interface is used to define the contract for services that manage form submissions,
 * success responses, and error handling in Angular applications.
 * @template SubmitType - The type of the data being submitted.
 * @template ErrorType - The type of the error response, defaulting to HttpErrorResponse.
 * @template SuccessType - The type of the success response, defaulting to MessageResponse.
 * @version 0.2
 * @since 0.2
 */
export interface IFormService<
  SubmitType,
  ErrorType = HttpErrorResponse,
  SuccessType extends MessageResponse = MessageResponse,
> {
  /**
   * Observable that emits when the form is successfully submitted.
   * This should be used to listen for successful form submissions.
   * @returns {Observable<SuccessType>} An observable that emits the success response.
   * @since 0.2
   */
  get success(): Observable<SuccessType>;

  /**
   * Sets the success response for the form submission.
   * This should be called when the form submission is successful,
   * passing the response data, that will call the {@link success SuccessObserver}.
   * @param response - The response data to be emitted on success.
   * @since 0.2
   */
  set success(response: SuccessType);

  /**
   * Observable that emits when there is an error during form submission.
   * This should be used to listen for errors that occur during the submission process.
   * @returns {Observable<ErrorType>} An observable that emits the error response.
   * @since 0.2
   */
  get error(): Observable<ErrorType>;

  /**
   * Sets the error response for the form submission.
   * This should be called when an error occurs during the form submission,
   * passing the error data, that will call the {@link error ErrorObserver}.
   * @param error - The error data to be emitted on error.
   * @since 0.2
   */
  set error(error: ErrorType);

  /**
   * Observable that emits when the form is submitted.
   * This should be used to listen for form submission events.
   * @returns {Observable<SubmitType>} An observable that emits the submitted data.
   * @since 0.2
   */
  get submit(): Observable<SubmitType>;

  /**
   * Sets the data to be submitted for the form.
   * This should be called when the form is submitted, passing the data,
   * that will call the {@link submit SubmitObserver}.
   * @param request - The data to be emitted on form submission.
   * @since 0.2
   */
  set submit(request: SubmitType);
}
