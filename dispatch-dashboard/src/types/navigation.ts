import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/** Generic Lucide-style icon component type — avoids runtime import from lucide-react */
export type IconComponent = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>;

export type UserRole = 'admin' | 'customer' | 'vendor' | 'rider' | 'fleet_owner' | 'agent';

export interface NavTab {
  id: string;
  label: string;
  icon: IconComponent;
  path: string;
}

export interface AuthViewState {
  mode: 'login' | 'signup';
}
