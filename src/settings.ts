export const settings = {
    guildId: '1120314227639451810', // ID du serveur
    ticketPanelId: '1120589706854400010', // ID du salon où le panel de tickets sera envoyé
    categoryId: '1120589696276377681', // ID de la catégorie où les tickets seront créés
    moderatorRoleId: '1126949996621746247', // ID du rôle de modérateur pour les tickets
    ticketPanel: {
        title: 'Ticket Panel',
        description: 'Cliquez sur la réaction ci-dessous pour ouvrir un ticket',
        iconUrl: 'https://m.media-amazon.com/images/I/51lpm9SpsJL.png',
        color: 0xffffff,
        thumbnailUrl: 'https://m.media-amazon.com/images/I/51lpm9SpsJL.png',
        bannerUrl: 'https://m.media-amazon.com/images/I/51lpm9SpsJL.png',
        alreadyOpenMessage: 'Vous avez déjà un ticket ouvert',
        menu: {
            options: [
                {
                    label: 'Purchase',
                    value: 'purchase',
                    description: 'Open to buy one of our products',
                    emoji: {
                        name: 'dot',
                        id: '1286747402518401096'
                    }
                },
                {
                    label: 'Exchange',
                    value: 'exchange',
                    description: 'Open To Exchange',
                    emoji: {
                        name: 'dot',
                        id: '1286747402518401096'
                    }
                },
                {
                    label: 'Support',
                    value: 'support',
                    description: 'Open For Support Purchase',
                    emoji: {
                        name: 'dot',
                        id: '1286747402518401096'
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
