export function initVideoModal(): void {
  const modal = document.getElementById('video-modal');
  const playerContainer = document.getElementById('video-modal-player');
  const closeBtn = document.getElementById('video-modal-close');
  const backdrop = document.getElementById('video-modal-backdrop');

  if (!modal || !playerContainer) return;

  function openModal(iframeSrc: string) {
    if (!modal || !playerContainer) return;
    playerContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    playerContainer.appendChild(iframe);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !playerContainer) return;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    setTimeout(() => {
      playerContainer.innerHTML = '';
    }, 300);
  }

  function toYouTubeEmbed(url: string): string | null {
    const ytRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(ytRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
    return null;
  }

  function toDriveEmbed(url: string): string | null {
    if (url.includes('drive.google.com')) {
      if (url.includes('/preview')) return url;
      const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileMatch) {
        return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
      }
    }
    return null;
  }

  function toInstagramEmbed(url: string): string | null {
    if (url.includes('instagram.com')) {
      const reelMatch = url.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
      if (reelMatch) {
        return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`;
      }
      const postMatch = url.match(/instagram\.com\/p\/([a-zA-Z0-9_-]+)/);
      if (postMatch) {
        return `https://www.instagram.com/p/${postMatch[1]}/embed/`;
      }
    }
    return null;
  }

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest('[data-video-trigger]') as HTMLElement | null;
    if (!trigger) return;

    const videoUrl = trigger.getAttribute('data-video-url');
    if (!videoUrl) return;

    const mediaType = trigger.getAttribute('data-media-type');

    if (mediaType === 'external') {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const instagramEmbed = toInstagramEmbed(videoUrl);
    if (instagramEmbed) {
      openModal(instagramEmbed);
      return;
    }

    const ytEmbed = toYouTubeEmbed(videoUrl);
    if (ytEmbed) {
      openModal(ytEmbed);
      return;
    }

    const driveEmbed = toDriveEmbed(videoUrl);
    if (driveEmbed) {
      openModal(driveEmbed);
      return;
    }

    openModal(videoUrl);
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
