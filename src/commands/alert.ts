import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { TextChannel } from 'discord.js';
import { db } from '..';

@ApplyOptions<Command.Options>({
	description: 'Alterter un membre dans un ticket'
})
export class UserCommand extends Command {
	// Register Chat Input and Context Menu command
	public override registerApplicationCommands(registry: Command.Registry) {
		// Register Chat Input command
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description,
		});
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        if (!interaction.memberPermissions?.has('ModerateMembers')) {
            interaction.reply({
                content: 'Vous n\'avez pas la permission de faire cela',
                ephemeral: true
            });
            return
        }

        const ticket = await db.ticket.findFirst({
            where: {
                channelId: interaction.channelId
            }
        });

        if (!ticket) {
            interaction.reply({
                content: 'Ce salon n\'est pas un ticket',
                ephemeral: true
            });
            return
        }

        const ticketChannel = interaction.guild?.channels.cache.get(ticket.channelId) as TextChannel;

        await ticketChannel.send({
            content: `<@${ticket.userId}> êtes-vous toujours là ?`,
        })

        await interaction.reply({
            content: 'Membre alerté',
            ephemeral: true
        });
	}
}
