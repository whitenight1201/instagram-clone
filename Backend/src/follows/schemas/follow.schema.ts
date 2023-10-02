import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

export type FollowDocument = Follow & Document;

@Schema({ timestamps: true })
export class Follow {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Post.name })
  followId: Types.ObjectId;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
