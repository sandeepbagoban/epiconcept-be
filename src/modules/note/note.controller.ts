import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'; // adjust path if needed
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}


  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    return this.noteService.create(
      createNoteDto,
      req.user.id,
      req.user.tenantId,
    );
  }

  @Get()
  getAll(@Req() req) {
    return this.noteService.findAll(req.user.id, req.user.tenantId);
  }


  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.noteService.findOne(id, req.user.id, req.user.tenantId);
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ) {
    return this.noteService.update(
      id,
      updateNoteDto,
      req.user.id,
      req.user.tenantId,
    );
  }


  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.noteService.remove(id, req.user.id, req.user.tenantId);
  }
}
