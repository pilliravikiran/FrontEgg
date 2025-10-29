import { Component, OnInit } from '@angular/core';
import { FronteggAuthService, ContextHolder } from '@frontegg/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private fronteggAuthService: FronteggAuthService,
  ) {}

  ngOnInit(): void {
    this.fronteggAuthService?.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    const baseUrl = ContextHolder.for(undefined as any).getContext().baseUrl;
    const currentHost = window.location.origin;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${currentHost}`;
  }
}
