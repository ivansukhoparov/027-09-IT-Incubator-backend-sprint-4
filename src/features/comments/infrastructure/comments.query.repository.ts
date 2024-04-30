import {BadGatewayException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CommentDocument, Comments} from './comments.schema';
import {commentMapper} from '../types/mapper';
import {LikesInfoType} from "../types/output";
import {LikeStatusType} from "../types/input";

@Injectable()
export class CommentsQueryRepository {
    constructor(
        @InjectModel(Comments.name) private commentModel: Model<Comments>,
    ) {
    }

    async getById(id: string) {

        try {
            const comment: CommentDocument = await this.commentModel.findById(id);
            //const likes:LikesInfoType = await this.getLikes(commentId, userId);
            const likes: LikesInfoType = {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None"
            }
            const result = commentMapper(comment, likes);
            if (comment) return result
            else throw new NotFoundException();
        } catch (err) {
            throw new BadGatewayException();
        }

    }
}
