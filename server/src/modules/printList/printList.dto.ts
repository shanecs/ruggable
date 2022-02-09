import { component } from '@prisma/client';

export class PrintListNextResponseDTO {
  length: number;
  plan: PrintListPlanItemDTO[];
  component?: component[];
}

export class PrintListPlanItemDTO {
  id: number;
  position: number;
  size: string;
  order_date: string;
  sku: string;
  rush: boolean;
}

export class PrintListDimensionsDTO {
  width: number;
  length: number;
}
