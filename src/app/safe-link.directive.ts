import { Directive } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
})

// selector: 'a[appSafeLink]' -> The selector defines the target element in the DOM that the directive will be applied to. It tells Angular to apply the directive to all <a> (anchor) elements that have the appSafeLink attribute.
// learning-resources.component.html uses appSafeLink

export class SafeLinkDirective {
    constructor() {
        console.log('SafeLinkDirective is active!');
    }
}

// In Angular, a directive is a class that allows you to extend the behavior of HTML elements or components in your templates. 
// Directives are used to manipulate the DOM (Document Object Model) in various ways, such as changing the appearance, behavior, or layout of elements based on conditions or interactions.
// There are 3 types of directives:
// Component Directives -> Every Angular component is a directive with a template. It includes the view (HTML) and logic (typescript) and is used to define UI elements in the application. Example: @Component decorator is used to create a component, which is a type of directive.
// Structural Directives -> These directives change the structure of the DOM by adding or removing elements. They are prefixed with an asterisk (*). Examples: *ngIf, *ngFor, *ngSwitch
// Attribute Directives -> These directives change the appearance or behavior of an existing element, component, or directive. They do not alter the structure of the DOM but instead modify the properties or styling of elements. Examples: ngClass, ngStyle