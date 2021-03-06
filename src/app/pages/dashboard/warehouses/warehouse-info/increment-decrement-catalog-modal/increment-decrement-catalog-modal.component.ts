import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCatalogModelComponent } from '../edit-catalog-model/edit-catalog-model.component';
import { Catalog } from '../../../../../models/catalog.model';
import { BasketService } from '../../../../../services/basket.service';
import { CatalogService } from '../../../../../services/catalog.service';
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-increment-decrement-catalog-modal',
  templateUrl: './increment-decrement-catalog-modal.component.html',
  styleUrls: ['./increment-decrement-catalog-modal.component.scss']
})
export class IncrementDecrementCatalogModalComponent implements OnInit {


  constructor(
    private modalService: NgbModal,
    private basketService: BasketService,
    private catalogService: CatalogService,
    private toastrService: NbToastrService


  ) { }
  /**
   * Variable get data from parent component to display info in modal window
   *
   *
   * @type {Catalog}
   * @memberof IncrementDecrementCatalogModalComponent
   */
  @Input() rowData: any;

  ngOnInit() {
  }


  openAddCatalogModal() {
    const activeModal = this.modalService.open(EditCatalogModelComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogToEdit = this.rowData;
    activeModal.componentInstance.addOrRemove = true;
    activeModal.componentInstance.basketId = localStorage.getItem('UserBasketId');
    activeModal.result.then(editedCatalog => {
      this.basketService.setUpdatedCatalog({ old: this.rowData, new: editedCatalog });

    });
  }
  openRemoveCatalogModal() {
    const activeModal = this.modalService.open(EditCatalogModelComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogToEdit = this.rowData;
    activeModal.componentInstance.addOrRemove = false;
    activeModal.componentInstance.basketId = localStorage.getItem('UserBasketId');
    activeModal.result.then(editedCatalog => {

      this.basketService.setUpdatedCatalog({ old: this.rowData, new: editedCatalog });
    });
  }
}
