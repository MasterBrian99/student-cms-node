import { IsEnum, IsString } from 'class-validator';
import { STUDENT_STATUS } from 'src/utils/constant';

export class ApproveStudentDto {
  @IsString()
  id: string;
  @IsEnum(STUDENT_STATUS)
  status: STUDENT_STATUS;
}
