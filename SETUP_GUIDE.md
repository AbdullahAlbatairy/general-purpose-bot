# N.O.W.Bot Setup Guide

## 🚀 Quick Start

### 1. **Environment Configuration**

Create a `.env` file in your project root:

```bash
cp .env-example .env
```

Fill in your `.env` file with your Discord bot credentials:

```env
APP_ID=your_discord_app_id
DISCORD_TOKEN=your_discord_bot_token
PUBLIC_KEY=your_discord_public_key
SERVER_ID=your_discord_server_id
GAME_CATEGORY_ID=your_game_category_id
TEXT_CHANNEL_ID=your_text_channel_id

# Database URL (SQLite)
DATABASE_URL="file:./identifier.sqlite"

# Optional: Custom emoji update interval (default: every 30 minutes)
EMOJI_UPDATE_INTERVAL="0 */30 * * * *"
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (if needed)
npx prisma db push
```

### 4. **Run the Bot**

#### Development Mode (with hot reload):
```bash
npm run dev
```

#### Production Mode:
```bash
# Build the project
npm run build

# Start the bot
npm start
```

## 🔧 **Discord Bot Setup**

### 1. **Create Discord Application**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section and create a bot
4. Copy the bot token to your `.env` file

### 2. **Bot Permissions**
Your bot needs these permissions:
- `Send Messages`
- `Read Message History`
- `Use Slash Commands`
- `View Channels`
- `Read Messages`

### 3. **Invite Bot to Server**
Use this URL (replace `YOUR_APP_ID`):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_APP_ID&permissions=68608&scope=bot%20applications.commands
```

## 📋 **Environment Variables Explained**

| Variable | Description | Required |
|----------|-------------|----------|
| `APP_ID` | Your Discord application ID | ✅ |
| `DISCORD_TOKEN` | Your Discord bot token | ✅ |
| `PUBLIC_KEY` | Your Discord public key | ✅ |
| `SERVER_ID` | Target Discord server ID | ✅ |
| `GAME_CATEGORY_ID` | Category ID to monitor | ✅ |
| `TEXT_CHANNEL_ID` | Specific channel ID to track | ✅ |
| `DATABASE_URL` | SQLite database path | ✅ |
| `EMOJI_UPDATE_INTERVAL` | Cron expression for emoji updates | ❌ |

## 🎯 **Testing the Bot**

### 1. **Check Bot Status**
- Bot should show "online" status in Discord
- Console should show "Discord bot is ready! 🤖"

### 2. **Test Commands**
- `/ping` - Basic connectivity test
- `/emoji` - View emoji usage statistics
- `/emoji update:true` - Manually update emoji list

### 3. **Test Emoji Updates**
- Add/remove emojis in your Discord server
- Check console logs for emoji update messages
- Use `/emoji update:true` to force an update

## 🔍 **Troubleshooting**

### Common Issues:

1. **"Missing required environment variables"**
   - Check your `.env` file has all required variables
   - Ensure no extra spaces or quotes

2. **"Could not find guild"**
   - Verify `SERVER_ID` matches your Discord server ID
   - Ensure bot is invited to the server

3. **"Missing Permissions"**
   - Check bot has required permissions
   - Verify bot can see the target channels

4. **Database Issues**
   - Run `npx prisma generate` and `npx prisma db push`
   - Check `DATABASE_URL` is correct

### Logs to Watch For:
- ✅ "Discord bot is ready! 🤖"
- ✅ "Emoji Message Listener is ready"
- ✅ "Updated emoji list with X emojis"
- ✅ "Emoji update job scheduled"

## 📊 **Available Commands**

| Command | Description |
|---------|-------------|
| `/ping` | Test bot connectivity |
| `/emoji` | View emoji usage statistics |
| `/emoji period:7` | View last 7 days of emoji usage |
| `/emoji user:@username` | View emoji usage for specific user |
| `/emoji update:true` | Manually update emoji list |

## 🎉 **Success Indicators**

When everything is working correctly, you should see:
- Bot shows online status in Discord
- Console shows initialization messages
- Emoji tracking works in real-time
- Periodic emoji updates in console logs
- Commands respond correctly 