
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { AdminDashboard } from "@/components/AdminDashboard";

const Index = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'admin', 'influencer'
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('influencer');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setSelectedInfluencer(null);
  };

  const handleSelectInfluencer = (influencerData) => {
    setSelectedInfluencer(influencerData);
    setCurrentView('influencer');
  };

  const handleBackToAdmin = () => {
    setSelectedInfluencer(null);
    setCurrentView('admin');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentView === 'login' && (
        <LoginForm onLogin={handleLogin} />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard 
          onLogout={handleLogout}
          onSelectInfluencer={handleSelectInfluencer}
        />
      )}
      
      {currentView === 'influencer' && (
        <Dashboard 
          influencerData={selectedInfluencer || user} 
          onLogout={user?.role === 'admin' ? handleBackToAdmin : handleLogout}
          isAdminView={user?.role === 'admin'}
        />
      )}
    </div>
  );
};

export default Index;
