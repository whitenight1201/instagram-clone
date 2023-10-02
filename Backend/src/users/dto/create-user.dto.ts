import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  avatar?: any;
  refreshToken?: string;
}
