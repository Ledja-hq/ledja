import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PayrollService } from './PayrollService.service';

// TODO: implement Payroll routes
@ApiTags('payroll')
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}
}
