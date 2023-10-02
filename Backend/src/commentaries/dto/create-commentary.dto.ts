import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentaryDto {
  @ApiProperty({
    description: 'Posts title',
    example: 'This is posts title',
  })
  commentary: string;
}
