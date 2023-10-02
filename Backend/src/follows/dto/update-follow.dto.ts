import { PartialType } from '@nestjs/swagger';
import { CreateFollowDto } from './create-follow.dto';

export class UpdateFollowDto extends PartialType(CreateFollowDto) {}
