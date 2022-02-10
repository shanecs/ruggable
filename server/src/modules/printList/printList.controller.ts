import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PrintListService } from './printList.service';
import { PrintListNextResponseDTO, PrintListPlanItemDTO } from './printList.dto';
import { getPlan } from './printList.helpers';
import { UPDATE_COMPONENT_STATUS } from '../../shared/toggles/printList';

@ApiTags('printList')
@Controller('/printList')
export class PrintListController {
  constructor(private printListService: PrintListService) {}

  @Get('/next')
  async getNext(
    @Query('roll_length') roll_length: number,
    @Query('include_rush') include_rush: string
  ): Promise<PrintListNextResponseDTO> {
    // Get prioritized print list
    const prioritizedPrintList: PrintListPlanItemDTO[] = await this.printListService.prioritizedPrintList(include_rush);
    const plan: PrintListNextResponseDTO = getPlan(roll_length, prioritizedPrintList);

    // Update component statuses
    if (UPDATE_COMPONENT_STATUS) {
      const componentIds: number[] = plan.plan.map(({ id }) => id);
      await this.printListService.updateComponentStatuses(componentIds, 'Printing');
    }

    return plan;
  }
}
