import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsModule } from 'src/follows/follows.module';
import { Follow, FollowSchema } from 'src/follows/schemas/follow.schema';
import { PostsModule } from 'src/posts/posts.module';
import { Post, PostSchema } from 'src/posts/schemas/post.schema';
import { FileService } from '../file/file.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    forwardRef(() => PostsModule),
    forwardRef(() => FollowsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, FileService],
  exports: [UsersService],
})
export class UsersModule {}
