# Family Legal Rights Awareness Platform

The **Family Legal Rights Awareness Platform** is a comprehensive web application designed to educate and guide families on various legal rights, including marriage, children, property, and welfare. The platform provides essential resources, interactive tools, and a secure space for users to seek expert advice and report issues.

## Key Features

### 1. **Authentication System**
- Secure login/signup functionality using **Supabase**.
- Protected routes ensure features are accessible only to authenticated users.
- Persistent user session management.

### 2. **Navigation**
- Responsive and clean navigation bar.
- Dynamic menu items based on user authentication status.
- Easy access to core features like Resources, Community, Consultations, and Report Portal.

### 3. **Home Page**
- Showcases featured categories for legal resources.
- Quick access to main features via intuitive call-to-action elements.

### 4. **Database Schema**
- **Reports Table**: Stores user-submitted cases.
- **Consultations System**: Manages expert booking details.
- **Experts Management**: Facilitates expert profiles.
- **Forum Posts**: Supports community discussions.
- Comprehensive security policies (RLS) ensure data safety.

### 5. **Resources Page**
- Categorized legal resources with articles and estimated read times.
- Call-to-action buttons for booking consultations.

### 6. **Community Page**
- Create and list forum posts.
- Category-based discussions for better topic organization.
- Interactive features like likes and replies.

### 7. **Consultations Page**
- Expert profiles with detailed information.
- Booking system for selecting dates and times.
- User-friendly consultation management interface.

### 8. **Report Portal**
- Secure case submission form for users to report problems.
- Ability to track the status of submitted reports.
- Historical view of all submitted reports.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Supabase (Authentication and Database Management)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd family-legal-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure your **Supabase** keys:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- **Start development server**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Preview production build**:
  ```bash
  npm run preview
  ```
- **Lint code**:
  ```bash
  npm run lint
  ```

## Dependencies

### Main Dependencies:
- [@supabase/supabase-js](https://github.com/supabase/supabase-js)
- [react](https://reactjs.org/)
- [react-dom](https://reactjs.org/)
- [react-router-dom](https://reactrouter.com/)
- [lucide-react](https://lucide.dev/)

### Development Dependencies:
- [vite](https://vitejs.dev/)
- [eslint](https://eslint.org/)
- [tailwindcss](https://tailwindcss.com/)
- [typescript](https://www.typescriptlang.org/)

## Folder Structure

```plaintext
src/
├── components/      # Reusable components (e.g., Navbar, Footer)
├── pages/           # Application pages (Home, Resources, Community, etc.)
├── services/        # Supabase client and utility functions
├── styles/          # Global styles (Tailwind configurations)
├── App.tsx          # Main application entry point
└── index.tsx        # React DOM rendering
```

## Future Enhancements

- Multi-language support for global accessibility.
- Advanced filtering options for resources and consultations.
- Real-time notifications for report updates and consultation reminders.
- Mobile-friendly PWA (Progressive Web App) version.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
