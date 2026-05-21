<script>
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const captionEl = document.getElementById('caption');
  const counterEl = document.getElementById('counter');
  const thumbsContainer = document.querySelector('.thumbnails');
  const stage = document.querySelector('.slide-stage');
  let current = 0;

  // Build arrow buttons
  function makeArrow(dir) {
    const btn = document.createElement('button');
    btn.className = `arrow arrow-${dir}`;
    btn.setAttribute('aria-label', dir === 'left' ? 'Previous slide' : 'Next slide');
    btn.innerHTML = dir === 'left'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
    btn.addEventListener('click', () => goTo(dir === 'left' ? current - 1 : current + 1));
    return btn;
  }
  stage.appendChild(makeArrow('left'));
  stage.appendChild(makeArrow('right'));

  // Build thumbnails
  const thumbEls = slides.map((slide, i) => {
    const li = document.createElement('div');
    li.className = 'thumb' + (i === 0 ? ' active' : '');
    li.setAttribute('role', 'listitem');
    li.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    const img = document.createElement('img');
    img.src = slide.querySelector('img').src;
    img.alt = '';
    img.loading = 'lazy';
    li.appendChild(img);
    li.addEventListener('click', () => goTo(i));
    thumbsContainer.appendChild(li);
    return li;
  });

  function goTo(index) {
    const n = ((index % slides.length) + slides.length) % slides.length;
    slides[current].classList.remove('active');
    thumbEls[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    thumbEls[current].classList.add('active');

    // Fade caption
    captionEl.classList.add('fade');
    setTimeout(() => {
      captionEl.textContent = slides[current].dataset.caption || '';
      counterEl.textContent = (current + 1) + ' / ' + slides.length;
      captionEl.classList.remove('fade');
    }, 150);

    // Scroll thumb into view
    thumbEls[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Init
  captionEl.textContent = slides[0].dataset.caption || '';
  counterEl.textContent = '1 / ' + slides.length;

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Theme toggle
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    updateToggleIcon();
  });

  function updateToggleIcon() {
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();
</script>