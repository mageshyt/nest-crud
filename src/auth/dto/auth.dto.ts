import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'magesh@exile.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password@123',
  })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'Magesh',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
