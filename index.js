const cron = require('node-cron');
const URL = 'https://markaz.pp0.pp.ua/stock/fetch_and_save.php';

async function pingUrl() {
  try {
    const response = await fetch(URL);
    const data = await response.text();
    console.log(`Fetched at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}:`, data.includes("Your request is being processed in the background") ? "Saving into Database" : "Failed");
  } catch (error) {
    console.error('Error fetching URL:', error);
  }
}

cron.schedule('0,30 * * * * *', () => {
  pingUrl();
});

console.log('Scheduler started');
