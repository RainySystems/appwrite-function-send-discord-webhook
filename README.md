# 📧 Sending custom Discord webhook message through Appwrite function

A sample Node.js Cloud Function for sending custom Message to a given Discord webhook.

## 📝 Environment Variables

Currently no Environment Variables are required.

## JSON for function parameters

```
{
    "webhookUrl": DISCORD_WEBHOOK_URL,
    "email": USER_EMAIL,
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
├── .env
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
