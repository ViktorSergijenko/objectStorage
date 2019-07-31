import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LogService } from '../../services/log.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DateFiltration } from '../../models/dateFiltration';

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
  selectValues: string[] = ['Nav izvēlēts', 'Pēdējā stundā', 'Pēdējā diena', 'Pēdējā nedēļā', 'Pēdējā mēnesī'];
  selectedValue: string;
  range: NbCalendarRange<Date>;
  dateFilterOptions: DateFiltration = new DateFiltration();

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
          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy H:mm:ss');
          return formatted;
        }
      },
    },
  };

  settingsSimple = {
    pager: {
      display: true,
      perPage: 100
    },

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
          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy H:mm:ss');
          return formatted;
        }
      },


    },
    noDataMessage: 'Informācija netika atrasta.'
  };
  constructor(
    private datePipe: DatePipe,
    private logService: LogService,
    private router: Router,

    private dateService: NbDateService<Date>,


  ) {
    this.userRole = localStorage.getItem('Role');
    this.range = {
      start: new Date(),
      end: new Date(),
    };
    this.selectedValue = this.selectValues[0];
  }

  ngOnInit() {
    if (this.userRole === this.regularUserRole) {
      this.router.navigateByUrl('pages/400');
    }
    else {
      this.getLogs();
    }
  }
  toggleTableFlag() {
    this.adminLogsOrSimple = !this.adminLogsOrSimple
  }

  selectOption(value: string) {
    if (value === 'Nav izvēlēts') {
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.lastDay = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      if (!this.adminLogsOrSimple) {
        this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
          this.source.empty();
          this.source.load(logs);
        });
      } else {

        this.logService.getAllAdminLogs(this.dateFilterOptions)
          .subscribe(adminLogs => {
            this.sourceAdmin.empty();
            this.sourceAdmin.load(adminLogs);
          });
      }
    }
    if (value === 'Pēdējā stundā') {
      this.dateFilterOptions.lastHour = true;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.lastDay = false;
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      if (!this.adminLogsOrSimple) {
        this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
          this.source.empty();
          this.source.load(logs);
        });
      } else {

        this.logService.getAllAdminLogs(this.dateFilterOptions)
          .subscribe(adminLogs => {
            this.sourceAdmin.empty();
            this.sourceAdmin.load(adminLogs);
          });
      }
    }
    if (value === 'Pēdējā diena') {
      this.dateFilterOptions.lastDay = true;
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      if (!this.adminLogsOrSimple) {
        this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
          this.source.empty();
          this.source.load(logs);
        });
      } else {

        this.logService.getAllAdminLogs(this.dateFilterOptions)
          .subscribe(adminLogs => {
            this.sourceAdmin.empty();
            this.sourceAdmin.load(adminLogs);
          });
      }
    }
    if (value === 'Pēdējā nedēļā') {
      this.dateFilterOptions.lastWeek = true;
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastDay = false;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      if (!this.adminLogsOrSimple) {
        this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
          this.source.empty();
          this.source.load(logs);
        });
      } else {

        this.logService.getAllAdminLogs(this.dateFilterOptions)
          .subscribe(adminLogs => {
            this.sourceAdmin.empty();
            this.sourceAdmin.load(adminLogs);
          });
      }
    }
    if (value === 'Pēdējā mēnesī') {
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastDay = false;
      this.dateFilterOptions.lastMonth = true;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      if (!this.adminLogsOrSimple) {
        this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
          this.source.empty();
          this.source.load(logs);
        });
      } else {

        this.logService.getAllAdminLogs(this.dateFilterOptions)
          .subscribe(adminLogs => {
            this.sourceAdmin.empty();
            this.sourceAdmin.load(adminLogs);
          });
      }
    }
  }
  getLogs() {
    this.logService.getAllLogs(this.dateFilterOptions)
      .subscribe(logs => {
        this.source.load(logs);
      });
    this.logService.getAllAdminLogs(this.dateFilterOptions)
      .subscribe(adminLogs => {
        this.sourceAdmin.load(adminLogs);
      });
  }
  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  handleRangeChange(event) {
    this.dateFilterOptions.lastHour = false;
    this.dateFilterOptions.lastMonth = false;
    this.dateFilterOptions.lastWeek = false;
    this.dateFilterOptions.lastDay = false;
    this.dateFilterOptions.timeFrom = event.start;
    this.dateFilterOptions.timeTill = event.end;

    if (!this.adminLogsOrSimple) {
      this.logService.getAllLogs(this.dateFilterOptions).subscribe(logs => {
        this.source.empty();
        this.source.load(logs);
      });
    } else {

      this.logService.getAllAdminLogs(this.dateFilterOptions)
        .subscribe(adminLogs => {
          this.sourceAdmin.empty();
          this.sourceAdmin.load(adminLogs);
        });
    }
  }
}
