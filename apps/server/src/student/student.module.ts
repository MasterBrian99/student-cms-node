import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SchemaModule } from 'src/schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
