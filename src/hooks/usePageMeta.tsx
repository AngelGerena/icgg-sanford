import { useEffect } from 'react';

/**
 * Sets the document title and meta description per page for SEO.
 * Restores nothing on unmount — the next page sets its own.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
