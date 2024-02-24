import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { CategoryQuestionOption } from "./Category_Question_Option";
import { EstimationSessionDetail } from "./Estimation_Session_Detail";

@Entity("Category_Question")
export class CategoryQuestion {
  @PrimaryColumn({ type: "uuid", name: "question_id" })
  question_id: string;

  @Column({ type: "uuid", name: "category_id" })
  category_id: string;

  @Column({ type: "text", name: "question" })
  question: string;

  @Column({ type: "boolean", name: "is_required" })
  is_required: boolean;

  @Column({ type: "double precision", name: "factor" })
  factor: number;

  @Column({ type: "text", name: "answer_type" })
  answer_type: string;

  @ManyToOne(() => Category, (category) => category.questions)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => CategoryQuestionOption,(option) => option.question)
  options: CategoryQuestionOption[];

  @OneToMany(() => EstimationSessionDetail,(answer) => answer.question)
  answers: EstimationSessionDetail[];


  constructor(
    obj: {
      question_id?: string;
      category_id?: string;
      question?: string;
      answer_type?: string;
      is_required?: boolean;
      factor?: number;
    } = {}
  ) {
    const {
      category_id = "",
      question_id = "",
      question = "",
      answer_type = "",
      is_required = false,
      factor = 0,
    } = obj;
    this.category_id = category_id;
    this.question_id = question_id;
    this.question = question;
    this.answer_type = answer_type;
    this.is_required = is_required;
    this.factor = factor;
  }
}
