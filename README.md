[![CodeQL](https://github.com/RainySystems/appwrite-function-send-discord-webhook/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/RainySystems/appwrite-function-send-discord-webhook/actions/workflows/codeql-analysis.yml)
# 📧 Sending custom Discord webhook message through Appwrite function

A sample Node.js Cloud Function for sending custom or automatically triggered Message to a given Discord webhook.

## 📝 Environment Variables

webhookUrl (only required if you plan to use automatically sending messages [by event])

## JSON for function parameters

```ts
{
    "webhookUrl": DISCORD_WEBHOOK_URL,
    "$id": OBJECT_ID (Might be userId or request id or what you like),
    "event": TRIGGER_EVENT,
    "message": MESSAGE_CONTENT
}
```

## 🚀 Building and Packaging

To package this example as a cloud function, follow these steps.

- As with appwrite version 0.13.0 there is no further steps required.

- Ensure that your folder structure looks like this

```
.
├── index.js
└── package.json
```

- Create a tarfile

```bash
$ cd appwrite-function-send-discord-webhook
$ tar -zcvf code.tar.gz *
```

- Navigate to the Overview Tab of your Cloud Function > Deploy Tag
- Input the file that will run your function (in this case "index.js") as your entrypoint command
- Upload your tarfile
- Click 'Activate'

## 🎯 Trigger

Head over to your function in the Appwrite console and under the Overview Tab, click Execute Now, input the JSON and execute it.
Or set some events in the Settings tab for automatically sending the messages. I tested document, user and session. Other events should be working too though.
If you want to use automatically sending of messages, you must set the 'webhookUrl' environment variable!
