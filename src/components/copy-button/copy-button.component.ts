import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.css'],
  standalone: false
})
export class CopyButtonComponent {
  @Input() text: string = '';

  handleCopy = () => {
    navigator.clipboard
      .writeText(this.text)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err));
  };
}
