import { PrintListController } from './printList.controller';
import { PrintListService } from './printList.service';
import { Test, TestingModule } from '@nestjs/testing';


describe('PrintListController', () => {
  let _app: TestingModule;

  beforeAll(async () => {
    _app = await Test.createTestingModule({
      controllers: [PrintListController],
      providers: [PrintListService],
    }).compile();
  });

  describe('getNext', () => {
    it('then is should be true', () => {
      jest.spyOn(PrintListService, 'prioritizedPrintList').mockImplementation(() => []);

      expect(await PrintListController.getNext()).toBe([]);
    });  
  });
});
