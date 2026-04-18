import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@saraha/data-access';
import { Prisma } from '@prisma/client';
import { SendMessageDto, ToggleMessageStatusDto, MessageQueryDto, MessageFilter } from '@saraha/dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(username: string, dto: SendMessageDto, ipAddress?: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User @${username} not found`);
    }

    // TODO: Implement rate limiting check here using ipAddress

    return this.prisma.message.create({
      data: {
        content: dto.content,
        ipAddress,
        receiverId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
  }

  async getMessages(userId: string, query: MessageQueryDto) {
    const { filter, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.MessageWhereInput = { receiverId: userId };

    if (filter === MessageFilter.FAVORITES) {
      where.isFavorite = true;
    } else if (filter === MessageFilter.PUBLIC) {
      where.isPublic = true;
    }

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.message.count({ where }),
    ]);

    return {
      data: messages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async toggleFavorite(userId: string, messageId: string, dto: ToggleMessageStatusDto) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new NotFoundException('Message not found');
    if (message.receiverId !== userId) throw new ForbiddenException('You do not own this message');

    return this.prisma.message.update({
      where: { id: messageId },
      data: { isFavorite: dto.value },
    });
  }

  async togglePublic(userId: string, messageId: string, dto: ToggleMessageStatusDto) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new NotFoundException('Message not found');
    if (message.receiverId !== userId) throw new ForbiddenException('You do not own this message');

    return this.prisma.message.update({
      where: { id: messageId },
      data: { isPublic: dto.value },
    });
  }

  async deleteMessage(userId: string, messageId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new NotFoundException('Message not found');
    if (message.receiverId !== userId) throw new ForbiddenException('You do not own this message');

    await this.prisma.message.delete({
      where: { id: messageId },
    });

    return { success: true };
  }

  async getPublicMessages(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new NotFoundException(`User @${username} not found`);

    return this.prisma.message.findMany({
      where: {
        receiverId: user.id,
        isPublic: true,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
  }
}
