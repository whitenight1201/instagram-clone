import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Posts content',
    example: 'This is posts content with text',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  file?: any;
}
