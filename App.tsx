
import React, { useState } from 'react';
import { LayoutDashboard, Building2, MessageSquareText, Menu, X, LogOut, Globe, Info } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import AiAnalyst from './components/AiAnalyst';
import About from './components/About';
import { Company, Language } from './types';
import { translations } from './translations';

type View = 'dashboard' | 'directory' | 'ai' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('id');

  const t = translations[language];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setSelectedCompany(null); // Reset selected company when changing main views
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard language={language} />;
      case 'directory': 
        if (selectedCompany) {
            return <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} language={language} />;
        }
        return <CompanyList onSelectCompany={(company) => setSelectedCompany(company)} language={language} />;
      case 'ai': return <AiAnalyst language={language} />;
      case 'about': return <About language={language} />;
      default: return <Dashboard language={language} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View, icon: any, label: string }) => (
    <button
      onClick={() => handleViewChange(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        currentView === view && !selectedCompany 
          ? 'bg-brand-700 text-white shadow-lg shadow-brand-900/20' 
          : (currentView === view && selectedCompany)
            ? 'bg-brand-800/50 text-sky-200' // Active parent state but showing child
            : 'text-slate-300 hover:bg-brand-800 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-sky-300' : 'text-slate-400 group-hover:text-white'}`} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-brand-900 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-brand-600 rounded-lg flex items-center justify-center shadow-inner">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">{t.sidebar.memberTitle}</h1>
              <p className="text-xs text-sky-300">2026</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-4 px-4 pt-2">
            {t.sidebar.mainMenu}
          </div>
          <NavItem view="dashboard" icon={LayoutDashboard} label={t.sidebar.dashboard} />
          <NavItem view="directory" icon={Building2} label={t.sidebar.directory} />
          <NavItem view="ai" icon={MessageSquareText} label={t.sidebar.ai} />
          <NavItem view="about" icon={Info} label={t.sidebar.about} />
        </nav>

        <div className="p-4 border-t border-brand-800 bg-brand-950/50">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.sidebar.adminUser}</p>
              <p className="text-xs text-brand-400 truncate">admin@agti.or.id</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-8 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <h2 className="text-xl font-semibold text-slate-800">
              {currentView === 'dashboard' && t.dashboard.title}
              {currentView === 'directory' && !selectedCompany && t.directory.title}
              {currentView === 'directory' && selectedCompany && t.detail.overview}
              {currentView === 'ai' && t.ai.title}
              {currentView === 'about' && t.about.title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             {/* Language Toggle */}
             <button 
              onClick={() => setLanguage(prev => prev === 'en' ? 'id' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200 text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'EN' : 'ID'}
            </button>

            <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
              <div className="h-4 w-px bg-slate-300"></div>
              <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-100">{t.dashboard.systemOnline}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;