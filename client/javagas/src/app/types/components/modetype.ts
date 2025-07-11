/**
 * ModeType is a type that represents the different modes of a field.
 * ItSpec includes danger, warning, success, info, and default.
 * @version 0.2
 * @since 0.2
 */
export type ModeType = 'DANGER' | 'WARNING' | 'SUCCESS' | 'INFO' | 'DEFAULT';

/**
 * getClassMode is a function that returns the corresponding Bulma class
 * for a given mode.
 * @param mode - The mode for which the class is to be returned.
 * @version 0.2
 * @since 0.2
 */
export function getClassMode(mode: ModeType): string {
  switch (mode) {
    case 'DANGER':
      return 'is-danger';
    case 'WARNING':
      return 'is-warning';
    case 'SUCCESS':
      return 'is-success';
    case 'INFO':
      return 'is-info';
    default:
      return '';
  }
}
