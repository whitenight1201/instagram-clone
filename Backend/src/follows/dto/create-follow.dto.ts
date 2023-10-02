import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  followId: string;
}
