import { PartialType } from '@nestjs/swagger';
import { StudentAuthDto } from 'src/auth/dto/request/student-auth.dto';

export class UpdateStudentDto extends PartialType(StudentAuthDto) {}
