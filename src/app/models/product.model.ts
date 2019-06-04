import { Catalog } from "./catalog.model";
import { BaseEntity } from "./base.model";

export class Product extends BaseEntity {
    name: string;
    pricePerOne: number;
    vendorCode: string;
    catalog: Catalog;
}

