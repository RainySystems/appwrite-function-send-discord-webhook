//const Discord = require('discord.js');
const fetch = require('node-fetch');


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
 * function that converts a color HEX to a valid Discord color
 * @param {*} hex 
 * @returns (int) a valid Discord color
 */
function hexToDecimal(hex) {
    return parseInt(hex.replace("#", ""), 16)
}

function sendMessage() {
    /**
     * Create embed object
     */
    var embed = {
        title: event,
        description: message,
        color: hexToDecimal("#f02a65"),
        footer: {
            text: id,
            icon_url: "https://raw.githubusercontent.com/appwrite/appwrite/master/public/images/favicon.png"
        }
    };

    /**
     * Fetch the webhook URL and send the message including the embed
     */
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "username": "Appwrite",
                "avatar_url": "https://raw.githubusercontent.com/appwrite/appwrite/master/public/images/favicon.png",
                embeds: [embed]
            })
    });
}

sendMessage();
