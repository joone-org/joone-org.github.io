// Create a Discord Bot using OpenAI API that interacts on the Discord Server
require('dotenv').config();

// Prepare connection to Discord API
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [ 
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent ] });

// Prepare connection to OpenAI API
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
	organization: process.env.OPENAI_ORG,
	apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for when messages are sent
client.on("messageCreate", async function(message){
	try {
		// Don't respond to yourself or other bots
	if(message.author.bot) return;

	// If the message does not contain the word
	if(!(
		message.content.toLowerCase().includes("chatgpt") || 
		message.content.toLowerCase().includes("<@1059088461694505021>") || 
		message.content.toLowerCase().includes("adrian"))){
		// check if at least chatgpt was tagged, if not, return
		if(!message.mentions.has(client.user)) return;
	}
	

	// get the current channel from the message and retrieve the last 5 messages
	const channel = message.channel;
	channel.sendTyping();
	const messages = await channel.messages.fetch({ limit: 10 });
	
	// combine all the messages into a simple string eg username: message\n
	let history = messages.reverse().map(m => `${m.author.username}: ${m.content}`).join("\n");
	

	let prompt =`ChatGPT is a friendly positive member on the Codex Channel on Discord, a channel about no-code tools, ui, ux. Occasionally it will also chat to itself to provide entertainment or insights into web topics.\n\n\

Adrian Twarog: I'm also making a new video today, can't wait to release it\n\
ChatGPT: That's great, I'm looking forward to it!\n\
Adrian Twarog: Chatgpt, what are you doing right now\n\
ChatGPT: Just trying to be a helpful supportive member of this Codex channel\n\
${history}\n\
ChatGPT:`;

	console.log(prompt);


	const gptResponse = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 256,
		temperature: 0.5,
		presence_penalty: 1, 
		frequency_penalty: 1.5,
		stop: ["ChatGPT:", "Adrian Twarog:"],
	  });
	
	let ChatGPTreply = gptResponse.data.choices[0].text;
	if(ChatGPTreply.length < 1){
		return;
	}
	// Otherwise, remove the text ChatGPT: string at the strart of the message
	// ChatGPTreply = ChatGPTreply.substring(8);
	message.reply(`${ChatGPTreply}`);
	return;
	} catch (err){
		console.log(err)
	}
})

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT is running");