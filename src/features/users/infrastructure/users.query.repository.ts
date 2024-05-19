import {Injectable, NotFoundException} from '@nestjs/common';


import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {IUsersQueryRepository} from "./interfaces/users.query.repository.interface";
import {UserOutputDto, UserOutputMeType} from "../types/output";

@Injectable()
export class UsersQueryRepository implements IUsersQueryRepository {
    constructor(@InjectDataSource() protected dataSource: DataSource) {
    }


    async getById(id: string): Promise<UserOutputDto> {
        const result = await this.dataSource.query(`
             SELECT * FROM "Users"
             WHERE "id" =  $1`,
            [id])
        return result
    }

    async getUserAuthMe(id: string): Promise<UserOutputMeType> {
        return this.dataSource.query(`
    Select * from "Users"
    `)
    }

    async getMany(searchKey: any, sortKey: any, skipped: number, pageSize: number) {
        return []
    }

    async countOfDocuments(searchKey: any) {
        return 0
    }
}
