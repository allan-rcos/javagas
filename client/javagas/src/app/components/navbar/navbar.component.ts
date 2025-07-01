import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

/**
 * NavbarComponent is a simple component that represents the navigation bar
 * of the application.
 *
 * @version 0.1.1
 * @since 0.1.1
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterLink, NgOptimizedImage, RouterLinkActive],
})
export class NavbarComponent {}
