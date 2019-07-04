import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbCalendarRange, NbDateService } from '@nebular/theme';
import { LogService } from '../../../../../services/log.service';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { DateFiltration } from '../../../../../models/dateFiltration';

@Component({
  selector: 'ngx-warehouse-log-table',
  templateUrl: './warehouse-log-table.component.html',
  styleUrls: ['./warehouse-log-table.component.scss']
})
export class WarehouseLogTableComponent implements OnInit {
  specificWarehouseId: string = '';
  selectValues: string[] = ['Nav izvēlēts', 'Pēdējā stundā', 'Pēdējā nedēļā', 'Pēdējā mēnesī']
  selectedValue: string;
  range: NbCalendarRange<Date>;
  dateFilterOptions: DateFiltration = new DateFiltration();
  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private logService: LogService,
    private datePipe: DatePipe,
    private dateService: NbDateService<Date>
  ) {

    this.range = {
      start: new Date(),
      end: new Date()
    };
    this.selectedValue = this.selectValues[0];
  }
  // getToday() {
  //   const a = Date.now();
  //   return a.getDay();
  // }
  settingsForRegularuser = {

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
  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.specificWarehouseId = this.route.snapshot.paramMap.get('id');
    this.dateFilterOptions.warehouseId = this.route.snapshot.paramMap.get('id');
    console.log(this.dateFilterOptions);
    this.getLogsForWarehouse();

  }
  selectOption(value: string) {
    console.log(value);
    if (value === 'Nav izvēlēts') {
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
        this.source.empty();
        this.source.load(logs);
      });
    }
    if (value === 'Pēdējā stundā') {
      this.dateFilterOptions.lastHour = true;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
        this.source.empty();
        this.source.load(logs);
      });
    }
    if (value === 'Pēdējā nedēļā') {
      this.dateFilterOptions.lastWeek = true;
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastMonth = false;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
        this.source.empty();
        this.source.load(logs);
      });
    }
    if (value === 'Pēdējā mēnesī') {
      this.dateFilterOptions.lastWeek = false;
      this.dateFilterOptions.lastHour = false;
      this.dateFilterOptions.lastMonth = true;
      this.dateFilterOptions.timeFrom = null;
      this.dateFilterOptions.timeTill = null;
      this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
        this.source.empty();
        this.source.load(logs);
      });
    }
  }
  getLogsForWarehouse() {
    this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
      this.source.load(logs);
    });
  }

  filterByDate() {

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
    this.dateFilterOptions.timeFrom = event.start;
    this.dateFilterOptions.timeTill = event.end;
    console.log(event);
    console.log(this.dateFilterOptions);
    this.logService.filterLogsByDate(this.dateFilterOptions).subscribe(logs => {
      this.source.empty();
      this.source.load(logs);
    });
  }

}
