/**
 * JavaScript for Ola Uber Rapido And Namma yathri Attachment office Bangalore
 * Handles navigation drawer, dialog modals for call support, scroll reveals, and actions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Scroll Shift ---
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.style.padding = '0.2rem 0';
      header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.padding = '0';
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();


  // --- Mobile Navigation Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileMenuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when navigation link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }


  // --- Phone Support Call Picker Modal Dialog ---
  const callModal = document.getElementById('call-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const callTriggers = document.querySelectorAll('.btn-call-trigger');

  const openCallModal = (e) => {
    e.preventDefault();
    if (callModal) {
      callModal.style.display = 'flex';
      // Force repaint to allow transition animation
      setTimeout(() => {
        callModal.classList.add('active');
      }, 10);
    }
  };

  const closeCallModal = () => {
    if (callModal) {
      callModal.classList.remove('active');
      setTimeout(() => {
        callModal.style.display = 'none';
      }, 250);
    }
  };

  callTriggers.forEach(btn => {
    btn.addEventListener('click', openCallModal);
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCallModal);
  }

  // Close modal when clicking outside the card
  if (callModal) {
    callModal.addEventListener('click', (e) => {
      if (e.target === callModal) {
        closeCallModal();
      }
    });
  }


  // --- Scroll to Top Action ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // --- Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.1, // Trigger reveal sooner
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => {
      el.classList.add('active');
    });
  }

});
