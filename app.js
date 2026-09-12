/* Shan Chakraborty Portfolio - Interactive Application Logic */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initScrollNav();
});

/* 1. Interactive Background Particle Canvas */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* 2. Project Category Filter */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 3. Project Detail Modal Data & Controller */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');

  const projectDetails = {
    devpulse: {
      title: "DevPulse Web Portal",
      image: "assets/devpulse.jpg",
      tags: ["PHP", "JavaScript", "HTML/CSS", "MySQL"],
      desc: "DevPulse is a full-stack Web Application designed by Shan Chakraborty. It provides an intuitive web interface for monitoring server telemetry, dynamic user sessions, and database analytics.",
      features: [
        "Secure User Authentication & Session Management built in PHP",
        "Responsive Dashboard UI crafted with CSS Grid & Glassmorphic styling",
        "Asynchronous JavaScript AJAX requests for live data polling",
        "MySQL relational database schema for storing analytics records"
      ]
    },
    pyautomate: {
      title: "PyAutomate & Analytics Tool",
      image: "assets/pyautomate.jpg",
      tags: ["Python", "Automation", "Data Scraping"],
      desc: "PyAutomate is a Python-powered automation utility created to eliminate repetitive workflow tasks. It automates web data extraction, log file parsing, and automated report generation.",
      features: [
        "Robust error handling and custom logging modules",
        "Web scraping and JSON/CSV data extraction pipeline",
        "Automated email notification dispatcher for alert triggers",
        "Modular Python architecture easily extendable for server cron jobs"
      ]
    },
    cms: {
      title: "Lightweight PHP Content Management System",
      image: "assets/cms.jpg",
      tags: ["PHP", "MySQL", "HTML5", "CSS3"],
      desc: "A custom-built lightweight PHP CMS engine that allows users to create, edit, publish, and manage digital articles and web content with zero third-party framework dependencies.",
      features: [
        "Clean MVC architecture using native PHP classes",
        "Prepared PDO statements for protection against SQL Injection",
        "Dynamic routing engine and SEO-friendly URL slug generation",
        "Modern admin dashboard with real-time article previews"
      ]
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.dataset.project;
      const data = projectDetails[projKey];

      if (data) {
        modalContent.innerHTML = `
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
          <h2 style="font-size: 1.8rem; margin-bottom: 12px;">${data.title}</h2>
          <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
            ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">${data.desc}</p>
          <h4 style="color: var(--accent-cyan); margin-bottom: 10px;">Key Features:</h4>
          <ul style="padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 24px;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div style="display: flex; gap: 12px;">
            <a href="#matrix" class="btn btn-primary btn-sm" onclick="closeProjectModal()"><i class="fa-solid fa-layer-group"></i> View Architecture</a>
          </div>
        `;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

/* 5. Contact Form Validation & Toast */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    showToast(`Thank you, ${name}! Your message has been sent to Shan Chakraborty.`);
    form.reset();
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* 6. Navigation Highlighting */
function initScrollNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
