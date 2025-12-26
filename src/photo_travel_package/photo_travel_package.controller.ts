import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Res, BadRequestException, Req } from '@nestjs/common';
import { PhotoTravelPackageService } from './photo_travel_package.service';
import { CreatePhotoTravelPackageDto } from './dto/create-photo_travel_package.dto';
import { UpdatePhotoTravelPackageDto } from './dto/update-photo_travel_package.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from 'src/config/file-upload.config';

@Controller('photo-travel-package')
export class PhotoTravelPackageController {
  constructor(private readonly photoTravelPackageService: PhotoTravelPackageService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5, fileUploadConfig('photo-travel-packages', 5)))
  create(
    @Body() createPhotoTravelPackageDto: CreatePhotoTravelPackageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const data: Array<CreatePhotoTravelPackageDto> = [];
    files.map(file => {
      const dto = new CreatePhotoTravelPackageDto();
      dto.travel_package_id = Number(createPhotoTravelPackageDto.travel_package_id);
      dto.path = file.path;
      data.push(dto);
    });
    return this.photoTravelPackageService.create(data);
  }

  @Get()
  findAll() {
    return this.photoTravelPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoTravelPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoTravelPackageDto: UpdatePhotoTravelPackageDto) {
    return this.photoTravelPackageService.update(+id, updatePhotoTravelPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    console.log('User making delete request:', req.user);
    return this.photoTravelPackageService.remove(+id, req.user.email);
  }
}
