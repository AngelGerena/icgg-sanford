import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional background image. When provided, shows the photo with a navy scrim.
   *  When omitted, falls back to the solid navy band. */
  image?: string;
}

const PageHeader = ({ title, subtitle, image }: PageHeaderProps) => (
  <header className={`icgg-pageheader${image ? ' icgg-pageheader-photo' : ''}`}>
    {image && (
      <div
        className="icgg-pageheader-bg"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
    )}
    <div className="icgg-pageheader-inner">
      <p className="icgg-pageheader-eyebrow">Iglesia Cristiana Gracia y Gloria</p>
      <h1 className="icgg-pageheader-title">{title}</h1>
      <div className="icgg-pageheader-divider" />
      {subtitle && <p className="icgg-pageheader-sub">{subtitle}</p>}
    </div>
  </header>
);

export default PageHeader;
