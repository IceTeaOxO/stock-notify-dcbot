import { Module } from '@nestjs/common';
import { DiscordService } from './discord/discord.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordController } from './discord/discord.controller';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
  }),],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class AppModule {}
