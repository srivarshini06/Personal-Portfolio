const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const cursor = document.getElementById('cursor');
const scrollProgress = document.getElementById('scrollProgress');
const backToTopButton = document.getElementById('backToTop');
const typingText = document.getElementById('typingText');
const pageLoader = document.getElementById('pageLoader');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');
const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
const typingRoles = ['Developer', 'Learner', 'Tech Enthusiast'];
let typingRoleIndex = 0;
let typingCharIndex = 0;

function setTheme(theme) {
  if (theme === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

function bindThemeToggle() {
  if (!themeToggle) return;
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const nextTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

window.addEventListener('mousemove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  cursor.classList.remove('hidden');
});

window.addEventListener('mouseout', () => {
  cursor.classList.add('hidden');
});

interactiveElements.forEach((element) => {
  element.addEventListener('mouseover', () => {
    cursor.classList.add('cursor-hover-active');
  });
  element.addEventListener('mouseout', () => {
    cursor.classList.remove('cursor-hover-active');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 100, 300)}ms`;
        setTimeout(() => {
          entry.target.classList.add('fade-in-visible');
        }, index * 100); // Stagger animations
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.fade-in').forEach((section) => observer.observe(section));

const projectGrid = document.getElementById('projectGrid');
const defaultProjects = [
  {
    title: 'Personal Portfolio Website',
    featured: true,
    description:
      'Built a responsive portfolio site with dark/light mode, scroll animations, typing effects, and toast notifications. Includes a Node.js + Express backend to serve dynamic project data.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express'],
    github: 'https://github.com/srivarshini06',
    highlight: 'Featured',
  },
  {
    title: 'Salon Management System',
    description:
      'Created during a Java Full Stack internship with a React frontend and booking workflow improvements for a polished salon management experience.',
    techStack: ['React', 'Java', 'Full Stack Development'],
    github: 'https://github.com/srivarshini06',
    highlight: 'Internship',
  },
  {
    title: 'Hiring Management System',
    description:
      'Developed as an academic project to manage candidate workflows and hiring logic with a focus on clean process design and core functionality.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/srivarshini06',
    highlight: 'Academic Project',
  },
];

function renderProjects(projects) {
  if (!projectGrid) return;
  projectGrid.innerHTML = '';

  if (!projects.length) {
    projectGrid.innerHTML = `
      <article class="project-card fade-in rounded-[2rem] border border-slate-200/70 bg-white text-slate-900 shadow-md p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:shadow-none">
        <span class="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">No projects</span>
        <h3 class="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">No project data available</h3>
        <p class="mt-4 text-slate-700 dark:text-slate-300">The backend returned no project entries.</p>
      </article>
    `;
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement('article');
    const featuredClasses = project.featured ? 'border-cyan-400/30' : '';
    card.className = `project-card group fade-in h-full flex flex-col justify-between rounded-[2rem] border border-slate-200/70 bg-white text-slate-900 shadow-md p-6 transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-400/30 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:shadow-none ${featuredClasses}`;
    card.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-3">
          <span class="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-200">${project.highlight || 'Project'}</span>
          ${project.featured ? '<span class="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/15 dark:text-cyan-200">Featured</span>' : ''}
        </div>
        <div class="space-y-4">
          <h3 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${project.title}</h3>
          <p class="text-slate-700 dark:text-slate-300">${project.description}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${project.techStack && project.techStack.length
            ? project.techStack
                .map(
                  (tag) =>
                    `<span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">${tag}</span>`
                )
                .join('')
            : ''}
        </div>
      </div>
      <div class="mt-auto flex flex-wrap gap-3 pt-4">
        ${project.github ? `<a href="${project.github}" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:bg-slate-800" target="_blank" rel="noreferrer">View GitHub</a>` : ''}
      </div>
    `;
    projectGrid.appendChild(card);
    observer.observe(card);
  });
}

async function fetchProjects() {
  if (!projectGrid) return;

  projectGrid.innerHTML = `
    <article class="project-card fade-in rounded-[2rem] border border-slate-200/70 bg-white text-slate-900 shadow-md p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:shadow-none">
      <span class="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">Loading</span>
      <h3 class="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Fetching projects…</h3>
      <p class="mt-4 text-slate-700 dark:text-slate-300">Connecting to the backend API at http://localhost:3000/api/projects.</p>
    </article>
  `;

  try {
    const response = await fetch('http://localhost:3000/api/projects');
    if (!response.ok) throw new Error('Failed to load projects');
    const data = await response.json();
    const projects = Array.isArray(data) ? data : defaultProjects;
    if (projects.length === 0) {
      renderProjects(defaultProjects);
    } else {
      renderProjects(projects);
    }
  } catch (error) {
    renderProjects(defaultProjects);
  }
}

function showPopup(message, type) {
  const popup = document.getElementById('popup');
  if (!popup) return;

  clearTimeout(window.popupTimeout);
  const icon = type === 'success' ? '✅' : '⚠️';
  popup.innerHTML = `
    <div class="flex items-start gap-3">
      <span class="mt-1 text-lg">${icon}</span>
      <div>
        <p class="font-semibold text-sm">${type === 'success' ? 'Message received!' : 'Oops! Something went wrong'}</p>
        <p class="mt-1 text-sm leading-6">${message}</p>
      </div>
    </div>
  `;

  popup.className = 'fixed bottom-5 right-5 z-50 max-w-xs rounded-3xl border border-white/10 bg-slate-950/95 px-5 py-4 text-sm text-white shadow-2xl backdrop-blur-xl transition-all duration-300';
  popup.classList.add(type === 'success' ? 'border-emerald-400/20 bg-emerald-500/95 text-slate-950' : 'border-rose-400/20 bg-rose-500/95 text-slate-950');
  popup.classList.remove('hidden', 'opacity-0', 'translate-y-6');
  popup.classList.add('opacity-100', 'translate-y-0');

  window.popupTimeout = setTimeout(() => {
    popup.classList.remove('opacity-100');
    popup.classList.add('opacity-0', 'translate-y-6');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 300);
  }, 3000);
}

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (!contactForm || !contactName || !contactEmail || !contactMessage) return;

  const clearErrors = () => {
    nameError?.classList.add('hidden');
    emailError?.classList.add('hidden');
    messageError?.classList.add('hidden');
  };

  contactName.addEventListener('input', clearErrors);
  contactEmail.addEventListener('input', clearErrors);
  contactMessage.addEventListener('input', clearErrors);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const nameValue = contactName.value.trim();
    const emailValue = contactEmail.value.trim();
    const messageValue = contactMessage.value.trim();
    const emailValid = emailValue.includes('@') && emailValue.includes('.');

    let hasError = false;
    if (!nameValue) {
      nameError?.classList.remove('hidden');
      hasError = true;
    }
    if (!emailValue || !emailValid) {
      emailError?.classList.remove('hidden');
      hasError = true;
    }
    if (!messageValue) {
      messageError?.classList.remove('hidden');
      hasError = true;
    }

    if (hasError) {
      showPopup('Please fill out all fields before submitting.', 'error');
      return;
    }

    showPopup('Message received! I will get back to you soon.', 'success');
    contactForm.reset();
  });
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  scrollProgress.style.opacity = progress > 2 ? '1' : '0';
}

function updateActiveNav() {
  const currentPosition = window.scrollY + window.innerHeight * 0.3;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (!link) return;

    if (currentPosition >= top && currentPosition < top + height) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initializeTypingEffect() {
  if (!typingText) return;
  typingText.textContent = '';

  function type() {
    const role = typingRoles[typingRoleIndex];
    if (typingCharIndex < role.length) {
      typingText.textContent = role.slice(0, typingCharIndex + 1);
      typingCharIndex += 1;
      setTimeout(type, 120);
      return;
    }
    setTimeout(erase, 1200);
  }

  function erase() {
    const role = typingRoles[typingRoleIndex];
    if (typingCharIndex > 0) {
      typingText.textContent = role.slice(0, typingCharIndex - 1);
      typingCharIndex -= 1;
      setTimeout(erase, 80);
      return;
    }
    typingRoleIndex = (typingRoleIndex + 1) % typingRoles.length;
    setTimeout(type, 300);
  }

  type();
}

function hideLoader() {
  if (!pageLoader) return;
  pageLoader.classList.add('opacity-0');
  setTimeout(() => {
    pageLoader.style.display = 'none';
  }, 500);
}

function createRipple(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement)) return;
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  ripple.className = 'ripple';
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) existingRipple.remove();
  button.appendChild(ripple);
}

function initializePageScroll() {
  updateScrollProgress();
  updateActiveNav();

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveNav();
    if (!backToTopButton) return;
    if (window.scrollY > 450) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
  });

  backToTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setTimeout(updateActiveNav, 300));
  });

  interactiveElements.forEach((element) => {
    element.addEventListener('click', createRipple);
  });
}

window.addEventListener('load', hideLoader);

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  bindThemeToggle();
  initializeContactForm();
  initializeTypingEffect();
  initializePageScroll();
  fetchProjects();
});
