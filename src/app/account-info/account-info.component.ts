import { Component, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { getInitials } from '../../utils/get-initials';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  standalone: false
})
export class AccountInfoComponent implements OnInit {
  user: any;
  activeTenant: any;
  tenantsState: any;
  getInitials = getInitials;
  membersCount = 0;
  membersLoading = true;

  constructor(
    private fronteggAuthService: FronteggAuthService,
    private fronteggAppService: FronteggAppService
  ) {}

  ngOnInit() {
    this.fronteggAuthService.user$.subscribe((user) => {
      this.user = user;
    });

    this.fronteggAuthService.tenantsState$.subscribe((state) => {
      this.tenantsState = state;
      this.activeTenant = state?.activeTenant;
    });

    this.fronteggAuthService.loadUsers({
      callback: (users, error) => {
        if (!error) {
          this.membersCount = users?.length || 0;
        } else {
          this.membersCount = 0;
        }
        this.membersLoading = false;
      },
      pageOffset: 0,
      pageSize: 100,
    });
  }

  openAccountSettings() {
    this.fronteggAppService.showAdminPortal();
    setTimeout(() => {
      window.location.hash = 'admin-box/account';
    }, 1000);
  }

  openAdminBox() {
    this.fronteggAppService.showAdminPortal();
    setTimeout(() => {
      window.location.hash = 'admin-box';
    }, 1000);
  }

  handleImageError(event: any) {
    const target = event.target;
    target.style.display = 'none';
    target.parentNode.innerHTML = `<div class="initials">${getInitials(
      this.user.name
    )}</div>`;
  }

  switchTenant(tenant: any) {
    this.fronteggAuthService.switchTenant({
      tenantId: tenant.tenantId,
    });
  }

  getUserRoles(): string {
    return this.user?.roles?.map((x: any) => x.name).join(', ') || '';
  }
}
