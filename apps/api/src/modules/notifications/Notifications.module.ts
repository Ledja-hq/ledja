import { Module } from '@nestjs/common';
import { NotificationsService } from './NotificationsService.service';
import { NotificationsController } from './Notifications.controller';

@Module({
  imports: [],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
