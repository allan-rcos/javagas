/**
 * TokenResponse interface
 * This interface defines the structure of a response containing a token.
 * ItSpec is used to represent the authentication token received after a successful login.
 * @version 0.2
 * @since 0.2
 */
export interface TokenResponse {
  /**
   * The authentication token received after a successful login.
   * @since 0.2
   */
  token: string;
}
