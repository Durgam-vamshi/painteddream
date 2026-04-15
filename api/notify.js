import { notificationMessages } from '../src/data/notificationMessages.js';
import dotenv from 'dotenv';

// Load .env if running locally
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * api/notify.js
 * Vercel Serverless Function triggered by Cron or direct hit.
 * Sends a random notification to all subscribed users via OneSignal.
 */
export default async function handler(req, res) {
  const appId = "192f6cd9-1c50-4d34-9dcc-620d9ca96eca";
  const restApiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!restApiKey) {
    return res.status(500).json({ 
      error: 'ONESIGNAL_REST_API_KEY not found.',
      hint: 'Check your .env file (local) or Vercel Environment Variables (production).'
    });
  }

  try {
    // 2. Pick a random message from our curated list
    const randomIndex = Math.floor(Math.random() * notificationMessages.length);
    const message = notificationMessages[randomIndex];

    // 3. Construct OneSignal API request
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${restApiKey}`
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ['All'],
        headings: { en: message.title },
        contents: { en: message.body },
        url: 'https://thepainteddream.in',
        // Optional: web_buttons: [{ id: "shop", text: "Shop Now", icon: "", url: "https://thepainteddream.in/gallery" }]
      })
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ success: false, errors: data.errors });
    }

    return res.status(200).json({ 
      success: true, 
      sent_message: message,
      onesignal_id: data.id 
    });

  } catch (error) {
    console.error('Notification Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
