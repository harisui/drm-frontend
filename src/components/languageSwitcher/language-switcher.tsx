'use client';
import React, { useEffect, useState } from 'react';
import "./googleLangStyle.css";

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>("en");

    useEffect(() => {
        // Initialize the current language from the "lang" query parameter or default to "en"
        const searchParams = new URLSearchParams(window.location.search);
        const langFromQuery = searchParams.get("lang") || "en";
        setCurrentLanguage(langFromQuery);

        // Check if Google Translate script is already loaded to avoid duplicates
        if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
            // Define the global function for Google Translate initialization
            window.googleTranslateElementInit = () => {
                new google.translate.TranslateElement(
                    {
                        pageLanguage: "en", // Set the default page language
                        includedLanguages: "", // Leave blank to include all languages
                        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Use a simple dropdown
                        autoDisplay: false, // Prevent automatic display of the default widget
                    },
                    "google_translate_element"
                );
            };

            // Inject the Google Translate script
            const translateScript = document.createElement("script");
            translateScript.type = "text/javascript";
            translateScript.async = true;
            translateScript.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(translateScript);
        }
    }, []); // Run only once on component mount

    return (
        <div id="google_translate_element" className="text-center"></div>
    );
};

export { LanguageSwitcher };
