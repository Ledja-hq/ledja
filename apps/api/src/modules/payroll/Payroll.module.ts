import { Module } from '@nestjs/common';
import { PayrollService } from './PayrollService.service';
import { PayrollController } from './Payroll.controller';

@Module({
  imports: [],
  providers: [PayrollService],
  controllers: [PayrollController],
  exports: [PayrollService],
})
export class PayrollModule {}
