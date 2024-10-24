import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClsModule } from 'nestjs-cls';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaModule } from './schema/schema.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
    AuthModule,
    UserModule,
    SchemaModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
