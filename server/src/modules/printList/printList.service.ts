import { BatchPayload } from 'prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PrintListService {
  constructor(private prisma: PrismaService) {}

  async prioritizedPrintList(includeRush: string = 'true'): Promise<any[]> {
    const components = await this.prisma.component.findMany({
      select: {
        id: true,
        size: true,
        line_item: {
          select: {
            sku: true,
            rush: true,
            order: {
              select: {
                order_date: true,
              }
            }
          }
        },
      },
      where: {
        status: 'Pending',
        line_item: {
          ...(!(/true/i).test(includeRush) && { rush: false }),
          order: {
            cancelled: false,
          },
        }
      },
    });

    return components
      .map( ({ line_item: { order, ...line_item }, ...component }) => ({ ...order, ...line_item, ...component }) )
      .sort(({ order_date: a }, { order_date: b }) => a.getTime() < b.getTime() ? -1 : a.getTime() > b.getTime() ? 1 : 0)
      .sort(({ rush: a }, { rush: b }) => a && b ? 0 : a && !b ? -1 : 1);
  }

  async updateComponentStatuses(id: number[], status: string): Promise<BatchPayload> {
    return await this.prisma.component.updateMany({
      where: {
        id: { in: id },
      },
      data: { status },
    });
  }
}
