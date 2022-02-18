const Discord = require('discord.js');

/**
 * Set environment variables
 */
const payload = JSON.parse(process.env.APPWRITE_FUNCTION_DATA);
const webhookUrl = payload['webhookUrl'];
const email = payload['email'];
const event = payload['event'];
const message = payload['message'];

/**
 * Register the webhookClient from Discord.js (https://discord.js.org/#/docs/main/stable/class/WebhookClient)
 */
const webhookClient = new Discord.WebhookClient({ url: webhookUrl});

/**
 * Configure the embed that will be sent via Discord webhook (https://discord.js.org/#/docs/main/master/class/MessageEmbed)
 */
const embed = new Discord.MessageEmbed()
    .setTitle(event)
    .setColor('#f02a65')
    .setDescription(message)
    .setTimestamp()
    .setFooter({
        text: email,
    });

    /**
     * Send the Embed to the Discord Webhook
     */
webhookClient.send({
    username: 'Appwrite',
    avatarURL: 'https://raw.githubusercontent.com/appwrite/appwrite/master/public/images/favicon.png',
    embeds: [embed],
});