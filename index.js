const fetch = require('node-fetch');

module.exports = async (request, response) => {
    const payload = JSON.parse(request.payload ? request.payload : "{}");
    const env = request.env;

    let task = {
        message: 'Sucessfully sent the Message to Discord',
    };

    let webhookUrl = '';
    let id = '';
    let event = '';
    let message = '';

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

    switch (env.APPWRITE_FUNCTION_TRIGGER) {
        /**
         * When the function is triggered by console or with http request
         */
        case 'http':
            manualPayload = JSON.parse(env.APPWRITE_FUNCTION_DATA);
            webhookUrl = manualPayload.webhookUrl;
            message = manualPayload.message;
            event = manualPayload.event;
            id = manualPayload.$id;
            break;
        /**
         * When the function is triggered by a cron job
         */
        case 'schedule':
            webhookUrl = env.webhookUrl;
            message = JSON.stringify(payload) || "This message was sent from a scheduled task";
            event = env.APPWRITE_FUNCTION_EVENT || "Scheduled Task";
            id = payload.$id || env.APPWRITE_FUNCTION_ID;
            break;
        /**
         * When the function is triggered by a event
         */
        case 'event':
            eventPayload = JSON.parse(env.APPWRITE_FUNCTION_EVENT_DATA);
            webhookUrl = env.webhookUrl;
            message = JSON.stringify(eventPayload);
            event = env.APPWRITE_FUNCTION_EVENT;
            id = eventPayload.$id;
            break;
        /**
         * Fallback / unknown trigger
         */
        default:
            webhookUrl = env.webhookUrl;
            message = JSON.stringify(payload) || "No message";
            event = "Unknown Trigger";
            id = "Unknown ID";
            break;
    }
    /**
     * Send the message to discord
     */
    sendMessage();

    /**
     * Set success message in the Appwrite Console
     */
    response.json(task);
}