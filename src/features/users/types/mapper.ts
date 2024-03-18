import { WithId } from 'mongodb';
import { UserOutputDto, UserType } from './output';

export const userMapper = (user: WithId<UserType>): UserOutputDto => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
