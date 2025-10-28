HNG Task 3 compliance:

🎟️ HNG Task 3 — TicketApp (React Version)

A multi-framework Ticket Management Web App built using React + Vite + Tailwind CSS 4.
This project implements the React version of the HNG Stage 2 Task — providing a consistent layout, authentication, and ticket CRUD functionality as required.

Repository: https://github.com/chapter-codes/hng-13-task-3-react
🌐 Live Demo: https://hng-13-task-3-react.vercel.app

📦 Vue Version: https://github.com/chapter-codes/hng-13-task-3-vue
🌐 Live Demo: https://hng-13-task-3-vue.vercel.app

Twig Version: https://github.com/chapter-codes/hng-13-task-3-twig
🌐 Live Demo: https://scared-genius.github.io/twig-build


🧰 Frameworks & Libraries Used
Category	Tool
Frontend Framework	React 19

Routing	React Router DOM 6

Styling	Tailwind CSS 4

Build Tool	Vite 7

Notifications	React Hot Toast

Linting	ESLint 9 + React Refresh Plugin
🚀 Setup & Development
1️⃣ Clone the repository
git clone https://github.com/chapter-codes/hng-13-task-3-react.git
cd hng-13-task-3-react

2️⃣ Install dependencies
npm install

3️⃣ Run in development mode
npm run dev


Then open http://localhost:5173
 in your browser.

4️⃣ Build for production
npm run build

5️⃣ Preview the production build
npm run preview

🧱 Project Structure
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── common/
│       └── CustomSection.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Dashboard.jsx
│   └── Tickets.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── utils.js
└── main.jsx


Landing Page: Includes hero with SVG wave, feature boxes, and CTA buttons.

Auth Pages: Handle simulated login/signup via localStorage.

Dashboard: Displays ticket stats and links to Ticket Management.

Tickets Page: Full CRUD with form validation and toasts.

🔐 Authentication

Authentication simulated via localStorage key: ticketapp_session.

Protected routes redirect unauthenticated users to /auth/login.

Logout clears session and redirects to Landing.

Example test user:

email: test@ticketapp.com
password: password123

🧮 Ticket Management (CRUD)

Create: Add new ticket with title, status, and description.

Read: View tickets in card layout with status color tags.

Update: Edit ticket fields with validation.

Delete: Confirm before deleting.

Status Color Rules:

Status	Color
open	Green
in_progress	Amber
closed	Gray
📱 Responsive Design

Max-width: 1440px, centered layout.

Mobile-first grid adjustments.

Consistent spacing and shadowed cards.

Semantic HTML and accessible colors.

♿ Accessibility

Proper alt attributes on images.

Semantic tags (<header>, <section>, <footer>).

Visible focus outlines.

Color contrast checked for readability.

🧩 Known Issues

No backend — authentication is simulated locally.

Refreshing protected pages clears transient state (expected behavior).

🔗 Other Implementations



© 2025 — HNG Stage 2 Task by chapter-codes