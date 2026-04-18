import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { CurationSection } from './components/sections/CurationSection';
import { MenuDiscovery } from './components/sections/MenuDiscovery';
import { WhyLocalsSection } from './components/sections/WhyLocalsSection';
import { EditorialStory } from './components/sections/EditorialStory';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { VisitSection } from './components/sections/VisitSection';
import { MobileCTA } from './components/layout/MobileCTA';
import { ToastContainer } from './components/ui/Toast';
import { UnifiedServiceModal } from './components/ui/UnifiedServiceModal';
import { MenuDownloadModal } from './components/ui/MenuDownloadModal';

// Admin Imports
import { AdminLayout } from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import BookingManager from './pages/admin/BookingManager';
import MenuManager from './pages/admin/MenuManager';

const HomePage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <CurationSection />
      <MenuDiscovery />
      <WhyLocalsSection />
      <EditorialStory />
      <VisitSection />
      <ReviewsSection />
    </main>
    <Footer />
    <MobileCTA />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><BookingManager /></AdminLayout>} />
        <Route path="/admin/menu" element={<AdminLayout><MenuManager /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="p-12 text-white/40 font-bold">Settings Module Under Construction</div></AdminLayout>} />
      </Routes>

      <ToastContainer />
      <UnifiedServiceModal />
      <MenuDownloadModal />
    </div>
  );
}

export default App;
