import { Post } from 'src/posts/schemas/post.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Commentary extends Document {
  @Prop()
  commentary: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Post.name })
  post: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

/**
 * SchemaFactory for the class <Commentaries>
 */
export const CommentarySchema = SchemaFactory.createForClass(Commentary);
