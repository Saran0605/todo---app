import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Todo from './models/Todo.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const PASSWORD = "XMhIhRgcvfAGeMJW";
const DATABASE_NAME = 'todo';
const CONNECTION_URI = `mongodb+srv://database.sskxbrh.mongodb.net/?retryWrites=true&w=majority&appName=database`;

mongoose.set('debug', true);

async function connectToMongoDB() {
  try {
    await mongoose.connect(CONNECTION_URI, {
      dbName: DATABASE_NAME,
      user: 'Pret_05',
      pass: PASSWORD,
    });
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToMongoDB();

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  if (completed === true) {
    await Todo.findByIdAndDelete(id);
    return res.json({ deleted: true });
  }
  const todo = await Todo.findByIdAndUpdate(
    id,
    { $set: { text } },
    { new: true }
  );
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 