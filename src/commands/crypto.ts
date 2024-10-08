import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Envoie une adresse crypto'
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
        interaction.reply({
            content: 'Voici l\'adresse crypto: ',
        })
	}
}
