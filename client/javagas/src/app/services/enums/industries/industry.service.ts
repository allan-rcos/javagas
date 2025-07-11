import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../types/services/classes/http/http.service';
import {
  IGetAllHttpService
} from '../../../types/services/interfaces/http/get-all-http.service';

/**
 * Industries Service to get Enum Values from server.
 * @group Services
 * @group IndustryService
 * @since 0.2
 * @version 0.2
 */
@Injectable({
  providedIn: 'root',
})
export class IndustryService
  extends HttpService
  implements IGetAllHttpService<string>
{
  /**
   * The URL endpoint for the candidate registration API.
   * @override {@link HttpService.URL} A abstract class to Http Methods
   * @protected
   * @since 0.2
   */
  override URL = environment.apiUrl.concat('/enums/industries');

  /**
   * Returns a greeting from the backend.
   * @returns A greeting string.
   * @since 0.1
   */
  getAll() {
    return this.http.get<string[]>(this.URL);
  }
}
