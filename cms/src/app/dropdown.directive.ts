import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('mouseenter') toggleOpen() {
    this.isOpen = true;
  }
  @HostListener('mouseleave') toggleClose() {
    this.isOpen = false;
  }
  constructor() { }

}
