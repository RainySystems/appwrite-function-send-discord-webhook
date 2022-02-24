const Discord = require('discord.js');

/**
 * Set environment variables
 */
var payload = '';
var webhookUrl = '';
var id = '';
var event = '';
var message = '';
var manual = false;

/**
 * Check if function was manually called and set variables (payload and boolean manual) accordingly
 */
if (process.env.APPWRITE_FUNCTION_DATA) {
    manual = true;
    payload = JSON.parse(process.env.APPWRITE_FUNCTION_DATA);
} else {
    payload = JSON.parse(process.env.APPWRITE_FUNCTION_EVENT_DATA);
}

if (manual) {
    webhookUrl = payload.webhookUrl;
    id = payload.$id;
    event = payload.event;
    message = payload.message;
} else {
    webhookUrl = process.env.webhookUrl;
    id = payload.$id;
    event = process.env.APPWRITE_FUNCTION_EVENT;
    message = JSON.stringify(payload);
}

/**
 * Register the webhookClient from Discord.js (https://discord.js.org/#/docs/main/stable/class/WebhookClient)
 */
const webhookClient = new Discord.WebhookClient({ url: webhookUrl });

/**
 * Configure the embed that will be sent via Discord webhook (https://discord.js.org/#/docs/main/master/class/MessageEmbed)
 */
const embed = new Discord.MessageEmbed()
    .setTitle(event)
    .setColor('#f02a65')
    .setDescription(message)
    .setTimestamp()
    .setFooter({
        text: id,
    });

/**
 * Send the Embed to the Discord Webhook
 */
webhookClient.send({
    username: 'Appwrite',
    avatarURL: 'https://raw.githubusercontent.com/appwrite/appwrite/master/public/images/favicon.png',
    embeds: [embed],
});