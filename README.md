# 📧 Sending custom Discord webhook message through Appwrite function

A sample Node.js Cloud Function for sending custom or automatically triggered Message to a given Discord webhook.

## 📝 Environment Variables

webhookUrl (only required if you plan to use automatically sending messages [by event])

## JSON for function parameters

```
{
    "webhookUrl": DISCORD_WEBHOOK_URL,
    "$id": OBJECT_ID (Might be userId or request id or what you like),
    "event": TRIGGER_EVENT,
    "message": MESSAGE_CONTENT
}
```

## 🚀 Building and Packaging

To package this example as a cloud function, follow these steps.

```bash
$ cd appwrite-function-send-discord-webhook

$ npm install
```

- Ensure that your folder structure looks like this

```
.
├── index.js
├── node_modules/
├── package-lock.json
└── package.json
```

- Create a tarfile

```bash
$ cd ..
$ tar -zcvf code.tar.gz appwrite-function-send-discord-webhook
```

- Navigate to the Overview Tab of your Cloud Function > Deploy Tag
- Input the command that will run your function (in this case "node index.js") as your entrypoint command
- Upload your tarfile
- Click 'Activate'

## 🎯 Trigger

Head over to your function in the Appwrite console and under the Overview Tab, click Execute Now, input the JSON and execute it.
Or set some events in the Settings tab for automatically sending the messages. I tested document, user and session. Other events should be working too though.
If you want to use automatically sending of messages, you must set the 'webhookUrl' environment variable!
