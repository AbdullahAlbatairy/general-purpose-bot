import { ActivityType, Client } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import { config } from "./config";
import { connect } from './db/sqlite';
import { messageListener } from "./listener/message-listener";
import { storeChannels } from "./worker/channels-storage";
import { setupBackwardWorker, setupForwardWorker } from "./worker/channel-messages-worker";
import { updateServerEmojis, setupEmojiUpdateJob } from "./utils/emoji-manager";

export const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
});

client.once("ready", async () => {
    await connect();
    let guild = client.guilds.cache.get(config.SERVER_ID);
    if (guild) {
        await storeChannels(guild).then(async () => {
            await setupBackwardWorker()
            // await setupForwardWorker()
        })
    }

    // Initialize emoji list and set up periodic updates
    await updateServerEmojis();
    setupEmojiUpdateJob(config.EMOJI_UPDATE_INTERVAL); // Use configurable interval

    await deployCommands();
    console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async () => {
    await deployCommands();
});

// Listen for emoji updates in real-time
client.on("guildEmojisUpdate", async (guild) => {
    if (guild.id === config.SERVER_ID) {
        console.log("🔄 Detected emoji update in guild, refreshing emoji list...");
        await updateServerEmojis();
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        await commands[commandName as keyof typeof commands].execute(interaction);
    }
});

messageListener().then(() =>
    console.log("Emoji Message Listener is ready"));

client.login(config.DISCORD_TOKEN).then(() => {
    client.user?.setPresence({
        activities: [{
            name: 'test',
            type: ActivityType.Custom,
        }],
        status: 'online'
    });

}
);

