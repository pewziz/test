import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ActionRowBuilder, ModalActionRowComponentBuilder, ModalBuilder, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle } from 'discord.js';
import { settings } from '../settings';
import { db } from '..';

export class MenuHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.SelectMenu
    });
  }

  private async createModal(modalCustomId: string) {
    console.log(1);

    const modal = new ModalBuilder()
        .setCustomId(modalCustomId)
        .setTitle('Ticket Purchase')

    const item = new TextInputBuilder()
        .setCustomId('ticketPurchaseItem')
        .setLabel('Item')
        .setPlaceholder('Item')
        .setStyle(TextInputStyle.Short)

    const amount = new TextInputBuilder()
        .setCustomId('ticketPurchaseAmount')
        .setLabel('Amount')
        .setPlaceholder('Amount')
        .setStyle(TextInputStyle.Short)

    const method = new TextInputBuilder()
        .setCustomId('ticketPurchaseMethod')
        .setLabel('Method')
        .setPlaceholder('Method')
        .setStyle(TextInputStyle.Short)

    const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(item);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(amount);
    const thirdActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(method);

    modal.addComponents(actionRow, secondActionRow, thirdActionRow);

    console.log(2);

    return modal;
  }

  public override parse(interaction: StringSelectMenuInteraction) {
    if (interaction.customId !== 'ticket') return this.none();

    return this.some();
  }

  public async run(interaction: StringSelectMenuInteraction) {
    console.log('A');

    const userDB = await db.ticket.findFirst({
        where: {
            userId: interaction.user.id
        }
    })

    console.log('B');

    if (userDB) {
        await interaction.reply({
            content: settings.ticketPanel.alreadyOpenMessage,
            ephemeral: true
        })
        return;
    }

    console.log('C');

    switch (interaction.values[0]) {
        case 'purchase':
            const purchaseModal = await this.createModal(settings.ticketPanel.modals.purchase.customId);
            console.log('test');

            await interaction.showModal(purchaseModal);
            console.log('D');

            break;
        case 'exchange':
            const exchangeModal = await this.createModal(settings.ticketPanel.modals.exchange.customId);
            await interaction.showModal(exchangeModal);
            break;
        case 'support':
            const supportModal = await this.createModal(settings.ticketPanel.modals.support.customId);
            await interaction.showModal(supportModal);
            break;

        default:
            break;
    }
  }
}
