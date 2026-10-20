const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.send("Pustoy zapros");
    try {
        const apiKey = process.env.MY_AI_KEY;
        if (!apiKey) return res.send("Oshibka: Klyuch ne nastroen v paneli Render!");

        // Исправленный и самый надежный способ передачи заголовка:
        const authHeader = "Bearer " + apiKey.trim();

        const response = await axios.post('https://openrouter.ai', {
            model: "openrouter/free", 
            messages: [{ role: "user", content: userText }]
        }, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data && response.data.choices && response.data.choices[0]) {
            const aiReply = response.data.choices[0].message.content;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.send(aiReply);
        } else {
            res.send("ИИ вернул пустой ответ. Проверьте лимиты аккаунта.");
        }
    } catch (e) { 
        res.send("Ошибка сервера: " + e.message); 
    }
});

app.listen(PORT, () => console.log('Server is running'));
