import { BaseEntity } from "./base.model";
import { Warehouse } from "./warehouse.model";

export class Catalog extends BaseEntity {
    name: string;
    currentAmount: number;
    maximumAmount: number;
    MinimumAmount: number;
    PurchasePrice: number;
    SoldPrice: number;
    DifferenceBetweenSoldAndPurchasePrice: number;
    warehouse: Warehouse;
    WarehouseId: string;
}