import { PrintListDimensionsDTO, PrintListNextResponseDTO, PrintListPlanItemDTO } from './printList.dto';
import { ROLE_WIDTH } from './printList.constants';

const getPlan = (roll_length: number, prioritizedPrintList: PrintListPlanItemDTO[]): PrintListNextResponseDTO => {
  const plan: PrintListPlanItemDTO[] = prioritizedPrintList;
  let length: number = 0;

  let position: number = 1;
  let rug = findNextRug(plan, roll_length, ROLE_WIDTH);
  
  //  Rows
  while (rug) {
    let remainingWidth: number = ROLE_WIDTH;
    let longestLength: number = 0;

    // Columns
    while (rug) {
      const dimensions: PrintListDimensionsDTO = getDimensions(rug.size);
      rug.position = position;
      remainingWidth -= getDimensions(rug.size).width;
      longestLength = Math.max(longestLength, dimensions.length);
      rug = findNextRug(plan, roll_length - length, remainingWidth);
    }

    length += longestLength;
    ++position;
    rug = findNextRug(plan, roll_length - length, ROLE_WIDTH);
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

const findNextRug = (plan: PrintListPlanItemDTO[], remainingLength: number, remainingWidth: number): PrintListPlanItemDTO => {
  return plan.find(({ position, size }: PrintListPlanItemDTO) => {
    const { length, width } = getDimensions(size);
    return isNaN(position) && length <= remainingLength && width <= remainingWidth;
  });
}

export {
  getPlan,
};
