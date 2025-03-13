import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
//decorators ^

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

// this will be for the dating we are receiving from the request
