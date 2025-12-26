import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PhotoTravelsService } from './photo_travels.service';
import { CreatePhotoTravelDto } from './dto/create-photo_travel.dto';
import { UpdatePhotoTravelDto } from './dto/update-photo_travel.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from 'src/config/file-upload.config';

@Controller('photo-travels')
export class PhotoTravelsController {
  constructor(private readonly photoTravelsService: PhotoTravelsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5, fileUploadConfig('photo-travels', 5)))
  create(
    @Body() createPhotoTravelDto: CreatePhotoTravelDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const data: Array<CreatePhotoTravelDto> = [];
    files.map(file => {
      const dto = new CreatePhotoTravelDto();
      dto.travel_id = Number(createPhotoTravelDto.travel_id);
      dto.path = file.path;
      data.push(dto);
    });
    return this.photoTravelsService.create(data);
  }

  @Get()
  findAll() {
    return this.photoTravelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoTravelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoTravelDto: UpdatePhotoTravelDto) {
    return this.photoTravelsService.update(+id, updatePhotoTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoTravelsService.remove(+id);
  }
}
