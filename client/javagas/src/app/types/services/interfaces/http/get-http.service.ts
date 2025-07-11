import { IHttpService } from './http.service';
import { Observable } from 'rxjs';
import { ResponseObjectType } from './response-object-type';

/**
 * Interface for a service that performs HTTP GET requests.
 *
 * @see {@link HelloService} for an example implementation.
 * @template T - The type of the response object.
 * @extends IHttpService Interface that defines the URL and client Object.
 * @since 0.2
 * @version 0.2
 */
export interface IGetHttpService<T extends ResponseObjectType>
  extends IHttpService {
  /**
   * Performs an HTTP GET request.
   *
   * @returns An Observable that emits the response object of type T.
   */
  get(): Observable<T>;
}
