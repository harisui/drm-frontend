'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { setCookie } from 'nookies';

const COOKIE_NAME = 'googtrans';

interface LanguageDescriptor {
    name: string;
    title: string;
}

declare global {
    namespace globalThis {
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<any>();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const defaultLanguage = global.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage || 'en';
        let lang = searchParams.get('lang') || defaultLanguage;

        setCurrentLanguage(lang);

        if (!searchParams.has('lang')) {
            searchParams.set('lang', defaultLanguage);
            setCookie(null, COOKIE_NAME, '/auto/' + defaultLanguage, { path: '/' });
            window.location.search = searchParams.toString();
        } else {
            setCookie(null, COOKIE_NAME, '/auto/' + lang, { path: '/' });
        }

        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    if (!currentLanguage || !languageConfig) {
        return null;
    }

    const switchLanguage = (newLang: string) => () => {
        const currentSearch = new URLSearchParams(window.location.search);
        currentSearch.set('lang', newLang);
        setCookie(null, COOKIE_NAME, '/auto/' + newLang, { path: '/' });
        window.location.search = currentSearch.toString();
    };

    return (
        <div className="text-center notranslate bg-black">
            {languageConfig.languages.map((ld: LanguageDescriptor) => (
                <React.Fragment key={ld.name}>
                    {currentLanguage === ld.name ? (
                        <span className="mx-3 text-orange-300">{ld.title}</span>
                    ) : (
                        <a
                            onClick={switchLanguage(ld.name)}
                            className="mx-3 text-blue-300 cursor-pointer hover:underline"
                        >
                            {ld.title}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };