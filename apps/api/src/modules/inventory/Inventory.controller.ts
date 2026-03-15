import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryService } from './InventoryService.service';

// TODO: implement Inventory routes
@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
}
