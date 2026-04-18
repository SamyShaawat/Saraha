import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DataAccessModule } from '@saraha/data-access';

@Module({
  imports: [DataAccessModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
