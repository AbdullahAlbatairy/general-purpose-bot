"use strict";var T=Object.create;var g=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var v=(e,o)=>{for(var s in o)g(e,s,{get:o[s],enumerable:!0})},$=(e,o,s,c)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of M(o))!b.call(e,a)&&a!==s&&g(e,a,{get:()=>o[a],enumerable:!(c=x(o,a))||c.enumerable});return e};var A=(e,o,s)=>(s=e!=null?T(R(e)):{},$(o||!e||!e.__esModule?g(s,"default",{value:e,enumerable:!0}):s,e));var P=require("discord.js");var p=require("discord.js");var w=A(require("dotenv"));w.default.config();var{APP_ID:C,DISCORD_TOKEN:D,PUBLIC_KEY:I}=process.env;if(!C||!D||!I)throw new Error("Missing required environment variables");var d={APP_ID:C,DISCORD_TOKEN:D,PUBLIC_KEY:I};var h={};v(h,{data:()=>O,execute:()=>S});var i=require("discord.js"),O=new i.SlashCommandBuilder().setName("media").setDescription("Allow user to remove media");async function S(e){if(!(e.channel instanceof i.TextChannel)){await e.reply("This command can only be used in text channels.");return}let o=e.channel,s=e.user.id,c,a=0,l=0,u=0;if(s==="352190104540020737"){for(await e.deferReply({ephemeral:!0});;)try{let n=await o.messages.fetch({limit:100,before:c});if(n.size===0)break;l+=n.size;let y;if(n.forEach(async t=>{if(t.author.id==="744006301738336267")if(t.attachments.some(r=>r.contentType?.includes("image")||r.contentType?.includes("video")))try{await t.delete(),a++,console.log(`Deleted message ${t.id}`)}catch(r){r instanceof i.DiscordAPIError&&r.code===10008?(console.log(`Message ${t.id} already deleted or not found.`),u++):(console.error(`Error deleting message ${t.id}:`,r),u++)}else y=t;else y=t}),c=y?.id,l%1e3===0&&await e.editReply(`Processing... ${l} messages scanned, ${a} attachments deleted.`),n.size<100)break;await new Promise(t=>setTimeout(t,100))}catch(n){console.error("Error fetching messages:",n),await e.editReply("An error occurred while processing messages.");return}await e.editReply(`Processing complete! Deleted ${a} attachments in ${l} messages. Error encountered: ${u}`)}else await e.reply("You are not authorized to use this command.")}var m={media:h};var _=Object.values(m).map(e=>e.data),k=new p.REST({version:"10"}).setToken(d.DISCORD_TOKEN);async function E({guildId:e}){try{console.log("Started refreshing application (/) commands."),await k.put(p.Routes.applicationGuildCommands(d.APP_ID,e),{body:_}),console.log("Successfully reloaded application (/) commands.")}catch(o){console.error(o)}}var f=new P.Client({intents:["Guilds","GuildMessages","DirectMessages"]});f.once("ready",()=>{console.log("Discord bot is ready! \u{1F916}")});f.on("guildCreate",async e=>{await E({guildId:e.id})});f.on("interactionCreate",async e=>{if(!e.isCommand())return;let{commandName:o}=e;m[o]&&m[o].execute(e)});f.login(d.DISCORD_TOKEN);
