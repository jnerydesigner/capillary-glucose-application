import { ReportsModule } from './reports.module';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { AppService } from '../../application/services/app.service';
import { ConfigModule } from '@nestjs/config';

import { CapillaryBloodGlucoseModule } from './capillary-blood-glucose.module';
import { UploadController } from '../../presenters/upload.controller';
import { UploadService } from '../../application/services/upload.service';

import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth.module';

import { UsersModule } from './users.module';
import { AppController } from '@app/presenters/app.controller';
import { UploadModule } from './upload.module';

@Module({
  imports: [
    ReportsModule,
    CapillaryBloodGlucoseModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './uploads',
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
