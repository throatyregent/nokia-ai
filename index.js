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

        const authHeader = "Bearer " + apiKey.trim();

        const response = await axios.post('https://openrouter.ai', {
            // МЫ ВЫБРАЛИ КОНКРЕТНУЮ СТАБИЛЬНУЮ БЕСПЛАТНУЮ МОДЕЛЬ:
            model: "meta-llama/llama-3.2-3b-instruct:free", 
            messages: [{ role: "user", content: userText }]
        }, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });
        
        // Проверяем, пришел ли ответ от конкретной модели
        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            const aiReply = response.data.choices[0].message.content;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.send(aiReply);
        } else {
            res.send("ИИ вернул пустую структуру. Ответ сервера: " + JSON.stringify(response.data));
        }
    } catch (e) { 
        res.send("Ошибка сервера: " + e.message); 
    }
});

app.listen(PORT, () => console.log('Server is running'));
