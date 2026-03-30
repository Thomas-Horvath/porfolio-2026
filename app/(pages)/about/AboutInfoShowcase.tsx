"use client";

import SectionHeader from "@/app/components/SectionHeader";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type AboutInfoItem = {
    title: string;
    content: string;
};

type Props = {
    title: string;
    intro: string;
    items: AboutInfoItem[];
};

export default function AboutInfoShowcase({
    title,
    intro,
    items,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openIndex, setOpenIndex] = useState(0);

    const activeItem = items[activeIndex];

    return (
        <section className="mt-50 mb-30 mx-auto max-w-350">

            <SectionHeader
                eyebrow="valami"
                title={title}
                description={intro}
                align="left"
                maxWidth="lg"
            />

            {/* DESKTOP */}
            <div className="mt-14 hidden lg:grid lg:grid-cols-[320px_1fr] lg:gap-10">
                <div className="border border-slate-200 bg-white ">
                    {items.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item.title}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`group cursor-pointer  grid w-full grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-slate-200 px-5 py-7 text-left transition last:border-b-0 ${isActive
                                        ? "bg-sky-600 text-white"
                                        : "bg-white text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <span
                                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${isActive ? "text-white/55" : "text-slate-400"
                                        }`}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="text-base font-semibold tracking-tight">
                                    {item.title}
                                </span>

                                <span
                                    className={`h-2.5 w-2.5 shrink-0 transition duration-300 ${isActive
                                            ? "bg-sky-400 scale-125"
                                            : "bg-slate-300 group-hover:bg-sky-400"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>

                <div className="relative border border-slate-200 bg-white">
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400" />

                    <div className="flex h-full min-h-[320px] flex-col">
                        <div className="border-b border-slate-200 px-8 py-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </p>

                            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                                {activeItem.title}
                            </h3>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto px-8 py-8">
                            <div
                                className="prose prose-slate max-w-none prose-p:leading-8 prose-p:text-slate-600 prose-a:text-sky-700 prose-a:no-underline hover:prose-a:text-sky-600"
                                dangerouslySetInnerHTML={{ __html: activeItem.content }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE / TABLET */}
            <div className="mt-14 border-t border-slate-200 lg:hidden">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <article key={item.title} className="border-b border-slate-200">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                            >
                                <div className="grid gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-lg font-semibold tracking-tight text-sky-600">
                                        {item.title}
                                    </h3>
                                </div>

                                <FaChevronDown
                                    className={`h-5 w-5 shrink-0 text-slate-400 transition duration-300 ${isOpen ? "rotate-180 text-sky-600" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100 pb-6"
                                        : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div
                                        className="prose prose-slate max-w-none border-l-2 border-sky-100 pl-5 prose-p:leading-8 prose-p:text-slate-600 prose-a:text-sky-700 prose-a:no-underline hover:prose-a:text-sky-600"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}