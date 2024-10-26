import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { STUDENT_STATUS } from 'src/utils/constant';

export class ApproveStudentDto {
  @ApiProperty({ example: '5f6d2d3f4e5d6c7d' })
  @IsString()
  id: string;
  @ApiProperty({ example: 'APPROVED' })
  @IsEnum(STUDENT_STATUS)
  status: STUDENT_STATUS;
}
