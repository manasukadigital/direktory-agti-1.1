export enum CompanyType {
  GARMENT = 'Garment Manufacturer',
  TEXTILE = 'Textile Mill',
  SPINNING = 'Spinning Mill',
  ACCESSORIES = 'Accessories Supplier'
}

export enum Province {
  WEST_JAVA = 'Jawa Barat',
  CENTRAL_JAVA = 'Jawa Tengah',
  EAST_JAVA = 'Jawa Timur',
  BANTEN = 'Banten',
  DKI = 'DKI Jakarta',
  BALI = 'Bali'
}

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  province: Province;
  city: string;
  capacity: string; // e.g., "500,000 pcs/month"
  employees: number;
  certifications: string[];
  exportMarkets: string[];
  specialization: string;
  description: string;
  contactEmail: string;
  phone: string; // WhatsApp enabled phone number
  verified: boolean;
}

export interface FilterState {
  search: string;
  type: CompanyType | 'ALL';
  province: Province | 'ALL';
}

export interface ChartData {
  name: string;
  value: number;
}

export type Language = 'id' | 'en';