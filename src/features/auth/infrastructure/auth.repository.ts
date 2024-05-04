import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {RefreshTokenBlackList, RefreshTokenBlackListDocument} from "./auth.schema";
import {Model} from "mongoose";

@Injectable()
export class AuthRepository{
    constructor(@InjectModel(RefreshTokenBlackList.name) private refreshTokenBlackListModel:Model<RefreshTokenBlackList>) {
    }

    async addRefreshTokenToBlackList(token:string){
        try{
            await this.refreshTokenBlackListModel.create({refreshToken:token})
            return true
        }catch{
            throw new Error()
        }
    }

    async findRefreshTokenInBlackList(token:string){
        try{
            const isInBlackList:RefreshTokenBlackListDocument = await this.refreshTokenBlackListModel.findOne({refreshToken:token})
            return !!isInBlackList
        }catch{
            throw new Error()
        }
    }

}