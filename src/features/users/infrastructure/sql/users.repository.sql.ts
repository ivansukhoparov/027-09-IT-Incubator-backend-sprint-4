import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../users.schema';
import {ObjectId} from 'mongodb';
import {UserUpdateDto} from '../../types/input';
import {CreateUserDto} from "../../types/output";
import {IUsersRepository} from "../interfaces/users.repository.interface";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";

@Injectable()
export class UsersRepositorySql implements IUsersRepository {
    constructor(@InjectDataSource() protected dataSource: DataSource) {
    }

    async createUser(newUserDto: CreateUserDto | User) {
        return " "
    }

    async getUserById(id: string) {
    }

    async getUserByLoginOrEmail(loginOrEmail: string) {

    }

    async deleteUser(id: string) {

    }

    async updateUser(id: string, userUpdateDto: UserUpdateDto) {
        return false
    }

    async getMany(searchKey: any, sortKey: any, skipped: number, pageSize: number) {

    }

    async countOfDocuments(searchKey: any) {
        return 5
    }
}
