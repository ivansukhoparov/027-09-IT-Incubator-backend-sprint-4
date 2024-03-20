import dotenv from 'dotenv';

dotenv.config();

export type EnvironmentVariable = { [key: string]: string | undefined };
export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'TESTING';
export const Environments = ['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'TESTING'];

export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    return this.env === 'DEVELOPMENT';
  }

  isTesting() {
    return this.env === 'TESTING';
  }
}

class APISettings {
  // Application
  public readonly APP_PORT: number;

  // Database
  public readonly MONGO_CONNECTION_URI: string;
  public readonly MONGO_DB_NAME: string;

  // Email sender
  EMAIL_SERVICE: string = 'gmail';
  EMAIL_LOGIN: string;
  EMAIL_PASSWORD: string;
  SEND_EMAIL_FROM: string = '"Pan-Pal" <no-reply@panpal.com>';

  // Tokens
  REFRESH_TOKEN_EXPIRATION_TIME = '30d';
  ACCESS_TOKEN_EXPIRATION_TIME = '30d';
  RECOVERY_TOKEN_EXPIRATION_TIME = '30d';

  constructor(private readonly envVariables: EnvironmentVariable) {
    // Application
    this.APP_PORT = this.getNumberOrDefault(envVariables.APP_PORT, 7840);

    // Database
    this.MONGO_CONNECTION_URI =
      envVariables.MONGO_CONNECTION_URI ?? 'mongodb://localhost/nest';

    // Email sender
    this.EMAIL_LOGIN = envVariables.EMAIL_LOGIN;
    this.EMAIL_PASSWORD = envVariables.EMAIL_PASSWORD;
  }

  private getNumberOrDefault(value: string, defaultValue: number): number {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return defaultValue;
    }

    return parsedValue;
  }
}

class AppSettings {
  constructor(
    public env: EnvironmentSettings,
    public api: APISettings,
  ) {}
}

const env = new EnvironmentSettings(
  (Environments.includes(process.env.ENV?.trim())
    ? process.env.ENV.trim()
    : 'DEVELOPMENT') as EnvironmentsTypes,
);

const api = new APISettings(process.env);
export const appSettings = new AppSettings(env, api);
