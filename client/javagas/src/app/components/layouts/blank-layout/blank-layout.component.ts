import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * BlankLayoutComponent is a simple layout component that serves as a
 * blank canvas for pages that do not require a header, footer, or sidebar.
 * It is typically used for authentication pages like login and registration.
 * It has an anchor to send user to Main Page and a logo image.
 *
 * @since 0.2
 * @version 0.2
 */
@Component({
  selector: 'app-blank-layout',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './blank-layout.component.html',
})
export class BlankLayoutComponent {}
