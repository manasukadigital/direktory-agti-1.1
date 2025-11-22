
import React, { useState, useMemo } from 'react';
import { MOCK_COMPANIES } from '../constants';
import { CompanyType, Province, Company, Language } from '../types';
import { Search, MapPin, Award, Users, Filter, ArrowRight, X } from 'lucide-react';
import { translations } from '../translations';

interface CompanyListProps {
  onSelectCompany: (company: Company) => void;
  language: Language;
}

const CompanyList: React.FC<CompanyListProps> = ({ onSelectCompany, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<CompanyType | 'ALL'>('ALL');
  const [selectedProvince, setSelectedProvince] = useState<Province | 'ALL'>('ALL');
  const t = translations[language].directory;

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            company.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || company.type === selectedType;
      const matchesProv = selectedProvince === 'ALL' || company.province === selectedProvince;
      return matchesSearch && matchesType && matchesProv;
    });
  }, [searchTerm, selectedType, selectedProvince]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('ALL');
    setSelectedProvince('ALL');
  };

  const hasActiveFilters = searchTerm !== '' || selectedType !== 'ALL' || selectedProvince !== 'ALL';

  return (
    <div className="p-6 space-y-6">
      
      {/* Filters Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer hover:border-brand-400 transition-colors"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
            >
              <option value="ALL">{t.allTypes}</option>
              {Object.values(CompanyType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer hover:border-brand-400 transition-colors"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value as any)}
            >
              <option value="ALL">{t.allRegions}</option>
              {Object.values(Province).map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1 text-sm font-medium border border-transparent hover:border-red-100"
                title={t.resetFilters}
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">{t.resetFilters}</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {t.found} <span className="font-bold text-slate-800">{filteredCompanies.length}</span> {t.companies}
          </div>
        </div>
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 gap-4 animate-fade-in">
        {filteredCompanies.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">{t.noResults}</p>
                {hasActiveFilters && (
                    <button 
                        onClick={clearFilters}
                        className="mt-4 text-brand-600 hover:text-brand-700 font-medium text-sm hover:underline"
                    >
                        {t.resetFilters}
                    </button>
                )}
            </div>
        ) : (
            filteredCompanies.map(company => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onSelect={() => onSelectCompany(company)} 
              t={t}
            />
            ))
        )}
      </div>
    </div>
  );
};

const CompanyCard: React.FC<{ company: Company; onSelect: () => void; t: any }> = ({ company, onSelect, t }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-brand-300 transition-all hover:shadow-md flex flex-col md:flex-row gap-6 group">
      <div className="flex-grow space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 
              onClick={onSelect}
              className="text-xl font-bold text-slate-800 cursor-pointer hover:text-brand-600 transition-colors"
            >
              {company.name}
            </h3>
            {company.verified && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium border border-green-200">
                {t.verified}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-wide">
            {company.type}
          </span>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed">
          {company.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-500" />
            {company.city}, {company.province}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-500" />
            {company.employees.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-500" />
            {company.certifications.slice(0, 3).join(", ")}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          <span className="text-xs font-medium text-slate-400 uppercase mr-2 mt-1">{t.keyMarkets}</span>
          {company.exportMarkets.map(m => (
            <span key={m} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
              {m}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-start md:items-end min-w-[200px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-2">
        <div className="text-right hidden md:block">
            <p className="text-xs text-slate-400 uppercase">{t.capacity}</p>
            <p className="font-semibold text-slate-700">{company.capacity}</p>
        </div>
        <button 
          onClick={onSelect}
          className="w-full md:w-auto bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent"
        >
            {t.viewProfile}
            <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CompanyList;
