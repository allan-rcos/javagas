import { Component } from '@angular/core';
import {
  BlankLayoutComponent
} from '../../components/layouts/blank-layout/blank-layout.component';
import {
  ImageCardButtonComponent
} from '../../components/buttons/image-card/image-card-button.component';

/**
 * RegisterChoicePage Component.
 * This component serves as a choice page for user registration,
 * allowing users to select their preferred registration role.
 *
 * @see {@link RegisterCompanyPage} for company registration.
 * @see {@link RegisterCandidatePage} for candidate registration.
 * @since 0.2
 * @version 0.2
 */
@Component({
  selector: 'app-register-choice-page',
  imports: [BlankLayoutComponent, ImageCardButtonComponent],
  templateUrl: './register-choice-page.component.html',
})
export class RegisterChoicePage {}
