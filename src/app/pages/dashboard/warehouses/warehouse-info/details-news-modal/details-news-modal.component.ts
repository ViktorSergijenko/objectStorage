import { Component, OnInit } from '@angular/core';
import { News } from '../../../../../models/news.mode';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-details-news-modal',
  templateUrl: './details-news-modal.component.html',
  styleUrls: ['./details-news-modal.component.scss']
})
export class DetailsNewsModalComponent implements OnInit {
  /**
   * Variable that will store news information
   *
   * @type {News}
   * @memberof DetailsNewsModalComponent
   */
  news: News;
  constructor(
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof AddWarehouseModalComponent
   */
  close() {
    this.modal.dismiss();
  }
}
