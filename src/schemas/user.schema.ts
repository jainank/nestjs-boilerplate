import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './user.roles.enum';

@Schema()
export class User {
  @Prop({
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
    maxlength: 128,
  })
  password: string;

  @Prop({
    maxlength: 128,
    index: true,
    trim: true,
  })
  name: string;

  @Prop({
    facebook: String,
    google: String,
  })
  services: string;

  @Prop({
    default: UserRole.User,
  })
  role: UserRole;

  @Prop({
    trim: true,
  })
  picture: string;

  @Prop()
  _id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
