import {Controller, Delete, Get, Param} from "@nestjs/common";


@Controller("security")
export class SecurityController{

    @Get("devices")
    async getAllActiveSessions(){}

    @Delete("devices")
    async terminateAllActiveSessions(){}

    @Delete("devices/:id")
    async terminateSessions(@Param() id:string){}
}