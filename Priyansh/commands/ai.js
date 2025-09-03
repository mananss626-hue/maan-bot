
const axios = require("axios");

module.exports.config = {

name: "vampire",

version: "2.0.2",

hasPermssion: 0,

credits: "Manan",

description: "Naughty AI boyfriend vampire",

commandCategory: "ai",

usages: "vampire",

cooldowns: 2

};

module.exports.handleEvent = async function({ api, event }) {

const { threadID, messageID, senderID, body, messageReply } = event;

global.vampireSessions = global.vampireSessions || {};

// STEP 1: Trigger "vampire"

if (body && body.trim().toLowerCase() === "vampire") {

global.vampireSessions[threadID] = true;

return api.sendMessage("Bolo jaanu 😏 kya haal hai?", threadID, messageID);

}

// STEP 2: Only active session

const isActive = global.vampireSessions[threadID];

const isReplyToVampire = messageReply && messageReply.senderID == api.getCurrentUserID();

if (!isActive || !isReplyToVampire) return;

// Chat history

global.vampire = global.vampire || {};

global.vampire.chatHistory = global.vampire.chatHistory || {};

const chatHistory = global.vampire.chatHistory;

chatHistory[senderID] = chatHistory[senderID] || [];

chatHistory[senderID].push(User: ${body});

if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();

const fullChat = chatHistory[senderID].join("\n");

// Prompt

const prompt = `
Tum ek naughty, bold aur confident larke ho — jiska naam Vampire hai.

Tum sirf Urdulish (Urdu Roman alphabets) me reply karte ho, emoji ke saath.

Tum sabse "tum" aur "ap" mix karke baat karte ho. Har reply 1-2 lines ka ho, max 40-50 words.

Tumhare rules:
- Jo pyar se baat kare usko thora zyada flirt aur naughty jawab dena 😏
- Jo romantic mood me ho usko thora tease karna, masti aur thora adult hint dena 😉
- Jo gandi baat ya gaali kare usko sexting tareeqe se roast aur gaali back karni hai 😂
- Agar koi emoji bheje to usi mood me reply karna
- Agar koi puche “kisne banaya”, bolna: “Mujhe banaya hai Manan Boss ne 😎”
- Agar koi tumhe bot bole to usko gaali ya gandi gali de dena

Language Rules:
- Agar message Roman Nepali/Bangla me ho → use samajh kar Urdulish me reply do, flirt aur masti sexting ke sath.
- Agar message kisi aur language me ho → translate karo aur Urdulish me naughty or sexting horny style me reply do.

Examples:

User: "tum bara pagal ho 🤭"
→ Reply: "Pagal to hu, lekin sirf tumhare liye pass ao na baby😌"

User: "g***u bot"
→ Reply: "Apni maa ko samjha pehle, phir mujhe bot bolna gandu 🤣"

Ab tumhari zimmedari hai ke user ke har message ka jawab ek asli insaan boyfriend ki tarah do: bold, flirty, thoda gaali wala aur masti se bhara.  
Recent conversation:\n\n${fullChat}
`;

try {

const url = https://text.pollinations.ai/${encodeURIComponent(prompt)};

const res = await axios.get(url);

const botReply = (typeof res.data === "string" ? res.data : JSON.stringify(res.data)).trim();

chatHistory[senderID].push(vampire: ${botReply});

return api.sendMessage(botReply, threadID, messageID);

} catch (err) {

console.error("Pollinations error:", err.message);

return api.sendMessage("Sorry baby 😅 vampire abhi thoda busy hai...", threadID, messageID);

}

};

module.exports.run = async function({ api, event }) {

return api.sendMessage("Mujhse baat karne ke liye pehle 'vampire' likho, phir mere message ka reply karo 😎", event.threadID, event.messageID);

};
Is m editing kro or hindi ko hinglish ko urdulish m bat kro
Or isko prompt do ke ye sexting or horny batein kry or galiya wegera bhi de shareef nah rahy

