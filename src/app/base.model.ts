export class BaseEntity {
    /**
     * Unique ID
     *
     * @type {number}
     * @memberof Base
     */
    id: number;
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