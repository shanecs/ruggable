import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PrintListDimensionsDTO, PrintListNextResponseDTO, PrintListPlanItemDTO } from './printList.dto';
import { PrintListService } from './printList.service';
import { ROLE_WIDTH } from './printList.constants';

@ApiTags('printList')
@Controller('/printList')
export class PrintListController {
  constructor(private printListService: PrintListService) {}

  @Get('/next')
  async getAll(
    @Query('roll_length') roll_length: number,
    @Query('include_rush') include_rush: string
  ): Promise<PrintListNextResponseDTO> {
    const prioritizedPrintList = await this.printListService.prioritizedPrintList(include_rush);

    return getPlan(roll_length, prioritizedPrintList);
  }
}

const getPlan = (roll_length: number, prioritizedPrintList: PrintListPlanItemDTO[]): PrintListNextResponseDTO => {
  const plan: PrintListPlanItemDTO[] = prioritizedPrintList;
  let length: number = 0;

  let position: number = 1;
  let rug = findNextRug(plan, length, roll_length);
  while (rug) {
    const dimensions: PrintListDimensionsDTO = getDimensions(rug.size);
    rug.position = position;
    length += dimensions.length;

    let remainingWidth: number = ROLE_WIDTH - dimensions.width;
    let additionalRug: PrintListPlanItemDTO = getAdditionalPositionRug(plan, remainingWidth);
    while (additionalRug) {
      additionalRug.position = position
      remainingWidth -= getDimensions(additionalRug.size).width;
      additionalRug = getAdditionalPositionRug(plan, remainingWidth);
    }
    
    ++position;
    rug = findNextRug(plan, length, roll_length);
  }

  return {
    length,
    plan: plan
    .filter(rug => isFinite(rug.position))
    .sort(( a, b ) => a.position - b.position)
  };
}

const getDimensions = (size: string): PrintListDimensionsDTO => {
  const dimensions: number[] = size.split('x').map(dim => parseFloat(dim));
  const smallDimension: number = Math.min(...dimensions);
  const largeDimension: number = Math.max(...dimensions);

  if (largeDimension <= ROLE_WIDTH) {
    return { width: largeDimension, length: smallDimension };
  } else if (smallDimension <= ROLE_WIDTH) {
    return { width: smallDimension, length: largeDimension }    
  } else {
    throw 'ERR01: Rug dimensions are not printable.'
  }
}

const getAdditionalPositionRug = (plan: PrintListPlanItemDTO[], remainingWidth: number): PrintListPlanItemDTO => {
  return plan.find(plan => getDimensions(plan.size).width <= remainingWidth && isNaN(plan.position));
}

const findNextRug = (plan: PrintListPlanItemDTO[], length: number, roll_length: number): PrintListPlanItemDTO => {
  return plan.find(({ position, size }: PrintListPlanItemDTO) => isNaN(position) && length + getDimensions(size).length <= roll_length)
}