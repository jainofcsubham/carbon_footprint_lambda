import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { CategoryQuestion } from "./Category_Question";

@Entity("Category")
export class Category {
  @PrimaryColumn({ type: "uuid", name: "category_id" })
  category_id: string;

  @Column({ type: "text", name: "category_name" })
  category_name: string;

  @Column({ type: "integer", name: "ordering" })
  ordering: number;

  @OneToMany(() => CategoryQuestion,(question) => question.category)
  questions: CategoryQuestion[];

  constructor(
    obj: {
      category_id?: string;
      category_name?: string;
      ordering?: number;
    } = {}
  ) {
    const { category_id = "", category_name = "",ordering= 0 } = obj;
    this.category_id = category_id;
    this.category_name = category_name;
    this.ordering = ordering;
  }
}
