import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { TextChannel } from 'discord.js';
import { db } from '..';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@ApplyOptions<Command.Options>({
	description: 'Permet de fermer un ticket'
})
export class UserCommand extends Command {
	// Register Chat Input and Context Menu command
	public override registerApplicationCommands(registry: Command.Registry) {
		// Register Chat Input command
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const ticket = await db.ticket.findFirst({
            where: {
                channelId: interaction.channelId
            }
        });

        if (!interaction.memberPermissions?.has('ModerateMembers')) {
            interaction.reply({
                content: 'Vous n\'avez pas la permission de faire cela',
                ephemeral: true
            });
            return
        }

        if (!ticket) {
            interaction.reply({
                content: 'Ce salon n\'est pas un ticket',
                ephemeral: true
            });
            return
        }

        const ticketChannel = interaction.guild?.channels.cache.get(ticket.channelId) as TextChannel;

        await interaction.reply({
            content: `<@${ticket.userId}> votre ticket va être fermé dans 10 secondes (ticket fermé par <@${interaction.user.id}>)`,
        })

        await sleep(10000);

        await db.ticket.delete({
            where: {
                channelId: ticket.channelId
            }
        })

        await ticketChannel.delete();
	}
}
