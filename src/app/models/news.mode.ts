import { BaseEntity } from './base.model';

/**
 * News model
 *
 * @export
 * @class News
 * @extends {BaseEntity}
 */
export class News extends BaseEntity {
    /**
     * News(problem) title
     *
     * @type {string}
     * @memberof News
     */
    title: string;
    /**
     * Short description
     *
     * @type {string}
     * @memberof News
     */
    shortDescription: string;
    /**
     * Flag that indicates does the problem is solved or not
     *
     * @type {boolean}
     * @memberof News
     */
    fixedProblem: boolean;
    /**
     * Id of an warehouse that this news is related to
     *
     * @type {string}
     * @memberof News
     */
    WarehouseId: string;
    author: string;
    comment: string;
    isDeleted: boolean;
    createdDate: Date;
    fixedDate: Date;
    acceptedFix: boolean;
    authorAcceptedFix: string;
}

export class NewsResolveDTO {
    id: string;
    comment: string;
}
