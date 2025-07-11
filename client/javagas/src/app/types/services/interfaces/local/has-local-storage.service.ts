import {
  LocalStorageService
} from '../../../../services/utils/local-storage.service';
import { ILocalStorageItemService } from './local-storage-item.service';

/**
 * Interface for services that interact with local storage.
 * This interface defines methods for getting and setting items in local storage.
 * It is intended to be implemented by services that need to persist data locally.
 * @since 0.2
 * @version 0.2
 */
export interface IHasLocalStorage<T> extends ILocalStorageItemService<T> {
  /**
   * The key used to store the value in local storage.
   * This should be overridden in subclasses to provide the specific key.
   * @since 0.2
   * @version 0.2
   */
  storageKey: string;

  /**
   * The LocalStorageService instance used to interact with local storage.
   * This should be injected in the constructor of the implementing class.
   * @since 0.2
   * @version 0.2
   */
  storage: LocalStorageService;
}
