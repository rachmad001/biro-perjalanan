import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PhotoActivityService } from './photo_activity.service';
import { CreatePhotoActivityDto } from './dto/create-photo_activity.dto';
import { UpdatePhotoActivityDto } from './dto/update-photo_activity.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from 'src/config/file-upload.config';

@Controller('photo-activity')
export class PhotoActivityController {
  constructor(private readonly photoActivityService: PhotoActivityService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5, fileUploadConfig('photo-activities', 5)))
  create(
    @Body() createPhotoActivityDto: CreatePhotoActivityDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const data: Array<CreatePhotoActivityDto> = [];
    files.map(file => {
      const dto = new CreatePhotoActivityDto();
      dto.activity_travel_id = Number(createPhotoActivityDto.activity_travel_id);
      dto.path = file.path;
      data.push(dto);
    });
    return this.photoActivityService.create(data);
  }

  @Get()
  findAll() {
    return this.photoActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoActivityService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoActivityDto: UpdatePhotoActivityDto) {
  //   return this.photoActivityService.update(+id, updatePhotoActivityDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoActivityService.remove(+id);
  }
}
