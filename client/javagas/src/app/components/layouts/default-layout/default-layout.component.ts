import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';

/**
 * DefaultLayoutComponent is a simple component that represents the default layout
 * of the application.
 *
 * @version 0.1.1
 * @since 0.1.1
 */
@Component({
  selector: 'app-default-layout',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {}
