import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ForTurisService } from './for_turis.service';
import { CreateForTurisDto } from './dto/create-for_turis.dto';
import { UpdateForTurisDto } from './dto/update-for_turis.dto';

@Controller('for-turis')
export class ForTurisController {
  constructor(private readonly forTurisService: ForTurisService) {}

  @Get('travel-packages')
  findAllTravel() {
    return this.forTurisService.findAllTravel();
  }

  @Get('history')
  history(@Req() req) {
    return this.forTurisService.history(req.user.id);
  }

  // @Post()
  // create(@Body() createForTurisDto: CreateForTurisDto) {
  //   return this.forTurisService.create(createForTurisDto);
  // }

  // @Get()
  // findAll() {
  //   return this.forTurisService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.forTurisService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateForTurisDto: UpdateForTurisDto) {
  //   return this.forTurisService.update(+id, updateForTurisDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.forTurisService.remove(+id);
  // }
}
