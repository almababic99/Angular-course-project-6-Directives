import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({  // Custom Structural Directive; we need to add it in app.component.ts in imports
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {  
  userType = input.required<Permission>({ alias: 'appAuth' });   // Permission is the type of userType defined in auth.model.ts; The directive will need a value passed to it via the appAuth attribute in the HTML.

  private authService = inject(AuthService);   // This injects the AuthService into the directive. 

  private templateRef = inject(TemplateRef); // TemplateRef provides a reference to the template that is associated with the directive. This is typically used in structural directives to render the content dynamically.

  private viewContainerRef = inject(ViewContainerRef); // ViewContainerRef allows the directive to add or remove elements from the DOM. It is used to create or clear the view defined by the TemplateRef.

  constructor() { 
    // effect() is a new feature in Angular that allows you to create reactive side effects. When the observable (in this case, the user’s permission level) changes, the effect will be re-run.
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // If the user's active permission matches the required permission (userType), the createEmbeddedView method is called to render the template (show the content).
      } else {
        this.viewContainerRef.clear();
        // If the permissions do not match, the clear() method removes the content from the DOM (i.e., it hides it).
      }
    });
  }
  // we use this AuthDirective in app.component.html
}

// In Angular, a directive is a class that allows you to extend the behavior of HTML elements or components in your templates. 
// Directives are used to manipulate the DOM (Document Object Model) in various ways, such as changing the appearance, behavior, or layout of elements based on conditions or interactions.
// There are 3 types of directives:
// Component Directives -> Every Angular component is a directive with a template. It includes the view (HTML) and logic (typescript) and is used to define UI elements in the application. Example: @Component decorator is used to create a component, which is a type of directive.
// Structural Directives -> These directives change the structure of the DOM by adding or removing elements. They are prefixed with an asterisk (*). Examples: *ngIf, *ngFor, *ngSwitch
// Attribute Directives -> These directives change the appearance or behavior of an existing element, component, or directive. They do not alter the structure of the DOM but instead modify the properties or styling of elements. Examples: ngClass, ngStyle