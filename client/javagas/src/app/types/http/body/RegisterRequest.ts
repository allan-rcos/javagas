import { LoginRequest } from './LoginRequest';

/**
 * RegisterRequest interface
 * This interface extends the LoginRequest interface to include an email field.
 * ItSpec defines the structure of a request for user registration.
 * @version 0.2
 * @since 0.2
 */
export interface RegisterRequest extends LoginRequest {
  /**
   * The email of the user registering.
   * In the future will be used to verify identity and change password.
   * @since 0.2
   */
  email: string;
}
