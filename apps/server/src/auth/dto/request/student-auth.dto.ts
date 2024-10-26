import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StudentAuthDto {
  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'pasindu' })
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'pasindu' })
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: '+94712222222' })
  @Matches(/^(?:\+94|0)\d{9}$/)
  phoneNumber: string;
}
