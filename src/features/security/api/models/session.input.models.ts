import {IsStringLength} from '../../../../infrastructure/decorators/validate/is.string.length';
import {IsMongoId, IsNotEmpty, IsString, Length} from 'class-validator';
import {Trim} from "../../../../infrastructure/decorators/transform/trim";
import {IsBlogExist} from "../../../../infrastructure/decorators/validate/is.blog.exist";
import {Prop} from "@nestjs/mongoose";

export class SessionModel {
    userId: string
    deviceId: string
    deviceTitle: string
    ip: string
    lastActiveDate: number
    refreshToken: {
        createdAt: number
        expiredAt: number
    }
}

export class SessionUpdateModel {
    lastActiveDate: number
    refreshToken: {
        createdAt: number
        expiredAt: number
    }
}

export class SessionInputModel {
    deviceTitle: string
    ip: string
}
