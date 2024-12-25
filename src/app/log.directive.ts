import { Directive, ElementRef, inject } from '@angular/core';

@Directive({   // Custom Host Directive 
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'   // binds the click event to the onLog() method in the directive class. When the element is clicked, the onLog() method is executed.
  }
})
export class LogDirective {  // we need to add it to auth.component.ts and safe-link.directive.ts in hostDirectives and in learning-resources.component.ts in imports
  private elementRef = inject(ElementRef);  // The ElementRef is injected into the directive to access the native DOM element to which the directive is applied. The nativeElement property gives direct access to the DOM element, allowing you to interact with it.

  onLog() {   // onLog(): This method is triggered on a click event due to the host binding
    console.log('Clicked');
    console.log(this.elementRef.nativeElement);
  }

  // we are using LogDirective in learning-resources.component.html
}

// In Angular, a directive is a class that allows you to extend the behavior of HTML elements or components in your templates. 
// Directives are used to manipulate the DOM (Document Object Model) in various ways, such as changing the appearance, behavior, or layout of elements based on conditions or interactions.
// There are 3 types of directives:
// Component Directives -> Every Angular component is a directive with a template. It includes the view (HTML) and logic (typescript) and is used to define UI elements in the application. Example: @Component decorator is used to create a component, which is a type of directive.
// Structural Directives -> These directives change the structure of the DOM by adding or removing elements. They are prefixed with an asterisk (*). Examples: *ngIf, *ngFor, *ngSwitch
// Attribute Directives -> These directives change the appearance or behavior of an existing element, component, or directive. They do not alter the structure of the DOM but instead modify the properties or styling of elements. Examples: ngClass, ngStyle

// In Angular, directives can interact with the element they are applied to using host bindings and host listeners. These features allow the directive to manipulate the host element or listen to events from the host element. 
// So,  "host directives" mean the way directives interact with the host element.