"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeader from "@/app/components/SectionHeader";
import { useLanguage } from "@/contexts/useLanguage";
import { FaEnvelope, FaPaperPlane, FaPhoneSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type ErrorMessages = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactInfoItem = {
  icon: "FaPhoneSquare" | "FaEnvelope" | "FaLocationDot";
  title: string;
  subtitle: string;
};


export default function ContactPageContent() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  
  const contact = t.contactPageContent;
  const contactInfoItems = contact.contactInfoItems as ContactInfoItem[];

  const iconMap: Record<ContactInfoItem["icon"], React.ReactNode> = {
    FaPhoneSquare: <FaPhoneSquare className="text-xl" />,
    FaEnvelope: <FaEnvelope className="text-xl" />,
    FaLocationDot: <FaLocationDot className="text-xl" />,
  };

  const validateForm = (formData: FormData) => {
    const errors: ErrorMessages = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    let valid = true;

    const name = String(formData.get("user-name") || "").trim();
    const email = String(formData.get("user-email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      valid = false;
      errors.name = contact.validationErrorMessage;
    }

    if (!email) {
      valid = false;
      errors.email = contact.validationErrorMessage;
    } else if (!emailRegex.test(email)) {
      valid = false;
      errors.email = contact.emailFormatErrorMessage;
    }

    if (!subject) {
      valid = false;
      errors.subject = contact.validationErrorMessage;
    }

    if (!message) {
      valid = false;
      errors.message = contact.validationErrorMessage;
    }

    setErrorMessages(errors);
    return valid;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const isValid = validateForm(formData);

    if (!isValid) {
      setStatusMessage("");
      return;
    }

    try {
      setIsSending(true);
      setStatusMessage("");

      const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        setStatusMessage("Email service is not configured.");
        setIsSending(false);
        return;
      }

      await emailjs.sendForm(serviceID, templateID, form, publicKey);

      setStatusMessage(contact.successMessage);
      form.reset();

      setErrorMessages({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setStatusMessage(""), 4000);
    } catch (error) {
      console.error(error);
      setStatusMessage(contact.failMessage);
      setTimeout(() => setStatusMessage(""), 4000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="bg-slate-50/80 px-6 py-24 sm:py-28 lg:px-0 lg:py-32">
      <div className="mx-auto max-w-350">
        <SectionHeader
          eyebrow={contact.headingTitle}
          title={contact.subHeading}
          description={contact.introText}
          align="left"
          maxWidth="lg"
        />

        <section className="mt-14 grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div className="border border-slate-200 bg-white">
              <div className="h-0.75 w-full bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400" />

              <div className="px-6 py-7 sm:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {contact.infoEyebrow}
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  {contact.infoTitle}
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {contact.infoDescription}
                </p>
              </div>
            </div>

            <div className="border border-slate-200 bg-white">
              {contactInfoItems.map(
                (item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[56px_1fr] gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0 sm:px-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center border border-slate-200 bg-slate-50 text-sky-700">
                      {iconMap[item.icon]}
                    </div>

                    <div>
                      <p className="text-sm font-semibold tracking-tight text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT SIDE / FORM */}
          <div className="border border-slate-200 bg-white">
            <div className="h-0.75 w-full bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400" />

            <div className="px-6 py-7 sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                {contact.formEyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                {contact.formTitle}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {contact.formDescription}
              </p>

              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {contact.formLabels.name}
                  </label>
                  <input
                    type="text"
                    name="user-name"
                    id="name"
                    className={`w-full border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white ${
                      errorMessages.name
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                    autoComplete="off"
                  />
                  {errorMessages.name && (
                    <p className="mt-2 text-sm text-red-500">
                      {errorMessages.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {contact.formLabels.email}
                  </label>
                  <input
                    type="text"
                    name="user-email"
                    id="email"
                    className={`w-full border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white ${
                      errorMessages.email
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                    autoComplete="off"
                  />
                  {errorMessages.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errorMessages.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {contact.formLabels.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className={`w-full border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white ${
                      errorMessages.subject
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                    autoComplete="off"
                  />
                  {errorMessages.subject && (
                    <p className="mt-2 text-sm text-red-500">
                      {errorMessages.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {contact.formLabels.message}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={7}
                    className={`w-full resize-none border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white ${
                      errorMessages.message
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                    autoComplete="off"
                  />
                  {errorMessages.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errorMessages.message}
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn-blue flex items-center gap-2"
                >
                  <FaPaperPlane />
                  {isSending
                    ? contact.submittingButtonText
                    : contact.submitButtonText}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}