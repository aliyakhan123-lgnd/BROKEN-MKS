module.exports.config = {
    name: "girl",
    version: "8.0.0",
    hasPermssion: 0,
    credits: "MISS ALIYA",
    description: "✨ 80+ Girl DPs with Stylish Shayri",
    commandCategory: "images",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        // ========== GIRL DPS - 80 IMAGES WITH 80 STYLISH SHAYRI ==========
        const girlDp = [
            // 1-10 (Aapki di hui links ke saath)
            { 
                url: "https://i.ibb.co/99Qm7P9d/ed13c7755090.jpg", 
                shayri: "❤️🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐧┼─👑 - ❤️  °____\n*𝐓𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐞 𝐤𝐮𝐜𝐡 𝐭𝐨 𝐛𝐚𝐚𝐭 𝐡𝐚𝐢 𝐣𝐨 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐦𝐞𝐫𝐚 𝐝𝐢𝐥 𝐜𝐡𝐮𝐫𝐚𝐭𝐢 𝐡𝐚𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/jZ6Stbj5/5aeb014f27fe.jpg", 
                shayri: "💗_[[💚🎻-✨❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   ♥️🥀😘  ||•^✨- :))•°🙈😍^•|"
            },
            { 
                url: "https://i.ibb.co/Z65TQt0v/2507885fe02d.jpg", 
                shayri: "🌹✨•° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 💫┼─💕 - 🌺  °____\n*𝐊𝐚𝐬𝐞 𝐤𝐚𝐡𝐞 𝐤𝐢 𝐲𝐞 𝐳𝐢𝐧𝐝𝐚𝐠𝐢 𝐡𝐚𝐢 𝐭𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐣𝐢𝐧𝐚 𝐤𝐲𝐚 𝐡𝐨𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/mC841YsR/6da8f0808a8c.jpg", 
                shayri: "💕_[[💙🎻-💫❤🐣🎻]]        🍫🌿💫 -•||\n______🎀🌸🎭   💗🥀💕  ||•^✨- :))•°😍💖^•|"
            },
            { 
                url: "https://i.ibb.co/9mdJ8gMv/d3c19ce4a2f3.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💗  °____\n*𝐃𝐢𝐥 𝐤𝐢 𝐛𝐚𝐚𝐭 𝐥𝐚𝐛𝐨𝐧 𝐭𝐚𝐤 𝐚𝐚 𝐠𝐚𝐲𝐢, 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐦𝐞𝐢𝐧 𝐚𝐚𝐧𝐤𝐡𝐞𝐧 𝐛𝐡𝐢𝐠 𝐚𝐚𝐲𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/Y4Rfjfcy/ff7ad92aa6b0.jpg", 
                shayri: "💘_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💓🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/jvHgw1HN/e4b63466304d.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💖  °____\n*𝐀𝐚𝐧𝐤𝐡𝐨𝐧 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐡𝐢 𝐜𝐡𝐞𝐡𝐫𝐚 𝐡𝐚𝐢, 𝐡𝐚𝐫 𝐥𝐚𝐦𝐡𝐚 𝐭𝐞𝐫𝐚 𝐦𝐞𝐢𝐧 𝐝𝐢𝐝𝐚𝐫 𝐡𝐨𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/zVBg5sLm/b005e8ae1bc0.jpg", 
                shayri: "💗_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💗🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/CsvWtFnY/eeb33f286240.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐓𝐞𝐫𝐢 𝐛𝐚𝐭𝐞𝐢𝐧 𝐦𝐞𝐫𝐢 𝐬𝐚𝐧𝐬𝐞𝐢𝐧 𝐛𝐚𝐧 𝐠𝐚𝐲𝐢, 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐦𝐞𝐫𝐢 𝐳𝐢𝐧𝐝𝐠𝐢 𝐛𝐚𝐧 𝐠𝐚𝐲𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/rKYy6qNZ/c4250736aa01.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            
            // 11-20
            { 
                url: "https://i.ibb.co/Mxg1XDS7/7fa04cfd3db9.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐲𝐚 𝐩𝐚𝐭𝐚 𝐭𝐡𝐚 𝐤𝐞 𝐭𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐮𝐣𝐡𝐞 𝐲𝐮𝐧 𝐥𝐮𝐭𝐚𝐲𝐞𝐠𝐢, 𝐝𝐢𝐥 𝐤𝐚 𝐬𝐚𝐫𝐚 𝐬𝐮𝐤𝐮𝐧 𝐜𝐡𝐮𝐫𝐚 𝐤𝐞 𝐥𝐞 𝐣𝐚𝐲𝐞𝐠𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/kgtCzcgy/b411488aead5.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/0jzc68mm/6c37a6871e71.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐮 𝐦𝐢𝐥𝐚 𝐭𝐨 𝐥𝐚𝐠𝐚 𝐚𝐢𝐬𝐞, 𝐣𝐚𝐢𝐬𝐞 𝐦𝐮𝐤𝐚𝐦𝐦𝐚𝐥 𝐡𝐨 𝐠𝐚𝐲𝐢 𝐦𝐞𝐫𝐢 𝐝𝐮𝐧𝐢𝐲𝐚 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/yc0TDB1P/a3e8b5365124.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/LDDgGPzm/778cab337bf8.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐂𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐛𝐡𝐮𝐥𝐚𝐲𝐞 𝐭𝐮𝐣𝐡𝐞, 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐝𝐢𝐥 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐝𝐢𝐥𝐚𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/4RMsjvfZ/6238577df8b8.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/bM8Ng8T0/3b3a74a38eda.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐓𝐞𝐫𝐢 𝐚𝐚𝐧𝐤𝐡𝐨𝐧 𝐤𝐚 𝐤𝐚𝐣𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐩𝐚𝐠𝐚𝐥 𝐤𝐚𝐫 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐚 𝐜𝐡𝐞𝐡𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐝𝐢𝐰𝐚𝐧𝐚 𝐛𝐧𝐚 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/qLjBQKh5/867f1945b223.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/6cGjF4X6/77755b7eeec2.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐚𝐬𝐞 𝐤𝐚𝐡𝐞 𝐤𝐢 𝐲𝐞 𝐦𝐨𝐡𝐚𝐛𝐛𝐭 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐡𝐚𝐫 𝐩𝐚𝐥 𝐦𝐮𝐬𝐡𝐤𝐢𝐥 𝐡𝐨𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/Pv33JvpY/895c38b3dbac.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            
            // 21-30
            { 
                url: "https://i.ibb.co/9HfzQXvQ/b3da1395c112.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐚𝐝𝐡𝐮𝐫𝐢 𝐡𝐚𝐢 𝐲𝐞 𝐤𝐚𝐡𝐚𝐧𝐢, 𝐭𝐮 𝐡𝐢 𝐛𝐧𝐚 𝐥𝐞 𝐦𝐮𝐣𝐡𝐤𝐨 𝐚𝐩𝐧𝐢 𝐳𝐢𝐧𝐝𝐠𝐚𝐧𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/PGks7553/ccdcb1607116.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/fY3QjwR2/87c31982f8cc.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐀𝐚𝐣𝐚 𝐚𝐚𝐣𝐚 𝐦𝐞𝐫𝐞 𝐝𝐢𝐥 𝐦𝐞𝐢𝐧, 𝐭𝐮𝐣𝐡𝐞 𝐚𝐩𝐧𝐚 𝐛𝐧𝐚 𝐥𝐮 𝐦𝐚𝐢𝐧 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/ynt1kSvp/4aa5a70a5ce7.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/rfd0HHg4/3407578bf4dd.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐇𝐚𝐫 𝐬𝐚𝐧𝐬 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐧𝐚𝐚𝐦 𝐡𝐨, 𝐡𝐚𝐫 𝐝𝐡𝐚𝐫𝐤𝐚𝐧 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐩𝐲𝐚𝐫 𝐡𝐨 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/C5RKc9gM/1de3fbf6223f.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/YJ8Z304/6aefbd4f32e1.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐲𝐚𝐚𝐝𝐨𝐧 𝐦𝐞𝐢𝐧 𝐠𝐮𝐳𝐚𝐫𝐭𝐚 𝐡𝐚𝐢 𝐡𝐚𝐫 𝐩𝐚𝐥, 𝐭𝐮𝐣𝐡𝐬𝐞 𝐛𝐢𝐜𝐡𝐡𝐚𝐫 𝐤𝐞 𝐚𝐛 𝐤𝐲𝐚 𝐡𝐚𝐢 𝐡𝐚𝐬𝐢𝐥 ♥️💫*"
            },
            
            // 28-40 (Second batch - 1 to 27)
            { 
                url: "https://i.ibb.co/pBQrxqCV/4458900dc6c9.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/zHSDqz1K/205163c56bf0.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐂𝐡𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐫𝐮𝐥𝐚𝐲𝐞 𝐭𝐮 𝐦𝐮𝐣𝐡𝐞, 𝐝𝐢𝐥 𝐭𝐮𝐣𝐡𝐬𝐞 𝐩𝐲𝐚𝐫 𝐤𝐫𝐭𝐚 𝐡𝐚𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/vC9k8s51/c21b4edb7a97.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/SDtHRH3B/c1e4baed0496.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐞 𝐤𝐮𝐜𝐡 𝐭𝐨 𝐛𝐚𝐚𝐭 𝐡𝐚𝐢 𝐣𝐨 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐦𝐞𝐫𝐚 𝐝𝐢𝐥 𝐜𝐡𝐮𝐫𝐚𝐭𝐢 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/PvH0sspq/46b8580a81a2.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/Gfsv3Zkp/ebb16967b17a.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐃𝐢𝐥 𝐤𝐢 𝐛𝐚𝐚𝐭 𝐥𝐚𝐛𝐨𝐧 𝐭𝐚𝐤 𝐚𝐚 𝐠𝐚𝐲𝐢, 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐦𝐞𝐢𝐧 𝐚𝐚𝐧𝐤𝐡𝐞𝐧 𝐛𝐡𝐢𝐠 𝐚𝐚𝐲𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/HTqGsjjL/37ceb1a1aa4c.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/fzHQvRSd/a3839d9e8df6.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐚𝐬𝐞 𝐤𝐚𝐡𝐞 𝐤𝐢 𝐲𝐞 𝐦𝐨𝐡𝐚𝐛𝐛𝐭 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐡𝐚𝐫 𝐩𝐚𝐥 𝐦𝐮𝐬𝐡𝐤𝐢𝐥 𝐡𝐨𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/prJkCs39/9d9f8a365440.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/MyrtmYGw/f8eeca671ecd.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐮 𝐦𝐢𝐥𝐚 𝐭𝐨 𝐥𝐚𝐠𝐚 𝐚𝐢𝐬𝐞, 𝐣𝐚𝐢𝐬𝐞 𝐦𝐮𝐤𝐚𝐦𝐦𝐚𝐥 𝐡𝐨 𝐠𝐚𝐲𝐢 𝐦𝐞𝐫𝐢 𝐝𝐮𝐧𝐢𝐲𝐚 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/B580BJTh/bf4d807c62f1.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/NgQjXJQP/25835a95652c.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐂𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐛𝐡𝐮𝐥𝐚𝐲𝐞 𝐭𝐮𝐣𝐡𝐞, 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐝𝐢𝐥 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐝𝐢𝐥𝐚𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            
            // 41-53
            { 
                url: "https://i.ibb.co/gZZz2JSX/f246fa7c4cde.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/Xcnz5Kq/e1d7c80b031e.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐓𝐞𝐫𝐢 𝐚𝐚𝐧𝐤𝐡𝐨𝐧 𝐤𝐚 𝐤𝐚𝐣𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐩𝐚𝐠𝐚𝐥 𝐤𝐚𝐫 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐚 𝐜𝐡𝐞𝐡𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐝𝐢𝐰𝐚𝐧𝐚 𝐛𝐧𝐚 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/rGH5wWMD/73929d9ef1ab.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/SDRCTy0c/126c8512bb0e.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐲𝐚 𝐩𝐚𝐭𝐚 𝐭𝐡𝐚 𝐤𝐞 𝐭𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐮𝐣𝐡𝐞 𝐲𝐮𝐧 𝐥𝐮𝐭𝐚𝐲𝐞𝐠𝐢, 𝐝𝐢𝐥 𝐤𝐚 𝐬𝐚𝐫𝐚 𝐬𝐮𝐤𝐮𝐧 𝐜𝐡𝐮𝐫𝐚 𝐤𝐞 𝐥𝐞 𝐣𝐚𝐲𝐞𝐠𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/7ts4VhJG/0a8d11182e05.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/Lzpz2RXq/319ce619f33c.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐚𝐝𝐡𝐮𝐫𝐢 𝐡𝐚𝐢 𝐲𝐞 𝐤𝐚𝐡𝐚𝐧𝐢, 𝐭𝐮 𝐡𝐢 𝐛𝐧𝐚 𝐥𝐞 𝐦𝐮𝐣𝐡𝐤𝐨 𝐚𝐩𝐧𝐢 𝐳𝐢𝐧𝐝𝐠𝐚𝐧𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/fdt0Vsyp/f303744ac966.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/jkcyTf4p/e4be087560a7.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐀𝐚𝐣𝐚 𝐚𝐚𝐣𝐚 𝐦𝐞𝐫𝐞 𝐝𝐢𝐥 𝐦𝐞𝐢𝐧, 𝐭𝐮𝐣𝐡𝐞 𝐚𝐩𝐧𝐚 𝐛𝐧𝐚 𝐥𝐮 𝐦𝐚𝐢𝐧 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/qMWb1Md6/37444df6f656.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/p6kbrqd6/80ac897cff79.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐇𝐚𝐫 𝐬𝐚𝐧𝐬 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐧𝐚𝐚𝐦 𝐡𝐨, 𝐡𝐚𝐫 𝐝𝐡𝐚𝐫𝐤𝐚𝐧 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐩𝐲𝐚𝐫 𝐡𝐨 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/YFzDv8sb/48c8d54afe22.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/5XSC05Fq/e56f0e92d915.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐲𝐚𝐚𝐝𝐨𝐧 𝐦𝐞𝐢𝐧 𝐠𝐮𝐳𝐚𝐫𝐭𝐚 𝐡𝐚𝐢 𝐡𝐚𝐫 𝐩𝐚𝐥, 𝐭𝐮𝐣𝐡𝐬𝐞 𝐛𝐢𝐜𝐡𝐡𝐚𝐫 𝐤𝐞 𝐚𝐛 𝐤𝐲𝐚 𝐡𝐚𝐢 𝐡𝐚𝐬𝐢𝐥 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/zWnQ81rR/3f8d1eebe68c.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/cXCHsSWF/a40c7679c752.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐂𝐡𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐫𝐮𝐥𝐚𝐲𝐞 𝐭𝐮 𝐦𝐮𝐣𝐡𝐞, 𝐝𝐢𝐥 𝐭𝐮𝐣𝐡𝐬𝐞 𝐩𝐲𝐚𝐫 𝐤𝐫𝐭𝐚 𝐡𝐚𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/BKSFVmT1/17b23da55a1d.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            
            // 68-80 (Third batch - 1 to 26)
            { 
                url: "https://i.ibb.co/rf1wcwtF/8afbcf5aadfe.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐞 𝐤𝐮𝐜𝐡 𝐭𝐨 𝐛𝐚𝐚𝐭 𝐡𝐚𝐢 𝐣𝐨 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐦𝐞𝐫𝐚 𝐝𝐢𝐥 𝐜𝐡𝐮𝐫𝐚𝐭𝐢 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/1fW1ywJT/79dfcadf2cb1.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/pB5sP6yd/7e25d0cd0a2a.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐃𝐢𝐥 𝐤𝐢 𝐛𝐚𝐚𝐭 𝐥𝐚𝐛𝐨𝐧 𝐭𝐚𝐤 𝐚𝐚 𝐠𝐚𝐲𝐢, 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐦𝐞𝐢𝐧 𝐚𝐚𝐧𝐤𝐡𝐞𝐧 𝐛𝐡𝐢𝐠 𝐚𝐚𝐲𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/SDpwvHzy/74b43dcd33da.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/fV3ztyNr/11cee1c13ed8.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐚𝐬𝐞 𝐤𝐚𝐡𝐞 𝐤𝐢 𝐲𝐞 𝐦𝐨𝐡𝐚𝐛𝐛𝐭 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐡𝐚𝐫 𝐩𝐚𝐥 𝐦𝐮𝐬𝐡𝐤𝐢𝐥 𝐡𝐨𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/FqW6vQxf/cfad0b7ec155.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/7xLxX7TH/e8c193c84011.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐮 𝐦𝐢𝐥𝐚 𝐭𝐨 𝐥𝐚𝐠𝐚 𝐚𝐢𝐬𝐞, 𝐣𝐚𝐢𝐬𝐞 𝐦𝐮𝐤𝐚𝐦𝐦𝐚𝐥 𝐡𝐨 𝐠𝐚𝐲𝐢 𝐦𝐞𝐫𝐢 𝐝𝐮𝐧𝐢𝐲𝐚 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/JRFbvf8G/f8b6993b8507.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/BKYYkGCT/252ee25bbdcb.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐂𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐛𝐡𝐮𝐥𝐚𝐲𝐞 𝐭𝐮𝐣𝐡𝐞, 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐝𝐢𝐥 𝐭𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐝𝐢𝐥𝐚𝐭𝐚 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/ycx9c51k/ef615a7efbf6.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/cSzf9hZ4/9fb057c18e72.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐓𝐞𝐫𝐢 𝐚𝐚𝐧𝐤𝐡𝐨𝐧 𝐤𝐚 𝐤𝐚𝐣𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐩𝐚𝐠𝐚𝐥 𝐤𝐚𝐫 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢, 𝐭𝐞𝐫𝐚 𝐜𝐡𝐞𝐡𝐫𝐚 𝐦𝐮𝐣𝐡𝐞 𝐝𝐢𝐰𝐚𝐧𝐚 𝐛𝐧𝐚 𝐝𝐞𝐭𝐚 𝐡𝐚𝐢 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/QF0T3kKZ/13258ec089a4.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/YqftmkG/7ce2661894fe.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐊𝐲𝐚 𝐩𝐚𝐭𝐚 𝐭𝐡𝐚 𝐤𝐞 𝐭𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐮𝐣𝐡𝐞 𝐲𝐮𝐧 𝐥𝐮𝐭𝐚𝐲𝐞𝐠𝐢, 𝐝𝐢𝐥 𝐤𝐚 𝐬𝐚𝐫𝐚 𝐬𝐮𝐤𝐮𝐧 𝐜𝐡𝐮𝐫𝐚 𝐤𝐞 𝐥𝐞 𝐣𝐚𝐲𝐞𝐠𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/FLyQ9Ccw/5438270b292a.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/FLckRgcL/d15996a1ee76.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐓𝐞𝐫𝐞 𝐛𝐢𝐧𝐚 𝐚𝐝𝐡𝐮𝐫𝐢 𝐡𝐚𝐢 𝐲𝐞 𝐤𝐚𝐡𝐚𝐧𝐢, 𝐭𝐮 𝐡𝐢 𝐛𝐧𝐚 𝐥𝐞 𝐦𝐮𝐣𝐡𝐤𝐨 𝐚𝐩𝐧𝐢 𝐳𝐢𝐧𝐝𝐠𝐚𝐧𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/NnWFjDN2/6682791eff51.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/4nz4yMf2/19c13a8041ca.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐀𝐚𝐣𝐚 𝐚𝐚𝐣𝐚 𝐦𝐞𝐫𝐞 𝐝𝐢𝐥 𝐦𝐞𝐢𝐧, 𝐭𝐮𝐣𝐡𝐞 𝐚𝐩𝐧𝐚 𝐛𝐧𝐚 𝐥𝐮 𝐦𝐚𝐢𝐧 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/RpLjHJ1c/1b2b1cdac206.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/pS6zZGH/34b1b04107a0.jpg", 
                shayri: "💕🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💓  °____\n*𝐇𝐚𝐫 𝐬𝐚𝐧𝐬 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐧𝐚𝐚𝐦 𝐡𝐨, 𝐡𝐚𝐫 𝐝𝐡𝐚𝐫𝐤𝐚𝐧 𝐦𝐞𝐢𝐧 𝐭𝐞𝐫𝐚 𝐩𝐲𝐚𝐫 𝐡𝐨 ♥️🥀*"
            },
            { 
                url: "https://i.ibb.co/gMwjYFpB/1c48ffff9cd1.jpg", 
                shayri: "💖_[[💚🎻-💕❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒💫   💘🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/VW880dx8/74daaaf820d2.jpg", 
                shayri: "🌹💕° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─👑 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐲𝐚𝐚𝐝𝐨𝐧 𝐦𝐞𝐢𝐧 𝐠𝐮𝐳𝐚𝐫𝐭𝐚 𝐡𝐚𝐢 𝐡𝐚𝐫 𝐩𝐚𝐥, 𝐭𝐮𝐣𝐡𝐬𝐞 𝐛𝐢𝐜𝐡𝐡𝐚𝐫 𝐤𝐞 𝐚𝐛 𝐤𝐲𝐚 𝐡𝐚𝐢 𝐡𝐚𝐬𝐢𝐥 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/20qfvzdg/866860737244.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            },
            { 
                url: "https://i.ibb.co/wZ0YZPnt/08015fb6ac69.jpg", 
                shayri: "💖🌸° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🦋┼─👑 - 💕  °____\n*𝐂𝐡𝐚𝐚𝐡𝐞 𝐤𝐢𝐭𝐧𝐚 𝐛𝐡𝐢 𝐫𝐮𝐥𝐚𝐲𝐞 𝐭𝐮 𝐦𝐮𝐣𝐡𝐞, 𝐝𝐢𝐥 𝐭𝐮𝐣𝐡𝐬𝐞 𝐩𝐲𝐚𝐫 𝐤𝐫𝐭𝐚 𝐡𝐚𝐢 ♥️🥺*"
            },
            { 
                url: "https://i.ibb.co/rGjL0pw1/1caf20b8e50f.jpg", 
                shayri: "💗_[[💚🎻-💫❤🐥🎻]]        🍫🌿🐬 -•||\n______🎀🍒🎭   💕🥀😘  ||•^✨- :))•°💖😍^•|"
            },
            { 
                url: "https://i.ibb.co/5Wydtv2R/d9fccf75434f.jpg", 
                shayri: "🌹💫° ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎, 🐼┼─💕 - 💗  °____\n*𝐓𝐞𝐫𝐢 𝐡𝐚𝐧𝐬𝐢 𝐦𝐞 𝐤𝐮𝐜𝐡 𝐭𝐨 𝐛𝐚𝐚𝐭 𝐡𝐚𝐢 𝐣𝐨 𝐡𝐚𝐫 𝐛𝐚𝐚𝐫 𝐦𝐞𝐫𝐚 𝐝𝐢𝐥 𝐜𝐡𝐮𝐫𝐚𝐭𝐢 𝐡𝐚𝐢 ♥️💫*"
            },
            { 
                url: "https://i.ibb.co/tpM0YRB7/9e2ceaaa5759.jpg", 
                shayri: "💘_[[💙🎻-💖❤🐣🎻]]        🍫🌿✨ -•||\n______🎀🌸💕   💓🥀💖  ||•^✨- :))•°😍💘^•|"
            }
        ];
        
        // Random selection
        const randomIndex = Math.floor(Math.random() * girlDp.length);
        const randomItem = girlDp[randomIndex];
        
        // Image fetch
        const axios = require('axios');
        const imageStream = await axios({
            url: randomItem.url,
            method: 'GET',
            responseType: 'stream'
        });
        
        // Final message
        const message = `❥❥══════💙══════❥❥
    ✨ 𝐆𝐈𝐑𝐋 𝐃𝐏 ✨
❥❥══════💙══════❥❥

━━━━━━━━💙💙💙━━━━━━━━
👧 ${randomItem.shayri}
━━━━━━━━💙💙💙━━━━━━━━

   💝 𝐌𝐈𝐒𝐒 𝐀𝐋𝐈𝐘𝐀 💝

❥❥══════💙══════❥❥`;

        return api.sendMessage({
            body: message,
            attachment: imageStream.data
        }, event.threadID, event.messageID);
        
    } catch (error) {
        console.log("Girl command error:", error);
        return api.sendMessage("❌ Error: " + error.message, event.threadID);
    }
};
