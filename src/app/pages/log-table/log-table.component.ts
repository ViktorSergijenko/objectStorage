import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LogService } from '../../services/log.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss']
})
export class LogTableComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  sourceAdmin: LocalDataSource = new LocalDataSource();
  regularUserRole: string = 'Level four';
  userRole: string;
  adminLogsOrSimple: boolean = false;

  settings = {
    pager: {
      display: true,
      perPage: 100
    },
    actions: false,
    columns: {
      userName: {
        title: 'User',
        type: 'string',
      },
      action: {
        title: 'Action',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss');
          return formatted;
        }
      },
    },
  };
  constructor(
    private datePipe: DatePipe,
    private logService: LogService,
    private router: Router

  ) { this.userRole = localStorage.getItem('Role'); }

  ngOnInit() {
    if (this.userRole === this.regularUserRole) {
      console.log('asd');
      this.router.navigateByUrl('pages/400');
    }
    else {
      this.getLogs();
    }
  }
  toggleTableFlag() {
    this.adminLogsOrSimple = !this.adminLogsOrSimple
  }
  getLogs() {
    this.logService.getAllLogs()
      .subscribe(logs => {
        this.source.load(logs);
      });
    this.logService.getAllAdminLogs()
      .subscribe(adminLogs => {
        this.sourceAdmin.load(adminLogs);
      });

  }
}
