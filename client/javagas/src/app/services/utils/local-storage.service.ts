import { Injectable } from '@angular/core';

/**
 * Service for managing local storage operations.
 * This service provides methods to get and set items in the browser's local storage.
 * It is designed to be used throughout the application for persistent data storage.
 * @version 0.2
 * @since 0.2
 * @example
 * import { LocalStorageService } from './local-storage.service';
 * const localStorageService = new LocalStorageService();
 * localStorageService.setItem('key', 'value');
 * const value = localStorageService.getItem('key');
 * console.log(value); // Outputs: 'value'
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Retrieves an item from local storage.
   * @param key The key of the item to retrieve.
   * @returns The value associated with the key, or null if not found.
   */
  getItem(key: string): any | null {
    return localStorage.getItem(key);
  }

  /**
   * Sets an item in local storage.
   * @param key The key for the item.
   * @param value The value to store.
   */
  setItem(key: string, value: any): void {
    if (value != null) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
}
