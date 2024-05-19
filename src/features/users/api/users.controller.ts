import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post, Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {UsersService} from '../application/users.service';
import {QueryUsersRequestType} from '../types/input';
import {createQuery} from '../../common/create.query';
import {UsersQueryRepository} from '../infrastructure/mongo/users.query.repository.mongo';
import {UserCreateInputModel} from './models/user.create.input.model';
import {AdminAuthGuard} from '../../../infrastructure/guards/admin-auth-guard.service';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateUserCommand} from "../use.cases/create.user.use.case";
import {DeleteUserCommand} from "../use.cases/delete.user.use.case";
import {GetAllUsersQuery} from "../use.cases/get.all.users.use.case";
import {UsersQueryRepositorySql} from "../infrastructure/sql/users.query.repository.sql";
import {UsersRepositorySql} from "../infrastructure/sql/users.repository.sql";

@Controller('sa/users')
export class UsersController {
    constructor(
        protected commandBus: CommandBus,
        protected queryBus: QueryBus,
        protected usersQueryRepository: UsersQueryRepository,
        protected usersQueryRepositorySql: UsersQueryRepositorySql,
        protected userRepo:UsersRepositorySql
    ) {
    }

    @Get()
    async getAll(@Query() query: QueryUsersRequestType) {
        // const {sortData, searchData} = createQuery(query);
        // return await this.usersQueryRepository.getAllUsers(sortData, searchData);
        return await this.queryBus.execute<GetAllUsersQuery>(new GetAllUsersQuery(query))
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        return await this.usersQueryRepositorySql.getById(id)
    }

    @Post()
    @UseGuards(AdminAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createNew(@Body() inputModel: UserCreateInputModel) {
        //   const newUserId = await this.userService.create(inputModel);
        const createdUserId = await this.commandBus.execute<CreateUserCommand, string>(new CreateUserCommand(inputModel))
        return await this.usersQueryRepository.getById(createdUserId);
    }

    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id') id: string) {
        // await this.userService.delete(id);
        await this.commandBus.execute<DeleteUserCommand, string>(new DeleteUserCommand(id))
        return;
    }

    @Put(':id')
    @UseGuards(AdminAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateUser(@Param('id') id: string) {
        // await this.userService.delete(id);
        await this.userRepo.updateUser(id,{login:"newLogin"})
        return;
    }
}
