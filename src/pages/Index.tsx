
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [influencerData, setInfluencerData] = useState(null);

  const handleLogin = (userData) => {
    setInfluencerData(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInfluencerData(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard 
          influencerData={influencerData} 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Index;
