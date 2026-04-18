import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './features/marketing/pages/LandingPage';
import LoginPage from './features/auth/pages/LoginPage';
import RegistrationPage from './features/auth/pages/RegistrationPage';
import UserProfilePage from './features/profile/pages/UserProfilePage';
import Dashboard from './features/dashboard/pages/DashboardPage';
import SettingsPage from './features/dashboard/pages/SettingsPage';
import ContactPage from './features/static/pages/ContactPage';
import PrivacyPage from './features/static/pages/PrivacyPage';
import TermsPage from './features/static/pages/TermsPage';

export function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
        }} 
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/:username" element={<UserProfilePage />} />
        
        {/* Protected Routes placeholder */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Static Pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
