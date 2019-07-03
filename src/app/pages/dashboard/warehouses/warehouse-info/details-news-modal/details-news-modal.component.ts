import { Component, OnInit } from '@angular/core';
import { News } from '../../../../../models/news.mode';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../../../../../services/news.service';
import { NewsComment } from '../../../../../models/newsComment';

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
  newsComments: NewsComment[] = [];
  constructor(
    private modal: NgbActiveModal,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.getCommentForNews(this.news.id)
      .subscribe((comments: NewsComment[]) => {
        this.newsComments = comments;
      });
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
