import { IsEnum } from 'class-validator';
import { STUDENT_STATUS } from 'src/utils/constant';

export class GetAllStudentDto {
  @IsEnum(STUDENT_STATUS)
  studentStatus: STUDENT_STATUS;
}
