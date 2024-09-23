import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ButtonInteraction } from 'discord.js';
import { db } from '..';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MenuHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public async run(interaction: ButtonInteraction) {
    const ticket = await db.ticket.findFirst({
      where: {
        channelId: interaction.channelId
      }
    });

    if (!ticket) return console.log('No ticket found');

    if (interaction.customId == 'claimTicket') {
        if (interaction.user.id == ticket.userId) {
            await interaction.reply({
                content: "Vous ne pouvez pas claim votre propre ticket",
                ephemeral: true
            })
            return;
        }

        await db.ticket.update({
            where: {
                userId: ticket.userId
            },
            data: {
                claimedBy: interaction.user.id
            }
        })

        await interaction.reply({
            content: `Le ticket a été claim par <@${interaction.user.id}>`,
        })
    }

    await interaction.reply({
        content: `Ticket fermé par <@${interaction.user.id}>, ce salon sera supprimé dans 5 secondes`,
    })

    await sleep(5000);

    const channel = interaction.guild?.channels.cache.get(ticket.channelId);
    if (!channel) return;
    channel.delete();

    await db.ticket.delete({
        where: {
            userId: interaction.user.id
        }
    })
  }
}
