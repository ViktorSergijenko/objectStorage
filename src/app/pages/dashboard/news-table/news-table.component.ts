import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NewsService } from '../../../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InformationButtonComponent } from './information-button/information-button.component';

@Component({
  selector: 'ngx-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {
  warehouseId: string;
  settings = {
    actions: false,
    pager: {
      display: false,
    },
    columns: {
      title: {
        title: 'Problēma',
        type: 'string',
      },
      fixedDate: {
        title: 'Atrisinājuma datums',
        type: 'string',
        valuePrepareFunction: (date) => {
          if (date) {

            return this.datePipe.transform(date, 'dd/MM/yyyy H:mm:ss');
          }
          return null;
        }
      },
      createdDate: {
        title: 'Noteikšana datums',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy H:mm:ss');
          return formatted;
        }
      },
      author: {
        title: 'Authors',
        type: 'string',
      },
      action: {
        filter: false,
        title: 'Informacija',
        type: 'custom',
        renderComponent: InformationButtonComponent
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,

  ) { }

  ngOnInit() {
    this.gettingWarehouseIdFormRoute();
    this.getNewsList();
  }
  private gettingWarehouseIdFormRoute() {
    // Getting a route param from our routing.
    this.warehouseId = this.route.snapshot.paramMap.get('id');
  }
  getNewsList() {
    this.newsService.getByWarehouseIdForTable(this.warehouseId)
      .subscribe(news => {
        this.source.load(news);
      });
  }

}
