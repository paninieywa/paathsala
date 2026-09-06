import { Calculator, Landmark, Stethoscope, Atom, Banknote, TrainFront, Shield } from 'lucide-react';

export type ExamMeta = {
  icon: typeof Calculator;
  description: string;
};

export const examMeta: Record<string, ExamMeta> = {
  'ssc-cgl': { icon: Calculator, description: 'Staff Selection Commission — Combined Graduate Level' },
  'upsc-cse': { icon: Landmark, description: 'Civil Services Examination for IAS, IPS, and more' },
  neet: { icon: Stethoscope, description: 'National Eligibility cum Entrance Test for medicine' },
  'jee-main': { icon: Atom, description: 'Engineering entrance — NITs, IIITs, and CFTIs' },
  'jee-adv': { icon: Atom, description: 'Engineering entrance — the IITs' },
  'ibps-po': { icon: Banknote, description: 'Probationary Officer exam for public sector banks' },
  'sbi-po': { icon: Banknote, description: 'Probationary Officer exam for State Bank of India' },
  'rrb-ntpc': { icon: TrainFront, description: 'Non-Technical Popular Categories — Indian Railways' },
  nda: { icon: Shield, description: 'National Defence Academy entrance exam' },
  cds: { icon: Shield, description: 'Combined Defence Services entrance exam' },
};
