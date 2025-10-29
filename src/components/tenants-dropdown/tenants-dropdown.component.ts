import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { getInitials } from '../../utils/get-initials';

@Component({
  selector: 'app-tenants-dropdown',
  templateUrl: './tenants-dropdown.component.html',
  styleUrls: ['./tenants-dropdown.component.css'],
  standalone: false
})
export class TenantsDropdownComponent {
  @Input() items: any[] = [];
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter<any>();

  isOpen = false;
  getInitials = getInitials;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: any) {
    this.selectedChange.emit(item);
    this.isOpen = false;
  }
}
