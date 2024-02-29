import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { EstimationSession } from './Estimation_Session';
import { CategoryQuestion } from './Category_Question';

@Entity('Estimation_Session_Detail')
export class EstimationSessionDetail {

    @PrimaryColumn({ type: "uuid", name: "session_id" })
    session_id: string;

    @PrimaryColumn({ type: "uuid", name: "question_id" })
    question_id: string;

    @Column({ type: "text", name: "value" })
    value: string;

    @ManyToOne(() => EstimationSession,(session) => session.details)
    @JoinColumn({ name: 'session_id' })
    session?: EstimationSession;

    @ManyToOne(() => CategoryQuestion,(question) => question.answers)
    @JoinColumn({ name: 'question_id' })
    question?: CategoryQuestion;

    constructor(
        obj: {
          question_id?: string;
          session_id?: string;
          value?: string;
        } = {}
      ) {
        const {
          session_id = "",
          question_id = "",
          value = "",
        } = obj;
        this.session_id = session_id;
        this.question_id = question_id;
        this.value = value;
      }

}
