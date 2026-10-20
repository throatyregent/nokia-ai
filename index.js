const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.send("Pustoy zapros");
    try {
        const response = await axios.post('https://openrouter.ai', {
            // Это актуальная и 100% БЕСПЛАТНАЯ модель от Google на OpenRouter
            model: "google/gemini-2.5-flash:free", 
            messages: [{ role: "user", content: userText }]
        }, {
            headers: {
                // НЕ ЗАБУДЬТЕ: Замените слово ВАШ_КЛЮЧ на ваш длинный ключ OpenRouter из Шага 1
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });
        
        // Надежная проверка ответа, чтобы сервер больше не падал с ошибкой
        if (response.data && response.data.choices && response.data.choices[0]) {
            const aiReply = response.data.choices[0].message.content;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.send(aiReply);
        } else {
            res.send("ИИ вернул пустой ответ. Проверьте ваш API-ключ.");
        }
    } catch (e) { 
        res.send("Ошибка сервера: " + e.message); 
    }
});

app.listen(PORT, () => console.log('Server is running'));
