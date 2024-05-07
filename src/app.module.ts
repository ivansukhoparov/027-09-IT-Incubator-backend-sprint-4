import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {controllers, providers, queryRepositories, repositories, services} from "./settings/app.module.imports";
import {mongoModels, mongoModule, throttleModule} from "./settings/app.module.for.features";


@Module({
    imports: [
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
    ],
})

export class AppModule {
}
