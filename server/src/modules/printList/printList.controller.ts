import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PrintListNextResponseDTO } from './printList.dto';
import { PrintListService } from './printList.service';
import { ROLE_WIDTH } from './printList.constants';

@ApiTags('printList')
@Controller('/printList')
export class PrintListController {
  constructor(private printListService: PrintListService) {}

  @Get('/next')
  async getAll(
    @Query('roll_length') length: number,
    @Query('include_rush') include_rush: string
  ): Promise<PrintListNextResponseDTO> {
    const prioritizedPrintList = await this.printListService.prioritizedPrintList(include_rush);

    return {
      length,
      plan: prioritizedPrintList.map((item, index) => ({ position: index+1, ...item })),
    }
  }
}
