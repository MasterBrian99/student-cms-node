import { Prop } from '@nestjs/mongoose';
import { STATUS } from 'src/utils/constant';
import { now, Schema } from 'mongoose';

export class BaseSchema {
  _id: Schema.Types.ObjectId;
  @Prop({
    type: String,
    required: false,
    enum: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.DELETED],
  })
  status: STATUS = STATUS.ACTIVE;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}
