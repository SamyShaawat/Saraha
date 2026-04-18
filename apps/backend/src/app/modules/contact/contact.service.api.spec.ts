import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { ContactDto } from '@saraha/dto';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  describe('handleContact', () => {
    it('should process contact submission using AAA', async () => {
      // Arrange
      const dto: ContactDto = { 
        name: 'Samy', 
        email: 'samy@test.com', 
        message: 'Great app!' 
      };

      // Act
      const result = await service.handleContact(dto);

      // Assert
      expect(result.success).toBe(true);
      expect(result.message).toContain('received');
    });
  });
});
