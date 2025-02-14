import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDecorator } from 'src/user.decorator';
import { User } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor(`file`))
  uploadFile(@UploadedFile() file: Express.Multer.File, @UserDecorator() user: User) {
    if (file == null) throw new BadRequestException("File tidak boleh kosong!!")
    return this.profileService.uploadFile(file, user.id);
  }

  @Get("/:id")
  async getProfile(@Param("id") id: number, @Res() res: Response) {
    const filename = await this.profileService.sendMyFotoProfile(id)
    return res.sendFile('../../uploads/' + filename)
  }
}
