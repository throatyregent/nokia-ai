const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.send("Pustoy zapros");
    try {
        const response = await axios.post('https://openrouter.ai', {
            model: "deepseek/deepseek-chat-v3-0324:free", 
            messages: [{ role: "user", content: userText }]
        }, {
            headers: {
                // ВНИМАНИЕ: Замените слово СЮДА_ВСТАВИТЬ_КЛЮЧ на ваш реальный ключ из Шага 1!
                // Слово Bearer и пробел после него удалять НЕЛЬЗЯ!
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(response.data.choices.message.content);
    } catch (e) { 
        res.send("Error: " + e.message); 
    }
});

app.listen(PORT, () => console.log('Server is running'));
