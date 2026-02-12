import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // checks username/password
  @Post('login')
  async login(@Request() req, @Res() res: express.Response) {
    const token = await this.authService.login(req.user.id, req.user.tenantId);

    res.setHeader('Authorization', `Bearer ${token}`);
    res.setHeader('X-Tenant-Id', req.user.tenantId);

    return res.status(200).json({
      message: 'Login successful',
      tenantId: req.user.tenantId,
      access_token: token,
      email: req.user.email,
    });
  }
}
