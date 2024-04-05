import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NotAcceptableException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {HttpExceptionFilter} from "../exception-filters/http.exception.filter";

export const AUTH_METHODS = {
    base: "Basic",
    bearer: "Bearer"
};

@Injectable()
export class AdminAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.header("authorization")?.split(" "); // Получаем значение поля в заголовке
        if (authHeader) {
            const authMethod = authHeader[0]; // получаем метод из заголовка
            const authInput = authHeader[1]; // получаем значение для авторизации из заголовка
            if (authMethod === AUTH_METHODS.base) {  // If authorisation method is BASE64
                const auth = btoa(`${"admin"}:${"qwerty"}`); // кодируем наши логин и пароль в basic64
                if (authInput === auth){
                    return true
                }else{
                throw new HttpException("Bad login or password", HttpStatus.UNAUTHORIZED)
            }
            }
        }else{
            throw new HttpException("Bad login or password", HttpStatus.UNAUTHORIZED)
        }
    }
}