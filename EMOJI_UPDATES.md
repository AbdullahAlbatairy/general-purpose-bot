# Emoji Update System

## Overview
The bot now automatically keeps track of server emoji changes to ensure accurate emoji usage tracking.

## Features

### 1. Periodic Updates
- The bot automatically updates its emoji list every 30 minutes by default
- This ensures the bot recognizes new emojis added to the server
- Removes emojis that have been deleted from the server

### 2. Real-time Updates
- The bot listens for Discord's `guildEmojisUpdate` event
- Automatically refreshes the emoji list when emojis are added/removed
- Provides immediate response to server emoji changes

### 3. Manual Updates
- Use `/emoji update:true` to manually trigger an emoji list update
- Useful for testing or immediate updates

## Configuration

### Environment Variables
Add to your `.env` file:

```env
# Optional: Custom emoji update interval (cron expression)
EMOJI_UPDATE_INTERVAL="0 */30 * * * *"
```

### Cron Expression Format
The `EMOJI_UPDATE_INTERVAL` uses cron expression format:
- `"0 */30 * * * *"` - Every 30 minutes (default)
- `"0 */15 * * * *"` - Every 15 minutes
- `"0 0 * * * *"` - Every hour
- `"0 0 */6 * * *"` - Every 6 hours

### Examples
```env
# Update every 15 minutes
EMOJI_UPDATE_INTERVAL="0 */15 * * * *"

# Update every hour
EMOJI_UPDATE_INTERVAL="0 0 * * * *"

# Update every 6 hours
EMOJI_UPDATE_INTERVAL="0 0 */6 * * *"
```

## How It Works

1. **Initialization**: When the bot starts, it fetches the current server emoji list
2. **Periodic Updates**: A cron job runs at the configured interval to refresh the list
3. **Real-time Updates**: Discord events trigger immediate updates when emojis change
4. **Manual Updates**: Users can force updates using the `/emoji` command

## Benefits

- **Accuracy**: Always tracks the current server emoji set
- **Performance**: Efficient updates without constant polling
- **Flexibility**: Configurable update frequency
- **Reliability**: Multiple update mechanisms ensure no emoji changes are missed

## Troubleshooting

If emojis aren't being tracked properly:
1. Check the bot logs for emoji update messages
2. Use `/emoji update:true` to force a manual update
3. Verify the bot has the necessary permissions to view server emojis
4. Check that the `SERVER_ID` in your config matches the target server 