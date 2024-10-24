import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PasswordService } from './password.service';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RoleType } from 'src/utils/role-type';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/utils/token-type';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/schemas/user.schema';
import { Model } from 'mongoose';
import { STATUS } from 'src/utils/constant';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
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
        role: RoleType.USER,
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
}