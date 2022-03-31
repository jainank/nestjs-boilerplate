import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

const MONGODB_URI = 'mongo.uri';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static isDev: boolean;
  static host: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>('port');
    AppModule.host = this.configService.get<string>('host');
    AppModule.isDev = this.configService.get<string>('env') === 'development';
  }
}
