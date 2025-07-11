import { Injectable } from '@angular/core';
import {
  LocalStorageItemService
} from '../../../types/services/classes/utils/local-storage-item.service';

/**
 * Service for managing the authentication token in local storage.
 * This service extends the LocalStorageItemService to provide
 * methods for storing and retrieving the authentication token.
 * It is used to persist the user's authentication state across sessions.
 * @version 0.2
 * @since 0.2
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService extends LocalStorageItemService<string> {
  /**
   * The key used to store the item in local storage.
   * @since 0.2
   * @protected
   */
  protected override storageKey = 'auth-token';
}
