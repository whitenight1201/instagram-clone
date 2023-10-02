import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentariesModule } from './commentaries/commentaries.module';
import { ErrorModule } from './error/error.module';
import { FollowsModule } from './follows/follows.module';
import { LikeModule } from './like/like.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // MONGODB_URI: Joi.string(),
        JWT_ACCESS_SECRET: Joi.string(),
        ACCESS_TOKEN_EXPIRATION: Joi.string(),
        JWT_REFRESH_SECRET: Joi.string(),
        REFRESH_TOKEN_EXPIRATION: Joi.string(),
        // CLOUDINARY_API_KEY: Joi.string(),
        // CLOUDINARY_SECRET_KEY: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '',
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PostsModule,
    ErrorModule,
    CommentariesModule,
    FollowsModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
