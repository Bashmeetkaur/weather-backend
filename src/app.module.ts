/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './users/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}), // Loads environment variables from .env
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    // Uses the MongoDB URI from .env
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

