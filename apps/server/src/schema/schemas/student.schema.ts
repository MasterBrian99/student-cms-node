import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';
import { User } from './user.schema';
import { STUDENT_STATUS } from 'src/utils/constant';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ collection: 'student' })
export class Student extends BaseSchema {
  @Prop({ type: String })
  firstName: string;
  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop(String)
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Virtual({
    get: function (this: Student) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  fullName: string;
  @Prop({
    type: String,
    required: false,
    enum: [
      STUDENT_STATUS.APPROVED,
      STUDENT_STATUS.PENDING,
      STUDENT_STATUS.REJECTED,
    ],
  })
  studentStatus: STUDENT_STATUS;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
