import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCountryName = (countrySlug: string | undefined) => {
  switch (countrySlug?.toLowerCase()) {
    case 'us':
      return 'United States';
    case 'in':
      return 'India';
    case 'ca':
      return 'Canada';
    case 'uk':
      return 'United Kingdom';
    default:
      return countrySlug?.toUpperCase() || '';
  }
};

export const getCountryFlag = (countrySlug: string | undefined) => {
  switch (countrySlug?.toLowerCase()) {
    case 'us':
      return '/us-flag.png';
    case 'in':
      return '/india-flag.png';
    case 'ca':
      return '/canada-flag.png';
    case 'uk':
      return '/uk-flag.png';
    default:
      return '/default-flag.png';
  }
};

export const getScoreColor = (score: number) => {
  if (score >= 9) return 'bg-[#009246]';
  if (score >= 7) return 'bg-[#009246]';
  if (score >= 5) return 'bg-[#E95959]';
  return 'bg-[#FDA15A]';
};
