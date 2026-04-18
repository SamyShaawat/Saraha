import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactDto } from '@saraha/dto';

class ContactServiceFixture {
  public lastDto: ContactDto | null = null;

  async handleContact(dto: ContactDto) {
    this.lastDto = dto;
    return { success: true };
  }
}

describe('ContactController', () => {
  let controller: ContactController;
  let fixture: ContactServiceFixture;

  beforeEach(async () => {
    fixture = new ContactServiceFixture();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        { provide: ContactService, useValue: fixture },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  describe('handleContact', () => {
    it('should call contact service using AAA', async () => {
      // Arrange
      const dto: ContactDto = { 
        name: 'Samy', 
        email: 'samy@test.com', 
        message: 'Hello' 
      };

      // Act
      const result = await controller.handleContact(dto);

      // Assert
      expect(fixture.lastDto).toEqual(dto);
      expect(result.success).toBe(true);
    });
  });
});
