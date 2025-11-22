import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, LabelList 
} from 'recharts';
import { MOCK_COMPANIES } from '../constants';
import { CompanyType, Province, Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Award, CheckCircle, Leaf } from 'lucide-react';

const COLORS = ['#0ea5e9', '#0369a1', '#0c4a6e', '#38bdf8', '#bae6fd', '#64748b'];

interface DashboardProps {
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = translations[language].dashboard;
  
  // Calculate Stats
  const totalCompanies = MOCK_COMPANIES.length;
  const totalEmployees = MOCK_COMPANIES.reduce((acc, curr) => acc + curr.employees, 0);

  // Compliance Stats Breakdown
  const iso9001Count = MOCK_COMPANIES.filter(c => c.certifications.some(cert => cert.includes('ISO 9001'))).length;
  const sniWajibCount = MOCK_COMPANIES.filter(c => c.certifications.some(cert => cert.includes('SNI Wajib'))).length;
  const sniSukarelaCount = MOCK_COMPANIES.filter(c => c.certifications.some(cert => cert.includes('SNI Sukarela'))).length;
  const oekoCount = MOCK_COMPANIES.filter(c => c.certifications.some(cert => cert.includes('OEKO-TEX'))).length;

  // Data for Bar Chart (Industry Composition)
  const typeData = Object.values(CompanyType).map(type => {
    // Shorten labels for better chart readability
    let shortName = type.toString();
    if (type === CompanyType.GARMENT) shortName = 'Garment';
    if (type === CompanyType.TEXTILE) shortName = 'Textile';
    if (type === CompanyType.SPINNING) shortName = 'Spinning';
    if (type === CompanyType.ACCESSORIES) shortName = 'Accessories';

    return {
      name: shortName,
      fullName: type, // Keep original name for tooltip
      value: MOCK_COMPANIES.filter(c => c.type === type).length
    };
  }).filter(d => d.value > 0);

  // Data for Bar Chart (Distribution by Province)
  const provinceData = Object.values(Province).map(prov => ({
    name: prov,
    value: MOCK_COMPANIES.filter(c => c.province === prov).length
  })).filter(d => d.value > 0).sort((a,b) => b.value - a.value);

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Top Row: Major Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t.totalMembers}</h3>
            <p className="text-4xl font-bold text-brand-900 mt-2">{totalCompanies}</p>
            <span className="text-xs text-green-600 font-medium">{t.activeRegistry}</span>
          </div>
          <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-brand-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t.totalWorkforce}</h3>
            <p className="text-4xl font-bold text-brand-500 mt-2">{totalEmployees.toLocaleString()}</p>
            <span className="text-xs text-slate-400">{t.registeredEmployees}</span>
          </div>
           <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-brand-500" />
          </div>
        </div>
      </div>

      {/* Compliance Breakdown Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-slate-500 text-xs font-bold uppercase">{t.iso9001}</h3>
            </div>
            <p className="text-2xl font-bold text-slate-800">{iso9001Count}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-red-500">
            <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-red-500" />
                <h3 className="text-slate-500 text-xs font-bold uppercase">{t.sniMandatory}</h3>
            </div>
            <p className="text-2xl font-bold text-slate-800">{sniWajibCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-orange-500" />
                <h3 className="text-slate-500 text-xs font-bold uppercase">{t.sniVoluntary}</h3>
            </div>
            <p className="text-2xl font-bold text-slate-800">{sniSukarelaCount}</p>
        </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-green-600">
            <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-green-600" />
                <h3 className="text-slate-500 text-xs font-bold uppercase">{t.oekoTex}</h3>
            </div>
            <p className="text-2xl font-bold text-slate-800">{oekoCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Composition Chart (Tube/Bar Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">{t.industryComposition}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={typeData}
                margin={{
                  top: 30, // Added top margin for value labels
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                    dataKey="name" 
                    tick={{fontSize: 12, fill: '#475569', fontWeight: 500}} 
                    interval={0}
                    // Removed angle to make text straight and readable
                    textAnchor="middle"
                />
                <YAxis hide />
                <RechartsTooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                    formatter={(value: number, name: string, props: any) => [value, props.payload.fullName]}
                />
                <Bar dataKey="value" radius={[20, 20, 0, 0]} barSize={50}>
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="top" fill="#334155" fontSize={14} fontWeight="bold" offset={5} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">{t.regionalDistribution}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={provinceData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" fill="#0369a1" radius={[0, 4, 4, 0]} barSize={30}>
                    <LabelList dataKey="value" position="right" fill="#64748b" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;