import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { EstimationSessionDetail } from './Estimation_Session_Detail';

@Entity('Estimation_Session')
export class EstimationSession {
    @PrimaryColumn({ type: "uuid", name: "session_id" })
    session_id: string;

    @Column({ type: "date", name: "start_date" })
    start_date: Date;

    @Column({ type: "date", name: "end_date" })
    end_date: Date;

    @Column({ type: "timestamp without time zone", name: "created_on" })
    created_on: Date;

    @Column({ type: "uuid", name: "user_id" })
    user_id: string;
    
    @OneToMany(() => EstimationSessionDetail,(detail) => detail.session)
    details?: EstimationSessionDetail[];

    constructor(
        obj: {
            session_id?: string;
            start_date?: Date;
            end_date?: Date;
            created_on?: Date;
        } = {}
      ) {
        const {
          session_id = "",
          start_date = null,
          end_date = null,
          created_on = null,
        } = obj;
        this.session_id = session_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_on = created_on;
      }
}
