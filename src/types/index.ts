export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    city: string;
    state: string;
    imagePath: string;
    profileLink: string;
    slug: string;
    source: string;
    specialty_url: string;
    specialties?: string;
  }
  
  export interface Report {
    success: boolean;
    positiveComments: {
      first: { author?: string, comment: string; date: string };
      second: {author?: string, comment: string; date: string };
    };
    negativeComment: {author?: string, comment: string; date: string };
    insights: string[];
    summary: string;
  }