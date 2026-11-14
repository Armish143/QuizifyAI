const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-quiz', (req, res) => {
  const { topic = 'sample', count = 3 } = req.body || {};
  const cnt = Math.max(1, Math.min(50, parseInt(count) || 3));
  const questions = Array.from({ length: cnt }).map((_, i) => ({
    question: `Sample question ${i + 1} about ${topic}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: 0,
    explanation: 'This is a mock explanation for demo purposes.'
  }));
  res.json({ questions });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
