import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import {  ButtonStyle, ChannelType, ComponentType, ModalSubmitInteraction, TextChannel } from 'discord.js';
import { settings } from '../settings';
import { db } from '..';

export class MenuHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.ModalSubmit
    });
  }

//   public override parse(interaction: ModalSubmitInteraction) {
//     if (interaction.customId !== 'purchaseModal') return this.none();

//     return this.some();
//   }

  private async createChannel(interaction: ModalSubmitInteraction, channelName: string) {
    const channel = await interaction.guild?.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: settings.categoryId,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['ViewChannel'],
        }, {
            id: settings.moderatorRoleId,
            allow: ['ViewChannel'],
        }, {
            id: interaction.guild.id,
            deny: ['ViewChannel'],
        }]
    })
    return channel;
  }

  public async run(interaction: ModalSubmitInteraction) {
    const userDB = await db.ticket.findFirst({
        where: {
            userId: interaction.user.id
        }
    })

    if (userDB) {
        await interaction.reply({
            content: settings.ticketPanel.alreadyOpenMessage,
            ephemeral: true
        })
        return;
    }

    switch (interaction.customId) {
        case settings.ticketPanel.modals.purchase.customId:
            console.log(1);

            const item = interaction.fields.getTextInputValue('ticketPurchaseItem');
            console.log(2);

            const channel = await this.createChannel(interaction, `${settings.ticketPanel.modals.purchase.customId}-${interaction.user.id}`) as TextChannel;

            const message = await channel.send({
                embeds: [{
                    author: {
                        name: settings.ticketPanel.modals.purchase.title,
                        icon_url: interaction.user.displayAvatarURL()
                    },
                    description: `> Welcome <@${interaction.user.id}>, Welcome for choosing Virtuo Market.\n> Please be patient and await for response.`,
                    color: settings.ticketPanel.color,
                    footer: {
                        text: `${this.container.client.user?.username}`,
                        icon_url: `${this.container.client.user?.displayAvatarURL()}`
                    }
                }],
                components: [{
                    type: ComponentType.ActionRow,
                    components: [{
                        type: ComponentType.Button,
                        customId: 'closeTicket',
                        label: 'Close Ticket',
                        style: ButtonStyle.Danger,
                        emoji: {
                            name: '🔒'
                        }
                    }, {
                        type: ComponentType.Button,
                        customId: 'claimTicket',
                        label: 'Claim Ticket',
                        style: ButtonStyle.Success,
                        emoji: {
                            name: '👋'
                        }
                    }]
                }]
            })

            await db.ticket.create({
                data: {
                    userId: interaction.user.id,
                    channelId: channel.id,
                    topic: settings.ticketPanel.modals.purchase.title,
                    messageId: message.id
                }
            })

            await channel.send({
                embeds: [{
                    title: 'Ticket Questions - Purchase',
                    description: `What do you want to buy?\n \`\`\`${item}\`\`\`\nWhat ammount do you want?\n \`\`\`${interaction.fields.getTextInputValue('ticketPurchaseAmount')}\`\`\`\nHow will you pay?\n \`\`\`${interaction.fields.getTextInputValue('ticketPurchaseMethod')}\`\`\``,
                }]
            })

            await interaction.reply({
                content: `Votre ticket a été crée avec succès dans <#${channel.id}>`,
                ephemeral: true
            })
            break;
        case settings.ticketPanel.modals.exchange.customId:
            const exchangeChannel = await this.createChannel(interaction, `${settings.ticketPanel.modals.exchange.customId}-${interaction.user.id}`) as TextChannel;

            const exchangeMessage = await exchangeChannel.send({
                embeds: [{
                    author: {
                        name: settings.ticketPanel.modals.exchange.title,
                        icon_url: interaction.user.displayAvatarURL()
                    },
                    description: `> Welcome <@${interaction.user.id}>, Welcome for choosing Virtuo Market.\n> Please be patient and await for response.`,
                    color: settings.ticketPanel.color,
                    footer: {
                        text: `${this.container.client.user?.username}`,
                        icon_url: `${this.container.client.user?.displayAvatarURL()}`
                    }
                }],
                components: [{
                    type: ComponentType.ActionRow,
                    components: [{
                        type: ComponentType.Button,
                        customId: 'closeTicket',
                        label: 'Close Ticket',
                        style: ButtonStyle.Danger,
                        emoji: {
                            name: '🔒'
                        }
                    }, {
                        type: ComponentType.Button,
                        customId: 'claimTicket',
                        label: 'Claim Ticket',
                        style: ButtonStyle.Success,
                        emoji: {
                            name: '👋'
                        }
                    }]
                }]
            })

            await db.ticket.create({
                data: {
                    userId: interaction.user.id,
                    channelId: exchangeChannel.id,
                    topic: settings.ticketPanel.modals.exchange.title,
                    messageId: exchangeMessage.id
                }
            })

            await exchangeChannel.send({
                embeds: [{
                    title: 'Ticket Questions - Exchange',
                    description: `What do you want to exchange?\n \`\`\`${interaction.fields.getTextInputValue('ticketExchangeItem')}\`\`\`\nWhat ammount do you want to exchange?\n \`\`\`${interaction.fields.getTextInputValue('ticketExchangeAmount')}\`\`\``,
                }]
            })

            await interaction.reply({
                content: `Votre ticket a été crée avec succès dans <#${exchangeChannel.id}>`,
                ephemeral: true
            })
            break;
        case settings.ticketPanel.modals.support.customId:
            const supportChannel = await this.createChannel(interaction, `${settings.ticketPanel.modals.support.customId}-${interaction.user.id}`) as TextChannel;

            const supportMessage = await supportChannel.send({
                embeds: [{
                    author: {
                        name: settings.ticketPanel.modals.support.title,
                        icon_url: interaction.user.displayAvatarURL()
                    },
                    description: `> Welcome <@${interaction.user.id}>, Welcome for choosing Virtuo Market.\n> Please be patient and await for response.`,
                    color: settings.ticketPanel.color,
                    footer: {
                        text: `${this.container.client.user?.username}`,
                        icon_url: `${this.container.client.user?.displayAvatarURL()}`
                    }
                }],
                components: [{
                    type: ComponentType.ActionRow,
                    components: [{
                        type: ComponentType.Button,
                        customId: 'closeTicket',
                        label: 'Close Ticket',
                        style: ButtonStyle.Danger,
                        emoji: {
                            name: '🔒'
                        }
                    }, {
                        type: ComponentType.Button,
                        customId: 'claimTicket',
                        label: 'Claim Ticket',
                        style: ButtonStyle.Success,
                        emoji: {
                            name: '👋'
                        }
                    }]
                }]
            })

            await db.ticket.create({
                data: {
                    userId: interaction.user.id,
                    channelId: supportChannel.id,
                    topic: settings.ticketPanel.modals.support.title,
                    messageId: supportMessage.id
                }
            })

            await supportChannel.send({
                embeds: [{
                    title: 'Ticket Questions - Support',
                    description: `What do you need support for?\n \`\`\`${interaction.fields.getTextInputValue('ticketSupportReason')}\`\`\`\nWhat is your issue?\n \`\`\`${interaction.fields.getTextInputValue('ticketSupportIssue')}\`\`\``,
                }]
            })

            await interaction.reply({
                content: `Votre ticket a été crée avec succès dans <#${supportChannel.id}>`,
                ephemeral: true
            })
            break;
    }
  }
}
