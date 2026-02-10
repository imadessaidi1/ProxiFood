import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('social/google')
  googleSocial(@Body() body: { token: string }) {
    return this.issueTokens('google', body.token);
  }

  @Post('social/facebook')
  facebookSocial(@Body() body: { token: string }) {
    return this.issueTokens('facebook', body.token);
  }

  @Post('start')
  startOtp(@Body() body: { email?: string; phone?: string }) {
    return {
      challengeId: `otp_${Date.now()}`,
      destination: body.email || body.phone,
      status: 'sent',
    };
  }

  @Post('verify')
  verifyOtp(@Body() body: { challengeId: string; code: string }) {
    return this.issueTokens('otp', `${body.challengeId}:${body.code}`);
  }

  private issueTokens(provider: string, raw: string) {
    return {
      provider,
      accessToken: Buffer.from(`${provider}:${raw}:access`).toString('base64url'),
      refreshToken: Buffer.from(`${provider}:${raw}:refresh`).toString('base64url'),
      expiresIn: 3600,
    };
  }
}
