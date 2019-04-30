import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private router: Router,
    private accountService: AccountService,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    })
    this.accountService.getUserProfile()
      .subscribe(credentials => {
        console.log(credentials);
        console.log('credentials');
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
      this.onLogout();
    } else if (title === 'Profile') {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  onLogout() {
    localStorage.removeItem('UserToken');
    this.router.navigate(['/login'])

  }
}
