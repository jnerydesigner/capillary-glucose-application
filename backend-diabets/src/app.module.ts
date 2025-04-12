import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CapillaryBloodGlucoseModule } from './capillaryBloodGlucose/capillary-blood-glucose.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    CapillaryBloodGlucoseModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './uploads', // Diretório temporário para os arquivos
    }),
    UsersModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    UploadService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
