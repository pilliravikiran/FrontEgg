import { Component, OnInit } from '@angular/core';
import { FronteggAuthService } from '@frontegg/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth-callback',
  template: `<div style="text-align:center;margin-top:40px;">
              <h3>Completing signup...</h3>
            </div>`
})
export class OauthCallbackComponent implements OnInit {
  constructor(
    private fronteggAuthService: FronteggAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Wait for Frontegg to complete the login
    this.fronteggAuthService.isAuthenticatedSubject.subscribe((isAuth) => {
      if (isAuth) {
        // Redirect user to signup or home
        this.router.navigate(['/home']);
      }
    });

    // Fallback redirect if nothing happens after a few seconds
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
