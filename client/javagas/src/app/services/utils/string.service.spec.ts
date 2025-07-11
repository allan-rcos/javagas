import { TestBed } from '@angular/core/testing';

import { StringService } from './string.service';

/**
 * Unit tests for StringService
 * This service provides utility functions for string manipulation.
 * @group ServicesTests
 * @group StringService
 * @version 0.2
 * @since 0.2
 */
describe('String Service', () => {
  let service: StringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('StringService.titleCase', () => {
    it('should convert a string to title case', () => {
      const input = 'hello world';
      const expected = 'Hello World';
      expect(StringService.titleCase(input)).toBe(expected);
    });

    it('should handle empty strings', () => {
      expect(StringService.titleCase('')).toBe('');
    });

    it('should handle strings with special characters', () => {
      const input = 'hello-world';
      const expected = 'Hello World';
      expect(StringService.titleCase(input, '-')).toBe(expected);
    });
  });
  describe('StringService.isValidUrl', () => {
    it('should validate a correct URL', () => {
      const url = 'https://example.com';
      expect(StringService.isValidURL(url)).toBe(true);
    });
    it('should invalidate an incorrect URL', () => {
      const url = 'htp://example.com';
      expect(StringService.isValidURL(url)).toBe(false);
    });
    it('should invalidate an empty URL', () => {
      expect(StringService.isValidURL('')).toBe(false);
    });
  });
  describe('StringService.isValidEmail', () => {
    it('should validate a correct email format', () => {
      const email = 'test@test.dev';
      expect(StringService.isValidEmail(email)).toBe(true);
    });
    it('should invalidate an incorrect email format', () => {
      const email = 'test@.dev';
      expect(StringService.isValidEmail(email)).toBe(false);
    });
    it('should invalidate an empty email', () => {
      expect(StringService.isValidEmail('')).toBe(false);
    });
  });
  describe('StringService.isStrongerPassword', () => {
    it('should validate a strong password', () => {
      const password = 'Strong1!';
      expect(StringService.isStrongerPassword(password)).toBe(true);
    });
    it('should invalidate a weak password', () => {
      const password = 'weak';
      expect(StringService.isStrongerPassword(password)).toBe(false);
    });
    it('should invalidate an empty password', () => {
      expect(StringService.isStrongerPassword('')).toBe(false);
    });
  });
});
