import { CronJob } from "cron";
import { client } from "../index";
import { config } from "../config";

// Global variable to store the emoji list
export let serverEmojisName: (string | null)[] = [];

// Cron job for periodic emoji updates
let emojiUpdateJob: CronJob | null = null;

/**
 * Updates the server emoji list by fetching current emojis from Discord
 */
export async function updateServerEmojis(): Promise<void> {
    try {
        console.log("🔄 Updating server emoji list...");
        
        // Clear the existing emoji list
        serverEmojisName = [];
        
        // Get the guild and its emojis
        const guild = client.guilds.cache.get(config.SERVER_ID);
        if (!guild) {
            console.error("❌ Could not find guild with ID:", config.SERVER_ID);
            return;
        }
        
        // Fetch fresh emoji data from Discord
        await guild.emojis.fetch();
        
        // Populate the emoji list with non-animated emojis
        guild.emojis.cache.forEach(emoji => {
            if (!emoji.animated) {
                serverEmojisName.push(`<:${emoji.name}:${emoji.id}>`);
            }
        });
        
        console.log(`✅ Updated emoji list with ${serverEmojisName.length} emojis`);
        console.log("📝 Current emojis:", serverEmojisName);
        
    } catch (error) {
        console.error("❌ Error updating server emojis:", error);
    }
}

/**
 * Sets up a periodic cron job to update emoji list
 * @param cronExpression - Cron expression for update frequency (default: every 30 minutes)
 */
export function setupEmojiUpdateJob(cronExpression: string = "0 */30 * * * *"): void {
    if (emojiUpdateJob) {
        emojiUpdateJob.stop();
    }
    
    emojiUpdateJob = new CronJob(
        cronExpression,
        async () => {
            await updateServerEmojis();
        },
        null,
        true,
        "Asia/Riyadh" // Using the same timezone as other workers
    );
    
    console.log(`⏰ Emoji update job scheduled with cron: ${cronExpression}`);
}

/**
 * Stops the emoji update cron job
 */
export function stopEmojiUpdateJob(): void {
    if (emojiUpdateJob) {
        emojiUpdateJob.stop();
        emojiUpdateJob = null;
        console.log("⏹️ Emoji update job stopped");
    }
}

/**
 * Gets the current emoji list
 */
export function getServerEmojis(): (string | null)[] {
    return [...serverEmojisName]; // Return a copy to prevent external modifications
}

/**
 * Checks if a given emoji string is a server emoji
 */
export function isServerEmoji(emojiString: string): boolean {
    return serverEmojisName.includes(emojiString);
} 