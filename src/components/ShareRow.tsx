import React, { useState } from 'react';
import { Share2, MessageCircle, Facebook, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Share controls for a blog post.
 *
 * On phones, navigator.share opens the operating system's own share sheet,
 * which lists every app the visitor has installed — WhatsApp, Messages,
 * Instagram, Messenger, Mail, AirDrop. That single button covers far more
 * platforms than any fixed row of icons could.
 *
 * Desktop browsers mostly lack it, so we fall back to explicit targets plus
 * copy-link. Both paths are always available; the native button simply hides
 * where it is unsupported.
 */
const ShareRow = ({ title, excerpt }: { title: string; excerpt?: string | null }) => {
  const { isSpanish } = useLanguage();
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `${title}${excerpt ? ` — ${excerpt}` : ''}`;
  const canNative = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const enc = encodeURIComponent;

  async function nativeShare() {
    try {
      await navigator.share({ title, text: excerpt || title, url });
    } catch {
      // Visitor dismissed the sheet. Nothing to report.
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(isSpanish ? 'Copia este enlace:' : 'Copy this link:', url);
    }
  }

  const targets = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${enc(text + ' ' + url)}`,
      icon: <MessageCircle size={18} />,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: <Facebook size={18} />,
    },
    {
      key: 'sms',
      label: 'SMS',
      href: `sms:?&body=${enc(text + ' ' + url)}`,
      icon: <MessageCircle size={18} />,
    },
    {
      key: 'email',
      label: isSpanish ? 'Correo' : 'Email',
      href: `mailto:?subject=${enc(title)}&body=${enc((excerpt ? excerpt + '\n\n' : '') + url)}`,
      icon: <Mail size={18} />,
    },
  ];

  return (
    <div className="icgg-share">
      <span className="icgg-share-label">
        {isSpanish ? 'Comparte esta entrada' : 'Share this post'}
      </span>

      <div className="icgg-share-btns">
        {canNative && (
          <button type="button" className="icgg-share-btn icgg-share-primary" onClick={nativeShare}>
            <Share2 size={18} />
            <span>{isSpanish ? 'Compartir' : 'Share'}</span>
          </button>
        )}

        {targets.map(tg => (
          <a
            key={tg.key}
            className="icgg-share-btn"
            href={tg.href}
            target={tg.key === 'sms' || tg.key === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={tg.label}
          >
            {tg.icon}
            <span>{tg.label}</span>
          </a>
        ))}

        <button type="button" className="icgg-share-btn" onClick={copyLink}>
          {copied ? <Check size={18} /> : <LinkIcon size={18} />}
          <span>{copied ? (isSpanish ? 'Copiado' : 'Copied') : (isSpanish ? 'Copiar enlace' : 'Copy link')}</span>
        </button>
      </div>
    </div>
  );
};

export default ShareRow;
