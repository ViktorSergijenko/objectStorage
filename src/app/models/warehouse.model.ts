import { BaseEntity } from './base.model';
import { Catalog } from './catalog.model';


export class Warehouse extends BaseEntity {
    name: string;
    address: string;
    location: string;
    qrCodeBase64: string;
    imageBase64: string;
    type: WarehouseType;
    catalogs: Catalog[] = [];
    hasProblems: boolean;

}

export enum WarehouseType {
    MainWarehouse,
    SimpleWarehouse,
}
