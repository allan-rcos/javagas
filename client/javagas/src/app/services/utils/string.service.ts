import { Injectable } from '@angular/core';

/**
 * Service for string manipulation and validation.
 * @group Services
 * @group StringService
 * @version 0.2
 * @since 0.2
 */
@Injectable({
  providedIn: 'root',
})
export class StringService {
  /**
   * Regular expressions for validating email formats.
   * @since 0.2
   * @private
   */
  private static emailRegex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * Regular expressions for validating password formats (isStronger?).
   * This regex checks for:
   * <ul>
   *   <li>At least 8 characters</li>
   *   <li>At least one uppercase letter</li>
   *   <li>At least one lowercase letter</li>
   *   <li>At least one digit</li>
   *   <li>At least one special character from the set `!@#$&*`</li>
   * </ul>
   * @since 0.2
   * @private
   */
  private static passwordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/;
  /**
   * Valid protocols for URLs.
   * This array contains the protocols that are considered valid for URLs.
   * @since 0.2
   * @private
   */
  private static validProtocols = ['http:', 'https:'];

  /**
   * Converts a string to title case.
   * This method transforms the first letter of each word to uppercase
   * and the rest to lowercase.
   * @param str - The string to be converted to title case.
   * @param split - The character used to split the string into words (default is space).
   * @returns The string in title case.
   * @since 0.2
   */
  public static titleCase(str: string, split: string = ' '): string {
    if (!str) {
      return '';
    }
    return str
      .toLowerCase()
      .split(split)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Validates if a given string is a valid URL.
   * @param url - The URL string to validate.
   * @return {boolean} - Returns true if the URL is valid, false otherwise.
   * @since 0.2
   */
  public static isValidURL(url: string): boolean {
    try {
      return this.validProtocols.includes(new URL(url).protocol);
    } catch (_) {
      return false;
    }
  }

  /**
   * Validates if a given string is a valid email format.
   * @param email - The email string to validate.
   * @return {boolean} - Returns true if the email is valid, false otherwise.
   * @since 0.2
   */
  public static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  /**
   * Validates if a given password meets the required strength criteria.
   * The criteria include:
   * <ul>
   *   <li>At least 8 characters</li>
   *   <li>At least one uppercase letter</li>
   *   <li>At least one lowercase letter</li>
   *   <li>At least one digit</li>
   *   <li>At least one special character from the set `!@#$&*`</li>
   * </ul>
   * @param password - The password string to validate.
   * @return {boolean} - Returns true if the password is valid, false otherwise.
   * @since 0.2
   */
  public static isStrongerPassword(password: string): boolean {
    return this.passwordRegex.test(password);
  }
}
