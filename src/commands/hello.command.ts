// commands/hello.command.ts

import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Replies with Hello!');

async function execute(interaction: CommandInteraction) {
  await interaction.reply('Hello!');
}

export { data, execute };
