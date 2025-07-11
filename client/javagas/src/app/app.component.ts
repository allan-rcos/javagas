import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * The main Application Component.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
  standalone: true,
})
export class App {
  /** The application title */
  protected title = 'JaVagas';
}
