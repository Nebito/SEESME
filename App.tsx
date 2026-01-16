
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Publications from './pages/Publications';
import News from './pages/News';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'publications':
        return <Publications />;
      case 'news':
        return <News />;
      case 'resources':
        return <Resources />;
      case 'careers':
        return <Careers />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      <ChatBot />
    </Layout>
  );
};

export default App;
