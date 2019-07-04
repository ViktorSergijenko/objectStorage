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

  settingsAdmin = {
    pager: {
      display: true,
      perPage: 100
    },
    actions: false,
    columns: {
      userName: {
        title: 'Darbinieks',
        type: 'string',
      },
      action: {
        title: 'Ko izdarīja',
        type: 'string',
      },
      date: {
        title: 'Datums',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy H:mm');
          return formatted;
        }
      },
    },
  };

  settingsSimple = {

    mode: 'external',
    actions: false,
    filter: {
      inputClass: 'inherit-height',
    },
    columns: {
      userName: {
        title: 'Darbnieks',
        type: 'string',
      },
      action: {
        title: 'Rīcība',
        type: 'string',
      },
      where: {
        title: 'Kur',
        type: 'string',
      },
      what: {
        title: 'Kas',
        type: 'string',
      },
      amount: {
        title: 'daudzums',
        type: 'string',
      },
      manually: {
        title: 'manuāli',
        type: 'string',
      },
      date: {
        title: 'datums',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy H:mm');
          return formatted;
        }
      },


    },
    noDataMessage: 'Informācija netika atrasta.'
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
