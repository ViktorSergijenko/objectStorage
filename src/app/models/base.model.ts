export class BaseEntity {
    /**
     * Unique ID
     *
     * @type {string}
     * @memberof Base
     */
    id: string;
    /**
     * Date string when entity created
     *
     * @type {string}
     * @memberof BaseEntity
     */
    created: string;
    /**
     * Date string when entity last modified
     *
     * @type {string}
     * @memberof BaseEntity
     */
    modified: string;
}

/**
 * Helper model for passing data that is related to  object change in ng2-smart table
 *
 * @export
 * @class ObjectChange
 */
export class ObjectChange<Type> {
    /**
     * Old value. It is used for ng2-smart-table to find it and update
     *
     * @type {Type}
     * @memberof ObjectChange
     */
    old: Type;
    /**
     * Updated value that has to get updated in ng2-smart-table.
     *
     * @type {Type}
     * @memberof ObjectChange
     */
    new: Type;
}

/**
 * Ng2-smart-table event ($event) model
 *
 * @export
 * @class TableEvent
 * @template T Type of table object
 */
export class TableEvent<T> {
    /**
     * Current row
     *
     * @type {T}
     * @memberof TableEvent
     */
    data: T;
    /**
     * Row index
     *
     * @type {number}
     * @memberof TableEvent
     */
    index: number;
    /**
     * Data set of all table objects
     *
     * @type {{ data: T[] }}
     * @memberof TableEvent
     */
    _dataSet: { data: T[] };
}