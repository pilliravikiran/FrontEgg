import { Component } from '@angular/core';
import { ContextHolder, FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: 'https://sandbox.frontegg.com',
  appId: 'da398ff8-c069-428e-974a-afcded8c0c04',
};

@Component({
  selector: 'app-signup-banner',
  templateUrl: './signup-banner.component.html',
  styleUrls: ['./signup-banner.component.css'],
  standalone: false
})
export class SignupBannerComponent {
  isDefaultCredentials = false;
  loadingSubscription: Subscription;

  constructor(private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = this.fronteggAppService.isLoading$.subscribe(
      (isLoading) => {
        if (isLoading) return;
        const baseUrl = ContextHolder.for(undefined as any).getContext().baseUrl;
        const appId = ContextHolder.for(undefined as any).getContext().appId;
        this.isDefaultCredentials =
          baseUrl === DEFAULT_SANDBOX_CONTEXT.baseUrl &&
          appId === DEFAULT_SANDBOX_CONTEXT.appId;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
