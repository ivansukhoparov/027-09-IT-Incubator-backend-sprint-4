import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersQueryRepository } from './infrastructure/users.query.repository';
import { CreateUserUseCase } from './use.cases/create.user.use.case';
import { DeleteUserUseCase } from './use.cases/delete.user.use.case';
import { GetAllUsersUseCase } from './use.cases/get.all.users.use.case';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/users.schema';

const useCases = [CreateUserUseCase, DeleteUserUseCase];

const queryCases = [GetAllUsersUseCase];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    ...useCases,
    ...queryCases,
  ],
  exports: [UsersService],
})
export class UsersModule {}
