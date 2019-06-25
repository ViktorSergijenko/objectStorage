import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Catalog } from '../../../../../models/catalog.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../../../services/catalog.service';
import { NbToastrService } from '@nebular/theme';
import { IAddProductsToBasket } from '../../../../../models/basket.model';
import { BasketService } from '../../../../../services/basket.service';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-edit-catalog-model',
  templateUrl: './edit-catalog-model.component.html',
  styleUrls: ['./edit-catalog-model.component.scss']
})
export class EditCatalogModelComponent implements OnInit {
  addingObjectToCatalogFromBasket: boolean;
  /**
  * Form group for new warehouse form
  *
  * @type {FormGroup}
  * @memberof EditCatalogModelComponent
  */
  editCatalogForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof EditCatalogModelComponent
   */
  error: string = '';
  /**
   * Flag that indicates, do user wants do remove or add product to catalog
   *
   * @type {boolean}
   * @memberof EditCatalogModelComponent
   */
  addOrRemove: boolean;
  basketId: string;
  catalogToEdit: Catalog = new Catalog();
  items: IAddProductsToBasket = new IAddProductsToBasket();
  /**
 * Subscription that monitors for catalog updates. Used to track changes for catalog values
 *
 * @type {Subscription}
 * @memberof UserFeedbackListComponent
 */
  statusAddOrRemoveUpdate: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private basketService: BasketService,
    private productService: ProductService,
    private catalogService: CatalogService,
    private toastrService: NbToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('modal has loaded');
    this.statusAddOrRemoveUpdate = this.catalogService.getUpdatedAddOrRemoveStatus()
      .subscribe(status => {
        this.addingObjectToCatalogFromBasket = status;
        console.log(" in modal");
        console.log(status);
      });
    this.editCatalogForm.patchValue({ currentAmount: 0 });

  }
  ngOnDestroy() {
    // Unsubscribe from catalog update Subscription
    this.statusAddOrRemoveUpdate.unsubscribe();
  }


  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditCatalogModelComponent
   */
  close() {
    this.modal.dismiss();
  }
  submitToAddProductsInBasket() {
    this.items.productAmount = this.editCatalogForm.get('currentAmount').value;
    this.items.catalogId = this.catalogToEdit.id;
    this.items.basketId = this.basketId;
    this.items.name = this.catalogToEdit.name;
    if (this.addingObjectToCatalogFromBasket) {
      this.basketService.addProductsToBasket(this.items)
        .pipe(finalize(() => {
        }))
        .subscribe(catalog => {
          this.toastrService.success(`Products was added to basket`);
          this.modal.close(catalog);
        }, err => {
          this.toastrService.danger(`There is not enough products in catalog`);
          this.close();
        });
    } else {
      this.productService.removeProductsFromCatalogManually(this.items)
        .pipe(finalize(() => {
        }))
        .subscribe(catalog => {
          this.toastrService.success(`Products was added to basket`);
          this.modal.close(catalog);
        }, err => {
          this.toastrService.danger(`There is not enough products in catalog`);
          this.close();
        });
    }
  }

  submitToAddProductsToCatalogFromBasket() {
    this.items.productAmount = this.editCatalogForm.get('currentAmount').value;
    this.items.catalogId = this.catalogToEdit.id;
    this.items.basketId = this.basketId;
    this.items.name = this.catalogToEdit.name;
    if (this.addingObjectToCatalogFromBasket) {
      this.basketService.addProductsToCatalogFromBasket(this.items)
        .pipe(finalize(() => {
        }))
        .subscribe(catalog => {
          this.toastrService.success(`Products was removed from catalog`);
          this.modal.close(catalog);
        }, err => {
          this.toastrService.danger(`There is not enough products in catalog`);
          this.close();
        });

    } else {
      this.productService.addProductsToCatalogManually(this.items)
        .pipe(finalize(() => {
        }))
        .subscribe(catalog => {
          this.toastrService.success(`Products was added to catalog`);
          this.modal.close(catalog);
        }, err => {
          this.toastrService.danger(`Something went wrong`);
          this.close();
        });
    }
  }

  addMaximumAmount() {
    const maxAmount = this.catalogToEdit.maximumAmount - this.catalogToEdit.currentAmount;
    this.editCatalogForm.patchValue({ currentAmount: maxAmount });
  }
  removeAllAmount() {
    this.editCatalogForm.patchValue({ currentAmount: this.catalogToEdit.currentAmount });
  }
  removeMinimumAmount() {
    const minAmount = this.catalogToEdit.minimumAmount - this.catalogToEdit.currentAmount;
    this.editCatalogForm.patchValue({ currentAmount: Math.abs(minAmount) });
  }


  private createForm() {
    this.editCatalogForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      currentAmount: [undefined, Validators.required],
      maximumAmount: [undefined, Validators.required],
      minimumAmount: [undefined, Validators.required],
      purchasePrice: [undefined, Validators.required],
      soldPrice: [undefined, Validators.required],
      differenceBetweenSoldAndPurchasePrice: [undefined, Validators.required],
      WarehouseId: [undefined, Validators.required],
    });
  }

}
