import { BaseEntity } from "./base.model";
import { Warehouse } from "./warehouse.model";

export class Catalog extends BaseEntity {
    name: string;
    currentAmount: number;
    maximumAmount: number;
    minimumAmount: number;
    purchasePrice: number;
    soldPrice: number;
    differenceBetweenSoldAndPurchasePrice: number;
    warehouse: Warehouse;
    warehouseId: string;
    productPrice: number;
    catalogNameId: string

    type: boolean;
}
