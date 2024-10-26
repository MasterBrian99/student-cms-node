import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { RoleType } from 'src/utils/role-type';
import { TokenPayloadDto } from './dto/response/token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/utils/token-type';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/schemas/user.schema';
import { Model } from 'mongoose';
import { STATUS, STUDENT_STATUS } from 'src/utils/constant';
import { CreateAuthDto } from './dto/request/create-auth.dto';
import { LoginAuthDto } from './dto/request/login-auth.dto';
import { StudentAuthDto } from './dto/request/student-auth.dto';
import { Student } from 'src/schema/schemas/student.schema';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emitter.class';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const alreadyExist = await this.userModel.findOne({
      email: createAuthDto.email,
    });

    if (alreadyExist) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }
    try {
      const user = new this.userModel({
        email: createAuthDto.email,
        name: createAuthDto.name,
        password: await this.passwordService.hashPassword(
          createAuthDto.password,
        ),
        status: STATUS.ACTIVE,
        role: RoleType.STUDENT,
      });

      await user.save();

      // return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async userLogin(body: LoginAuthDto) {
    const user = await this.validateUser(body);
    if (user.role !== RoleType.ADMIN) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return this.createAccessToken({
      role: user.role,
      userId: user._id.toString(),
    });
    // throw new Error('Method not implemented.');
  }

  async createAccessToken(data: { role: RoleType; userId: string }) {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
  async validateUser(userLoginDto: LoginAuthDto): Promise<User> {
    const user = await this.userModel.findOne({
      email: userLoginDto.email,
    });

    // console.log({ user });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const isPasswordValid = await this.passwordService.validatePassword(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user!;
  }
  async getCurrentUser(user: User) {
    return {
      email: user.email,
      userId: user._id.toString(),
    };
  }

  async registerStudent(dto: StudentAuthDto) {
    const user = await this.userModel.findOne({
      email: dto.email,
    });
    if (user) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }
    try {
      const user = new this.userModel({
        email: dto.email,
        password: await this.passwordService.hashPassword(dto.password),
        status: STATUS.ACTIVE,
        role: RoleType.STUDENT,
      });

      const savedUser = await user.save();
      // console.log(savedUser);
      const student = new this.studentModel({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        status: STATUS.INACTIVE,
        user: savedUser,
        phoneNumber: dto.phoneNumber,
        studentStatus: STUDENT_STATUS.PENDING,
      });
      const savedStudent = await student.save();
      this.eventEmitter.emit('student.welcome', {
        name: savedStudent.fullName,
        email: dto.email,
      });

      this.eventEmitter.emit('admin.pending-student', {
        email: this.configService.get<string>('ADMIN_EMAIL'),
        name: savedStudent.fullName,
        student_email: savedStudent.email,
        phone_number: savedStudent.phoneNumber,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async loginStudent(body: LoginAuthDto) {
    const user = await this.validateUser(body);
    if (user.role !== RoleType.STUDENT) {
      throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND);
    }
    return this.createAccessToken({
      role: user.role,
      userId: user._id.toString(),
    });
  }
}
