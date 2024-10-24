import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Student, StudentSchema } from './schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
