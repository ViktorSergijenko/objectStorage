import { BaseEntity } from "./base.model";
import { Catalog } from "./catalog.model";
import { User } from "./user";
import { Product } from "./product.model";

export class Basket extends BaseEntity {
    catalogs: Catalog[];
    user: User;
    userId: string;
}
export class BasketWithNewProductsVM {
    basketId: string;
    productList: Product[];
}
export class IAddProductsToBasket {
    basketId: string;
    productAmount: number;
    catalogId: string;
    name: string;
}