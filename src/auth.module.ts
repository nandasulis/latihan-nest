import { Global, Module } from "@nestjs/common";
import { AppService } from "./app.service";
import PrismaService from "./prisma";
@Global()
@Module({
    imports: [
    ],
    providers: [AppService, PrismaService],
    exports: [AppService, PrismaService]
})
export class AuthModule {
}
