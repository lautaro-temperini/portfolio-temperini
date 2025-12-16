'use client';

import React, { useState, FormEvent } from "react";

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={submitted && !form.name ? "true" : "false"}
          className="mt-1 block w-full rounded-md border-gray-700 bg-[#18181b] text-gray-100 shadow-sm focus:border-[#8900C3] focus:ring-[#8900C3]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={submitted && !form.email ? "true" : "false"}
          className="mt-1 block w-full rounded-md border-gray-700 bg-[#18181b] text-gray-100 shadow-sm focus:border-[#8900C3] focus:ring-[#8900C3]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200">
          Mensaje
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={submitted && !form.message ? "true" : "false"}
          className="mt-1 block w-full rounded-md border-gray-700 bg-[#18181b] text-gray-100 shadow-sm focus:border-[#8900C3] focus:ring-[#8900C3]"
        />
      </div>
      <button
        type="submit"
        className="btn-primary flex items-center justify-center w-full min-h-[44px] h-10 bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] rounded-full px-6 shadow-[0px_4px_25px_rgba(115,0,165,0.25)] transition-all duration-200 hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] group cursor-pointer"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <span className="fluid-text-sm font-semibold text-background group-hover:text-background transition-colors">
          Enviar 🚀
        </span>
      </button>
      {submitted && (
        <p className="mt-2" style={{ color: '#00FFC2' }} aria-live="polite">
          Excelente, {form.name.trim() ? form.name.trim().split(" ")[0] : 'amig@'}! Mensaje enviado.
        </p>
      )}
    </form>
  );
};

export default ContactForm; 