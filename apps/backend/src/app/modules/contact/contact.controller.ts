import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from '@saraha/dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  handleContact(@Body() dto: ContactDto) {
    return this.contactService.handleContact(dto);
  }
}
