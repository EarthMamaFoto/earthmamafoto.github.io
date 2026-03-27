export function initHeroVideo(): void {
  const poster = document.getElementById('hero-poster');
  const iframe = document.getElementById('hero-video') as HTMLIFrameElement | null;

  if (!poster || !iframe) return;

  const posterImg = new Image();
  posterImg.src = 'https://img.youtube.com/vi/WhVFpTtQcjE/maxresdefault.jpg';

  posterImg.onload = () => {
    poster.style.backgroundImage = `url('${posterImg.src}')`;
  };

  iframe.addEventListener('load', () => {
    setTimeout(() => {
      poster.classList.add('loaded');
    }, 1000);
  });
}
