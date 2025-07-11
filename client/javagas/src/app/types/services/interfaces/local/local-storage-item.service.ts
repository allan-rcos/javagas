/**
 * Interface for a service that manages items in local storage.
 * This service provides a way to get the item.
 *
 * @template T The type of the value being stored.
 * @since 0.2
 * @version 0.2
 */
export interface ILocalStorageItemService<T> {
  /**
   * Gets an item from local storage.
   * @returns The stored value, or null if not found.
   * @template T The type of the value being retrieved.
   * @since 0.2
   * @version 0.2
   */
  get stored(): T | null;
}
