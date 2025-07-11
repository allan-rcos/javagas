import { Component, inject, OnInit } from '@angular/core';
import { HelloService } from '../../services/greetings/hello.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultLayoutComponent } from '../../components/layouts/default-layout/default-layout.component';

/**
 * Component to display a greeting message.
 * ItSpec uses the HelloService to fetch the greeting from the backend.
 * @version 0.1
 * @since 0.1
 */
@Component({
  selector: 'app-hello',
  imports: [RouterLink, RouterLinkActive, DefaultLayoutComponent],
  providers: [HelloService],
  templateUrl: './hello-page.component.html',
})
export class HelloPage implements OnInit {
  /**
   * The HelloService to fetch the greeting.
   * @private
   */
  private helloService: HelloService = inject(HelloService);

  /**
   * The greeting message.
   * @private
   */
  private _greeting = '';
  /**
   * Getter for the greeting message.
   * @returns The greeting message.
   * @since 0.1
   */
  get greeting(): string {
    return this._greeting;
  }

  /**
   * Setter for the greeting message.
   * @param value The new greeting message.
   * @since 0.1
   */
  set greeting(value: string) {
    this._greeting = value;
  }

  /**
   * Error message.
   * In case the greeting could not be fetched, this was returned.
   * @since 0.1
   * @private
   */
  private _errorMessage = '';
  /**
   * Getter for the error message.
   * @returns The error message.
   * @since 0.1
   */
  get errorMessage(): string {
    return this._errorMessage;
  }

  /**
   * Setter for the error message.
   * @param value The new error message.
   * @since 0.1
   */
  set errorMessage(value: string) {
    this._errorMessage = value;
  }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * ItSpec fetches the greeting from the HelloService.
   * @return void
   * @since 0.1
   */
  ngOnInit(): void {
    this.helloService.get().subscribe({
      next: (response) => {
        this.greeting = response.message;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.statusText.concat(
          ' -> ',
          error.error.message,
        );
      },
    });
  }
}
