document.addEventListener('DOMContentLoaded', () => {
  // Xử lý sự kiện click cho Menu Hamburger
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      console.log('Đã bấm vào Menu');
    });
  }

  // Xử lý sự kiện click cho Nút Next
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      console.log('Đã bấm vào Nút Next');
    });
  }

  // Xử lý sự kiện click cho Icon Box phía dưới
  const bottomIconBtn = document.getElementById('bottomIconBtn');
  if (bottomIconBtn) {
    bottomIconBtn.addEventListener('click', () => {
      console.log('Đã bấm vào Icon Box');
    });
  }

  // ==========================================
  // HỆ THỐNG TV INTERACTIVE
  // ==========================================
  const tvScreen = document.getElementById('tvScreen');
  const tvVideo = document.getElementById('tvVideo');
  const tvFrame = document.getElementById('tvFrame');

  function toggleTV(e) {
    if (e) e.preventDefault();

    if (tvVideo.paused) {
      tvScreen.style.display = 'none';
      tvVideo.style.display = 'block';
      tvVideo.play();
    } else {
      tvVideo.pause();
      tvVideo.style.display = 'none';
      tvScreen.style.display = 'block';
    }
  }

  if (tvScreen) tvScreen.addEventListener('click', toggleTV);
  if (tvVideo) tvVideo.addEventListener('click', toggleTV);
  if (tvFrame) tvFrame.addEventListener('click', toggleTV);

  // ==========================================
  // HÀM BẬT/TẮT MODAL CHUNG
  // ==========================================
  const openModal = (modal) => modal && modal.classList.add('active');
  const closeModal = (modal) => modal && modal.classList.remove('active');

  // ==========================================
  // MODAL 1: MÌ MILIKET
  // ==========================================
  const miliketImg = document.querySelector('.img-fg-2');
  const miliketModal = document.getElementById('miliket-modal');
  const closeMiliketBtn = document.getElementById('miliket-modal-close-btn');

  if (miliketImg && miliketModal) {
    miliketImg.addEventListener('click', () => openModal(miliketModal));
  }
  if (closeMiliketBtn && miliketModal) {
    closeMiliketBtn.addEventListener('click', () => closeModal(miliketModal));
  }
  if (miliketModal) {
    miliketModal.addEventListener('click', (e) => {
      if (e.target === miliketModal) closeModal(miliketModal);
    });
  }

  // ==========================================
  // MODAL 2: CANH SẤU (MIXED GREEN VEGGIES SOUP)
  // ==========================================
  const canhsauImg = document.querySelector('.img-fg-3');
  const canhsauModal = document.getElementById('canhsau-modal');
  const closeCanhsauBtn = document.getElementById('canhsau-modal-close-btn');

  if (canhsauImg && canhsauModal) {
    canhsauImg.addEventListener('click', () => openModal(canhsauModal));
  }
  if (closeCanhsauBtn && canhsauModal) {
    closeCanhsauBtn.addEventListener('click', () => closeModal(canhsauModal));
  }
  if (canhsauModal) {
    canhsauModal.addEventListener('click', (e) => {
      if (e.target === canhsauModal) closeModal(canhsauModal);
    });
  }

  // ==========================================
  // MODAL 3: CÀ PHÁO MUỐI (PICKLED EGGPLANT)
  // ==========================================
  const caphaoImg = document.querySelector('.img-fg-4');
  const caphaoModal = document.getElementById('caphao-modal');
  const closeCaphaoBtn = document.getElementById('caphao-modal-close-btn');

  if (caphaoImg && caphaoModal) {
    caphaoImg.addEventListener('click', () => openModal(caphaoModal));
  }
  if (closeCaphaoBtn && caphaoModal) {
    closeCaphaoBtn.addEventListener('click', () => closeModal(caphaoModal));
  }
  if (caphaoModal) {
    caphaoModal.addEventListener('click', (e) => {
      if (e.target === caphaoModal) closeModal(caphaoModal);
    });
  }

  // ==========================================
  // MODAL 4: RAU MUỐNG LUỘC (MORNING GLORY)
  // ==========================================
  const raumuongImg = document.querySelector('.img-fg-5');
  const raumuongModal = document.getElementById('raumuong-modal');
  const closeRaumuongBtn = document.getElementById('raumuong-modal-close-btn');

  if (raumuongImg && raumuongModal) {
    raumuongImg.addEventListener('click', () => openModal(raumuongModal));
  }
  if (closeRaumuongBtn && raumuongModal) {
    closeRaumuongBtn.addEventListener('click', () => closeModal(raumuongModal));
  }
  if (raumuongModal) {
    raumuongModal.addEventListener('click', (e) => {
      if (e.target === raumuongModal) closeModal(raumuongModal);
    });
  }
  
  // ==========================================
  // MODAL 5: TÉP RANG (FRIED TINY SHRIMP)
  // ==========================================
  const teprangImg = document.querySelector('.img-fg-6');
  const teprangModal = document.getElementById('teprang-modal');
  const closeTeprangBtn = document.getElementById('teprang-modal-close-btn');

  if (teprangImg && teprangModal) {
    teprangImg.addEventListener('click', () => openModal(teprangModal));
  }
  if (closeTeprangBtn && teprangModal) {
    closeTeprangBtn.addEventListener('click', () => closeModal(teprangModal));
  }
  if (teprangModal) {
    teprangModal.addEventListener('click', (e) => {
      if (e.target === teprangModal) closeModal(teprangModal);
    });
  }

  // ==========================================
  // MODAL 6: CÁ RÔ RÁN (FRIED CLIMBING PERCH)
  // ==========================================
  const caroranImg = document.querySelector('.img-fg-7');
  const caroranModal = document.getElementById('caroran-modal');
  const closeCaroranBtn = document.getElementById('caroran-modal-close-btn');

  if (caroranImg && caroranModal) {
    caroranImg.addEventListener('click', () => openModal(caroranModal));
  }
  if (closeCaroranBtn && caroranModal) {
    closeCaroranBtn.addEventListener('click', () => closeModal(caroranModal));
  }
  if (caroranModal) {
    caroranModal.addEventListener('click', (e) => {
      if (e.target === caroranModal) closeModal(caroranModal);
    });
  }

  // ==========================================
  // MODAL 7: THỊT BA CHỈ KHO TIÊU (BRAISED PORK BELLY)
  // ==========================================
  const thitkhoImg = document.querySelector('.img-fg-8');
  const thitkhoModal = document.getElementById('thitkho-modal');
  const closeThitkhoBtn = document.getElementById('thitkho-modal-close-btn');

  if (thitkhoImg && thitkhoModal) {
    thitkhoImg.addEventListener('click', () => openModal(thitkhoModal));
  }
  if (closeThitkhoBtn && thitkhoModal) {
    closeThitkhoBtn.addEventListener('click', () => closeModal(thitkhoModal));
  }
  if (thitkhoModal) {
    thitkhoModal.addEventListener('click', (e) => {
      if (e.target === thitkhoModal) closeModal(thitkhoModal);
    });
  }

  // ==========================================
  // SCROLL TO REVEAL EFFECT FOR STORY TEXTS
  // ==========================================
  const revealSelectors = [
    '.text-at-7pm',
    '.text-tv-show',
    '.text-mom-kitchen',
    '.text-help-mom',
    '.text-rice-boil',
    '.text-food-smell',
    '.text-dinners-ready',
    '.text-help-sister',
    '.text-dad-tv',
    '.text-gather',
    '.text-simple-meal',
    '.text-warm-comfort'
  ];

  const revealElements = revealSelectors
    .map(selector => document.querySelector(selector))
    .filter(Boolean);

  const revealQueue = [];
  let isProcessingQueue = false;

  function processRevealQueue() {
    if (isProcessingQueue || revealQueue.length === 0) return;
    isProcessingQueue = true;

    const el = revealQueue.shift();
    el.classList.add('visible');

    // Wait 900ms (0.8s fade transition + buffer) so sentence completes before next begins
    setTimeout(() => {
      isProcessingQueue = false;
      processRevealQueue();
    }, 900);
  }

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.classList.contains('queued') && !el.classList.contains('visible')) {
          el.classList.add('queued');
          revealQueue.push(el);
          // Sort queue by narrative sequence
          revealQueue.sort((a, b) => revealElements.indexOf(a) - revealElements.indexOf(b));
          obs.unobserve(el);
          processRevealQueue();
        }
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  });

  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
  });

  // ==========================================
  // REVEAL CURSOR EFFECT FOR CBIAN SECTION
  // ==========================================
  const imgTrang = document.querySelector('.img-mid-6');
  const imgDen = document.getElementById('imgMid6Den');
  const cursorBox = document.getElementById('revealCursorBox');

  let mouseX = -1000;
  let mouseY = -1000;
  let isHoveringSection = false;

  const BOX_SIZE = 300; // Dynamic size of cursor box in px
  const HALF_BOX = BOX_SIZE / 2;

  function updateRevealCursor() {
    if (!imgTrang || !imgDen || !cursorBox) return;

    const rect = imgTrang.getBoundingClientRect();

    // Check if mouse cursor is within the cbian section bounds
    const isInside = (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    );

    if (isInside) {
      if (!isHoveringSection) {
        isHoveringSection = true;
        cursorBox.classList.add('active');
        document.body.style.cursor = 'none';
      }

      // Move custom box cursor
      cursorBox.style.left = `${mouseX}px`;
      cursorBox.style.top = `${mouseY}px`;

      // Crop cbian(den).png to reveal only the area inside the cursor box
      const cropTop = mouseY - rect.top - HALF_BOX;
      const cropLeft = mouseX - rect.left - HALF_BOX;
      const cropBottom = rect.height - (cropTop + BOX_SIZE);
      const cropRight = rect.width - (cropLeft + BOX_SIZE);

      imgDen.style.clipPath = `inset(${cropTop}px ${cropRight}px ${cropBottom}px ${cropLeft}px)`;
    } else {
      if (isHoveringSection) {
        isHoveringSection = false;
        cursorBox.classList.remove('active');
        document.body.style.cursor = '';
        imgDen.style.clipPath = 'inset(100%)';
      }
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    requestAnimationFrame(updateRevealCursor);
  });

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateRevealCursor);
  });
});