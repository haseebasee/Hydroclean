import fetch from 'node-fetch';

const TELEGRAM_BOT_TOKEN = "8713845819:AAETqcPduNdIv-NuwNMTTXVOHPsYDRchH-o";
const CHAT_ID = "6384820803";

const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const message = `🚨 <b>High Pollution Alert TEST</b> 🚨\n\n<b>Details:</b> Test alert from script`;

(async () => {
  try {
    console.log("Sending to: ", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
    
    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch (error) {
    console.error("Error:", error);
  }
})();
