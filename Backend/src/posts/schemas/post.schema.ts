import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Post {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  author: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({})
  filename: string;

  @Prop({})
  type: string;

  @Prop({})
  thumbnailurl: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
