import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryColumn({ type: "uuid", name: "user_id" })
  user_id: string;

  @Column({ type: "text", name: "first_name" })
  first_name: string;

  @Column({ type: "text", name: "last_name" })
  last_name: string;

  @Column({ type: "text", name: "gender" })
  gender: string;

  @Column({ type: "text", name: "email" })
  email: string;

  @Column({ type: "date", name: "date_of_birth" })
  date_of_birth: Date;

  constructor(
    obj: {
      user_id?: string;
      first_name?: string;
      last_name?: string;
      gender?: string;
      email?: string;
      date_of_birth?: Date;
    } = {}
  ) {
    const {
      user_id = "",
      first_name = "",
      last_name = "",
      gender = "",
      email = "",
      date_of_birth = null,
    } = obj;
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.email = email;
    this.date_of_birth = date_of_birth;
  }
}
