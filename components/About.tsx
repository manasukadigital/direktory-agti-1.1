import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Globe, Users, Database } from 'lucide-react';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language].about;

  return (
    <div className="p-6 space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-brand-900 p-8 md:p-12 text-center relative overflow-hidden">
           {/* Decorative bg pattern */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
           
           <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
             {t.title}
           </h1>
           <p className="text-brand-100 text-lg max-w-2xl mx-auto leading-relaxed relative z-10">
             {t.subtitle}
           </p>
        </div>
        
        <div className="p-8 md:p-10">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            {t.description}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 transition-colors">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.feature1Title}</h3>
          <p className="text-slate-600">{t.feature1Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 transition-colors">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.feature2Title}</h3>
          <p className="text-slate-600">{t.feature2Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 transition-colors">
           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.feature3Title}</h3>
          <p className="text-slate-600">{t.feature3Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 transition-colors">
           <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.feature4Title}</h3>
          <p className="text-slate-600">{t.feature4Desc}</p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-brand-50 rounded-xl p-8 border border-brand-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-brand-900 mb-3 uppercase tracking-wide border-b border-brand-200 pb-2 inline-block">
              {t.visionTitle}
            </h3>
            <p className="text-slate-700 italic text-lg">
              "{t.vision}"
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-900 mb-3 uppercase tracking-wide border-b border-brand-200 pb-2 inline-block">
              {t.missionTitle}
            </h3>
            <p className="text-slate-700">
              {t.mission}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;