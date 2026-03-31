// 'use client';

// import { useLanguage } from "@/contexts/useLanguage";
// import Link from "next/link";

// const page = () => {
//     const { t } = useLanguage();
//     return (
//         <section className="cookies">
//             <h1>{t.cookiesSection.title}</h1>

//             <div className="cookies-wrapper">
//                 <p>{t.cookiesSection.content.introduction.text}</p>

//                 <h2>{t.cookiesSection.content.whatIsCookie.title}</h2>
//                 <p>{t.cookiesSection.content.whatIsCookie.text}</p>


//                 <h2>{t.cookiesSection.content.cookiesPurpose.title}</h2>

//                 <strong>{t.cookiesSection.content.cookiesPurpose.types[0].type}</strong>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[0].text}</p>

//                 <strong>{t.cookiesSection.content.cookiesPurpose.types[1].type}</strong>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[1].text}</p>

//                 <strong>{t.cookiesSection.content.cookiesPurpose.types[2].type}</strong>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[2].text}</p>
//                 <p><u>{t.cookiesSection.content.cookiesPurpose.types[2].link_title}</u>
//                     <Link href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" target="_blank"> {t.cookiesSection.content.cookiesPurpose.types[2].link}</Link> </p>



//                 <strong>{t.cookiesSection.content.cookiesPurpose.types[3].type}</strong>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[3].text}</p>

//                 <strong>{t.cookiesSection.content.cookiesPurpose.types[4].type}</strong>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[4].text}</p>
//                 <p>{t.cookiesSection.content.cookiesPurpose.types[4].link_title} <strong><Link href="https://www.google.com/policies/privacy/"
//                     target="_blank" rel="noopener noreferrer">{t.cookiesSection.content.cookiesPurpose.types[4].link}</Link></strong> {t.cookiesSection.content.cookiesPurpose.types[4].link_end}</p>


//                 <h2>{t.cookiesSection.content.cookieManagement.title}</h2>
//                 <strong>{t.cookiesSection.content.cookieManagement.consentWithdrawal.title}</strong>
//                 <p>{t.cookiesSection.content.cookieManagement.consentWithdrawal.text}</p>



//                 <strong>{t.cookiesSection.content.cookieManagement.browserSettings.title}</strong>
//                 <p>{t.cookiesSection.content.cookieManagement.browserSettings.text}</p>
//                 <ul >
//                     <li><strong><Link href="https://support.google.com/chrome/answer/95647?hl=hu" target="_blank"
//                         rel="noopener noreferrer">Chrome</Link></strong></li>
//                     <li><strong><Link href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
//                         target="_blank" rel="noopener noreferrer">Firefox</Link> </strong></li>
//                     <li><strong><Link
//                         href="http://windows.microsoft.com/hu-hu/internet-explorer/delete-manage-cookies#ie=ie-11"
//                         target="_blank" rel="noopener noreferrer">Microsoft Internet Explorer</Link> </strong></li>
//                 </ul>






//                 <strong>{t.cookiesSection.content.googleAnalyticsDisable.title}</strong>
//                 <p>{t.cookiesSection.content.googleAnalyticsDisable.text}</p>
//                 <p>{t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.description}</p>
//                 <p>{t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text1} <a
//                     href="http://www.google.com/intl/hu/policies/technologies/ads" target="_blank"
//                     rel="noopener noreferrer">Link</a></p>
//                 <p>{t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text2} <a
//                     href="https://www.google.com/settings/ads/preferences" target="_blank"
//                     rel="noopener noreferrer">Link</a></p>
//                 <p>{t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text3} <a
//                     href="https://support.google.com/analytics/answer/6004245" target="_blank"
//                     rel="noopener noreferrer">Link</a></p>
//             </div>
      
//         </section>
//     )
// }

// export default page;

'use client';

import { useLanguage } from "@/contexts/useLanguage";
import Link from "next/link";

