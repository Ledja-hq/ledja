import { Module } from '@nestjs/common';
import { InventoryService } from './InventoryService.service';
import { InventoryController } from './Inventory.controller';

@Module({
  imports: [],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
