document.addEventListener('DOMContentLoaded', () => {
  // Elements Modal Cơm Độn
  const comDonImg = document.querySelector('.clickable-com-don');
  const comDonModal = document.getElementById('com-don-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');

  // Elements Modal Đậu Phụ Tẩm Hành
  const dauPhuImg = document.querySelector('.clickable-dau-phu');
  const dauPhuModal = document.getElementById('dau-phu-modal');
  const closeDauPhuModalBtn = document.getElementById('dau-phu-modal-close-btn');

  // Elements Modal Lạc Rang
  const lacImg = document.querySelector('.clickable-lac');
  const lacModal = document.getElementById('lac-modal');
  const closeLacModalBtn = document.getElementById('lac-modal-close-btn');

  // Elements Modal Rau Tập Tàng
  const rauImg = document.querySelector('.clickable-rau');
  const rauModal = document.getElementById('rau-modal');
  const closeRauModalBtn = document.getElementById('rau-modal-close-btn');

  // Elements Modal Tóp Mỡ (PORK GREAVES)
  const topMoImg = document.querySelector('.clickable-top-mo');
  const topMoModal = document.getElementById('top-mo-modal');
  const closeTopMoModalBtn = document.getElementById('top-mo-modal-close-btn');

  // Common UI Elements
  const nextBtn = document.querySelector('.btn-next-wrapper');
  const squareBtn = document.querySelector('.btn-square-wrapper');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  const flipCardXepHang = document.getElementById('flip-card-xep-hang');
  if (flipCardXepHang) {
  flipCardXepHang.addEventListener('click', () => {
    flipCardXepHang.classList.toggle('flipped');
  });
}
// Bổ sung đoạn mã này vào bên trong document.addEventListener('DOMContentLoaded', () => { ... })

// --- Modal 3: Lạc Rang Events ---
  const lacPopup = document.getElementById('lac-popup');

  if (lacImg && lacModal) {
    lacImg.addEventListener('click', () => {
      lacModal.classList.add('active');
    });
  }

  // Hover effect to trigger thoailacrang popup
  if (lacImg && lacPopup) {
    lacImg.addEventListener('mouseenter', () => {
      lacPopup.classList.add('active');
    });

    lacImg.addEventListener('mouseleave', () => {
      lacPopup.classList.remove('active');
    });
  }

  if (closeLacModalBtn && lacModal) {
    closeLacModalBtn.addEventListener('click', () => {
      lacModal.classList.remove('active');
    });
  }

  if (lacModal) {
    lacModal.addEventListener('click', (e) => {
      if (e.target === lacModal) {
        lacModal.classList.remove('active');
      }
    });
  }

// --- TYPEWRITER EFFECT (REUSABLE FOR ALL TYPEWRITER TEXTS) ---
  function setupTypewriter(element) {
    if (!element) return;

    const fullText = element.getAttribute('data-text');
    const contentSpan = element.querySelector('.typewriter-content');
    const cursorSpan = element.querySelector('.typewriter-cursor');
    if (!fullText || !contentSpan) return;

    let hasTriggered = false;
    contentSpan.textContent = '';

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          typeText(contentSpan, fullText, 35, () => {
            setTimeout(() => {
              if (cursorSpan) cursorSpan.style.display = 'none';
            }, 2000);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);
  }

  function typeText(targetElement, text, speed, onComplete) {
    let index = 0;
    function charByChar() {
      if (index < text.length) {
        targetElement.textContent += text.charAt(index);
        index++;
        setTimeout(charByChar, speed);
      } else if (onComplete) {
        onComplete();
      }
    }
    charByChar();
  }

  // Initialize all typewriter instances
  document.querySelectorAll('#turningPointText, #foodCouponText, .typewriter-text').forEach(setupTypewriter);
// --- TƯƠNG TÁC NẮP NỒI (RUNG KHI SÔI & KÉO THẢ) ---
const napNoi1 = document.getElementById('nap-noi-1') || document.querySelector('.asset-18');
const napNoi2 = document.getElementById('nap-noi-2') || document.querySelector('.asset-17');
const lidElements = [napNoi1, napNoi2].filter(Boolean);

// 1. Bật hiệu ứng nắp nồi rung khi cuộn tới Section 8 (chứa bếp lửa)
const section8 = document.querySelector('.bg-7') || document.querySelector('.asset-16');

if (section8 && lidElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      lidElements.forEach(lid => {
        // Chỉ rung khi cuộn tới và nắp nồi chưa bị người dùng kéo đi
        if (entry.isIntersecting && !lid.dataset.hasBeenDragged) {
          lid.classList.add('rattling');
        } else {
          lid.classList.remove('rattling');
        }
      });
    });
  }, { threshold: 0.2 });

  observer.observe(section8);
}

