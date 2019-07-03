import { BaseEntity } from "./base.model";

export class NewsComment extends BaseEntity {
    author: string;
    date: Date;
    newsId: string;
    comment: string;
}
