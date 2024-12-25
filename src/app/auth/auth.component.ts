import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LogDirective } from '../log.directive';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  hostDirectives: [LogDirective]   // LogDirective, should be applied to the host element of the component (<app-auth>)
})
export class AuthComponent {
  email = signal('');
  password = signal('');

  private authService = inject(AuthService);  
  // This line uses Angular’s inject function to inject an instance of the AuthService class into the AuthComponent.
  // AuthService is a service that provides methods for handling authentication.
  // The inject() function is part of Angular's standalone component feature, which is introduced to inject dependencies in a more explicit and simplified way in standalone components.

  onSubmit() {
    this.authService.authenticate(this.email(), this.password());
    // The method onSubmit() calls the authenticate() method of the injected AuthService to attempt authentication with the provided email and password.
    // The this.email() and this.password() are signals, which are a reactive feature in Angular. They hold the form values (email and password).
  }
}