// 2. Logic Drag & Drop cho các nắp nồi
lidElements.forEach(lid => {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    lid.dataset.hasBeenDragged = 'true'; // Đánh dấu đã kéo để dừng rung vĩnh viễn
    lid.classList.remove('rattling');
    lid.classList.add('is-dragging');

    // Tọa độ click chuột hoặc chạm ứng với Touch/Mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;

    initialLeft = lid.offsetLeft;
    initialTop = lid.offsetTop;

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    lid.style.left = `${initialLeft + dx}px`;
    lid.style.top = `${initialTop + dy}px`;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    lid.classList.remove('is-dragging');

    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);
  };

  lid.addEventListener('mousedown', onPointerDown);
  lid.addEventListener('touchstart', onPointerDown, { passive: false });
});


// --- TƯƠNG TÁC TAY CHO GIA VỊ & HẠT MUỐI RƠI (ĐÃ ĐIỀU CHỈNH CHẬM & THƯA) ---
const tayGiaViAsset = document.getElementById('asset-tay-gia-vi') || document.querySelector('.asset-20');
const tayGiaViFollower = document.getElementById('tay-gia-vi-follower');
const saltCanvas = document.getElementById('salt-canvas');

let isSaltSectionActive = false;
let mouseX = 0;
let mouseY = 0;
let saltParticles = [];
let animFrameId = null;
let frameCounter = 0; // Biến đếm frame để giãn khoảng cách sinh hạt muối

if (saltCanvas) {
  const ctx = saltCanvas.getContext('2d');

  function resizeCanvas() {
    saltCanvas.width = window.innerWidth;
    saltCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Lớp Hạt Muối (Tùy chỉnh Rơi Chậm)
  class SaltParticle {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 12;
      this.y = y + 30 + (Math.random() * 5);
      this.size = Math.random() * 1.8 + 1;        // Kích thước hạt tinh tế
      this.vx = (Math.random() - 0.5) * 0.4;      // Tản ngang cực nhẹ
      this.vy = Math.random() * 0.5 + 0.2;        // Tốc độ rơi ban đầu RẤT CHẬM (0.2 - 0.7)
      this.gravity = 0.025;                       // Trọng lực nhẹ giúp muối rơi từ từ
      this.alpha = 1;
      this.decay = Math.random() * 0.008 + 0.004; // Tan chậm phù hợp với tốc độ rơi
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
      ctx.shadowBlur = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Loop Hoạt họa Muối Rơi
  function renderSalt() {
    ctx.clearRect(0, 0, saltCanvas.width, saltCanvas.height);

    if (isSaltSectionActive) {
      frameCounter++;
      // Giảm tần suất: Cứ 4 frame mới thả 1 hạt muối (giúp hạt muối thưa và tự nhiên)
      if (frameCounter % 4 === 0) {
        saltParticles.push(new SaltParticle(mouseX, mouseY));
      }
    }

    // Cập nhật và vẽ hạt muối
    for (let i = saltParticles.length - 1; i >= 0; i--) {
      const p = saltParticles[i];
      p.update();
      p.draw();

      if (p.alpha <= 0 || p.y > saltCanvas.height) {
        saltParticles.splice(i, 1);
      }
    }

    animFrameId = requestAnimationFrame(renderSalt);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (isSaltSectionActive && tayGiaViFollower) {
      tayGiaViFollower.style.left = `${mouseX}px`;
      tayGiaViFollower.style.top = `${mouseY}px`;
    }
  });

  // Quan sát Section 7 để bật/tắt hiệu ứng
  const bgSection7 = document.querySelector('.bg-6') || tayGiaViAsset;

  if (bgSection7) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isSaltSectionActive = true;
          document.body.classList.add('salt-section-active');
          if (tayGiaViFollower) tayGiaViFollower.classList.add('active');

          if (!animFrameId) {
            renderSalt();
          }
        } else {
          isSaltSectionActive = false;
          document.body.classList.remove('salt-section-active');
          if (tayGiaViFollower) tayGiaViFollower.classList.remove('active');
        }
      });
    }, { threshold: 0.25 });

    observer.observe(bgSection7);
  }
}
// Bổ sung đoạn mã này vào bên trong document.addEventListener('DOMContentLoaded', () => { ... })

// --- TƯƠNG TÁC TEM LƯƠNG THỰC & CỬA HÀNG LƯƠNG THỰC ---
const temElem = document.getElementById('tem-luong-thuc');
const temFollower = document.getElementById('tem-cursor-follower');
const targetIconDrop = document.getElementById('target-icon-drop');
const baoGaoElem = document.getElementById('bao-gao');

let isHoldingTem = false;

