import { Module } from '@nestjs/common';
import { PrintListController } from './printList.controller';
import { PrintListListener } from './printList.listener';
import { PrintListService } from './printList.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';



@Module({
  imports: [PrismaModule],
  controllers: [PrintListController],
  providers: [PrintListService, PrismaService, PrintListListener],
  exports: [PrintListService],
})
export class PrintListModule {}
