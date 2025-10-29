import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;

  constructor(
    private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService
  ) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  // Uncomment to skip welcome page and redirect to login or app if authenticated
  // ngOnInit(): void {
  //   this.fronteggAuthService.authState$.subscribe((authState) => {
  //     if (!authState.isAuthenticated) {
  //       this.fronteggAuthService.loginWithRedirect();
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
