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
import { InspectPage } from './features/shared/components/InspectPage';
import { InspectTool } from './features/shared/components/InspectTool';

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
        <Route path="/" element={<InspectPage name="LandingPage" route="/"><LandingPage /></InspectPage>} />
        <Route path="/login" element={<InspectPage name="LoginPage" route="/login"><LoginPage /></InspectPage>} />
        <Route path="/register" element={<InspectPage name="RegistrationPage" route="/register"><RegistrationPage /></InspectPage>} />
        <Route path="/:username" element={<InspectPage name="UserProfilePage" route="/:username"><UserProfilePage /></InspectPage>} />
        
        {/* Protected Routes placeholder */}
        <Route path="/dashboard" element={<InspectPage name="DashboardPage" route="/dashboard"><Dashboard /></InspectPage>} />
        <Route path="/settings" element={<InspectPage name="SettingsPage" route="/settings"><SettingsPage /></InspectPage>} />
        
        {/* Static Pages */}
        <Route path="/contact" element={<InspectPage name="ContactPage" route="/contact"><ContactPage /></InspectPage>} />
        <Route path="/privacy" element={<InspectPage name="PrivacyPage" route="/privacy"><PrivacyPage /></InspectPage>} />
        <Route path="/terms" element={<InspectPage name="TermsPage" route="/terms"><TermsPage /></InspectPage>} />
      </Routes>
      <InspectTool />
    </BrowserRouter>
  );
}

export default App;
