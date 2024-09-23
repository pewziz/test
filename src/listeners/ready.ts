import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from '@sapphire/framework';
import type { StoreRegistryValue } from '@sapphire/pieces';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { settings } from '../settings';
import { ComponentType } from 'discord.js';

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public override run() {
		this.printBanner();
		this.printStoreDebugInformation();
        this.sendTicketPanel();
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: StoreRegistryValue, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}

    private sendTicketPanel() {
        const guild = this.container.client.guilds.cache.get(settings.guildId);
        if (!guild) return;
        const channel = guild.channels.cache.get(settings.ticketPanelId);
        if (!channel || !channel.isSendable()) return;
        const panel = settings.ticketPanel;
        const menuOptions = panel.menu.options.map((option) => ({
            label: option.label,
            value: option.value,
            description: option.description,
            emoji: {
                name: option.emoji.name,
                id: option.emoji.id
            }
        }));

        channel.send({
            embeds: [{
                author: {
                    name: panel.title,
                    icon_url: panel.iconUrl
                },
                description: panel.description,
                color: panel.color,
                thumbnail: {
                    url: panel.thumbnailUrl
                },
                image: {
                    url: panel.bannerUrl
                }
            }],
            components: [{
                type: ComponentType.ActionRow,
                components: [{
                    type: ComponentType.StringSelect,
                    customId: 'ticket',
                    options: menuOptions,
                    maxValues: 1
                }]
            }]
        })
    }
}
