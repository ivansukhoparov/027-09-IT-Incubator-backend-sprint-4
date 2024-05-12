import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {
    controllers,
    providers,
    queryRepositories,
    repositories,
    services,
    useCases
} from "./settings/app.module.imports";
import {mongoModels, mongoModule, throttleModule} from "./settings/app.module.for.features";
import {CqrsModule} from "@nestjs/cqrs";


@Module({
    imports: [
        CqrsModule,
        mongoModule,
        throttleModule,
        mongoModels,
    ],
    controllers: [AppController, ...controllers],
    providers: [
        AppService,
        ...queryRepositories,
        ...repositories,
        ...services,
        ...providers,
        ...useCases,
    ],
})

export class AppModule {
}
