import { Module } from '@nestjs/common';
import { PrintListController } from './printList.controller';
import { PrintListService } from './printList.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';



@Module({
  imports: [PrismaModule],
  controllers: [PrintListController],
  providers: [PrintListService, PrismaService],
  exports: [PrintListService],
})
export class PrintListModule {}
