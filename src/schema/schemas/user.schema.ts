import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';
import { RoleType } from 'src/utils/role-type';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User extends BaseSchema {
  @Prop(String)
  email: string;
  @Prop(String)
  password: string;

  @Prop(String)
  name: string;
  @Prop({
    type: String,
    required: false,
    enum: [RoleType.ADMIN, RoleType.USER],
  })
  role!: RoleType;
}

export const UserSchema = SchemaFactory.createForClass(User);
