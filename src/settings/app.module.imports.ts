import {AuthController} from "../features/auth/api/auth.controller";
import {UsersController} from "../features/users/api/users.controller";
import {BlogsController} from "../features/blogs/api/blogs.controller";
import {PostsController} from "../features/posts/api/posts.controller";
import {CommentsController} from "../features/comments/api/comments.controller";
import {TestingController} from "../features/testing/api/testing.controller";
import {SecurityController} from "../features/security/api/security.controller";
import {AuthService} from "../features/auth/application/auth.service";
import {UsersService} from "../features/users/application/users.service";
import {BlogsService} from "../features/blogs/application/blogs.service";
import {PostsService} from "../features/posts/application/posts.service";
import {TestingService} from "../features/testing/application/testing.service";
import {CommentsService} from "../features/comments/application/comments.service";
import {CommentsLikesService} from "../features/likes/application/comments.likes.service";
import {PostsLikesService} from "../features/likes/application/posts.likes.service";
import {SessionsService} from "../features/security/application/sessions.service";
import {UsersRepository} from "../features/users/infrastructure/mongo/users.repository";
import {BlogsRepository} from "../features/blogs/infrastructure/blogs.repository";
import {PostsRepository} from "../features/posts/infrastructure/posts.repository";
import {TestingRepository} from "../features/testing/infrastucture/testing.repository";
import {CommentsRepository} from "../features/comments/infrastructure/comments.repository";
import {CommentsLikesRepository} from "../features/likes/infrastructure/comments.likes.repository";
import {PostsLikesQueryRepository} from "../features/likes/infrastructure/posts.likes.query.repository";
import {PostsLikesRepository} from "../features/likes/infrastructure/posts.likes.repository";
import {SessionsRepository} from "../features/security/infrastructure/sessions.repository";
import {RefreshTokenRepository} from "../features/auth/infrastructure/refresh.token.repository";
import {UsersQueryRepository} from "../features/users/infrastructure/mongo/users.query.repository";
import {BlogsQueryRepository} from "../features/blogs/infrastructure/blogs.query.repository";
import {PostsQueryRepository} from "../features/posts/infrastructure/posts.query.repository";
import {CommentsQueryRepository} from "../features/comments/infrastructure/comments.query.repository";
import {CommentsLikesQueryRepository} from "../features/likes/infrastructure/commets.likes.query.repository";
import {SessionsQueryRepository} from "../features/security/infrastructure/sessions.query.repository";
import {EmailMessagesManager} from "../common/email/email.messages.manager";
import {EmailService} from "../common/email/email.service";
import {NodemailerAdapter} from "../common/adapters/nodemailer.adaper";
import {JwtTokenAdapter} from "../common/adapters/jwt.token.adapter";
import {BcryptAdapter} from "../common/adapters/bcrypt.adapter";
import {IsBlogExistConstraint} from "../infrastructure/decorators/validate/is.blog.exist";
import {CreateUserUseCase} from "../features/users/use.cases/create.user.use.case";
import {DeleteUserUseCase} from "../features/users/use.cases/delete.user.use.case";
import {GetAllUsersUseCase} from "../features/users/use.cases/get.all.users.use.case";
import {UsersQueryRepositorySql} from "../features/users/infrastructure/sql/users.query.repository.sql";
import {UsersRepositorySql} from "../features/users/infrastructure/sql/users.repository.sql";

export const controllers = [
    AuthController,

    BlogsController,
    PostsController,
    CommentsController,
    TestingController,
    SecurityController,
];
export const services = [
    AuthService,

    BlogsService,
    PostsService,
    TestingService,
    CommentsService,
    CommentsLikesService,
    PostsLikesService,
    SessionsService,
];
export const repositories = [
    UsersRepository,
    BlogsRepository,
    PostsRepository,
    TestingRepository,
    CommentsRepository,
    CommentsLikesRepository,
    PostsLikesQueryRepository,
    PostsLikesRepository,
    SessionsRepository,
];
export const queryRepositories = [
    RefreshTokenRepository,

    BlogsQueryRepository,
    PostsQueryRepository,
    CommentsQueryRepository,
    CommentsLikesQueryRepository,
    SessionsQueryRepository,
];
export const providers = [
    EmailMessagesManager,
    EmailService,
    NodemailerAdapter,
    JwtTokenAdapter,
    BcryptAdapter,
    IsBlogExistConstraint,
];

export const useCases = [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetAllUsersUseCase,
];