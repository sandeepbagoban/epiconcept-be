import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/entities/tenant/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async findByTenantId(tenantId: string) {
    return this.tenantRepository.findOne({
      where: { id: tenantId },
      relations: ['settings'],
    });
  }
}
