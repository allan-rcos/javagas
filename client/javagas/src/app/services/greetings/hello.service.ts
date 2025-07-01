import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessageResponse } from '../../types/MessageResponse';
import { Observable } from 'rxjs';

/**
 * Service to handle greetings.
 * It will make HTTP requests to the backend, that will return greetings.
 *
 * @version 0.1
 * @since 0.1
 */
@Injectable({
  providedIn: 'root',
})
export class HelloService {
  /**
   * Http Client to make HTTP requests.
   * @private
   * @since 0.1
   */
  private http: HttpClient = inject(HttpClient);

  /**
   * Returns a greeting from the backend.
   * @returns A greeting string.
   * @since 0.1
   */
  getGreeting(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(
      environment.apiUrl.concat(`/greeting/hello`),
    );
  }
}
