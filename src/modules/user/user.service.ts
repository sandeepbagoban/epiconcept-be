import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //   const hash = await bcrypt.hash(createUserDto.password, 10);

  //   const user = this.userRepo.create({
  //     ...createUserDto,
  //     password: hash,
  //   });

  //   return this.userRepo.save(user);
  // }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async findOne(id: string) {
    return this.userRepo.findOne({
      where: { id },
    });
  }
}
