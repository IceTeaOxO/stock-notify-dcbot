// discord/discord.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';


@ApiTags('api')
@Controller('api')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}


  @Get('ping')
    async ping(): Promise<string> {
        return 'pong';
    }

  @Post('send-message')
    async sendMessage(@Body() body: { message: string }): Promise<void> {
        await this.discordService.sendMessage(body.message);
    }
}
