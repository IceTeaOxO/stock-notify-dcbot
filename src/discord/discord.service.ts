// src/discord/discord.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { WebhookClient, WebhookClientData } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;
  private webhookClient: WebhookClient;  

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
      ],
    });

    const webhookData: WebhookClientData = {
      id: this.configService.get<string>('WEBHOOK_ID'),
      token: this.configService.get<string>('WEBHOOK_TOKEN'),
    };
    this.webhookClient = new WebhookClient(webhookData);
  }

  async onModuleInit() {
    await this.client.login(this.configService.get<string>('DISCORD_TOKEN'));

    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}!`);

      const commandFiles = readdirSync(join(__dirname, '..', '..', 'src/commands')).filter(file => file.endsWith('.command.ts'));
      console.log(__dirname)
      console.log(`Found ${commandFiles.length} commands`);
      for (const file of commandFiles) {
        console.log(`Registering command: ${file}`);
        const { data, execute } = require(join(__dirname, '..', '..', 'src/commands', file));
        this.client.application?.commands.create(data);

        this.client.on('interactionCreate', async interaction => {
          if (!interaction.isCommand()) return;

          if (interaction.commandName === data.name) {
            execute(interaction);
          }
        });
      }
    });
  }



  async sendMessage(message: string): Promise<void> {
    await this.webhookClient.send(message);
  }
}
