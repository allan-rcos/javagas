/**
 * This is a TypeScript type definition for the response object type used in HTTP services.
 * Used principally to test response objects in HTTP requests.
 * It includes various primitive types, complex objects, arrays, and null values.
 *
 * @since 0.2
 * @version 0.2
 */
export type ResponseObjectType =
  | string
  | number
  | boolean
  | Object
  | ArrayBuffer
  | Blob
  | (string | number | boolean | Object | null)[]
  | null;
