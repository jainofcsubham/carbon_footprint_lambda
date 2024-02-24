import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryQuestion } from './Category_Question';

@Entity('Category_Question_Option')
export class CategoryQuestionOption {
    @PrimaryColumn({ type: "uuid", name: "option_id" })
    option_id: string;

    @Column({ type: "uuid", name: "question_id" })
    question_id: string;

    @Column({ type: "text", name: "value" })
    value: string;

    @Column({ type: "double precision", name: "factor" })
    factor: number;

    @ManyToOne(() => CategoryQuestion,(question) =>  question.options)
    @JoinColumn({ name: 'question_id' })
    question: CategoryQuestion;

    constructor(
        obj: {
          question_id?: string;
          option_id?: string;
          value?: string;
          factor?: number;
        } = {}
      ) {
        const {
          question_id = "",
          option_id = "",
          value = "",
          factor = 0,
        } = obj;
        this.option_id = option_id;
        this.question_id = question_id;
        this.factor = factor;
        this.value = value;
      }
}
