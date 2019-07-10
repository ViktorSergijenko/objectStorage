import { Component, OnInit } from '@angular/core';
import { News, NewsResolveDTO } from '../../../../../models/news.mode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { NewsService } from '../../../../../services/news.service';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-resolve-problem-modal',
  templateUrl: './resolve-problem-modal.component.html',
  styleUrls: ['./resolve-problem-modal.component.scss']
})
export class ResolveProblemModalComponent implements OnInit {
  news: News;
  /**
   * Error message
   *
   * @type {string}
   * @memberof EditCatalogModalComponent
   */
  error: string = '';
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof EditCatalogModalComponent
   */

  loadingIndicator: boolean = false;
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof EditCatalogModalComponent
  */
  resolveProblemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private toastrService: NbToastrService,
    private newsService: NewsService
  ) { this.createForm(); }

  ngOnInit() {
    this.resolveProblemForm.patchValue({ newsId: this.news.id });

  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditPasswordModalComponent
   */
  close() {
    this.modal.dismiss();
  }

  /**
 * Method toggles news flag
 *
 * @param {News} news
 * @memberof WarehouseInfoComponent
 */
  addNewsCommentFlag() {
    this.loadingIndicator = true;
    this.newsService.addCommentForNews(this.resolveProblemForm.value)
      .pipe(finalize(() => {
        this.loadingIndicator = false;

      }))
      .subscribe(() => {
        this.modal.close();
        this.toastrService.success(`Komentarijs bija izveidots`);
      }, err => {
        // Initialize our error value with error message that came
        this.error = err;
        this.toastrService.danger(`Komentarijs nebija izveidots`);
      });
  }
  /**
   * Method creates all controls for reactive form
   *
   * @private
   * @memberof EditCatalogModalComponent
   */
  private createForm() {
    this.resolveProblemForm = this.formBuilder.group({
      newsId: [undefined, Validators.required],
      comment: [undefined, Validators.required]
    });
  }
}
