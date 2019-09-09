export class FilterSorting {
    constructor() {
        this.filterOption = "";
    }
    filterOption: string;
    catalogTypeId: string;
}

export class WarehouseCatalogFiltrationByType {
    warehouseId: string;
    catalogTypeId: string;
    basketId: string;
    userId: string;
}