import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';



@Module({
  imports: [AuthModule, UserModule, PrismaModule,JwtModule, OrderModule,
  
  ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
