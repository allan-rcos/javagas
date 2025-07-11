import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IHttpService } from '../../interfaces/http/http.service';

/**
 * Abstract class for HTTP services.
 * This class provides a base structure for HTTP services in the application.
 * It defines a URL property that should be overridden in subclasses
 * and provides an HttpClient instance for making HTTP requests.
 * @version 0.2
 * @since 0.2
 */
export abstract class HttpService implements IHttpService {
  /**
   * Base URL for the HTTP service.
   * This should be overridden in subclasses to provide the specific URL for the service.
   * @since 0.2
   */
  abstract URL: string;
  /**
   * Http Client to make HTTP requests.
   * @since 0.2
   * @protected
   */
  http: HttpClient = inject(HttpClient);
}
