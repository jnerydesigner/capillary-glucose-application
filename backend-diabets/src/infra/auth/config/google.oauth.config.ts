import { ConfigService, registerAs } from '@nestjs/config';

const config = new ConfigService();

export default registerAs('googleOAUTH', () => ({
  clientID: config.get('GOOGLE_OAUTH_CLIENT_ID'),
  clientSecret: config.get('GOOGLE_OAUTH_SECRET'),
  callbackURL: config.get('GOOGLE_OAUTH_CALLBACK_URL'),
}));
