import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

export type SocialProfile = {
  email: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class SocialAuthVerifier {
  private readonly googleClient = new OAuth2Client();

  async verifyGoogleToken(accessToken: string): Promise<SocialProfile> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: accessToken,
        audience: process.env['GOOGLE_CLIENT_ID'],
      });
      const payload = ticket.getPayload();
      if (!payload?.email) {
        throw new UnauthorizedException('Google account email is missing');
      }

      return {
        email: payload.email.toLowerCase(),
        firstName: payload.given_name ?? 'Google',
        lastName: payload.family_name ?? 'User',
      };
    } catch {
      const tokenInfo = await this.googleClient.getTokenInfo(accessToken).catch(() => null);
      if (!tokenInfo?.email) {
        throw new UnauthorizedException('Invalid Google token');
      }
      return {
        email: tokenInfo.email.toLowerCase(),
        firstName: 'Google',
        lastName: 'User',
      };
    }
  }

  async verifyFacebookToken(accessToken: string): Promise<SocialProfile> {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${encodeURIComponent(
        accessToken,
      )}`,
    );

    if (!response.ok) {
      throw new UnauthorizedException('Invalid Facebook token');
    }

    const payload = (await response.json()) as {
      email?: string;
      first_name?: string;
      last_name?: string;
      name?: string;
    };

    if (!payload.email) {
      throw new UnauthorizedException('Facebook account email is missing');
    }

    if (payload.first_name || payload.last_name) {
      return {
        email: payload.email.toLowerCase(),
        firstName: payload.first_name ?? 'Facebook',
        lastName: payload.last_name ?? 'User',
      };
    }

    const fullName = payload.name?.trim() ?? 'Facebook User';
    const [firstName, ...rest] = fullName.split(' ');
    return {
      email: payload.email.toLowerCase(),
      firstName: firstName || 'Facebook',
      lastName: rest.join(' ') || 'User',
    };
  }
}