// 1. Phát hiện khi cuộn tới vị trí Tem Lương Thực để bật Pulse Effect
if (temElem) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isHoldingTem && !temElem.classList.contains('picked-up')) {
        temElem.classList.add('pulse-invitation');
      }
    });
  }, { threshold: 0.4 });

  observer.observe(temElem);

  // 2. Click vào Tem -> Ẩn tem gốc & Biến con trỏ chuột thành Tem
  temElem.addEventListener('click', (e) => {
    if (temElem.classList.contains('picked-up')) return;

    isHoldingTem = true;
    temElem.classList.remove('pulse-invitation');
    temElem.classList.add('picked-up');

    if (temFollower) {
      temFollower.classList.add('active');
      temFollower.style.left = `${e.clientX}px`;
      temFollower.style.top = `${e.clientY}px`;
    }
    document.body.classList.add('holding-tem');

    // Hiện Icon nhấp nháy ở Cửa Hàng Lương Thực
    if (targetIconDrop) {
      targetIconDrop.classList.add('active');
    }
  });
}

// 3. Cập nhật vị trí con trỏ chuột Tem theo chuyển động chuột
document.addEventListener('mousemove', (e) => {
  if (isHoldingTem && temFollower) {
    temFollower.style.left = `${e.clientX}px`;
    temFollower.style.top = `${e.clientY}px`;
  }
});

// 4. Click vào Icon nhấp nháy ở Cửa hàng -> Thả Tem & Hiện Bao Gạo
if (targetIconDrop) {
  targetIconDrop.addEventListener('click', () => {
    if (!isHoldingTem) return;

    isHoldingTem = false;

    // Con trỏ Tem biến mất dần
    if (temFollower) {
      temFollower.classList.remove('active');
    }
    document.body.classList.remove('holding-tem');

    // Tắt Icon nhấp nháy
    targetIconDrop.classList.remove('active');

    // Bao gạo từ từ xuất hiện và ở lại vĩnh viễn
    if (baoGaoElem) {
      baoGaoElem.classList.add('show');
    }
  });
}

  // --- Modal 1: Cơm Độn Events ---
  if (comDonImg && comDonModal) {
    comDonImg.addEventListener('click', () => {
      comDonModal.classList.add('active');
    });
  }

  if (closeModalBtn && comDonModal) {
    closeModalBtn.addEventListener('click', () => {
      comDonModal.classList.remove('active');
    });
  }

  if (comDonModal) {
    comDonModal.addEventListener('click', (e) => {
      if (e.target === comDonModal) {
        comDonModal.classList.remove('active');
      }
    });
  }

  // --- Modal 2: Đậu Phụ Tẩm Hành Events ---
  if (dauPhuImg && dauPhuModal) {
    dauPhuImg.addEventListener('click', () => {
      dauPhuModal.classList.add('active');
    });
  }

  if (closeDauPhuModalBtn && dauPhuModal) {
    closeDauPhuModalBtn.addEventListener('click', () => {
      dauPhuModal.classList.remove('active');
    });
  }

  if (dauPhuModal) {
    dauPhuModal.addEventListener('click', (e) => {
      if (e.target === dauPhuModal) {
        dauPhuModal.classList.remove('active');
      }
    });
  }

  // --- Modal 3: Lạc Rang Events ---
  if (lacImg && lacModal) {
    lacImg.addEventListener('click', () => {
      lacModal.classList.add('active');
    });
  }

  if (closeLacModalBtn && lacModal) {
    closeLacModalBtn.addEventListener('click', () => {
      lacModal.classList.remove('active');
    });
  }

  if (lacModal) {
    lacModal.addEventListener('click', (e) => {
      if (e.target === lacModal) {
        lacModal.classList.remove('active');
      }
    });
  }

  // --- Modal 4: Rau Tập Tàng Events ---
  if (rauImg && rauModal) {
    rauImg.addEventListener('click', () => {
      rauModal.classList.add('active');
    });
  }

  if (closeRauModalBtn && rauModal) {
    closeRauModalBtn.addEventListener('click', () => {
      rauModal.classList.remove('active');
    });
  }

  if (rauModal) {
    rauModal.addEventListener('click', (e) => {
      if (e.target === rauModal) {
        rauModal.classList.remove('active');
      }
    });
  }

  // --- Modal 5: Tóp Mỡ (PORK GREAVES) Events ---
  if (topMoImg && topMoModal) {
    topMoImg.addEventListener('click', () => {
      topMoModal.classList.add('active');
    });
  }

  if (closeTopMoModalBtn && topMoModal) {
    closeTopMoModalBtn.addEventListener('click', () => {
      topMoModal.classList.remove('active');
    });
  }

  if (topMoModal) {
    topMoModal.addEventListener('click', (e) => {
      if (e.target === topMoModal) {
        topMoModal.classList.remove('active');
      }
    });
  }

  // --- Actions Khác ---
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Event listener cho nút Next
    });
  }

  if (squareBtn) {
    squareBtn.addEventListener('click', () => {
      // Event listener cho nút vuông
    });
  }

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      // Event listener cho Menu Hamburger
    });
    
  }
});


