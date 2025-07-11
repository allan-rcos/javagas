import { HttpClient } from '@angular/common/http';

/**
 * Interface for HTTP services.
 * This interface defines the structure for HTTP services in the application,
 * including the URL and HttpClient instance.
 * @version 0.2
 * @since 0.2
 */
export interface IHttpService {
  /**
   * Base URL for the HTTP service.
   * This should be overridden in subclasses to provide the specific URL for the service.
   * @since 0.2
   */
  URL: string;
  /**
   * Http Client to make HTTP requests.
   * @since 0.2
   * @protected
   */
  http: HttpClient;
}
