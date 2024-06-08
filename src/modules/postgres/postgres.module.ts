import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConnectService } from './posrgres-conect.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConnectService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class PostgresModule {}
