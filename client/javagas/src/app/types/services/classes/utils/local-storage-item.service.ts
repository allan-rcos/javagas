import {
  IHasLocalStorage
} from '../../interfaces/local/has-local-storage.service';
import {
  LocalStorageService
} from '../../../../services/utils/local-storage.service';
import { inject } from '@angular/core';
import {
  ILocalStorageItemService
} from '../../interfaces/local/local-storage-item.service';

/**
 * Abstract class for services that manage items stored in local storage.
 * This class provides a way to get and set items in local storage using a specific key.
 * It implements the IHasLocalStorage interface to ensure that it has a storage property.
 * @template T The type of the item stored in local storage.
 * @abstract
 * @implements {IHasLocalStorage<T>}
 * @since 0.2
 * @version 0.2
 */
export abstract class LocalStorageItemService<T>
  implements ILocalStorageItemService<T>
{
  /**
   * The local storage service used to interact with the browser's local storage.
   * This is injected using Angular's dependency injection system.
   * @protected
   * @type {LocalStorageService}
   * @since 0.2
   */
  protected storage: LocalStorageService = inject(LocalStorageService);
  /**
   * The key used to store the item in local storage.
   * This should be defined in subclasses to specify the storage key.
   * @protected
   * @type {string}
   * @since 0.2
   */
  protected abstract storageKey: string;

  get stored(): T | null {
    return this.storage.getItem(this.storageKey);
  }

  /**
   * Sets the value in local storage.
   * @param value The value to store, or null to clear the storage.
   * @since 0.2
   */
  set stored(value: T | null) {
    this.storage.setItem(this.storageKey, value);
  }
}
