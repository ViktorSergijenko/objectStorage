import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  /**
   * Name of the object that user is about to delete
   *
   * @type {string}
   * @memberof DeleteModalComponent
   */
  objectName: string;


  constructor(private modal: NgbActiveModal, ) { }

  ngOnInit() {
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof DeleteModalComponent
   */
  declineToDelete() {
    this.modal.close(false);
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof DeleteModalComponent
   */
  acceptToDelete() {
    this.modal.close(true);
  }

}
