import {UsersRepository} from '../infrastructure/users.repository';
import {CreateUserDto, UserType} from '../types/output';
import {BcryptAdapter} from '../../../common/adapters/bcrypt.adapter';
import {UserCreateInputModel} from '../api/models/user.create.input.model';
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UsersQueryRepositorySql} from "../infrastructure/sql/users.query.repository.sql";
import {UsersRepositorySql} from "../infrastructure/sql/users.repository.sql";

export class CreateUserCommand {
    login: string;
    password: string;
    email: string;
    isConfirmed: boolean = false

    constructor(inputModel: UserCreateInputModel) {
        this.login = inputModel.login;
        this.password = inputModel.password;
        this.email = inputModel.email;
    }
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly usersRepository: UsersRepositorySql,
        private readonly cryptAdapter: BcryptAdapter,
    ) {
    }

    async execute(command: CreateUserCommand) {
        const hash = await this.cryptAdapter.createHash(command.password);

        const newUserDto: CreateUserDto = {
            login: command.login,
            email: command.email,
            hash: hash,
            //    createdAt: new Date().toISOString(),
            isConfirmed: command.isConfirmed,
        };

        return await this.usersRepository.createUser(newUserDto);
    }
}
