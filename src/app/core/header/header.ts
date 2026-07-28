import { Component, signal } from '@angular/core';

@Component({
  selector: 'qv1-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly title = signal('ActivityBookings');
}
