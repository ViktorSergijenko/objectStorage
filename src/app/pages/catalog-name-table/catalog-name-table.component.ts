import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CatalogService } from '../../services/catalog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewCatalogNameModalComponent } from './add-new-catalog-name-modal/add-new-catalog-name-modal.component';
import { EditCatalogNameModalComponent } from './edit-catalog-name-modal/edit-catalog-name-modal.component';
import { DeleteModalComponent } from '../dashboard/warehouses/delete-modal/delete-modal.component';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog-name-table',
  templateUrl: './catalog-name-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CatalogNameTableComponent implements OnInit {
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
      perPage: 10
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
    },
    noDataMessage: 'Informācija netika atrasta'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private catalogService: CatalogService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private router: Router
  ) { this.userRole = localStorage.getItem('Role'); }

  ngOnInit() {
    if (this.userRole === this.regularUserRole) {
      this.router.navigateByUrl('pages/400');
    }
    else {
      this.getCatalogNameList();
    }
  }

  private getCatalogNameList() {
    this.catalogService.getCatalogNameList()
      .subscribe(nameList => {
        this.source.load(nameList);
      });
  }

  /**
   * Method opens modal window with form to add new catalog in warehouse
   *
   * @memberof WarehouseInfoComponent
   */
  openAddCatalogNameModal() {
    // Opening modal window where we can add new catalog
    const activeModal = this.modalService.open(AddNewCatalogNameModalComponent, {
      container: 'nb-layout',
    });
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newCatalog => {
      // Push new warehouse to the warehouse list that is used to display them 
      this.source.append(newCatalog);
    })
  }
  /**
  * Method opens modal window with form to add new catalog in warehouse
  *
  * @memberof WarehouseInfoComponent
  */
  openEditCatalogNameModal(event) {
    // Opening modal window where we can add new catalog
    const activeModal = this.modalService.open(EditCatalogNameModalComponent, {
      container: 'nb-layout',
    });
    // Passing object that we want to edit to the modal window...
    // Using 'Object.assign' to avoid issues, when we changing warehouse values in input, and it is instantly changed in display list too
    // Thx to 'Object.assign' in the modal window, we are working with a copie of selected media file, not with origin
    activeModal.componentInstance.catalogName = Object.assign({}, event.data);
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(editedCatalogName => {
      this.source.update(event.data, editedCatalogName);
    });
  }

  deleteCatalogName(event) {
    const activeModal = this.modalService.open(DeleteModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.objectName = `Catalog name:${event.data.name}`;
    activeModal.result.then(res => {
      if (res) {
        if (event.data.amount > 0) {
          this.toastrService.danger(`Šis nosaukums ir izmantots cataloga`);
        }
        else {
          this.catalogService.deleteCatalogName(event.data.id).subscribe(() => {
            this.source.remove(event.data);
            this.toastrService.success(`Catalog nosaukums: '${event.data.name}' bija nodzēsts`);
          }, () => {
            this.toastrService.danger(`Catalog name: '${event.data.name}' nebija nodzēsts`);
          });
        }
      } else {
        return 0;
      }
    })
  };
}
