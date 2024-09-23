import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ApplicationCommandOptionType, TextChannel } from 'discord.js';
import { db } from '..';

@ApplyOptions<Command.Options>({
	description: 'Retirer un membre au ticket'
})
export class UserCommand extends Command {
	// Register Chat Input and Context Menu command
	public override registerApplicationCommands(registry: Command.Registry) {
		// Register Chat Input command
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description,
            options: [{
                name: 'membre',
                type: ApplicationCommandOptionType.User,
                description: 'Membre à ajouter',
                required: true,
            }]
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

        const member = interaction.options.getUser('membre');

        if (!member) {
            interaction.reply({
                content: 'Membre invalide',
                ephemeral: true
            });
            return
        }

        const ticketChannel = interaction.guild?.channels.cache.get(ticket.channelId) as TextChannel;

        await ticketChannel?.permissionOverwrites.create(member, { ViewChannel: false })

        await interaction.reply({
            content: `<@${member.id}> (${member.displayName}) a été retiré au ticket`,
        })
	}
}
