import {Injectable} from "@nestjs/common";
import {AuthService} from "../../features/auth/application/auth.service";
import {UsersService} from "../../features/users/application/users.service";
import {UsersQueryRepository} from "../../features/users/infrastructure/users.query.repository";


@Injectable()
export class TestBaseClass{
    constructor(protected users:UsersQueryRepository) {

    }

}