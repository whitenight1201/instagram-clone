import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Post.name })
  post: Types.ObjectId;

  @Prop({})
  like: boolean;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
