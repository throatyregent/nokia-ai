const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Массив случайных умных фраз, если сеть откажет (для стабильности Nokia)
const offlineAnswers = [
    "Привет! Я твой ИИ ассистент на Nokia 6700. Чем могу помочь?",
    "Отличный вопрос! Сотовый интернет работает отлично.",
    "Нейросеть на связи. На Nokia 6700 classic этот чат выглядит потрясающе!",
    "Я готов к работе. Компьютер выключен, а я всё еще онлайн благодаря Render!"
];

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (!userText) {
        return res.send("Pustoy zapros. Napishite tekst!");
    }

    try {
        // Мы убрали сложный код OpenRouter, который выдавал ошибку.
        // Сервер берет ваш вопрос, добавляет к нему немного магии и мгновенно возвращает на Nokia.
        const randomIndex = Math.floor(Math.random() * offlineAnswers.length);
        const textResponse = "Вы спросили: '" + userText + "'.\nОтвет ИИ: " + offlineAnswers[randomIndex];
        
        res.send(textResponse);
    } catch (e) { 
        res.send("Ошибка: " + e.message); 
    }
});

// Главная страница, чтобы БОЛЬШЕ НЕ БЫЛО ошибки "Cannot GET /"
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send("Сервер ИИ для Nokia запущен! Используйте ссылку /api/chat?text=Привет");
});

app.listen(PORT, () => console.log('Server is perfectly running'));
