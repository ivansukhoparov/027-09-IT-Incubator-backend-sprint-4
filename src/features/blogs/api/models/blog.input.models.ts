import {IsStringLength} from "../../../../infrastructure/decorators/validate/is.string.length";
import {IS_URL, IsUrl} from "class-validator";

export class CreateBlogInputModels {
    @IsStringLength(0,15)
    name: string;

    @IsStringLength(0,500)
    description: string;

    @IsStringLength(0,100)
    @IsUrl()
    websiteUrl: string;
}

export class UpdateBlogInputModel extends CreateBlogInputModels{

}