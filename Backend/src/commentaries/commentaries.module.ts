import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { Post, PostSchema } from '../posts/schemas/post.schema';
import { CommentariesController } from './commentaries.controller';
import { CommentariesService } from './commentaries.service';
import { Commentary, CommentarySchema } from './schemas/commentary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commentary.name, schema: CommentarySchema },
    ]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [CommentariesController],
  providers: [CommentariesService],
  exports: [CommentariesService],
})
export class CommentariesModule {}
