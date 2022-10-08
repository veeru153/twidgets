const urlParams = new URLSearchParams(window.location.search);
const channel = urlParams.get("channel");

const client = tmi.Client({
    channels: [channel.toString() ?? ""]
})

const body = document.querySelector('body');
const chatbox = document.querySelector('#chatbox');

const getHTML = (tags, message) => {
    const msg = document.createElement('div');
    msg.className = "message";

    const authorSpan = document.createElement('span');
    authorSpan.className = "displayName";
    authorSpan.style.color = tags['color'];
    authorSpan.innerText = tags['display-name'];

    const separator = document.createElement('span');
    separator.className = "text";
    separator.innerText = ": ";

    const textSpan = document.createElement('span');
    textSpan.className = "text"
    textSpan.innerText = message;

    msg.append(authorSpan);
    msg.append(separator);
    msg.append(textSpan);

    return msg;
}

client.on('connecting', () => console.log("Connecting..."));
client.on('connected', () => console.log(`[${channel.toString()}] Connected!`));

client.on('chat', (channel, tags, message, self) => {
    const msg = getHTML(tags, message);
    body.append(msg);
    body.scrollTop = body.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
    console.log(chatbox.scrollTop, chatbox.scrollHeight);
})

client.connect();