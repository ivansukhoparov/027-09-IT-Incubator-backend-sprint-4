import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogsQueryRepository } from '../../../blogs/infrastructure/blogs.query.repository';
import { PostsLikesQueryRepository } from '../../../likes/infrastructure/posts.likes.query.repository';
import { Session, SessionDocument } from './devices.schema';
import { securityMapper } from '../types/mapper';
import { SecurityDevicesOutput } from '../types/output';
import { DevicesRepository } from './devices.repository';
import { RefreshTokenService } from '../../../../common/token.services/refresh.token.service';

@Injectable()
export class DevicesQueryRepository {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async getSessionsByUserId(
    refreshTokenValue: string,
  ): Promise<SecurityDevicesOutput[]> {
    const refreshToken = new RefreshTokenService('set', refreshTokenValue);
    if (!refreshToken.verify()) throw new UnauthorizedException();

    const userId = refreshToken.decode().userId;

    const sessions = await this.sessionModel.find({ userId: userId }).lean();
    return sessions.map(securityMapper);
  }

  // async getSessionByDeviceId(deviceId: string) {
  //   const session =  await securityCollection.findOne({deviceId:deviceId});
  //   if (!session){
  //     return null;
  //   }
  //   return securityMapper(session);
  // }
}
