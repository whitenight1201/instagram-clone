import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
export class GeneralResponseDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}
export class CredentialsDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class SignupResponseDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  id: string;
}
export class LoginResponseDTO {
  @ApiProperty()
  msg: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  token_type: string;
  @ApiProperty()
  expires_in: number;
  @ApiProperty()
  user: any;
}
export class RefreshTokenDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  accessToken: string;
}
