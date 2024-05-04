import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Res, Get, Req, UnauthorizedException,
} from '@nestjs/common';
import {UserConfirmationCodeDto} from '../types/input';
import {AuthService} from '../application/auth.service';
import {UserCreateInputModel} from '../../users/api/models/user.create.input.model';
import {LoginInputModel, UserEmailDto} from './models/login.input.model';
import {Response, Request} from 'express';
import {SkipThrottle, ThrottlerGuard} from "@nestjs/throttler";
import {AuthGuard} from "../../../infrastructure/guards/admin-auth-guard.service";
import {RefreshTokenService} from "../../../common/token.services/refresh.token.service";
import {tokenServiceCommands} from "../../../common/token.services/utils/common";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {AccessTokenService} from "../../../common/token.services/access.token.service";

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
    constructor (protected authService: AuthService,
                protected usersQueryRepository:UsersQueryRepository) {
    }

    @SkipThrottle()
    @Get("me")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMe(@Req() req:Request) {
        try {
            const authHeader = req.header('authorization')?.split(' ');
            const token = new AccessTokenService(
                tokenServiceCommands.set,
                authHeader[1],
            );
            const userId = token.decode().userId;
            return this.usersQueryRepository.getUserAuthMe(userId)
        } catch {
            throw new UnauthorizedException()
        }

    }

    @Post('registration')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registration(@Body() registrationDto: UserCreateInputModel) {
        const isSuccess = await this.authService.registerUser(registrationDto);
        if (isSuccess) return;
    }

    @Post('registration-confirmation')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationConfirmation(
        @Body() confirmationCode: UserConfirmationCodeDto,
    ) {
        const isSuccess = await this.authService.confirmEmail(confirmationCode);
        if (isSuccess) return;
    }

    @Post('registration-email-resending')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationEmailResending(@Body() resendingRequestDto: UserEmailDto) {
        const isSuccess =
            await this.authService.resendConfirmationCode(resendingRequestDto);
        if (isSuccess) return;
    }

    @Post("password-recovery")
    async getPasswordRecoveryToken() {
    }

    @Post("new-password")
    async setNewPassword() {
    }

    @SkipThrottle()
    @Post("refresh-token")
    @HttpCode(HttpStatus.OK)
    async getNewRefreshToken(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        try {
            const {accessToken, refreshToken} =
                await this.authService.refreshTokens(req.cookies.refreshToken)
            res.cookie('refreshToken', refreshToken.get(), {
                httpOnly: true,
                secure: true,
            });
            return accessToken.getModel();
        } catch {
            throw new UnauthorizedException()
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Res({passthrough: true}) res: Response,
        @Body() loginDto: LoginInputModel,
    ) {
        const {accessToken, refreshToken} =
            await this.authService.loginUser(loginDto);
        res.cookie('refreshToken', refreshToken.get(), {
            httpOnly: true,
            secure: true,
        });
        return accessToken.getModel();
    }

    @SkipThrottle()
    @Post("logout")
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        try {
            const refreshToken = new RefreshTokenService(tokenServiceCommands.set, req.cookies.refreshToken)
            if (!refreshToken.verify())  throw new UnauthorizedException()
            return
        } catch {
            throw new UnauthorizedException()
        }
    }

}
