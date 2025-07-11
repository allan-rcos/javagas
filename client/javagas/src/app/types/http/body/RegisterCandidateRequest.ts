import { RegisterRequest } from './RegisterRequest';

/**
 * RegisterCandidateRequest interface
 * This interface extends the RegisterRequest interface to include fields specific to a candidate registration.
 * ItSpec defines the structure of a request for candidate registration.
 * @version 0.2
 * @since 0.2
 */
export interface RegisterCandidateRequest extends RegisterRequest {
  /**
   * The first name of the candidate.
   * @since 0.2
   */
  firstName: string;
  /**
   * The last name of the candidate.
   * @since 0.2
   */
  lastName: string;
  /**
   * The URL of the candidate's LinkedIn profile.
   * @since 0.2
   */
  linkedinUrl: string;
  /**
   * A short biography of the candidate.
   * @since 0.2
   */
  bio: string;
}
