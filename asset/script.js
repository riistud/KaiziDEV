/**
 * KaiziDeveloper Portfolio
 * Enhanced Main JavaScript file
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize preloader first
  initPreloader();
  
  // Initialize all components after preloader is hidden
  setTimeout(() => {
    initTheme();
    initNavigation();
    initMusicPlayer();
    initTypingEffect();
    initTabsSystem();
    initSkillsSection();
    initThanksSection();
    initContactForm();
    initScrollAnimations();
    initCurrentYear();
    initStarsBackground();
    
    // Initialize AOS library if included
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    }
  }, 1500); // Slight delay to allow preloader animation
});

// Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  
  // Hide preloader after delay
  setTimeout(() => {
    preloader.classList.add('hidden');
    
    // Remove from DOM after transition completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 2000);
}

// Theme Toggle Functionality
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);
  
  // Apply theme on load
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }
  
  // Function to update all theme icons
  function updateThemeIcons(isDark) {
    // Update main navbar icon
    const navIcon = themeToggle.querySelector('i');
    
    if (isDark) {
      navIcon.classList.remove('fa-moon');
      navIcon.classList.add('fa-sun');
    } else {
      navIcon.classList.remove('fa-sun');
      navIcon.classList.add('fa-moon');
    }
    
    // Update mobile menu icon if it exists
    if (mobileThemeToggle) {
      const mobileIcon = mobileThemeToggle.querySelector('i');
      
      if (isDark) {
        mobileIcon.classList.remove('fa-moon');
        mobileIcon.classList.add('fa-sun');
      } else {
        mobileIcon.classList.remove('fa-sun');
        mobileIcon.classList.add('fa-moon');
      }
    }
  }
  
  // Toggle theme function
  function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeIcons(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
  
  // Add click listeners to theme toggle buttons
  themeToggle.addEventListener('click', toggleTheme);
  
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
}

// Advanced Navigation and Mobile Menu
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileCloseButton = document.getElementById('mobile-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const body = document.body;
  
  // Create backdrop for mobile menu
  const backdrop = document.createElement('div');
  backdrop.classList.add('mobile-backdrop');
  body.appendChild(backdrop);
  
  // Function to open mobile menu
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
    body.classList.add('no-scroll');
    
    // Animate menu items with staggered delay
    mobileNavLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.opacity = "0";
        link.style.transform = "translateX(20px)";
        
        // Force reflow
        link.offsetWidth;
        
        link.style.transition = "all 0.3s ease-out " + (index * 0.1) + "s";
        link.style.opacity = "1";
        link.style.transform = "translateX(0)";
      }, 50);
    });
  }
  
  // Function to close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
    body.classList.remove('no-scroll');
  }
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', openMobileMenu);
  
  // Close menu with close button
  if (mobileCloseButton) {
    mobileCloseButton.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when backdrop is clicked
  backdrop.addEventListener('click', closeMobileMenu);
  
  // Close menu when a mobile link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Handle escape key to close menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    // Add or remove scrolled class based on scroll position
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Highlight active nav link based on scroll position
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 100)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active classes on nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll for navigation links with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset considering navbar height and extra padding
        const navbarHeight = navbar.offsetHeight;
        const scrollOffset = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: scrollOffset,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
      }
    });
  }
}

// Enhanced Floating Music Player
function initMusicPlayer() {
  const musicPlayerContainer = document.getElementById('music-player-container');
  const musicToggle = document.getElementById('music-toggle');
  const volumeButton = document.getElementById('volume-button');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeSliderContainer = document.getElementById('volume-slider-container');
  
  // Audio setup with custom error handling
  let audio = new Audio('src/songs.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  
  // Preload audio
  audio.preload = 'auto';
  
  // Show the music player with animation after a delay
  setTimeout(() => {
    musicPlayerContainer.classList.add('visible');
  }, 3000);
  
  // Toggle play/pause
  musicToggle.addEventListener('click', () => {
    if (audio.paused) {
      const playPromise = audio.play();
      
      // Handle play promise (modern browsers require this for autoplay policies)
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started successfully
          musicToggle.classList.add('playing');
          musicToggle.querySelector('i').classList.remove('fa-play');
          musicToggle.querySelector('i').classList.add('fa-pause');
        }).catch(error => {
          // Auto-play was prevented
          console.error('Audio playback failed:', error);
          // Display a visual indication that audio couldn't be played
          musicToggle.classList.add('error');
          setTimeout(() => musicToggle.classList.remove('error'), 300);
        });
      }
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('i').classList.remove('fa-pause');
      musicToggle.querySelector('i').classList.add('fa-play');
    }
  });
  
  // Make music player draggable on desktop
  if (window.innerWidth >= 768) {
    let isDragging = false;
    let offsetX, offsetY;
    
    // Start drag
    musicPlayerContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - musicPlayerContainer.getBoundingClientRect().left;
      offsetY = e.clientY - musicPlayerContainer.getBoundingClientRect().top;
      musicPlayerContainer.style.cursor = 'grabbing';
    });
    
    // During drag
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      // Constrain to window boundaries
      const maxX = window.innerWidth - musicPlayerContainer.offsetWidth;
      const maxY = window.innerHeight - musicPlayerContainer.offsetHeight;
      
      const boundedX = Math.max(0, Math.min(x, maxX));
      const boundedY = Math.max(0, Math.min(y, maxY));
      
      musicPlayerContainer.style.right = 'auto';
      musicPlayerContainer.style.bottom = 'auto';
      musicPlayerContainer.style.left = boundedX + 'px';
      musicPlayerContainer.style.top = boundedY + 'px';
    });
    
    // End drag
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        musicPlayerContainer.style.cursor = 'grab';
      }
    });
  }
  
  // Volume control
  volumeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    volumeSliderContainer.classList.toggle('hidden');
  });
  
  // Close volume slider when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target !== volumeButton && e.target !== volumeSlider && !volumeSlider.contains(e.target)) {
      volumeSliderContainer.classList.add('hidden');
    }
  });
  
  // Adjust volume with smooth transitions
  volumeSlider.addEventListener('input', () => {
    const newVolume = parseFloat(volumeSlider.value);
    
    // Smoothly transition volume
    const currentVolume = audio.volume;
    const volumeChangeStep = 0.05;
    const direction = newVolume > currentVolume ? 1 : -1;
    
    let currentStep = currentVolume;
    const volumeInterval = setInterval(() => {
      currentStep += volumeChangeStep * direction;
      
      if ((direction === 1 && currentStep >= newVolume) || 
          (direction === -1 && currentStep <= newVolume)) {
        currentStep = newVolume;
        clearInterval(volumeInterval);
      }
      
      audio.volume = currentStep;
      updateVolumeIcon(currentStep);
    }, 20);
  });
  
  // Update volume icon based on level
  function updateVolumeIcon(volume) {
    const icon = volumeButton.querySelector('i');
    icon.className = ''; // Clear existing classes
    
    if (volume === 0) {
      icon.classList.add('fas', 'fa-volume-mute');
    } else if (volume < 0.3) {
      icon.classList.add('fas', 'fa-volume-off');
    } else if (volume < 0.7) {
      icon.classList.add('fas', 'fa-volume-down');
    } else {
      icon.classList.add('fas', 'fa-volume-up');
    }
  }
  
  // Handle keyboard shortcuts for music
  document.addEventListener('keydown', (e) => {
    // Space bar for play/pause when not in input/textarea
    if (e.code === 'Space' && 
        document.activeElement.tagName !== 'INPUT' && 
        document.activeElement.tagName !== 'TEXTAREA' && 
        document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault();
      musicToggle.click();
    }
    
    // M key for mute/unmute
    if (e.key.toLowerCase() === 'm') {
      if (audio.volume > 0) {
        audio.dataset.prevVolume = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = audio.dataset.prevVolume || 0.5;
      }
      updateVolumeIcon(audio.volume);
    }
  });
}

// Typing Effect
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'Full-stack Developer',
    'Bot Creator',
    'Problem Solver',
    'Automation Expert'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let pauseDuration = 1500;
  
  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Delete faster than typing
    } else {
      // Typing text
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    // If finished typing the current phrase
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = pauseDuration; // Pause before deleting
    } 
    // If finished deleting the current phrase
    else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start the typing effect
  typeText();
}

// Tab System
function initTabsSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to current button and content
      button.classList.add('active');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Skills Section
function initSkillsSection() {
  const skillsGrid = document.querySelector('.skills-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Skills data
  const skills = [
    {
      name: 'JavaScript',
      icon: 'fab fa-js',
      iconColor: '#F7DF1E',
      proficiency: 90,
      description: 'Modern ES6+, async/await, and functional programming concepts',
      category: 'language'
    },
    {
      name: 'PHP',
      icon: 'fab fa-php',
      iconColor: '#777BB4',
      proficiency: 85,
      description: 'Object-oriented PHP development with modern practices',
      category: 'language'
    },
    {
      name: 'NodeJS',
      icon: 'fab fa-node-js',
      iconColor: '#339933',
      proficiency: 92,
      description: 'Server-side JavaScript with Express and event-driven architecture',
      category: 'framework'
    },
    {
      name: 'HTML5',
      icon: 'fab fa-html5',
      iconColor: '#E34F26',
      proficiency: 95,
      description: 'Semantic markup, accessibility, and modern web standards',
      category: 'language'
    },
    {
      name: 'Python',
      icon: 'fab fa-python',
      iconColor: '#3776AB',
      proficiency: 80,
      description: 'Data processing, automation, and script development',
      category: 'language'
    },
    {
      name: 'React',
      icon: 'fab fa-react',
      iconColor: '#61DAFB',
      proficiency: 88,
      description: 'Modern React with hooks, context, and state management',
      category: 'framework'
    },
    {
      name: 'Git',
      icon: 'fab fa-git-alt',
      iconColor: '#F05032',
      proficiency: 85,
      description: 'Version control with branches, merging, and collaboration',
      category: 'tool'
    },
    {
      name: 'Docker',
      icon: 'fab fa-docker',
      iconColor: '#2496ED',
      proficiency: 75,
      description: 'Containerization for consistent development and deployment',
      category: 'tool'
    }
  ];
  
  // Generate skill cards
  function renderSkills(category = 'all') {
    skillsGrid.innerHTML = '';
    
    const filteredSkills = category === 'all' 
      ? skills 
      : skills.filter(skill => skill.category === category);
    
    filteredSkills.forEach((skill, index) => {
      const delay = index * 100;
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.style.transitionDelay = `${delay}ms`;
      
      // Badge class based on category
      const badgeClass = skill.category === 'language' 
        ? 'badge-language' 
        : skill.category === 'framework' 
          ? 'badge-framework' 
          : 'badge-tool';
      
      card.innerHTML = `
        <div class="skill-top-bar" style="background-color: ${skill.iconColor}"></div>
        <span class="skill-badge ${badgeClass}">
          ${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
        </span>
        <div class="skill-content">
          <div class="skill-header">
            <div class="skill-icon" style="color: ${skill.iconColor}">
              <i class="${skill.icon}"></i>
            </div>
            <div class="skill-info">
              <h3 class="skill-name">${skill.name}</h3>
              <div class="skill-level">Proficiency ${skill.proficiency}%</div>
            </div>
          </div>
          <div class="skill-progress">
            <div class="progress-bar" style="background-color: ${skill.iconColor}" data-width="${skill.proficiency}%"></div>
          </div>
          <p class="skill-description">${skill.description}</p>
        </div>
      `;
      
      skillsGrid.appendChild(card);
    });
    
    // Add animation classes to cards after small delay
    setTimeout(() => {
      document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.add('visible');
      });
      
      // Animate skill bars
      document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
    }, 100);
  }
  
  // Initial render
  renderSkills();
  
  // Add filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Render filtered skills
      renderSkills(category);
    });
  });
}

// Thanks Section
function initThanksSection() {
  const thanksGrid = document.querySelector('.thanks-grid');
  
  // Thanks data
  const thanksData = [
    { name: 'Vampire Developer', relation: 'Mentor', icon: 'fas fa-chalkboard-teacher' },
    { name: 'RapippModss', relation: 'Colleague', icon: 'fas fa-laptop-code' },
    { name: 'Acha', relation: 'Girlfriend', icon: 'fas fa-heart' },
    { name: 'Daffa Developer', relation: 'Partner', icon: 'fas fa-handshake' },
    { name: 'Hamzz Developer', relation: 'Partner', icon: 'fas fa-handshake' },
    { name: 'Tama Ryuichi', relation: 'Partner', icon: 'fas fa-handshake' },
    { name: 'Swipper', relation: 'Partner', icon: 'fas fa-handshake' },
    { name: 'Xatanic', relation: 'Support', icon: 'fas fa-award' },
    { name: 'PermenMD', relation: 'Support', icon: 'fas fa-award' },
    { name: 'Delta', relation: 'Support', icon: 'fas fa-award' },
    { name: 'DrayXD', relation: 'Partner', icon: 'fas fa-handshake' }
  ];
  
  // Generate thanks cards
  thanksData.forEach(person => {
    const card = document.createElement('div');
    card.className = 'thanks-card';
    
    card.innerHTML = `
      <div class="thanks-icon">
        <i class="${person.icon}"></i>
      </div>
      <h3 class="thanks-name">${person.name}</h3>
      <p class="thanks-relation">${person.relation}</p>
      <a class="thanks-action">Thank You!</a>
    `;
    
    thanksGrid.appendChild(card);
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-section');
  
  function checkInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });
  }
  
  // Run on initial load
  checkInView();
  
  // Run on scroll
  window.addEventListener('scroll', () => {
    checkInView();
  });
}

// Set Current Year in Footer
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Stars Background
function initStarsBackground() {
  const starsContainer = document.getElementById('stars-background');
  
  function createStars() {
    // Clear any existing stars
    starsContainer.innerHTML = '';
    
    // Create new stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      
      // Apply styles
      star.style.position = 'absolute';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'white';
      star.style.opacity = opacity;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.animation = `twinkle ${duration}s infinite alternate`;
      
      starsContainer.appendChild(star);
    }
  }
  
  // Define the twinkle animation if not already in CSS
  if (!document.querySelector('#twinkle-animation')) {
    const style = document.createElement('style');
    style.id = 'twinkle-animation';
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create initial stars
  createStars();
  
  // Recreate stars on window resize
  window.addEventListener('resize', createStars);
}