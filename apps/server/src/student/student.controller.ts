import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpStatus,
  Query,
  HttpCode,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/request/update-student.dto';
import { ApproveStudentDto } from './dto/request/approve-student.dto';
import { StandardResponse } from 'src/common/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { GetAllStudentDto } from './dto/request/get-all-student.dto';
import { Auth } from 'src/decorators/http.decorators';
import { RoleType } from 'src/utils/role-type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { User } from 'src/schema/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Auth([RoleType.ADMIN], {
    public: false,
  })
  @Post('approve')
  async approveStudent(@Body() dto: ApproveStudentDto) {
    try {
      const data = await this.studentService.approveStudent(dto);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.CHANGE_STUDENT_STATUS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.ADMIN], {
    public: false,
  })
  @Get()
  async findAll(@Query() query: GetAllStudentDto) {
    try {
      const data = await this.studentService.findAll(query);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Auth([RoleType.STUDENT], {
    public: false,
  })
  @Get('me')
  async getCurrentStudent(@AuthUser() user: User) {
    try {
      const data = await this.studentService.getCurrentStudent(user);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Auth([RoleType.STUDENT], {
    public: false,
  })
  @Patch()
  async update(
    @AuthUser() user: User,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const data = await this.studentService.update(user, updateStudentDto);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
}
