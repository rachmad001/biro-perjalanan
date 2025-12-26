import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PhotoHotelsService } from './photo_hotels.service';
import { CreatePhotoHotelDto } from './dto/create-photo_hotel.dto';
import { UpdatePhotoHotelDto } from './dto/update-photo_hotel.dto';
import { fileUploadConfig } from 'src/config/file-upload.config';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('photo-hotels')
export class PhotoHotelsController {
  constructor(private readonly photoHotelsService: PhotoHotelsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5, fileUploadConfig('photo-hotels', 5)))
  create(
    @Body() createPhotoHotelDto: CreatePhotoHotelDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const data: Array<CreatePhotoHotelDto> = [];
    files.map(file => {
      const dto = new CreatePhotoHotelDto();
      dto.hotels_id = Number(createPhotoHotelDto.hotels_id);
      dto.path = file.path;
      data.push(dto);
    });
    return this.photoHotelsService.create(data);
  }

  @Get()
  findAll() {
    return this.photoHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoHotelsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoHotelDto: UpdatePhotoHotelDto) {
  //   return this.photoHotelsService.update(+id, updatePhotoHotelDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoHotelsService.remove(+id);
  }
}
