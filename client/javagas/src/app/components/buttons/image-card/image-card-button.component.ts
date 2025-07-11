import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

/**
 * ImageCardButtonComponent is a simple component that represents a button with an image.
 * @version 0.2
 * @since 0.2
 */
@Component({
  selector: 'app-image-card-button',
  templateUrl: './image-card-button.component.html',
  imports: [RouterLink, NgOptimizedImage],
})
export class ImageCardButtonComponent {
  /**
   * The Link to navigate to when the card is clicked.
   * @since 0.2
   * @private
   */
  private _routerLink!: string;

  /**
   * The Link to navigate to when the card is clicked.
   * @since 0.2
   */
  get routerLink(): string {
    return this._routerLink;
  }

  /**
   * The Link to navigate to when the card is clicked.
   * @since 0.2
   */
  @Input() set routerLink(value: string) {
    this._routerLink = value;
  }

  /**
   * The URL of the image to be displayed in the button.
   * @since 0.2
   * @private
   */
  private _imageUrl!: string;

  /**
   * The URL of the image to be displayed in the button.
   * @since 0.2
   */
  get imageUrl(): string {
    return this._imageUrl;
  }

  /**
   * The URL of the image to be displayed in the button.
   * @since 0.2
   */
  @Input() set imageUrl(value: string) {
    this._imageUrl = value;
  }

  /**
   * The alt text for the image.
   * @since 0.2
   * @private
   */
  private _imageAlt!: string;

  /**
   * The alt text for the image.
   * @since 0.2
   */
  get imageAlt(): string {
    return this._imageAlt;
  }

  /**
   * The alt text for the image.
   * @since 0.2
   */
  @Input() set imageAlt(value: string) {
    this._imageAlt = value;
  }

  /**
   * The height of the image.
   * @since 0.2
   * @private
   */
  private _imageHeight!: string;

  /**
   * The height of the image.
   * @since 0.2
   */
  get imageHeight(): string {
    return this._imageHeight;
  }

  /**
   * The height of the image.
   * @since 0.2
   */
  @Input() set imageHeight(value: string) {
    this._imageHeight = value;
  }

  /**
   * The width of the image.
   * @since 0.2
   * @private
   */
  private _imageWidth!: string;

  /**
   * The width of the image.
   * @since 0.2
   */
  get imageWidth(): string {
    return this._imageWidth;
  }

  /**
   * The width of the image.
   * @since 0.2
   */
  @Input() set imageWidth(value: string) {
    this._imageWidth = value;
  }

  /**
   * The title of the card.
   * @since 0.2
   * @private
   */
  private _title!: string;

  /**
   * The title of the card.
   * @since 0.2
   */
  get title(): string {
    return this._title;
  }

  /**
   * The title of the card.
   * @since 0.2
   */
  set title(value: string) {
    this._title = value;
  }
}
