/* ==========================================================================
   Govind Tripathi - Blueprint Portfolio Interactive Logic
   WebGL Background, Synth Audio FX, Custom Cursors, and Accordions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. SOUND FX ENGINE (Real MP3 files + Web Audio custom synthesized blips)
  // ========================================================================
  let soundMuted = true;
  const muteToggle = document.getElementById('mute-toggle');
  const muteIcon = muteToggle.querySelector('i');

  const glitchSound = new Audio('glitch.mp3');
  const clickSound = new Audio('click.mp3');
  glitchSound.preload = 'auto';
  clickSound.preload = 'auto';
  glitchSound.volume = 0.22;
  clickSound.volume = 0.32;

  function playHoverTick() {
    if (soundMuted) return;
    try {
      glitchSound.currentTime = 0;
      glitchSound.play().catch(() => {});
    } catch (e) {}
  }

  function playClickChirp() {
    if (soundMuted) return;
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    } catch (e) {}
  }

  // Synthesized blip for tech tags
  function playTagBlip() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.012, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {}
  }

  // Synthesized key click for text handles and links
  function playKeyboardTick() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.006, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.015);
    } catch (e) {}
  }

  // Synthesized bell chime for certifications
  function playCertBell() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.06);
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {}
  }

  // Synthesized sweep for accordion expanding
  function playSlideSound() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  // Synthesized chord chime for theme switch
  function playThemeChime(isDark) {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      if (isDark) {
        osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.06);
      } else {
        osc1.frequency.setValueAtTime(659.25, audioCtx.currentTime);
        osc2.frequency.setValueAtTime(523.25, audioCtx.currentTime + 0.06);
      }
      gainNode.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.22);
      osc2.stop(audioCtx.currentTime + 0.22);
    } catch (e) {}
  }

  // Deep resonance trigger sound for WebGL indicator toggle
  function playResonanceSound() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.35);
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  // Toggle Mute Action
  muteToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    soundMuted = !soundMuted;
    localStorage.setItem('muted', soundMuted);
    updateMuteState();
  });

  function updateMuteState() {
    if (soundMuted) {
      document.body.classList.add('sound-muted');
      muteIcon.className = 'fa-solid fa-volume-xmark';
      muteToggle.style.color = 'var(--text-muted)';
    } else {
      document.body.classList.remove('sound-muted');
      muteIcon.className = 'fa-solid fa-volume-high';
      muteToggle.style.color = 'var(--accent-cyan)';
      playClickChirp();
    }
  }

  // Load saved mute preference
  const savedMute = localStorage.getItem('muted');
  if (savedMute !== null) {
    soundMuted = savedMute === 'true';
    updateMuteState();
  }


  // ========================================================================
  // 2. CUSTOM CURSOR PHYSICS & INTERACTION
  // ========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let cursorEnabled = false;

  window.addEventListener('mousemove', (e) => {
    // Enable custom cursor on the first mouse movement
    if (!cursorEnabled) {
      cursorEnabled = true;
      document.body.classList.add('custom-cursor-enabled');
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Lerp follow loop
  function animateCursorRing() {
    const lerp = 0.18;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Cursor morphing behaviors
  function attachCursorState(selector, bodyClass, customSoundFn) {
    const elms = document.querySelectorAll(selector);
    elms.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorEnabled) {
          document.body.classList.add(bodyClass);
          if (customSoundFn) {
            customSoundFn();
          } else {
            playHoverTick();
          }
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove(bodyClass);
      });
    });
  }

  // Bind hover sound triggers with category specificity
  function initCursorStates() {
    // 1. Projects play glitch sound on hover
    attachCursorState('.project-card', 'cursor-hovering-clickable', playHoverTick);
    // 2. Tech tags play high-pitched synth blips
    attachCursorState('.tech-tag', 'cursor-hovering-clickable', playTagBlip);
    // 3. Certifications play bell chimes
    attachCursorState('.cert-pill', 'cursor-hovering-clickable', playCertBell);
    // 4. Github, social links, headers and buttons play keyboard ticks
    attachCursorState('.clickable-element, a, button, .experience-trigger', 'cursor-hovering-clickable', playKeyboardTick);
    // 5. Input text areas play inputs
    attachCursorState('input, textarea', 'cursor-hovering-input');
  }
  initCursorStates();

  // Add click sounds
  document.addEventListener('click', (e) => {
    if (e.target.closest('.clickable-element') || e.target.closest('a') || e.target.closest('button')) {
      playClickChirp();
    }
  });


  // ========================================================================
  // 3. EXPANDABLE ACCORDIONS
  // ========================================================================
  const accordions = document.querySelectorAll('.experience-accordion');

  accordions.forEach(acc => {
    const trigger = acc.querySelector('.experience-trigger');
    trigger.addEventListener('click', () => {
      const isExpanded = acc.classList.contains('expanded');
      
      // Close all accordions first
      accordions.forEach(item => {
        item.classList.remove('expanded');
        item.querySelector('.experience-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        acc.classList.add('expanded');
        trigger.setAttribute('aria-expanded', 'true');
        playSlideSound();
      } else {
        playHoverTick();
      }
    });
  });


  // ========================================================================
  // 4. THEME SWITCHER (Light & Dark Toggling)
  // ========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeVisualBtn = document.getElementById('theme-visual-btn');

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', currentTheme);

  function toggleTheme(e) {
    const active = document.body.getAttribute('data-theme');
    const target = active === 'dark' ? 'light' : 'dark';

    playThemeChime(target === 'dark');

    // If startViewTransition is not supported, fallback to simple data attribute swap
    if (!document.startViewTransition) {
      document.body.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
      return;
    }

    // Modern browser native view transition for ultra-smooth 120fps crossfade
    document.startViewTransition(() => {
      document.body.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
    });
  }

  themeToggle.addEventListener('click', (e) => toggleTheme(e));
  if (themeVisualBtn) {
    let shaderVisible = true;
    themeVisualBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shaderVisible = !shaderVisible;
      
      // Play deep resonance sound
      playResonanceSound();
      
      // Spin the Yin-Yang icon
      const svg = themeVisualBtn.querySelector('svg');
      if (svg) {
        svg.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        svg.style.transform = shaderVisible ? 'rotate(0deg)' : 'rotate(360deg)';
      }
      
      // Toggle WebGL canvas visibility
      const canvas = document.getElementById('gl-canvas');
      if (canvas) {
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = shaderVisible ? (document.body.getAttribute('data-theme') === 'light' ? '0.08' : '0.18') : '0';
      }
    });
  }


  // ========================================================================
  // 5. INTERACTIVE CONSTELLATION CANVAS BACKGROUND
  // ========================================================================
  function initConstellationBackground() {
    const canvas = document.getElementById('gl-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 100;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // Mouse interaction (gentle attraction)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            this.x += dx * 0.005;
            this.y += dy * 0.005;
          }
        }
      }
      draw() {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(255, 102, 0, 0.4)' : 'rgba(255, 102, 0, 0.65)';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.body.getAttribute('data-theme') === 'light';
      
      // Update & Draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isLight ? 0.07 : 0.12);
            ctx.strokeStyle = `rgba(255, 102, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Draw connection to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * (isLight ? 0.1 : 0.18);
            ctx.strokeStyle = `rgba(255, 102, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
  initConstellationBackground();

  // ========================================================================
  // 5B. SCI-FI DECRYPT SCRAPING EFFECTS
  // ========================================================================
  class TextScrambler {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({
          from: oldText[i] || '',
          to: newText[i] || '',
          start,
          end,
          char: ''
        });
      }
      cancelAnimationFrame(this.frameId);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color: var(--accent-cyan); text-shadow: 0 0 5px var(--accent-cyan);">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameId = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // Scramble decrypt logo text on load
  const profileNameSpan = document.querySelector('.profile-name span');
  const profileTitleEl = document.querySelector('.profile-title');
  if (profileNameSpan) {
    const s1 = new TextScrambler(profileNameSpan);
    s1.setText('Govind Tripathi');
  }
  if (profileTitleEl) {
    const s2 = new TextScrambler(profileTitleEl);
    s2.setText('Full-stack developer');
  }

  // ========================================================================
  // 5C. INTERACTIVE CLI SYSTEM TERMINAL
  // ========================================================================
  function initTerminalConsole() {
    const consoleInput = document.getElementById('console-input');
    const consoleOutput = document.getElementById('console-output');
    const cmdPills = document.querySelectorAll('.cmd-pill');
    
    if (!consoleInput || !consoleOutput) return;
    
    const commandResponses = {
      help: `Available commands:
  - skills   : View current technical stack metrics
  - projects : View list of active development projects
  - about    : View developer background bio summary
  - contact  : View phone, email, and social details
  - theme    : Toggle between Light and Dark mode layout
  - clear    : Clear terminal screen output`,
      skills: `=== TECHNICAL SKILLS MATRIX ===
  - React & Next.js     [██████████████░] 92%
  - Node.js & Express   [██████████████░] 90%
  - Java & Spring Boot  [█████████████░░] 85%
  - WebGL & Particle    [████████████░░░] 80%
  - SQL & MongoDB       [█████████████░░] 85%
  - Git, Docker, CI/CD  [██████████████░] 90%`,
      projects: `=== ACTIVE PROJECTS ===
  1. PrismHand [WebGL Sculpting Canvas] -> React/Three
  2. Voyage [AI Route Travel Planner]   -> Next.js/Spring Boot
  3. Obsidian Workspace [Note Graph]     -> Offline Markdown
  4. OCMS College Platform [B2B API]     -> Spring Boot JWT`,
      about: `=== DEVELOPER BIOGRAPHY ===
  Name   : Govind Tripathi
  Status : B.Tech Computer Science student & Freelancer
  Focus  : Full-stack products, creative coding, scalable services.`,
      contact: `=== CONTACT METADATA ===
  Email   : govindtripathi62@gmail.com
  Phone   : +91 9699124496
  Github  : github.com/GovindTripathi22
  LinkedIn: linkedin.com/in/govind-t-35360a290`,
      theme: `Toggling layout theme...`
    };
    
    function printLine(text, className = '') {
      const line = document.createElement('div');
      line.className = 'console-line ' + className;
      line.textContent = text;
      consoleOutput.appendChild(line);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    
    function executeCommand(cmdText) {
      const cleanCmd = cmdText.trim().toLowerCase();
      printLine(`govind-tripathi$ ${cmdText}`, 'text-zinc-400');
      
      // Play terminal tick
      playKeyboardTick();
      
      if (cleanCmd === 'clear') {
        consoleOutput.innerHTML = '';
        printLine('// System cleared. Type "help" for command matrix.', 'text-zinc-500');
        return;
      }
      
      if (cleanCmd === 'theme') {
        printLine(commandResponses.theme, 'text-amber-400');
        setTimeout(() => {
          const active = document.body.getAttribute('data-theme');
          const toggleBtn = document.getElementById('theme-toggle');
          if (toggleBtn) toggleBtn.click();
        }, 300);
        return;
      }
      
      if (commandResponses[cleanCmd]) {
        printLine(commandResponses[cleanCmd], 'text-emerald-400');
      } else if (cleanCmd !== '') {
        printLine(`Command not found: "${cmdText}". Type "help" for list of valid options.`, 'text-red-400');
      }
    }
    
    consoleInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = consoleInput.value;
        executeCommand(val);
        consoleInput.value = '';
      }
    });
    
    cmdPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd');
        executeCommand(cmd);
      });
    });
  }
  initTerminalConsole();

  // ========================================================================
  // 6. LIVE STATUS BAR TIME (IST)
  // ========================================================================
  const liveTimeEl = document.getElementById('live-time');
  if (liveTimeEl) {
    function updateClock() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      liveTimeEl.textContent = `IST: ${formatter.format(new Date())}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  // ========================================================================
  // 7. LIVE VISITOR COUNTER & ACTIVE CONNECTIONS & GITHUB STATS
  // ========================================================================
  const visitorCountEl = document.getElementById('visitor-count');
  const visitorCountNumberEl = document.getElementById('visitor-count-number');
  const activeCountEl = document.getElementById('active-count');

  async function initVisitorCounter() {
    let visits = 1420; // Default fallback
    try {
      const response = await fetch('https://api.counterapi.dev/v1/govindtripathi-portfolio/hits/up');
      if (response.ok) {
        const data = await response.json();
        visits = data.count;
      } else {
        throw new Error('API response not OK');
      }
    } catch (err) {
      console.warn("Counter API failed, fallback to local storage:", err);
      let localVisits = localStorage.getItem('visitor_count');
      if (!localVisits) {
        localVisits = Math.floor(1380 + Math.random() * 100);
      }
      visits = parseInt(localVisits, 10) + 1;
    }
    localStorage.setItem('visitor_count', visits);

    if (visitorCountEl) {
      visitorCountEl.innerHTML = `<i class="fa-solid fa-users"></i> VISITORS: ${visits}`;
    }
    if (visitorCountNumberEl) {
      visitorCountNumberEl.textContent = Number(visits).toLocaleString();
    }
  }

  // Fetch real GitHub info on load
  async function fetchGithubStats() {
    try {
      const res = await fetch('https://api.github.com/users/GovindTripathi22');
      if (res.ok) {
        const data = await res.json();
        
        // Update hover card elements
        const avatarEl = document.getElementById('github-avatar');
        const nameEl = document.getElementById('github-name');
        const bioEl = document.getElementById('github-bio');
        const reposEl = document.getElementById('github-repos');
        const followersEl = document.getElementById('github-followers');
        const followingEl = document.getElementById('github-following');

        if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
        if (nameEl && data.name) nameEl.textContent = data.name;
        if (bioEl && data.bio) bioEl.textContent = data.bio;
        if (reposEl) reposEl.textContent = data.public_repos;
        if (followersEl) followersEl.textContent = data.followers;
        if (followingEl) followingEl.textContent = data.following;
      }
    } catch (e) {
      console.warn("Failed to fetch Github stats:", e);
    }
  }

  // Active User simulation
  function updateActiveUsers() {
    if (activeCountEl) {
      const active = Math.floor(2 + Math.random() * 5);
      activeCountEl.innerHTML = `<span class="active-pulse-dot"></span>ACTIVE: ${active}`;
    }
  }

  // Run on start
  initVisitorCounter();
  fetchGithubStats();
  setInterval(updateActiveUsers, 8000);
  updateActiveUsers();
});
