import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCatalogModelComponent } from '../edit-catalog-model/edit-catalog-model.component';
import { Catalog } from '../../../../../models/catalog.model';

@Component({
  selector: 'ngx-increment-decrement-catalog-modal',
  templateUrl: './increment-decrement-catalog-modal.component.html',
  styleUrls: ['./increment-decrement-catalog-modal.component.scss']
})
export class IncrementDecrementCatalogModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }
  /**
   * Variable get data from parent component to display info in modal window
   * 
   *
   * @type {Catalog}
   * @memberof IncrementDecrementCatalogModalComponent
   */
  @Input() rowData: Catalog;
  ngOnInit() {
    console.log('Loan:', this.rowData);
  }
  openAddCatalogModal() {
    const activeModal = this.modalService.open(EditCatalogModelComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogToEdit = this.rowData;
    activeModal.componentInstance.addOrRemove = true;
  }
  openRemoveCatalogModal() {
    const activeModal = this.modalService.open(EditCatalogModelComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogToEdit = this.rowData;
    activeModal.componentInstance.addOrRemove = false;
  }
}
