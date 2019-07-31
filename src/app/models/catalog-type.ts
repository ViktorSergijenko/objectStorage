import { BaseEntity } from "./base.model";

/**
 * Catalog type model
 *
 * @export
 * @class CatalogType
 * @extends {BaseEntity}
 */
export class CatalogType extends BaseEntity {
    /**
     * Catalog type name
     *
     * @type {string}
     * @memberof CatalogType
     */
    name: string;
    /**
     * Amount of catalog types that are used in catalog names
     *
     * @type {number}
     * @memberof CatalogType
     */
    amount: number;
    /**
     * Variable that stores id of an user that this type will be attached to
     *
     * @type {string}
     * @memberof CatalogType
     */
    userId: string;
}