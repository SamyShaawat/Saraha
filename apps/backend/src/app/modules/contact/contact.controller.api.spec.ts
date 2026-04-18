import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactDto } from '@saraha/dto';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  const mockContactService = {
    handleContact: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        { provide: ContactService, useValue: mockContactService },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  describe('handleContact', () => {
    it('should call contact service using AAA', async () => {
      // Arrange
      const dto: ContactDto = { 
        name: 'Samy', 
        email: 'samy@test.com', 
        message: 'Hello' 
      };
      mockContactService.handleContact.mockResolvedValue({ success: true });

      // Act
      const result = await controller.handleContact(dto);

      // Assert
      expect(service.handleContact).toHaveBeenCalledWith(dto);
      expect(result.success).toBe(true);
    });
  });
});
