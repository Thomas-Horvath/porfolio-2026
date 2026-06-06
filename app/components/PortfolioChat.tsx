"use client";

import Link from "next/link";
import { Fragment } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiRobot2Line, RiSendPlaneFill } from "react-icons/ri";

import { useLanguage } from "@/contexts/useLanguage";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  content: string;
  id: string;
  role: ChatRole;
};

const MAX_MESSAGE_LENGTH = 1000;
const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL?.trim() || "http://localhost:3001/api/chat";

const renderInlineFormatting = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);

    if (boldMatch) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
};

const renderAssistantContent = (text: string) => {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isList = lines.length > 1 && lines.every((line) => /^[-*]\s+/.test(line));

    if (isList) {
      return (
        <ul
          key={`block-${blockIndex}`}
          className="space-y-2 pl-5 text-[15px] leading-7 text-slate-700 marker:text-sky-600 list-disc"
        >
          {lines.map((line, lineIndex) => (
            <li key={`line-${blockIndex}-${lineIndex}`}>
              {renderInlineFormatting(line.replace(/^[-*]\s+/, ""))}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={`block-${blockIndex}`}
        className="text-[15px] leading-7 text-slate-700"
      >
        {lines.map((line, lineIndex) => (
          <Fragment key={`line-${blockIndex}-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            {renderInlineFormatting(line)}
          </Fragment>
        ))}
      </p>
    );
  });
};

const createMessageId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getUiCopy = (language: "hu" | "en") => {
  if (language === "en") {
    return {
      assistantLabel: "Portfolio Assistant",
      assistantSubtitle: "Thomas Horvath",
      close: "Close chat",
      contactCta: "Need a direct contact?",
      contactLink: "Open contact page",
      emptyFallback: "Please enter a short message first.",
      genericFallback: "The assistant is temporarily unavailable. Please try again later.",
      inputPlaceholder: "Ask about projects, skills, or collaboration...",
      intro:
        "Hi! I'm Tamás's portfolio assistant. You can ask about his projects, technologies, or collaboration options.",
      loading: "Generating reply...",
      openButton: "Ask the assistant",
      send: "Send",
      tooLong: "Messages can be up to 1000 characters long.",
    };
  }

  return {
    assistantLabel: "Portfólió asszisztens",
    assistantSubtitle: "Horváth Tamás",
    close: "Chat bezárása",
    contactCta: "Inkább közvetlenül írnál?",
    contactLink: "Kapcsolat oldal megnyitása",
    emptyFallback: "Kérlek, írj be egy rövid üzenetet.",
    genericFallback: "Az asszisztens most átmenetileg nem elérhető. Kérlek, próbáld újra később.",
    inputPlaceholder: "Kérdezz a projektekről, technológiákról vagy együttműködésről...",
    intro:
      "Szia! Tamás portfólió asszisztense vagyok. Kérdezhetsz a projektjeiről, technológiáiról vagy az együttműködési lehetőségekről.",
    loading: "Válasz készül...",
    openButton: "Kérdezz az asszisztenstől",
    send: "Küldés",
    tooLong: "Az üzenet legfeljebb 1000 karakter lehet.",
  };
};

export default function PortfolioChat() {
  const { isHydrated, language } = useLanguage();
  const activeLanguage = isHydrated && language === "en" ? "en" : "hu";
  const ui = getUiCopy(activeLanguage);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages((currentMessages) => {
      if (currentMessages.length === 0) {
        return [{ id: "portfolio-assistant-intro", role: "assistant", content: ui.intro }];
      }

      if (
        currentMessages.length === 1 &&
        currentMessages[0]?.id === "portfolio-assistant-intro" &&
        currentMessages[0].role === "assistant"
      ) {
        return [{ ...currentMessages[0], content: ui.intro }];
      }

      return currentMessages;
    });
  }, [ui.intro]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isLoading, isOpen, messages]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const trimmedMessage = input.trim();

    if (!trimmedMessage) {
      setStatusMessage(ui.emptyFallback);
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setStatusMessage(ui.tooLong);
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setStatusMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: activeLanguage,
          message: trimmedMessage,
        }),
      });

      const data = (await response.json().catch(() => null)) as { answer?: string } | null;
      const answer =
        typeof data?.answer === "string" && data.answer.trim().length > 0
          ? data.answer.trim()
          : ui.genericFallback;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: "assistant",
          content: answer,
        },
      ]);

      setStatusMessage("");
    } catch (error) {
      console.error("Portfolio chat client error:", error);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: "assistant",
          content: ui.genericFallback,
        },
      ]);
      setStatusMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed right-4 bottom-6 z-30 inline-flex cursor-pointer items-center gap-3 border border-slate-200 bg-white px-4 py-3 text-sm font-semibold tracking-[0.08em] text-slate-900 shadow-[0_16px_45px_rgba(15,23,42,0.14)] transition hover:border-sky-200 hover:bg-sky-50 sm:right-6 sm:bottom-6"
          aria-label={ui.openButton}
        >
          <span className="flex h-10 w-10 items-center justify-center border border-sky-200 bg-sky-50 text-sky-700">
            <RiRobot2Line className="text-xl" />
          </span>
          <span className="hidden sm:inline">{ui.openButton}</span>
        </button>
      ) : null}

      {isOpen ? (
        <section className="fixed right-3 bottom-3 z-40 flex h-[min(36rem,calc(100vh-1.5rem))] w-[calc(100vw-1.5rem)] flex-col border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:right-6 sm:bottom-6 sm:h-[34rem] sm:w-[26rem]">
          <header className="border-b border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {ui.assistantLabel}
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                  {ui.assistantSubtitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                aria-label={ui.close}
              >
                <IoCloseSharp className="text-2xl" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-white px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] border px-4 py-3 shadow-sm ${
                      message.role === "user"
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="space-y-3">
                        {renderAssistantContent(message.content)}
                      </div>
                    ) : (
                      <p className="text-[15px] leading-7 text-white">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
                    {ui.loading}
                  </div>
                </div>
              ) : null}

              <div ref={endOfMessagesRef} />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
            <form onSubmit={submitMessage} className="space-y-3">
              <label htmlFor="portfolio-chat-input" className="sr-only">
                {ui.inputPlaceholder}
              </label>

              <input
                id="portfolio-chat-input"
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);

                  if (statusMessage) {
                    setStatusMessage("");
                  }
                }}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder={ui.inputPlaceholder}
                disabled={isLoading}
                className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  {input.length}/{MAX_MESSAGE_LENGTH}
                </p>

                <button
                  type="submit"
                  disabled={isLoading || input.trim().length === 0}
                  className="inline-flex cursor-pointer items-center gap-2 border border-sky-600 bg-sky-600 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300"
                >
                  <RiSendPlaneFill />
                  {ui.send}
                </button>
              </div>

              {statusMessage ? (
                <p className="border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  {statusMessage}
                </p>
              ) : null}

              <p className="text-xs leading-5 text-slate-500">
                {ui.contactCta}{" "}
                <Link href="/contact" className="text-sky-700 underline underline-offset-2 hover:text-sky-800">
                  {ui.contactLink}
                </Link>
              </p>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
