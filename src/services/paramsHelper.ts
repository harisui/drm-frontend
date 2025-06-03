// Helpers for parameter extraction and API calls
import { Report } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Extract parameters from the URL.
 * @returns Parsed parameters object
 */
export const extractParamsFromUrl = (): {
    _spt: string;
    _spt_slug: string;
    _nme: string;
    _ct: string;
    _st: string;
    _rt: number;
    slug: string;
    _sr: string;
    lang: string;
} => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
        _spt: searchParams.get("_spt") || "chiropractor",
        _spt_slug: searchParams.get("_spt_slug") || searchParams.get("_spt") || "chiropractor",
        _nme: searchParams.get("_nme") || "Dr.",
        _ct: searchParams.get("_ct") || "",
        _st: searchParams.get("_st") || "",
        _rt: parseFloat(searchParams.get("_rt") || "0"),
        slug: decodeURIComponent(searchParams.get("slug") || ""),
        _sr: searchParams.get("_sr") || "",
        lang: searchParams.get("lang") || "en",
    };
};

/**
 * Fetch specialty data based on the given specialty.
 * @param specialty Speciality slug or identifier
 * @param apiSource External API source (optional)
 * @returns List of doctors (or similar specialty data)
 */
export const fetchSpecialtyData = async (specialty: string, apiSource?: string): Promise<any[]> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/doctors/speciality/?source=${encodeURIComponent(apiSource || "")}&speciality=${specialty}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.warn("Error fetching specialty data:", error);
        throw error;
    }
};

/**
 * Fetch the report data based on given parameters and slug.
 * @param slug Identifier for the report or profile
 * @param source Source of the API (e.g., iwgc)
 * @returns Processed report data
 */
export const fetchReportData = async (slug: string, source: string): Promise<Report> => {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const response = await fetch(
            `${API_BASE_URL}/doctors/report/?source=${source}&identifier=${encodedSlug}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch report");
        }

        const reportData = await response.json();
        return {
            ...reportData,
            positiveComments: {
                first: reportData.positiveComments?.first || null,
                second: reportData.positiveComments?.second || null,
            },
            negativeComment: reportData.negativeComment || null,
            insights: reportData.insights || [],
            summary: reportData.summary || "No summary available",
            locations: reportData.locations || [],
        };
    } catch (error) {
        console.warn("Error fetching report data:", error);
        throw error;
    }
};

/**
 * Extract slug from profile link (specific implementation for iwgc source).
 * @param profileLink Profile URL string
 * @returns Slug
 */
export const getSlugFromProfileLink = (profileLink: string): string | null => {
    const match = profileLink.match(/\/doctors\/([^/]+)/);
    return match ? match[1] : null;
};
