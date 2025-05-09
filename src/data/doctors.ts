export interface Doctor {
    id: number;
    doctorName: string;
    countryFlag: string;
    specialistIn: string;
    countryState: string;
    score: number;
    reviews: number;
    experience: number;
}

export const doctors: Doctor[] = [
    {
        id: 1,
        doctorName: "Dr. John Smith",
        countryFlag: "/flags/usa.svg",
        specialistIn: "Cardiology",
        countryState: "New York, USA",
        score: 9,
        reviews: 125,
        experience: 15
    },
    {
        id: 2,
        doctorName: "Dr. Sarah Johnson",
        countryFlag: "/flags/uk.svg",
        specialistIn: "Neurology",
        countryState: "London, UK",
        score: 8,
        reviews: 98,
        experience: 12
    },
    {
        id: 3,
        doctorName: "Dr. Michael Chen",
        countryFlag: "/flags/canada.svg",
        specialistIn: "Pediatrics",
        countryState: "Toronto, Canada",
        score: 2,
        reviews: 156,
        experience: 18
    },
    {
        id: 4,
        doctorName: "Dr. Michael Chen",
        countryFlag: "/flags/canada.svg",
        specialistIn: "Pediatrics",
        countryState: "Toronto, Canada",
        score: 5,
        reviews: 156,
        experience: 18
    },
];  