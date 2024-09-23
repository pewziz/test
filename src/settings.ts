export const settings = {
    guildId: '1208473287206899742', // ID du serveur
    ticketPanelId: '1208510929466032199', // ID du salon où le panel de tickets sera envoyé
    categoryId: '1208521258052882544', // ID de la catégorie où les tickets seront créés
    moderatorRoleId: '1208474647620878467', // ID du rôle de modérateur pour les tickets
    ticketPanel: {
        title: ':ticket~1:Ticket Panel',
        description: 'Please select the ticket category from the drop-down menu below, and a team member will promptly address your request.',
        iconUrl: 'https://imgur.com/c7Awuk6',
        color: 0xffffff,
        thumbnailUrl: 'https://imgur.com/c7Awuk6',
        bannerUrl: 'https://imgur.com/PvMb7ST',
        alreadyOpenMessage: 'Vous avez déjà un ticket ouvert',
        menu: {
            options: [
                {
                    label: 'Purchase',
                    value: 'purchase',
                    description: 'Open to buy one of our products',
                    emoji: {
                        name: 'dot',
                        id: '1208514913220304958'
                    }
                },
                {
                    label: 'Exchange',
                    value: 'exchange',
                    description: 'Open To Exchange',
                    emoji: {
                        name: 'dot',
                        id: '1211579113924591646'
                    }
                },
                {
                    label: 'Support',
                    value: 'support',
                    description: 'Open For Support Purchase',
                    emoji: {
                        name: 'dot',
                        id: '1218205106474848328'
                    }
                }
            ]
        },
        modals: {
            purchase: {
                customId: 'purchaseModal',
                title: 'Ticket Purchase',
                components: [
                    {
                        type: 4,
                        customId: 'ticketPurchaseItem',
                        label: 'What do you want to buy ?',
                        style: 1,
                        placeholder: 'btc, eth, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketPurchaseAmount',
                        label: 'What amount do you want ?',
                        style: 1,
                        placeholder: '30€, 50€, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketPurchaseMethod',
                        label: 'How will you pay ?',
                        style: 1,
                        placeholder: 'Paypal, Credit Card, ...',
                        required: true
                    }
                ]
            },
            exchange: {
                customId: 'exchangeModal',
                title: 'Ticket Exchange',
                components: [
                    {
                        type: 4,
                        customId: 'ticketExchangeItem',
                        label: 'What do you want to exchange ?',
                        style: 1,
                        placeholder: 'btc, eth, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketExchangeAmount',
                        label: 'What amount do you want to exchange ?',
                        style: 1,
                        placeholder: '30€, 50€, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketExchangeMethod',
                        label: 'How will you exchange ?',
                        style: 1,
                        placeholder: 'Paypal, Credit Card, ...',
                        required: true
                    }
                ]
            },
            support: {
                customId: 'supportModal',
                title: 'Ticket Support',
                components: [
                    {
                        type: 4,
                        customId: 'ticketSupportItem',
                        label: 'What do you need support for ?',
                        style: 1,
                        placeholder: 'btc, eth, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketSupportAmount',
                        label: 'What amount do you need support for ?',
                        style: 1,
                        placeholder: '30€, 50€, ...',
                        required: true
                    },
                    {
                        type: 4,
                        customId: 'ticketSupportMethod',
                        label: 'How will you pay ?',
                        style: 1,
                        placeholder: 'Paypal, Credit Card, ...',
                        required: true
                    }
                ]
            }
        },
    }
}
