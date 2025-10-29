import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FronteggAppModule, FronteggAuthGuard } from '@frontegg/angular';

import { sanboxContextOptions } from '../../config/frontegg-options';
import { HeaderComponent } from '../components/header/header.component';
import { SignupBannerComponent } from '../components/signup-banner/signup-banner.component';
import { TenantsDropdownComponent } from '../components/tenants-dropdown/tenants-dropdown.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CopyButtonComponent } from '../components/copy-button/copy-button.component';

const routes: Routes = [
  {
    path: 'home',
    component: AccountInfoComponent,
    canActivate: [FronteggAuthGuard],
  },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupBannerComponent,
    TenantsDropdownComponent,
    AccountInfoComponent,
    HeaderComponent,
    CopyButtonComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { useHash: false }),
    FronteggAppModule.forRoot({
      contextOptions: sanboxContextOptions,
      hostedLoginBox: true,
      authOptions: {
        keepSessionAlive: true,
      },
      customLoader: true
    }),
  ],
  exports: [
    SignupBannerComponent,
    TenantsDropdownComponent,
    HeaderComponent,
    CopyButtonComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
