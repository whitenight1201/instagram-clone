import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({})
  avatar: string;
  @Prop()
  refreshToken: string;
  @Prop()
  refreshTokenExpiration: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
