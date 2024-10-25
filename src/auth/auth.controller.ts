import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { StandardResponse } from 'src/common/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { Auth } from 'src/decorators/http.decorators';
import { RoleType } from 'src/utils/role-type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { User } from 'src/schema/schemas/user.schema';
import { CreateAuthDto } from './dto/request/create-auth.dto';
import { LoginAuthDto } from './dto/request/login-auth.dto';
import { StudentAuthDto } from './dto/request/student-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() body: CreateAuthDto) {
    try {
      const data = await this.authService.register(body);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.ACCOUNT_CREATED,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Post('register-student')
  async registerStudent(@Body() body: StudentAuthDto) {
    try {
      const data = await this.authService.registerStudent(body);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.ACCOUNT_CREATED,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-student')
  async loginStudent(@Body() body: LoginAuthDto) {
    try {
      const data = await this.authService.loginStudent(body);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userLogin(@Body() body: LoginAuthDto) {
    try {
      const data = await this.authService.userLogin(body);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.STUDENT], {
    public: false,
  })
  async getCurrentUser(@AuthUser() user: User) {
    try {
      const data = await this.authService.getCurrentUser(user);
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
