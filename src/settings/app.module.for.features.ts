import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "../features/blogs/infrastructure/blogs.schema";
import {Post, PostSchema} from "../features/posts/infrastructure/posts.schema";
import {Comments, CommentSchema} from "../features/comments/infrastructure/comments.schema";
import {User, UserSchema} from "../features/users/infrastructure/users.schema";
import {
    CommentLikes,
    CommentLikesSchema,
    PostsLikes,
    PostsLikesSchema
} from "../features/likes/infrastructure/likes.schema";
import {RefreshTokenBlackList, RefreshTokenBlackListSchema} from "../features/auth/infrastructure/refresh.token.schema";
import {Session, SessionSchema} from "../features/security/infrastructure/session.schema";
import {appSettings} from "./app.settings";
import {ThrottlerModule} from "@nestjs/throttler";

export const mongoModels =    MongooseModule.forFeature([
    {
        name: Blog.name,
        schema: BlogSchema,
    },
    {
        name: Post.name,
        schema: PostSchema,
    },
    {
        name: Comments.name,
        schema: CommentSchema,
    },
    {
        name: User.name,
        schema: UserSchema,
    },
    {
        name: CommentLikes.name,
        schema: CommentLikesSchema,
    },
    {
        name: PostsLikes.name,
        schema: PostsLikesSchema,
    },
    {
        name: RefreshTokenBlackList.name,
        schema: RefreshTokenBlackListSchema,
    },
    {
        name: Session.name,
        schema: SessionSchema,
    },
])

export const mongoModule = MongooseModule.forRoot(
    appSettings.api.MONGO_CONNECTION_URI +
    '/' +
    appSettings.api.MONGO_DB_NAME,
)
export const throttleModule = ThrottlerModule.forRoot([
        {
            ttl: 10000,
            limit: 5000,
        },
    ])