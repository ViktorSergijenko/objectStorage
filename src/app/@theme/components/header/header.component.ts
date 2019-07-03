import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { filter } from 'rxjs/operators';
import { ProfileInformationVM } from '../../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketModalComponent } from './basket-modal/basket-modal.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: ProfileInformationVM;

  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private modalService: NgbModal,
    private analyticsService: AnalyticsService,
    private router: Router,
    private accountService: AccountService,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.accountService.getUserProfile()
      .subscribe(credentials => {
        this.user = credentials;
        localStorage.setItem('UserFullName', credentials.fullName);
        localStorage.setItem('UserEmail', credentials.email);
        localStorage.setItem('UserBasketId', credentials.basketId);
        localStorage.setItem('Role', credentials.roleName);
        if (credentials.hasAbilityToLoad) {
          localStorage.setItem('AbilityToLoad', 'true');

        } else {
          localStorage.setItem('AbilityToLoad', 'false');
        }

      }, err => {
        this.onLogout()
      })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  onItemSelection(title) {
    if (title === 'Log out') {
      // Do something on Log out
      console.log('in item select');
      this.onLogout();
    } else if (title === 'Profile') {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }
  openUserBasket() {
    const activeModal = this.modalService.open(BasketModalComponent, {
      container: 'nb-layout',
      size: 'lg',
    });
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  onLogout() {
    localStorage.removeItem('UserToken');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserFullName');
    localStorage.removeItem('UserBasketId');
    localStorage.removeItem('Role');
    localStorage.removeItem('AbilityToLoad');
    this.router.navigate(['/login'])
  }
}
