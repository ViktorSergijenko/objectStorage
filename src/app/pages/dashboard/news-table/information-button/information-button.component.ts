import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsNewsModalComponent } from '../../warehouses/warehouse-info/details-news-modal/details-news-modal.component';
import { News } from '../../../../models/news.mode';

@Component({
  selector: 'ngx-information-button',
  templateUrl: './information-button.component.html',
  styleUrls: ['./information-button.component.scss']
})
export class InformationButtonComponent implements OnInit {
  @Input()
  rowData: any;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    console.log(this.rowData);
  }
  /**
   * Method opens modal window with news detailed information
   *
   * @param {News} newsThatWeWantToWatch
   * @memberof WarehouseInfoComponent
   */
  openDetailsNewsModal(newsThatWeWantToWatch: News) {
    // Opening modal window where we can edit Warehouse
    const activeModal = this.modalService.open(DetailsNewsModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    // Passing information to modal window
    activeModal.componentInstance.news = newsThatWeWantToWatch;
  }
}
