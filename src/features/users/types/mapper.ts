import { WithId } from 'mongodb';
import {UserOutputDto, UserOutputMeType, UserType} from './output';

export const userMapper = (user: WithId<UserType>): UserOutputDto => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};



export const userMeMapper = (user: WithId<UserType>): UserOutputMeType => {
  return {
    login: user.login,
    email: user.email,
    userId: user._id.toString(),
  };
};