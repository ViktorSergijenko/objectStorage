import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogTypeService } from '../../services/catalog-type.service';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCatalogTypeModalComponent } from './add-catalog-type-modal/add-catalog-type-modal.component';
import { EditCatalogTypeModalComponent } from './edit-catalog-type-modal/edit-catalog-type-modal.component';
import { DeleteModalComponent } from '../dashboard/warehouses/delete-modal/delete-modal.component';

@Component({
  selector: 'ngx-catalog-type',
  templateUrl: './catalog-type.component.html',
  styleUrls: ['./catalog-type.component.scss']
})
export class CatalogTypeComponent implements OnInit {
  loadingIndicator: boolean = true;
  userRole: string;
  regularUserRole: string = 'Level four';
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      create: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    pager: {
      display: false,
    },
    filter: {
      inputClass: 'inherit-height',
    },
    columns: {
      name: {
        title: 'Catalog nosaukums',
        type: 'string',
      },
      amount: {
        title: 'Catalogu daudzums',
        type: 'number',
      },
      actions:
      {
        filter: false,
        addable: false,
        editable: false,
        title: 'Detalizēta informācija',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title ="Detalizēta informācija par noliktavu" href="#/pages/catalog-name-list/${row.id}"><i class=""material-icons">Katalogu nosaukumu tabula</i></a>`;
        },
        id: {
          title: 'ID',
          type: 'string',
        },
      },
    },
    noDataMessage: 'Informācija netika atrasta'
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private toastrService: NbToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,


    private catalogTypeService: CatalogTypeService

  ) { this.userRole = localStorage.getItem('Role'); }

  ngOnInit() {
    if (this.userRole === this.regularUserRole) {
      this.router.navigateByUrl('pages/400');
    }
    else {
      this.getCatalogTypeList();
    }
  }

  /**
   * Method opens modal window with form to add new catalog type
   *
   * @memberof CatalogTypeComponent
   */
  openAddCatalogTypeModal() {
    // Opening modal window where we can add new catalog
    const activeModal = this.modalService.open(AddCatalogTypeModalComponent, {
      container: 'nb-layout',
    });
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newCatalog => {
      // Push new warehouse to the catalog type list that is used to display them 
      this.source.append(newCatalog);
    })
  }

  /**
  * Method opens modal window with form to add new catalog TYPE
  *
  * @memberof CatalogTypeComponent
  */
  openEditCatalogTypeModal(event) {
    // Opening modal window where we can add new catalog
    const activeModal = this.modalService.open(EditCatalogTypeModalComponent, {
      container: 'nb-layout',
    });
    // Passing object that we want to edit to the modal window...
    // Using 'Object.assign' to avoid issues, when we changing warehouse values in input, and it is instantly changed in display list too
    // Thx to 'Object.assign' in the modal window, we are working with a copie of selected media file, not with origin
    activeModal.componentInstance.catalogType = Object.assign({}, event.data);
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(editedCatalogType => {
      this.source.update(event.data, editedCatalogType);
    });
  }
  private getCatalogTypeList() {
    this.catalogTypeService.getCatalogNameList()
      .pipe(
        finalize(() => {
          this.loadingIndicator = false;
        }))
      .subscribe(catalogTypeList => {
        this.source.load(catalogTypeList);
      }, err => {
        this.toastrService.danger(`Nesanāca dabūt katalogu tipus`);
      });
  }

  deleteCatalogType(event) {
    const activeModal = this.modalService.open(DeleteModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.objectName = `Katalogu tipu Nosaukums:${event.data.name}`;
    activeModal.result.then(res => {
      if (res) {
        if (event.data.amount > 0) {
          this.toastrService.danger(`Šis tips ir izmantots cataloga`);
        }
        else {
          this.catalogTypeService.deleteCatalogType(event.data.id).subscribe(() => {
            this.source.remove(event.data);
            this.toastrService.success(`Katalogu tips: '${event.data.name}' bija nodzēsts`);
          }, () => {
            this.toastrService.danger(`Katalogu tips: '${event.data.name}' nebija nodzēsts`);
          });
        }
      } else {
        return 0;
      }
    })
  };
}
