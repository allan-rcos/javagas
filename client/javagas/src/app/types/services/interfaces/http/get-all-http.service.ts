import { IHttpService } from './http.service';
import { Observable } from 'rxjs';
import { ResponseObjectType } from './response-object-type';

/**
 * Interface for a service that performs HTTP GET requests and return an array.
 *
 * @see {@link IndustryService} for an example implementation.
 * @template T - The type of the response object.
 * @extends IHttpService Interface that defines the URL and client Object.
 * @since 0.2
 * @version 0.2
 */
export interface IGetAllHttpService<T extends ResponseObjectType>
  extends IHttpService {
  /**
   * Performs an HTTP GET request.
   * This method is used to retrieve an array of objects of type T from the server.
   *
   * @returns An Observable that emits the response object with an array of type T.
   */
  getAll(): Observable<T[]>;
}
