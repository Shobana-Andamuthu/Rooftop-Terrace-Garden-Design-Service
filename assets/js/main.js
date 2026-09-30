/**
 * TERRAVERDE - Rooftop & Terrace Garden Design Service
 * Interactive Core Logic (Theme, RTL, Mobile Navigation, Floating Back-To-Top, Login)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;

  const getSavedTheme = () => {
    const saved = localStorage.getItem('terra_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('terra_theme', theme);
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const isFullText = btn.classList.contains('mobile-theme-btn') || 
                         btn.classList.contains('auth-nav-btn') || 
                         Boolean(btn.closest('.mobile-controls-row')) || 
                         Boolean(btn.closest('.mobile-drawer-footer'));
      
      if (theme === 'dark') {
        btn.classList.add('theme-dark-active');
        if (isFullText) {
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> <span>Light Mode</span>`;
        } else {
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        }
      } else {
        btn.classList.remove('theme-dark-active');
        if (isFullText) {
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> <span>Dark Mode</span>`;
        } else {
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        }
      }
    });
  };

  applyTheme(getSavedTheme());

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // 2. RTL Management (LTR / RTL)
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');

  const getSavedDirection = () => {
    return localStorage.getItem('terra_dir') || 'ltr';
  };

  const applyDirection = (dir) => {
    htmlElement.setAttribute('dir', dir);
    localStorage.setItem('terra_dir', dir);
    rtlToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'} layout`);
      const isMobileText = btn.classList.contains('mobile-rtl-btn') || 
                           Boolean(btn.closest('.mobile-controls-row')) || 
                           Boolean(btn.closest('.mobile-drawer-footer'));
      
      if (dir === 'rtl') {
        btn.classList.add('rtl-active');
        btn.classList.add('active');
        if (isMobileText) {
          btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>LTR</span>`;
        } else {
          btn.textContent = 'LTR';
        }
      } else {
        btn.classList.remove('rtl-active');
        btn.classList.remove('active');
        if (isMobileText) {
          btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>RTL</span>`;
        } else {
          btn.textContent = 'RTL';
        }
      }
    });
  };

  applyDirection(getSavedDirection());

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = htmlElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
    });
  });

    // 3. Mobile Navigation Drawer
  const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
  const closeDrawerBtns = document.querySelectorAll('.close-drawer-btn, .drawer-close-btn');
  const navDrawers = document.querySelectorAll('.mobile-nav-overlay, .mobile-drawer, .mobile-nav-drawer');
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  const mobileSubMenus = document.querySelectorAll('.mobile-sub-menu');

  const closeMobileSubMenu = () => {
    mobileSubMenus.forEach(menu => {
      menu.style.display = 'none';
      menu.classList.remove('open');
    });
    mobileDropdownToggles.forEach(toggle => {
      const arrow = toggle.querySelector('.dropdown-chevron');
      if (arrow) arrow.style.transform = '';
    });
  };

  // Close mobile submenu initially so it never starts open
  closeMobileSubMenu();

  const toggleDrawer = (open) => {
    navDrawers.forEach(drawer => {
      if (open) {
        drawer.classList.add('open');
        drawer.classList.add('active');
      } else {
        drawer.classList.remove('open');
        drawer.classList.remove('active');
      }
    });
    document.body.style.overflow = open ? 'hidden' : '';
    // Always ensure submenu is closed whenever the drawer is opened or closed
    closeMobileSubMenu();
  };

  hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer(true);
    });
  });

  closeDrawerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer(false);
    });
  });

  navDrawers.forEach(drawer => {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        toggleDrawer(false);
      }
    });
  });

  // Close drawer on clicking navigation links
  const mobileActionLinks = document.querySelectorAll('.mobile-nav-links a:not(.mobile-dropdown-toggle)');
  mobileActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // 4. Mobile Home Submenu Accordion (Click/tap to expand or collapse)
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = toggle.closest('.mobile-dropdown-item') || toggle.closest('div');
      const subMenu = parent ? parent.querySelector('.mobile-sub-menu') : document.querySelector('.mobile-sub-menu');
      if (subMenu) {
        const isCurrentlyOpen = subMenu.classList.contains('open') || subMenu.style.display === 'flex';
        if (isCurrentlyOpen) {
          subMenu.style.display = 'none';
          subMenu.classList.remove('open');
          const arrow = toggle.querySelector('.dropdown-chevron');
          if (arrow) arrow.style.transform = '';
        } else {
          subMenu.style.display = 'flex';
          subMenu.classList.add('open');
          const arrow = toggle.querySelector('.dropdown-chevron');
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // 4.5 Desktop Home Dropdown Click & Touch Toggle
  const desktopDropdownToggles = document.querySelectorAll('.nav-item-dropdown .dropdown-toggle-btn, #homeDropdownBtn');
  desktopDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-item-dropdown');
      if (parent) {
        const isOpen = parent.classList.contains('open');
        document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('open'));
        if (!isOpen) {
          parent.classList.add('open');
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  // 5. Active Link Highlight (Home highlighted when on index.html or home-2.html)
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = currentPath === 'index.html' || currentPath === '' || currentPath === 'home-2.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link, .mobile-sub-link');
  
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  if (isHome) {
    const homeDropdownBtn = document.getElementById('homeDropdownBtn');
    if (homeDropdownBtn) homeDropdownBtn.classList.add('active');

    mobileDropdownToggles.forEach(toggle => {
      toggle.classList.add('active');
    });
  }

  // 6. Floating Back to Top Button (Scroll Awareness)
  const floatingBackToTopBtn = document.querySelector('.floating-back-to-top');
  
  if (floatingBackToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        floatingBackToTopBtn.classList.add('show');
      } else {
        floatingBackToTopBtn.classList.remove('show');
      }
    });

    floatingBackToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Login Modal Interactive Action
  const loginBtns = document.querySelectorAll('.btn-login, .mobile-login-btn, #navLoginBtn');
  const loginModal = document.getElementById('loginModal');
  const loginModalClose = document.getElementById('loginModalClose');

  const openLoginModal = () => {
    if (loginModal) {
      loginModal.classList.add('active');
      loginModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const emailInput = loginModal.querySelector('#loginEmail');
      if (emailInput) setTimeout(() => emailInput.focus(), 100);
    } else {
      alert('Client Portal Login — Enter your credentials to access personalized garden maintenance logs and site visit reports.');
    }
  };

  const closeLoginModal = () => {
    if (loginModal) {
      loginModal.classList.remove('active');
      loginModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && (href.includes('login.html') || href === 'login.html')) {
        return; // Allow direct navigation to dedicated login page
      }
      if (href === '#login' || !href) {
        e.preventDefault();
        window.location.href = 'login.html';
      }
    });
  });

  if (loginModalClose) {
    loginModalClose.addEventListener('click', closeLoginModal);
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        closeLoginModal();
      }
    });
  }

  // 8. Project Gallery Lightbox Modal Handler
  const projectViewBtns = document.querySelectorAll('.gal-view-btn');
  const projectModal = document.getElementById('projectDetailsModal');
  const projectModalClose = document.getElementById('projectModalClose');

  if (projectModal && projectViewBtns.length > 0) {
    const modalImg = document.getElementById('modalProjectImg');
    const modalTag = document.getElementById('modalProjectTag');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalArea = document.getElementById('modalProjectArea');
    const modalTimeline = document.getElementById('modalProjectTimeline');
    const modalIrrig = document.getElementById('modalProjectIrrig');
    const modalPlants = document.getElementById('modalProjectPlants');

    const openProjectModal = (btn) => {
      if (modalImg && btn.dataset.modalImg) modalImg.src = btn.dataset.modalImg;
      if (modalTag && btn.dataset.modalTag) modalTag.textContent = btn.dataset.modalTag;
      if (modalTitle && btn.dataset.modalTitle) modalTitle.textContent = btn.dataset.modalTitle;
      if (modalDesc && btn.dataset.modalDesc) modalDesc.textContent = btn.dataset.modalDesc;
      if (modalArea && btn.dataset.modalArea) modalArea.textContent = btn.dataset.modalArea;
      if (modalTimeline && btn.dataset.modalTimeline) modalTimeline.textContent = btn.dataset.modalTimeline;
      if (modalIrrig && btn.dataset.modalIrrig) modalIrrig.textContent = btn.dataset.modalIrrig;
      if (modalPlants && btn.dataset.modalPlants) modalPlants.textContent = btn.dataset.modalPlants;

      projectModal.classList.add('active');
      projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
      projectModal.classList.remove('active');
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    projectViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(btn);
      });
    });

    if (projectModalClose) {
      projectModalClose.addEventListener('click', closeProjectModal);
    }

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

    // 9. Universal Filter & Jump Pill Navigation (Persists active state on click + Scroll Spy)
  const filterBars = document.querySelectorAll('.plant-filter-bar, .gal-filter-bar');

  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.plant-filter-btn, .gal-filter-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Remove active class from all sibling buttons in this bar
        buttons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');

        // If it's an on-page section hash link, smooth scroll to target
        if (href && href.startsWith('#') && href.length > 1) {
          const targetSection = document.querySelector(href);
          if (targetSection) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Update URL hash without jumping
            if (history.pushState) {
              history.pushState(null, null, href);
            }
          }
        }
      });
    });
  });

  // Scroll Spy for Filter Bars (Auto-highlights filter button as user scrolls through sections)
  const observeSections = () => {
    const allFilterLinks = document.querySelectorAll('.plant-filter-bar a[href^="#"], .gal-filter-bar a[href^="#"]');
    if (allFilterLinks.length === 0) return;

    const sections = [];
    allFilterLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const sec = document.querySelector(id);
        if (sec && !sections.some(s => s.id === id)) {
          sections.push({ id, element: sec, link });
        }
      }
    });

    let isUserClicking = false;
    allFilterLinks.forEach(l => {
      l.addEventListener('click', () => {
        isUserClicking = true;
        setTimeout(() => { isUserClicking = false; }, 800);
      });
    });

    window.addEventListener('scroll', () => {
      if (isUserClicking) return;
      const scrollPos = window.scrollY + 140;

      sections.forEach(({ element, link }) => {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          const parentBar = link.closest('.plant-filter-bar, .gal-filter-bar');
          if (parentBar) {
            parentBar.querySelectorAll('.plant-filter-btn, .gal-filter-btn').forEach(b => b.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    });
  };

  observeSections();

  // 10. Newsletter & Contact Forms Feedback
  const newsletterForm = document.querySelector('.newsletter-form, #footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        alert('Thank you for subscribing to TerraVerde rooftop gardening insights!');
        input.value = '';
      }
    });
  }

  const siteVisitForm = document.getElementById('siteVisitForm');
  if (siteVisitForm) {
    siteVisitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your complimentary rooftop feasibility site visit request has been received. Our senior landscape architect will contact you within 24 hours.');
      siteVisitForm.reset();
      const dateTrig = siteVisitForm.querySelector('.tv-datepicker-trigger-text');
      if (dateTrig) dateTrig.textContent = 'Select preferred date...';
      const selectTrigs = siteVisitForm.querySelectorAll('.tv-select-trigger-text');
      selectTrigs.forEach(st => {
        const wrap = st.closest('.tv-custom-select-wrap');
        if (wrap) {
          const sel = wrap.querySelector('select');
          if (sel && sel.options[0]) st.textContent = sel.options[0].text;
        }
      });
    });
  }

  // 11. Auth Password Visibility Toggle
  const passwordToggleBtns = document.querySelectorAll('.password-toggle-btn');
  passwordToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputWrapper = btn.closest('.auth-input-wrapper') || btn.parentElement;
      const input = inputWrapper ? inputWrapper.querySelector('input') : null;
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      
      // Toggle eye / eye-off icon
      if (isPassword) {
        btn.innerHTML = `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        btn.innerHTML = `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  });

  // 12. Universal Luxury Custom Select Dropdown (100% Inside-Container Responsive Containment)
  const initCustomSelects = () => {
    const selects = document.querySelectorAll('select:not([data-customized])');
    selects.forEach(select => {
      select.setAttribute('data-customized', 'true');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'tv-custom-select-wrap';
      if (select.closest('.gal-site-visit-card') || select.closest('.dark-card')) {
        wrapper.classList.add('dark-card-select');
      }

      select.classList.add('tv-hidden-select');
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'tv-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      const triggerText = document.createElement('span');
      triggerText.className = 'tv-select-trigger-text';
      triggerText.textContent = selectedOption ? selectedOption.text : 'Select...';

      const chevron = document.createElement('span');
      chevron.className = 'tv-select-chevron';
      chevron.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

      trigger.appendChild(triggerText);
      trigger.appendChild(chevron);
      wrapper.appendChild(trigger);

      const dropdown = document.createElement('div');
      dropdown.className = 'tv-select-dropdown';
      dropdown.setAttribute('role', 'listbox');

      Array.from(select.options).forEach((opt, idx) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'tv-select-option';
        optionEl.setAttribute('role', 'option');
        optionEl.textContent = opt.text;
        optionEl.dataset.value = opt.value;

        if (opt.disabled) {
          optionEl.classList.add('disabled');
        }
        if (idx === select.selectedIndex) {
          optionEl.classList.add('selected');
        }

        optionEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (opt.disabled) return;

          select.selectedIndex = idx;
          triggerText.textContent = opt.text;
          
          dropdown.querySelectorAll('.tv-select-option').forEach(o => o.classList.remove('selected'));
          optionEl.classList.add('selected');

          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');

          select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        dropdown.appendChild(optionEl);
      });

      wrapper.appendChild(dropdown);

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrapper.classList.contains('open');

        document.querySelectorAll('.tv-custom-select-wrap.open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('open');
            const trig = w.querySelector('.tv-select-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          wrapper.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tv-custom-select-wrap')) {
        document.querySelectorAll('.tv-custom-select-wrap.open').forEach(w => {
          w.classList.remove('open');
          const trig = w.querySelector('.tv-select-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.tv-custom-select-wrap.open').forEach(w => {
          w.classList.remove('open');
          const trig = w.querySelector('.tv-select-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        });
      }
    });
  };

  const initCustomDatepickers = () => {
    const dateInputs = document.querySelectorAll('input[type="date"]:not([data-customized])');
    
    const MONTH_NAMES = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    dateInputs.forEach(input => {
      input.setAttribute('data-customized', 'true');
      input.classList.add('tv-hidden-date-input');

      const wrapper = document.createElement('div');
      wrapper.className = 'tv-custom-datepicker-wrap';
      if (input.closest('.gal-site-visit-card') || input.closest('.dark-card')) {
        wrapper.classList.add('dark-card-datepicker');
      }

      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);

      // Trigger button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'tv-datepicker-trigger';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-expanded', 'false');

      const triggerText = document.createElement('span');
      triggerText.className = 'tv-datepicker-trigger-text';
      
      const formatDisplayDate = (valStr) => {
        if (!valStr) return 'Select preferred date...';
        const parts = valStr.split('-');
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          const d = parseInt(parts[2], 10);
          return `${MONTH_NAMES[m]} ${d}, ${y}`;
        }
        return valStr;
      };

      triggerText.textContent = formatDisplayDate(input.value);

      const icon = document.createElement('span');
      icon.className = 'tv-datepicker-icon';
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;

      trigger.appendChild(triggerText);
      trigger.appendChild(icon);
      wrapper.appendChild(trigger);

      // Calendar Dropdown Popover
      const dropdown = document.createElement('div');
      dropdown.className = 'tv-datepicker-dropdown';
      dropdown.setAttribute('role', 'dialog');
      dropdown.setAttribute('aria-label', 'Calendar Date Picker');

      // State
      let currentDate = new Date();
      if (input.value) {
        const p = input.value.split('-');
        if (p.length === 3) {
          currentDate = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
        }
      }
      let viewYear = currentDate.getFullYear();
      let viewMonth = currentDate.getMonth();

      const renderCalendar = () => {
        dropdown.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'tv-dp-header';

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'tv-dp-nav-btn tv-dp-prev';
        prevBtn.setAttribute('aria-label', 'Previous Month');
        prevBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          viewMonth--;
          if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
          }
          renderCalendar();
        });

        const title = document.createElement('div');
        title.className = 'tv-dp-title';
        title.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'tv-dp-nav-btn tv-dp-next';
        nextBtn.setAttribute('aria-label', 'Next Month');
        nextBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          viewMonth++;
          if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
          }
          renderCalendar();
        });

        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        dropdown.appendChild(header);

        // Weekdays
        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = 'tv-dp-weekdays';
        DAY_NAMES.forEach(day => {
          const dEl = document.createElement('span');
          dEl.textContent = day;
          weekdaysRow.appendChild(dEl);
        });
        dropdown.appendChild(weekdaysRow);

        // Days Grid
        const grid = document.createElement('div');
        grid.className = 'tv-dp-grid';

        const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

        // Selected value parts
        let selYear = -1, selMonth = -1, selDay = -1;
        if (input.value) {
          const sp = input.value.split('-');
          if (sp.length === 3) {
            selYear = parseInt(sp[0], 10);
            selMonth = parseInt(sp[1], 10) - 1;
            selDay = parseInt(sp[2], 10);
          }
        }

        // Today
        const today = new Date();
        const todayY = today.getFullYear();
        const todayM = today.getMonth();
        const todayD = today.getDate();

        // Previous month padding days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
          const dayEl = document.createElement('button');
          dayEl.type = 'button';
          dayEl.className = 'tv-dp-day outside-month';
          dayEl.textContent = prevMonthDays - i;
          dayEl.addEventListener('click', (e) => {
            e.stopPropagation();
            viewMonth--;
            if (viewMonth < 0) {
              viewMonth = 11;
              viewYear--;
            }
            selectDate(viewYear, viewMonth, prevMonthDays - i);
          });
          grid.appendChild(dayEl);
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
          const dayEl = document.createElement('button');
          dayEl.type = 'button';
          dayEl.className = 'tv-dp-day current-month';
          dayEl.textContent = d;

          if (viewYear === todayY && viewMonth === todayM && d === todayD) {
            dayEl.classList.add('today');
          }
          if (viewYear === selYear && viewMonth === selMonth && d === selDay) {
            dayEl.classList.add('selected');
          }

          dayEl.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDate(viewYear, viewMonth, d);
          });

          grid.appendChild(dayEl);
        }

        // Next month padding days to fill 35 or 42 slots
        const totalSlots = grid.children.length;
        const remaining = (totalSlots % 7 === 0) ? 0 : (7 - (totalSlots % 7));
        for (let n = 1; n <= remaining; n++) {
          const dayEl = document.createElement('button');
          dayEl.type = 'button';
          dayEl.className = 'tv-dp-day outside-month';
          dayEl.textContent = n;
          dayEl.addEventListener('click', (e) => {
            e.stopPropagation();
            viewMonth++;
            if (viewMonth > 11) {
              viewMonth = 0;
              viewYear++;
            }
            selectDate(viewYear, viewMonth, n);
          });
          grid.appendChild(dayEl);
        }

        dropdown.appendChild(grid);

        // Footer Actions
        const footer = document.createElement('div');
        footer.className = 'tv-dp-footer';

        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'tv-dp-action-btn tv-dp-clear';
        clearBtn.textContent = 'Clear';
        clearBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          input.value = '';
          triggerText.textContent = 'Select preferred date...';
          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('input', { bubbles: true }));
        });

        const todayBtn = document.createElement('button');
        todayBtn.type = 'button';
        todayBtn.className = 'tv-dp-action-btn tv-dp-today';
        todayBtn.textContent = 'Today';
        todayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const t = new Date();
          selectDate(t.getFullYear(), t.getMonth(), t.getDate());
        });

        footer.appendChild(clearBtn);
        footer.appendChild(todayBtn);
        dropdown.appendChild(footer);
      };

      const selectDate = (y, m, d) => {
        const mm = String(m + 1).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        const valStr = `${y}-${mm}-${dd}`;
        input.value = valStr;
        triggerText.textContent = formatDisplayDate(valStr);
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };

      wrapper.appendChild(dropdown);

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrapper.classList.contains('open');

        // Close other datepickers & selects
        document.querySelectorAll('.tv-custom-datepicker-wrap.open, .tv-custom-select-wrap.open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('open');
            const trig = w.querySelector('.tv-datepicker-trigger, .tv-select-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          if (input.value) {
            const sp = input.value.split('-');
            if (sp.length === 3) {
              viewYear = parseInt(sp[0], 10);
              viewMonth = parseInt(sp[1], 10) - 1;
            }
          }
          renderCalendar();
          wrapper.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tv-custom-datepicker-wrap')) {
        document.querySelectorAll('.tv-custom-datepicker-wrap.open').forEach(w => {
          w.classList.remove('open');
          const trig = w.querySelector('.tv-datepicker-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.tv-custom-datepicker-wrap.open').forEach(w => {
          w.classList.remove('open');
          const trig = w.querySelector('.tv-datepicker-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        });
      }
    });
  };

  initCustomSelects();
  initCustomDatepickers();
});


