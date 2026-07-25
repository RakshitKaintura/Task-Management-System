# TaskFlow - Smart Task Management System

![TaskFlow Dashboard](https://task-management-system-inky-nine.vercel.app/dashboard) <!-- You can replace this with an actual screenshot link -->

**Live Demo:** [https://task-management-system-inky-nine.vercel.app](https://task-management-system-inky-nine.vercel.app)

TaskFlow is a modern, AI-powered task management application designed to help you organize your daily life and workflows. Built with a stunning, highly responsive user interface, it features everything from traditional Kanban boards and calendar views to AI-driven task breakdowns.

## 🚀 Features

- **🧠 Smart AI Integration:** Automatically generate step-by-step breakdowns for complex tasks using Google Gemini AI.
- **📊 Analytics Dashboard:** Get a bird's-eye view of your productivity with real-time statistics and recent activity tracking.
- **📋 Interactive Kanban Board:** Organize tasks visually by their status (To Do, In Progress, Completed).
- **📅 Calendar View:** Track due dates effortlessly with an integrated monthly calendar.
- **🔐 Secure Authentication:** Full user registration, login, and secure session management using JWT and bcrypt.
- **🎨 Modern UI/UX:** Built with beautifully styled components, smooth animations (Framer Motion), and full Dark/Light mode support.
- **🔍 Advanced Filtering:** Search and filter your tasks by priority, category, and status.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Base UI / Custom Shadcn-inspired components
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **AI Integration:** Google Gemini AI API
- **Icons:** [Lucide React](https://lucide.dev/)

## 💻 Getting Started (Local Development)

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB account and database cluster
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/smart_task_management_system.git
   cd smart_task_management_system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   
   # JWT Secret for Authentication
   SESSION_SECRET=your_super_secret_jwt_key
   
   # Google Gemini API Key for AI Features
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).
1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add your Environment Variables in the Vercel project settings.
4. Deploy!

## 📄 License

This project is open-source and available under the MIT License.
