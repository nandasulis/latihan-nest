import { Global, Module } from "@nestjs/common";
import { AppService } from "./app.service";
import PrismaService from "./prisma";
import { JwtModule } from "@nestjs/jwt";
@Global()
@Module({
    imports: [
    ],
    providers: [AppService, PrismaService],
    exports: [AppService, PrismaService]
})
export class AuthModule {
}
