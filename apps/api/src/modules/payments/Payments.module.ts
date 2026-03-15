import { Module } from '@nestjs/common';
import { PaymentsService } from './Payments.service';
import { PaymentsController } from './Payments.controller';

@Module({
  imports: [],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
