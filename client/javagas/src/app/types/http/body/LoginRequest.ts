/**
 * LoginRequest interface
 * This interface defines the structure of a request for user login.
 * ItSpec includes the username and password fields.
 * @version 0.2
 * @since 0.2
 */
export interface LoginRequest {
  /**
   * The username of the user attempting to log in.
   * @since 0.2
   */
  username: string;
  /**
   * The password of the user attempting to log in.
   * @since 0.2
   */
  password: string;
}
