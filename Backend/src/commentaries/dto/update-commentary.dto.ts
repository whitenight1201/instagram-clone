import { PartialType } from '@nestjs/swagger';
import { CreateCommentaryDto } from './create-commentary.dto';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {}
