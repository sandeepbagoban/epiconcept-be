import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('tenant')
@UseGuards(JwtAuthGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('settings')
  getTenantSettings(@Req() req) {
    const tenantId = req.user.tenantId; // from JWT
    return this.tenantService.findByTenantId(tenantId);
  }
}
