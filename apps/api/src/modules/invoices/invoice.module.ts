import { Module } from '@nestjs/common';
import { InvoicesService } from './invoicesService.service';
import { InvoicesController } from './invoice.controller';

@Module({
  imports: [],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [InvoicesService],
})
export class InvoicesModule {}
