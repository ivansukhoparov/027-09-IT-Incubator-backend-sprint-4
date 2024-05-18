import {Module} from "@nestjs/common";
import {UsersController} from "./api/users.controller";
import {UsersService} from "./application/users.service";
import {UsersQueryRepositorySql} from "./infrastructure/sql/users.query.repository.sql";
import {UsersRepositorySql} from "./infrastructure/sql/users.repository.sql";
import {UsersQueryRepository} from "./infrastructure/mongo/users.query.repository";
import {UsersRepository} from "./infrastructure/mongo/users.repository";



@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository,UsersQueryRepository,],
    exports: [UsersService]
})
export class UsersModule {
}

// @Module({
//     imports:[],
//     controllers:[],
//     providers:[],
//     exports:[]
// })
// export class Module{}
