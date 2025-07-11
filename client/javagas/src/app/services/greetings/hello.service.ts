import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageResponse } from '../../types/http/response/MessageResponse';
import {
  IGetHttpService
} from '../../types/services/interfaces/http/get-http.service';
import { HttpService } from '../../types/services/classes/http/http.service';

/**
 * Service to handle greetings.
 * ItSpec will make HTTP requests to the backend, that will return greetings.
 * @group Services
 * @group HelloService
 * @version 0.1
 * @since 0.1
 */
@Injectable()
export class HelloService
  extends HttpService
  implements IGetHttpService<MessageResponse>
{
  /**
   * The URL endpoint for the candidate registration API.
   * @override {@link HttpService.URL} A abstract class to Http Methods
   * @protected
   * @since 0.2
   */
  override URL = environment.apiUrl.concat('/greeting/hello');

  /**
   * Returns a greeting from the backend.
   * @returns A greeting string.
   * @since 0.1
   */
  get() {
    return this.http.get<MessageResponse>(this.URL);
  }
}
