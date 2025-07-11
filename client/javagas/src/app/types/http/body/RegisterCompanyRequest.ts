import { RegisterRequest } from './RegisterRequest';

/**
 * RegisterCompanyRequest interface
 * This interface extends the RegisterRequest interface to include fields
 * specific to a company registration.
 * ItSpec defines the structure of a request for company registration.
 * @version 0.2
 * @since 0.2
 */
export interface RegisterCompanyRequest extends RegisterRequest {
  /**
   * The name of the company.
   * @since 0.2
   */
  name: string;
  /**
   * A brief description of the company.
   * @since 0.2
   */
  description: string;
  /**
   * The URL of the company's website or other Business Profile.
   * @since 0.2
   */
  websiteUrl: string;
  /**
   * The industry in which the company operates.
   * @since 0.2
   */
  industry: string;
}
