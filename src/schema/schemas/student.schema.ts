import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';
import { User } from './user.schema';

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
}

export const StudentSchema = SchemaFactory.createForClass(Student);
