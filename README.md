# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend Setup (Node.js + Express + MongoDB)

1. Go to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Open `server.js` and replace `<YOUR_CONNECTION_STRING>` with your MongoDB Compass connection string.
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:5000` by default.

API Endpoints:
- `GET    /api/todos`         – List all todos
- `POST   /api/todos`         – Add a new todo (body: `{ text: "..." }`)
- `PUT    /api/todos/:id`     – Update a todo (body: `{ text, completed }`)
- `DELETE /api/todos/:id`     – Delete a todo
