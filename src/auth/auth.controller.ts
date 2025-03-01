/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  role: string;
  _id: string;
}

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google login redirect
  }
  
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as GoogleUser; // Telling TypeScript what the user looks like
  
    if (!user) {
      console.error('User not found in request');
      return res.redirect('http://localhost:3001/login?error=NoUser');
    }
  
    const frontendURL = `http://localhost:3001/dashboard?firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`;
    return res.redirect(frontendURL);
  }
}


