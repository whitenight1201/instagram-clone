import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ default: false })
  like: boolean;
}
