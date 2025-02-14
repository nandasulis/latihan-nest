import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entity/user.entity';
import { Response } from 'express';
import { UserDecorator } from './user.decorator';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Post("register")
  @ApiBody({ type: RegisterUserDTO })
  register(@Body() user: RegisterUserDTO) {
    return this.appService.register(user)
  }

  @Post("login")
  @ApiBody({
    type: RegisterUserDTO
  })

  async login(@Body() data: RegisterUserDTO,
    @Res({ passthrough: true }) res: Response) {
    const result = await this.appService.login(data)
    res.cookie("token", result.token)

    result.user = plainToInstance(User, { ...result.user, foto_profile: result.user.foto_profile || '' })

    return result
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("mahasiswa")
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }

  @Get("mahasiswa/:nim")
  getMahasiswaByNim(@Param("nim") nim: string) {
    return this.appService.getMahasiswByNim(nim)

  }

  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user: User) {
    return user
  }


  @Post("mahasiswa")
  @ApiBody({ type: CreateMahasiswaDTO })
  createMahasiswa(@Body() data: CreateMahasiswaDTO) {
    return this.appService.addMahasiswa(data)
  }

  @Delete("mahasiswa/:nim")
  deleteMahasiswa(@Param("nim") nim: string) {
    return this.appService.menghapusMahasiswa(nim)
  }

  @Put("mahasiswa/:nim")
  @ApiBody({ type: CreateMahasiswaDTO })
  updateMahasiswa(@Param("nim") nim: string, @Body() data: CreateMahasiswaDTO) {
    return this.appService.updateMahasiswa(nim, data)
  }

  @Get('mahasiswa/search')
  async searchMahasiswa(@Query('nim') nim?: string) {
    return this.appService.searchMahasiswa(nim);
  }

  @Post('mahasiswa/:nim/upload')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  
  @UseInterceptors(FileInterceptor(`file`))
  async uploadMahasiswaFoto(@UploadedFile() file: Express.Multer.File, @Param('nim') nim: string) {
    if (!file) throw new BadRequestException('File tidak boleh kosong');
    return this.appService.uploadMahasiswaFoto(file, nim);
  }

  @Get('mahasiswa/:nim/foto')
  async getMahasiswaFoto(@Param('nim') nim: string, @Res() res: Response) {
    const filename = await this.appService.getMahasiwaFoto(nim);
    return res.sendFile(filename, { root: 'uploads' });
  }
}