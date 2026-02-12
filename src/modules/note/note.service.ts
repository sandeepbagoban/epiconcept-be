import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/entities/note/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string, tenantId: string) {
    const note = this.noteRepository.create({
      ...createNoteDto,
      userId,
      tenantId,
    });

    return await this.noteRepository.save(note);
  }

  async findAll(userId: string, tenantId: string) {
    return await this.noteRepository.find({
      where: {
        userId,
        tenantId,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string, tenantId: string) {
    const note = await this.noteRepository.findOne({
      where: { id, userId, tenantId },
    });

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
    tenantId: string,
  ) {
    const note = await this.findOne(id, userId, tenantId);

    Object.assign(note, updateNoteDto);

    return await this.noteRepository.save(note);
  }

  async remove(id: string, userId: string, tenantId: string) {
    const note = await this.findOne(id, userId, tenantId);

    await this.noteRepository.remove(note);

    return { message: 'Note deleted successfully' };
  }
}
