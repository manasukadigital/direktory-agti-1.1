import React from 'react';
import { Company, Language } from '../types';
import { ArrowLeft, MapPin, Users, Award, Globe, Factory, Mail, ShieldCheck, MessageCircle, Phone } from 'lucide-react';
import { translations } from '../translations';

interface CompanyDetailProps {
  company: Company;
  onBack: () => void;
  language: Language;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack, language }) => {
  const t = translations[language].detail;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-700 transition-colors font-medium mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.back}
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-brand-800 to-brand-600 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                <Factory className="w-12 h-12 text-brand-600" />
            </div>
            <div className="mt-4 md:mt-0 flex-grow md:ml-6">
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-slate-900">{company.name}</h1>
                    {company.verified && (
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-green-200">
                            <ShieldCheck className="w-3 h-3" /> {t.verifiedMember}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {company.city}, {company.province}
                    </span>
                    <span className="hidden md:inline text-slate-300">|</span>
                    <span className="uppercase font-semibold tracking-wider text-brand-600">{company.type}</span>
                </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <a 
                    href={`https://wa.me/${company.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <MessageCircle className="w-4 h-4" />
                    {t.chatWa}
                </a>
                <a 
                    href={`mailto:${company.contactEmail}`}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Mail className="w-4 h-4" />
                    {t.email}
                </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Info */}
            <div className="lg:col-span-2 space-y-8">
                <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        {t.overview}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {company.description}
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.specialization}</h4>
                        <p className="font-medium text-slate-800">{company.specialization}</p>
                     </div>
                     <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{t.primaryEmail}</h4>
                            <p className="font-medium text-brand-600 flex items-center gap-2">
                                <Mail className="w-3 h-3" /> {company.contactEmail}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{t.contactNumber}</h4>
                            <p className="font-medium text-slate-700 flex items-center gap-2">
                                <Phone className="w-3 h-3" /> +{company.phone}
                            </p>
                        </div>
                     </div>
                </div>

                <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-brand-500" />
                        {t.exportMarkets}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {company.exportMarkets.map((market, idx) => (
                            <span key={idx} className="bg-blue-50 text-brand-700 px-4 py-2 rounded-lg font-medium border border-blue-100 flex items-center gap-2">
                                <Globe className="w-3 h-3" /> {market}
                            </span>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column: Stats & Certs */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t.productionStats}</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{t.workforce}</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{company.employees.toLocaleString()}</p>
                        </div>
                        <div className="w-full h-px bg-slate-100"></div>
                        <div>
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                <Factory className="w-4 h-4" />
                                <span className="text-sm">{t.monthlyCapacity}</span>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{company.capacity}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t.compliance}</h3>
                    <div className="space-y-3">
                        {company.certifications.map((cert, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <Award className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="font-medium text-slate-700">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;