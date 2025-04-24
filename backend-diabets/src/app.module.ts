import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppService } from './application/services/app.service';
import { ConfigModule } from '@nestjs/config';

import { CapillaryBloodGlucoseModule } from './capillaryBloodGlucose/capillary-blood-glucose.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { AppController } from './presenters/app.controller';
import { UsersModule } from './infra/modules/users.module';

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
