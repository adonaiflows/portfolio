"use client";

import { useState } from "react";
import { EMAILJS } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            to_name: EMAILJS.toName,
            to_email: EMAILJS.toEmail,
            message: business ? `Business / website: ${business}\n\n${message}` : message,
          },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS ${res.status}`);
      // Conversion event. TODO: wire to the analytics tool Adonai picks (Vercel Analytics or GA4).
      window.dataLayer?.push({ event: "generate_lead", form: "contact" });
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.warn(err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-clay/40 bg-clay/10 p-8">
        <p className="font-display text-2xl font-medium">Thanks, your message is on its way.</p>
        <p className="mt-2 text-mist">I&apos;ll get back to you as soon as possible, usually within a day.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-clay underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-night-2 px-4 py-3 text-fog placeholder:text-mist/60 outline-none transition focus:border-clay/70 focus:ring-2 focus:ring-clay/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Your name
          <input name="name" required autoComplete="name" className={field} placeholder="Jane Doe" />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@business.com" />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Business or current website <span className="font-normal text-mist">(optional)</span>
        <input name="business" autoComplete="url" className={field} placeholder="yourbusiness.com" />
      </label>
      <label className="block text-sm font-medium">
        What do you want more of?
        <textarea
          name="message"
          required
          rows={4}
          className={field}
          placeholder="More online orders, more bookings, a site that looks as good as my shop…"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-clay px-7 py-3.5 font-semibold text-night transition hover:bg-clay-deep disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send me my free mockup"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-300">
            That didn&apos;t send. Please try again in a moment.
          </p>
        )}
      </div>
    </form>
  );
}
