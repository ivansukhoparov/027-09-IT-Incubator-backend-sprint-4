import {UserOutputDto, UserOutputMeType} from "../../types/output";

export interface IUsersQueryRepository {

  getById(id: string) :Promise<UserOutputDto>

  getUserAuthMe(id: string) :Promise<UserOutputMeType>

}
