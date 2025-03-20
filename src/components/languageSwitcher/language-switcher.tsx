'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';

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
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];

        let languageValue;
        if (existingLanguageCookieValue) {
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            setCurrentLanguage(languageValue);
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    if (!currentLanguage || !languageConfig) {
        return null;
    }

    const switchLanguage = (lang: string) => () => {
        setCookie(null, COOKIE_NAME, '/auto/' + lang, { path: '/' });
        window.location.reload();
    };

    return (
        <div className="text-center notranslate bg-black">
            {languageConfig.languages.map((ld: LanguageDescriptor) => (
                <React.Fragment key={ld.name}>
                    {currentLanguage === ld.name ||
                    (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name) ? (
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