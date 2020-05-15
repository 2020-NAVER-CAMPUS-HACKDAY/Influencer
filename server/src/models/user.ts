import mongoose, {
  Document, Schema, Model, model,
} from 'mongoose';

export interface IUser {
  name: string
}

export interface IUserModel extends IUser, Document{}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }
);

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;
