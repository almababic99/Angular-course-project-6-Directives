import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({  // this is a custom Attribute Directive
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    },
    // The host property in the directive is used to attach the click event listener to the <a> tag.
    hostDirectives: [LogDirective]
    // hostDirectives is an Angular feature used to apply additional directives to the host element of a directive. The host element refers to the DOM element the directive is applied to. 
    // the SafeLinkDirective is applied to <a> (anchor) elements with the appSafeLink attribute.
    // The hostDirectives: [LogDirective] part means that you are attaching the LogDirective to the same host element (<a>), alongside the logic in the SafeLinkDirective.
})

// selector: 'a[appSafeLink]' -> The selector defines the target element in the DOM that the directive will be applied to. It tells Angular to apply the directive to all <a> (anchor) elements that have the appSafeLink attribute.
// learning-resources.component.html uses appSafeLink

export class SafeLinkDirective {
    queryParam = input('myapp', {alias: 'appSafeLink'});
    // This line of code is asking for some user input (likely associated with 'myapp'), and it processes the input under the alias 'appSafeLink'. 
    // The result is stored in queryParam, where it can be used for further processing or logic in the program

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    // hostElementRef is used to access the anchor (<a>) element to which the SafeLinkDirective is applied. 
    // ElementRef is a wrapper around the native DOM element, allowing you to interact directly with it.
    // It is injected into the directive, enabling you to access and modify the properties or behavior of the associated DOM element (in this case, an anchor <a> tag).
    // hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef) -> This line uses Angular's inject function to inject an instance of ElementRef. The type <HTMLAnchorElement> specifies that the injected element is specifically an anchor (<a>) element, ensuring type safety when accessing its properties.
    // The hostElementRef variable is assigned the injected ElementRef instance, which gives you direct access to the DOM element.
    // By using ElementRef, the directive can interact with the properties of the anchor element (such as href) and modify them when needed.

    constructor() {
        console.log('SafeLinkDirective is active!');
    }

    onConfirmLeavePage(event: MouseEvent) {   // The onConfirmLeavePage method handles the event, showing a confirmation dialog, and if the user cancels, it prevents the default action (the link navigation).
        const wantsToLeave = window.confirm('Do you want to leave the app?');  

        if (wantsToLeave) {
            // const address = (event.target as HTMLAnchorElement).href;
            const address = this.hostElementRef.nativeElement.href;
            // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return;
        }
        event?.preventDefault();
    }
    // event: MouseEvent is the argument passed to the function. It contains details about the click event that occurred, such as the mouse coordinates, target element, etc.
    // window.confirm('Do you want to leave the app?') displays a confirmation dialog to the user, asking whether they want to leave the page or not. It returns a boolean: true if the user clicks "OK," and false if they click "Cancel."
    // If wantsToLeave is true (the user clicked "OK"), the function simply returns, allowing the link's default behavior (navigating to another page) to proceed.
    // const address = (event.target as HTMLAnchorElement).href -> This line extracts the href (URL) of the clicked link from the event.target, which refers to the element that was clicked.
    // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam() -> This modifies the href of the clicked link by appending a query parameter to it. The query parameter is created by calling the this.queryParam() method.
    // The new href becomes the original address with a query string ?from=<queryParam>, where <queryParam> is the result of the this.queryParam() method.
    // return -> This returns from the method, allowing the link navigation to proceed with the modified URL.
    // If wantsToLeave is false (the user clicked "Cancel"), event?.preventDefault() is called to prevent the default behavior of the link. This means the user will not be redirected away from the page when they clicked the link.
    // The ?. is an optional chaining operator that ensures preventDefault() is only called if event is defined.

    // the hostElementRef.nativeElement is used to access the actual DOM element (the <a> tag) to which the directive is attached
    // this.hostElementRef.nativeElement.href gives you access to the href property of the anchor tag (the URL the link points to)
    // this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam(); modifies the href attribute of the anchor tag dynamically. This appends a query parameter to the existing URL before the user navigates away

    // we are using this appSafeLink (onConfirmLeavePage) in learning-resources.component.html
}

// In Angular, a directive is a class that allows you to extend the behavior of HTML elements or components in your templates. 
// Directives are used to manipulate the DOM (Document Object Model) in various ways, such as changing the appearance, behavior, or layout of elements based on conditions or interactions.
// There are 3 types of directives:
// Component Directives -> Every Angular component is a directive with a template. It includes the view (HTML) and logic (typescript) and is used to define UI elements in the application. Example: @Component decorator is used to create a component, which is a type of directive.
// Structural Directives -> These directives change the structure of the DOM by adding or removing elements. They are prefixed with an asterisk (*). Examples: *ngIf, *ngFor, *ngSwitch
// Attribute Directives -> These directives change the appearance or behavior of an existing element, component, or directive. They do not alter the structure of the DOM but instead modify the properties or styling of elements. Examples: ngClass, ngStyle