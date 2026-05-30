import { PlasticAnalysis } from '../types';

const TELEGRAM_BOT_TOKEN = "8713845819:AAETqcPduNdIv-NuwNMTTXVOHPsYDRchH-o";
const CHAT_ID = "6384820803";

export const sendTelegramAlert = async (location: { lat: number; lng: number }, analysis: PlasticAnalysis) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const message = `🚨 <b>High Pollution Alert</b> 🚨\n\n` +
    `<b>Location:</b> ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}\n` +
    `<b>Map:</b> <a href="https://www.google.com/maps?q=${location.lat},${location.lng}">Google Maps</a>\n` +
    `<b>Items Detected:</b> ${analysis.count}\n` +
    `<b>Types:</b> ${analysis.types.join(", ")}\n` +
    `<b>Details:</b> ${analysis.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")}\n\n` +
    `<i>Immediate cleanup crew deployment recommended.</i>`;

  try {
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
    
    if (!response.ok) {
      const errText = await response.text();
      console.error("Failed to send Telegram alert", errText);
      alert(`Telegram Error: Failed to send alert. Status: ${response.status} - ${errText}`);
    } else {
      console.log("Telegram alert sent successfully!");
    }
  } catch (error: any) {
    console.error("Error sending Telegram alert:", error);
    alert(`Telegram Network Error: ${error.message || error}`);
  }
};
