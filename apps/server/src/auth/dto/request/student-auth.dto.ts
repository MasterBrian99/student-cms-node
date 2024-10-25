import {
  IsEmail,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StudentAuthDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @Matches(/^(?:\+94|0)\d{9}$/)
  phoneNumber: string;
}
