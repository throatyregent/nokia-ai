const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.send("Pustoy zapros");
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            // Самый правильный автоматический выбор БЕСПЛАТНОЙ модели на сегодня
            model: "openrouter/free", 
            messages: [{ role: "user", content: userText }]
        }, {
            headers: {
                // ВНИМАНИЕ: Замените фразу после Bearer на ваш реальный ключ!
                'Authorization': 'Bearer ВАШ_КЛЮЧ_ОТ_OPENROUTER',
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data && response.data.choices && response.data.choices[0]) {
            const aiReply = response.data.choices[0].message.content;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.send(aiReply);
        } else {
            res.send("ИИ вернул пустой ответ. Проверьте ваш API-ключ в index.js.");
        }
    } catch (e) { 
        res.send("Ошибка сервера: " + e.message); 
    }
});

app.listen(PORT, () => console.log('Server is running'));
