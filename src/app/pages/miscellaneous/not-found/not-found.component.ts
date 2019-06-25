import { NbMenuService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor(private menuService: NbMenuService, private router: Router, ) {
  }

  ngOnInit() {

  }
  goToHome() {
    this.router.navigate([`pages/warehouse/list`]);

  }
}
