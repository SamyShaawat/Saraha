import { Injectable } from '@nestjs/common';
import { ContactDto } from '@saraha/dto';

@Injectable()
export class ContactService {
  async handleContact(dto: ContactDto) {
    // In a real app, you'd send an email here using a service like Nodemailer, SendGrid, etc.
    console.log('New Contact Submission:', dto);
    
    // Simulate email sending
    return { 
      success: true, 
      message: 'Your message has been received. Our team will contact you soon.' 
    };
  }
}
