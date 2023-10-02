import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [],
})
export class ErrorModule {}