const page = () => {
    const { t } = useLanguage();
    return (
        <section className="flex min-h-screen max-w-350 m-auto flex-col items-center justify-center px-4 py-24 sm:py-28 own:px-0 lg:py-32">
            <h1 className="text-4xl mb-6 font-bold text-slate-800 text-center">{t.cookiesSection.title}</h1>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 w-full">

                {/* Introduction */}
                <p className="text-slate-600 mb-6">
                    {t.cookiesSection.content.introduction.text}
                </p>

                {/* What is a cookie */}
                <h2 className="text-2xl font-semibold my-4 text-sky-600">
                    {t.cookiesSection.content.whatIsCookie.title}
                </h2>
                <p className="text-slate-600">
                    {t.cookiesSection.content.whatIsCookie.text}
                </p>

                {/* Cookies Purpose */}
                <h2 className="text-2xl font-semibold my-4 text-sky-600">
                    {t.cookiesSection.content.cookiesPurpose.title}
                </h2>

                {/* Type 0 */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookiesPurpose.types[0].type}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[0].text}
                </p>

                {/* Type 1 */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookiesPurpose.types[1].type}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[1].text}
                </p>

                {/* Type 2 */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookiesPurpose.types[2].type}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[2].text}
                </p>
                <p className="text-slate-600">
                    <u>{t.cookiesSection.content.cookiesPurpose.types[2].link_title}</u>{" "}
                    <Link
                        href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                        target="_blank"
                        className="text-sky-600 hover:text-sky-700 underline transition-colors"
                    >
                        {t.cookiesSection.content.cookiesPurpose.types[2].link}
                    </Link>
                </p>

                {/* Type 3 */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookiesPurpose.types[3].type}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[3].text}
                </p>

                {/* Type 4 */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookiesPurpose.types[4].type}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[4].text}
                </p>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookiesPurpose.types[4].link_title}{" "}
                    <Link
                        href="https://www.google.com/policies/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-sky-600 hover:text-sky-700 underline transition-colors"
                    >
                        {t.cookiesSection.content.cookiesPurpose.types[4].link}
                    </Link>{" "}
                    {t.cookiesSection.content.cookiesPurpose.types[4].link_end}
                </p>

                {/* Cookie Management */}
                <h2 className="text-2xl font-semibold my-4 text-sky-600">
                    {t.cookiesSection.content.cookieManagement.title}
                </h2>

                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookieManagement.consentWithdrawal.title}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookieManagement.consentWithdrawal.text}
                </p>

                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.cookieManagement.browserSettings.title}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.cookieManagement.browserSettings.text}
                </p>

                <ul className="mt-2 mb-4 space-y-1 list-disc list-inside">
                    <li>
                        <Link
                            href="https://support.google.com/chrome/answer/95647?hl=hu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Chrome
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Firefox
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="http://windows.microsoft.com/hu-hu/internet-explorer/delete-manage-cookies#ie=ie-11"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Microsoft Internet Explorer
                        </Link>
                    </li>
                </ul>

                {/* Google Analytics Disable */}
                <strong className="block text-slate-700 mt-4 mb-1">
                    {t.cookiesSection.content.googleAnalyticsDisable.title}
                </strong>
                <p className="text-slate-600">
                    {t.cookiesSection.content.googleAnalyticsDisable.text}
                </p>
                <p className="text-slate-600 mt-2">
                    {t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.description}
                </p>

                <div className="mt-2 space-y-1">
                    <p className="text-slate-600">
                        {t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text1}{" "}
                        <a
                            href="http://www.google.com/intl/hu/policies/technologies/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Link
                        </a>
                    </p>
                    <p className="text-slate-600">
                        {t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text2}{" "}
                        <a
                            href="https://www.google.com/settings/ads/preferences"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Link
                        </a>
                    </p>
                    <p className="text-slate-600">
                        {t.cookiesSection.content.googleAnalyticsDisable.additionalInfo.links.text3}{" "}
                        <a
                            href="https://support.google.com/analytics/answer/6004245"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:text-sky-700 underline transition-colors"
                        >
                            Link
                        </a>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default page;
