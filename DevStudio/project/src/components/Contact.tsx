import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Info } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const WHATSAPP_NUMBER = '918928890948'; // country code + number

interface ContactForm {
  name: string;
  subject: string;
  message: string;
}

const emptyForm: ContactForm = { name: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const toast = useToast();

  const validate = (): boolean => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    else if (form.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const buildWhatsAppText = (data: ContactForm): string => {
    return `*New Enquiry from DevStudio*%0A%0A*Name:* ${data.name}%0A*Subject:* ${data.subject}%0A%0A*Message:*%0A${data.message}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    await new Promise(r => setTimeout(r, 500));

    try {
      const existing = JSON.parse(localStorage.getItem('devstudio_messages') || '[]');
      existing.unshift({ ...form, id: crypto.randomUUID(), date: new Date().toISOString() });
      localStorage.setItem('devstudio_messages', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    const text = buildWhatsAppText(form);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');

    setStatus('success');
    toast('Opening WhatsApp with your message...', 'success');
    setForm(emptyForm);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleDirectWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I have an enquiry from DevStudio.')}`;
    window.open(url, '_blank');
    toast('Opening WhatsApp...', 'success');
  };

  const handleCall = () => {
    window.location.href = 'tel:+918928890948';
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full px-4 py-3 rounded-xl bg-[#1a1a25] border text-white placeholder:text-[#5a5a6e] transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-500/50 focus:ring-red-500/20'
        : 'border-[#2a2a3a] focus:border-[#3ddc97]/40 focus:ring-[#3ddc97]/15'
    }`;

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-[#3ddc97] bottom-20 right-1/4" />

      <div className="max-w-5xl mx-auto relative z-10 pt-16">
        <div className="text-center mb-12">
          <span className="text-[#3ddc97] font-mono text-sm">{'// Contact'}</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">Get in Touch</h2>
          <p className="mt-4 text-[#8a8aa0] max-w-2xl mx-auto">
            Have a question or project idea? Fill out the form and your enquiry goes straight to WhatsApp.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#25D366]/5 border border-[#25D366]/15 mb-6 max-w-2xl mx-auto">
          <Info className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
          <p className="text-xs text-[#8a8aa0] leading-relaxed">
            Submitting the form opens WhatsApp with your message pre-filled and ready to send to
            <span className="text-[#25D366] font-medium"> +91 89288 90948</span>.
            You can also start a chat directly using the buttons on the left.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Quick contact buttons */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={handleDirectWhatsApp}
              className="w-full glass rounded-xl p-5 flex items-center gap-4 hover:border-[#25D366]/40 transition-all card-hover text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#8a8aa0] uppercase tracking-wider">WhatsApp</div>
                <div className="font-medium text-sm">+91 89288 90948</div>
              </div>
            </button>

            <button
              onClick={handleCall}
              className="w-full glass rounded-xl p-5 flex items-center gap-4 hover:border-[#3ddc97]/30 transition-all card-hover text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3ddc97]/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#3ddc97]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#8a8aa0] uppercase tracking-wider">Call</div>
                <div className="font-medium text-sm">+91 89288 90948</div>
              </div>
            </button>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8 space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#8a8aa0] mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className={inputClass('name')}
                  disabled={status === 'sending'}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#8a8aa0] mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  placeholder="Project inquiry"
                  className={inputClass('subject')}
                  disabled={status === 'sending'}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#8a8aa0] mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Tell me about your project or question..."
                  className={`${inputClass('message')} resize-none`}
                  disabled={status === 'sending'}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#25D366]/90 transition-all hover:shadow-lg hover:shadow-[#25D366]/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Enquiry to WhatsApp
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  WhatsApp opened with your message. Press send in WhatsApp to deliver it.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
