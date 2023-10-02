/* eslint-disable max-classes-per-file */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDTO {
  @IsNotEmpty()
  @ApiProperty()
  statusCode: number;

  @IsNotEmpty()
  @ApiProperty()
  error: string;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: number;
}
