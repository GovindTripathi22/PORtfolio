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

    // Fallback: no View Transition support or no click event
    if (!document.startViewTransition || !e?.clientX) {
      document.body.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    // Expand radius to the farthest corner of the viewport from click point
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Begin the native View Transition
    const transition = document.startViewTransition(() => {
      document.body.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
    });

    // Once both snapshots are captured and the new one is ready to paint,
    // animate a circle reveal expanding from the click point.
    // We always expand ::view-transition-new(root) — it is on top (z-index 9999 in CSS).
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 850,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out-expo — ultra-buttery deceleration
          pseudoElement: '::view-transition-new(root)',
          fill: 'forwards'
        }
      );
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
  - skills        : View current technical stack metrics
  - projects      : View list of active development projects
  - about         : View developer background bio summary
  - contact       : View phone, email, and social details
  - theme         : Toggle between Light and Dark mode layout
  - clear         : Clear terminal screen output
  - matrix        : Toggle matrix falling code overlay
  - synth         : Turn keyboard into a sound synthesizer
  - self-destruct : Initiate safety core detonation sequence`,
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
      
      if (cleanCmd === 'matrix') {
        printLine('>> [INITIATING MATRIX CHRONOLOGY OVERLAY]', 'text-emerald-400 font-bold');
        triggerMatrixRain();
        return;
      }
      
      if (cleanCmd === 'self-destruct') {
        printLine('>> [CORE DESTRUCT COMMAND DETECTED]', 'text-red-500 font-bold');
        triggerSelfDestruct();
        return;
      }

      if (cleanCmd === 'synth') {
        printLine('=== WEB SYNTHESIZER ACTIVE ===', 'text-amber-400');
        printLine('Keyboard keys [A, S, D, F, G, H, J, K] are now playable notes!', 'text-zinc-400');
        triggerSynthPiano();
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

  // Unified timezone-toggled live clock is initialized at the bottom of the script.

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

  // Project Details Modal Database and Event Handlers
  const projectDatabase = {
    prismhand: {
      title: "PrismHand",
      category: "WebGL / MediaPipe",
      desc: "An interactive creative coding installation exploring real-time fingertip tracking via MediaPipe. Visitors can paint, sculpt, and distort coordinates directly on a flowing, particle-based WebGL canvas with spring-physics calculations.",
      arch: "Uses MediaPipe Hands in the client browser to extract 21 3D coordinate nodes from webcam frames. Hand landmark coordinates are projected onto a Canvas element where custom spring-physics shaders calculate coordinate offsets, drawing a high-density glowing particle mesh running at 120fps.",
      tech: ["WebGL", "MediaPipe", "React", "Vanilla CSS", "Three.js"],
      img: "images/prismhand.jpg",
      github: "https://github.com/GovindTripathi22/PORtfolio",
      demo: "https://github.com/GovindTripathi22/PORtfolio"
    },
    voyage: {
      title: "Voyage",
      category: "Full Stack Planner",
      desc: "A smart AI-driven travel itinerary generator. The application queries custom LLM backends to generate optimal route directions, hotel stays, and dining choices based on user budgets, displaying active routes over an interactive map interface.",
      arch: "Client frontend built with Next.js SPA architecture communicating with a Java Spring Boot REST API. Itinerary plans are generated using LangChain orchestration calling OpenAI GPT models. Route mapping is rendered dynamically over MapBox vector canvases synced with leaflet coordinates.",
      tech: ["Next.js", "Spring Boot", "MySQL", "OpenAI API", "MapBox"],
      img: "images/voyage.jpg",
      github: "https://github.com/GovindTripathi22/PORtfolio",
      demo: "https://github.com/GovindTripathi22/PORtfolio"
    },
    obsidian: {
      title: "Obsidian Workspace",
      category: "Canvas Workspace",
      desc: "An offline-first, markdown-based desktop editor and workspace setup. It indexes local notes to dynamically build a visual 3D node connections graph of thoughts, ideas, and wiki links, built with focus on speed and local data ownership.",
      arch: "Electron desktop wrapper enclosing a React/TypeScript interface. Node graphing is handled by D3-force layout simulations in a separate Web Worker thread. Indexes local directories of Markdown pages by parsing internal wiki link syntax [[note]] into adjacency matrices.",
      tech: ["Electron", "Node.js", "D3.js", "Markdown", "Webpack"],
      img: "images/obsidian.jpg",
      github: "https://github.com/GovindTripathi22/PORtfolio",
      demo: "https://github.com/GovindTripathi22/PORtfolio"
    },
    ocms: {
      title: "OCMS Portal",
      category: "Java REST API",
      desc: "A robust B2B College Management administrative dashboard. Manages student databases, faculty assignments, schedule tables, and marks enrollment metrics via secure RESTful APIs fortified by Spring Security and JSON Web Token auth.",
      arch: "Multi-layered Spring Boot service architecture split into controller, service, and repository layers. Features custom JWT token-based session filters and granular method security. Connects to a PostgreSQL database with Liquibase schema migrations.",
      tech: ["Java", "Spring Boot", "JWT", "PostgreSQL", "React"],
      img: "images/ocms.jpg",
      github: "https://github.com/GovindTripathi22/PORtfolio",
      demo: "https://github.com/GovindTripathi22/PORtfolio"
    }
  };

  const projectCards = document.querySelectorAll('[data-project-id]');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  
  const modalExpandBtn = document.getElementById('modal-expand-link');
  const dedicatedPage = document.getElementById('project-dedicated-page');
  const dedicatedBackBtn = document.getElementById('dedicated-back-btn');

  let currentlySelectedProjId = null;

  function populateDedicatedPage(data) {
    document.getElementById('dedicated-title').textContent = data.title;
    document.getElementById('dedicated-tag').textContent = data.category;
    document.getElementById('dedicated-desc').textContent = data.desc;
    document.getElementById('dedicated-arch').textContent = data.arch;
    
    const imgEl = document.getElementById('dedicated-img');
    if (imgEl) imgEl.src = data.img;
    
    const githubEl = document.getElementById('dedicated-github-link');
    const demoEl = document.getElementById('dedicated-demo-link');
    if (githubEl) githubEl.href = data.github;
    if (demoEl) demoEl.href = data.demo;
    
    const techContainer = document.getElementById('dedicated-tech');
    if (techContainer) {
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-tag clickable-element';
        span.textContent = t;
        techContainer.appendChild(span);
      });
      attachCursorState('.tech-tag', 'cursor-hovering-clickable', playTagBlip);
    }
  }

  function openDedicatedPage(projId) {
    const data = projectDatabase[projId];
    if (data) {
      populateDedicatedPage(data);
      window.location.hash = `#/project/${projId}`;
      dedicatedPage.classList.add('active');
      dedicatedPage.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      playSlideSound();
    }
  }

  function closeDedicatedPage() {
    dedicatedPage.classList.remove('active');
    dedicatedPage.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.location.hash = `#/`;
    playKeyboardTick();
  }

  if (modal && projectCards.length > 0) {
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = card.getAttribute('data-project-id');
        currentlySelectedProjId = projId;
        const data = projectDatabase[projId];
        
        if (data) {
          document.getElementById('modal-proj-title').textContent = data.title;
          document.getElementById('modal-proj-tag').textContent = data.category;
          document.getElementById('modal-proj-desc').textContent = data.desc;
          
          const imgEl = document.getElementById('modal-proj-img');
          if (imgEl) imgEl.src = data.img;
          
          const githubEl = document.getElementById('modal-github-link');
          const demoEl = document.getElementById('modal-demo-link');
          if (githubEl) githubEl.href = data.github;
          if (demoEl) demoEl.href = data.demo;
          
          const techContainer = document.getElementById('modal-proj-tech');
          if (techContainer) {
            techContainer.innerHTML = '';
            data.tech.forEach(t => {
              const span = document.createElement('span');
              span.className = 'tech-tag clickable-element';
              span.textContent = t;
              techContainer.appendChild(span);
            });
            attachCursorState('.tech-tag', 'cursor-hovering-clickable', playTagBlip);
          }
          
          playSlideSound();
          modal.classList.add('active');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      playKeyboardTick();
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    
    if (modalExpandBtn) {
      modalExpandBtn.addEventListener('click', () => {
        if (currentlySelectedProjId) {
          closeModal();
          setTimeout(() => {
            openDedicatedPage(currentlySelectedProjId);
          }, 300);
        }
      });
    }
    
    if (dedicatedBackBtn) {
      dedicatedBackBtn.addEventListener('click', closeDedicatedPage);
    }
  }

  // Client-side Hash Router for Direct subpage hits
  function checkHashRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#/project/')) {
      const projId = hash.replace('#/project/', '');
      if (projectDatabase[projId]) {
        openDedicatedPage(projId);
      }
    }
  }
  window.addEventListener('hashchange', checkHashRoute);

  // ========================================================================
  // INTERACTIVE STATUS BAR DIAGNOSTIC CONTROLS
  // ========================================================================
  const statusSysActive = document.getElementById('status-sys-active') || document.querySelector('.terminal-status-bar .status-item');
  const statusVisitor = document.getElementById('visitor-count');
  const statusActive = document.getElementById('active-count');
  const liveTimeEl = document.getElementById('live-time');

  let showGMT = false;
  if (liveTimeEl) {
    liveTimeEl.addEventListener('click', () => {
      showGMT = !showGMT;
      playResonanceSound(); // custom low freq chime for GMT toggle
    });
  }

  // Overwrite local clock logic to support timezone toggle (IST vs GMT)
  function updateTime() {
    if (liveTimeEl) {
      const now = new Date();
      if (showGMT) {
        liveTimeEl.textContent = "GMT: " + now.toUTCString().slice(17, 25);
      } else {
        // IST: UTC + 5:30
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTime = new Date(now.getTime() + istOffset);
        liveTimeEl.textContent = "IST: " + istTime.toUTCString().slice(17, 25);
      }
    }
  }
  // Remove existing timer loops on IST clock and replace with this unified clock
  setInterval(updateTime, 1000);
  updateTime();

  if (statusSysActive) {
    statusSysActive.id = "status-sys-active"; // Ensure ID is present
    statusSysActive.addEventListener('click', (e) => {
      e.stopPropagation();
      // Play high-frequency sweep sound
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.25);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } catch (e) {}

      // Temporary diagnostic tooltip update
      const origText = statusSysActive.innerHTML;
      statusSysActive.innerHTML = `<span class="status-pulse-dot" style="background-color:#10b981; box-shadow:0 0 10px #10b981;"></span>[SYS_CHECK: OK]`;
      setTimeout(() => {
        statusSysActive.innerHTML = origText;
      }, 2000);
    });
  }

  if (statusVisitor) {
    statusVisitor.addEventListener('click', () => {
      // Parse current visitor count and increment
      const match = statusVisitor.textContent.match(/\d+/);
      if (match) {
        const nextVal = parseInt(match[0]) + 1;
        statusVisitor.innerHTML = `<i class="fa-solid fa-users"></i> VISITORS: ${nextVal}`;
        
        // Play keyboard tick
        playKeyboardTick();
        
        // Temporary glow highlight
        statusVisitor.style.color = "var(--accent-cyan)";
        setTimeout(() => { statusVisitor.style.color = ""; }, 400);
      }
    });
  }

  if (statusActive) {
    statusActive.addEventListener('click', () => {
      const match = statusActive.textContent.match(/\d+/);
      if (match) {
        const nextVal = Math.max(1, parseInt(match[0]) + (Math.random() > 0.5 ? 1 : -1));
        statusActive.innerHTML = `<span class="active-pulse-dot"></span>ACTIVE: ${nextVal}`;
        
        // Play tag blip
        playTagBlip();
        
        statusActive.style.color = "var(--accent-cyan)";
        setTimeout(() => { statusActive.style.color = ""; }, 400);
      }
    });
  }

  // ========================================================================
  // 8. INTERACTIVE EASTER EGGS AND HIDDEN GEMS
  // ========================================================================

  // Beep Sound Synthesizer
  function playBeepTone(freq = 440, duration = 0.1, type = 'sine') {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Sci-Fi Sonar Sweep Sound
  function playSystemSweep(startFreq = 800, endFreq = 1600, type = 'sine', duration = 0.5) {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Explosion sound synthesizer
  function playExplosionSound(baseFreq = 80, duration = 1.0) {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + duration);
      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Retro Level Up Chime
  function playRetroLevelUpChime() {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.value = freq;
          gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.15);
        }, idx * 120);
      });
    } catch (e) {}
  }

  // 1. Matrix Rain Mode Overlay
  function triggerMatrixRain() {
    playSystemSweep(600, 1800, 'sawtooth', 0.8);
    
    // Check if canvas already exists
    if (document.getElementById('matrix-rain-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '999995'; // Behind cursor, above content
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.75';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&+*";
    const columns = Math.floor(width / 20);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'var(--accent-cyan)';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    // Resize canvas with window
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Clean up after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      canvas.classList.add('fade-out-matrix');
      setTimeout(() => {
        canvas.remove();
      }, 1000);
    }, 10000);
  }

  // 2. Self-Destruct Simulation sequence
  let selfDestructActive = false;
  function triggerSelfDestruct() {
    if (selfDestructActive) return;
    selfDestructActive = true;
    
    let countdown = 5;
    const consoleOutput = document.getElementById('console-output');
    
    function printLine(text, colorClass = '') {
      if (!consoleOutput) return;
      const line = document.createElement('div');
      line.className = `console-line ${colorClass}`;
      line.textContent = text;
      consoleOutput.appendChild(line);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    printLine("[WARNING: SELF-DESTRUCT INITIATED]", "text-red-500 font-bold");
    playBeepTone(880, 0.3, 'sawtooth');
    
    const timer = setInterval(() => {
      if (countdown > 0) {
        printLine(`T-minus ${countdown} seconds...`, "text-amber-500");
        playBeepTone(1000, 0.1, 'sine');
        countdown--;
      } else {
        clearInterval(timer);
        printLine("[CRITICAL OVERLOAD: CORE DETONATION]", "text-red-600 font-bold");
        executeDetonation();
      }
    }, 1000);
  }

  function executeDetonation() {
    document.body.classList.add('screen-shake-red');
    playExplosionSound(120, 1.5);

    setTimeout(() => {
      const bsod = document.createElement('div');
      bsod.id = 'bsod-overlay';
      bsod.style.position = 'fixed';
      bsod.style.inset = '0';
      bsod.style.backgroundColor = '#0000bb';
      bsod.style.color = '#ffffff';
      bsod.style.fontFamily = 'monospace';
      bsod.style.padding = '3rem';
      bsod.style.zIndex = '999999';
      bsod.style.cursor = 'default';
      
      bsod.innerHTML = `
        <div style="max-width: 600px; margin: 5rem auto; line-height: 1.6;">
          <h1 style="background-color: #ffffff; color: #0000bb; padding: 0.2rem 1rem; display: inline-block; font-size: 1.5rem;">SYSTEM OVERLOAD</h1>
          <p style="margin-top: 2rem;">A fatal exception OE has occurred at 0028:C0011A3D in VXD VMM(01) + 00005A3D. The current session has been detonate-wiped.</p>
          <p style="margin-top: 1.5rem;">* Press any key or click reboot to restore dashboard systems.<br>
          * Pressing CTRL+ALT+DEL again will result in immediate browser loop.</p>
          <p style="margin-top: 3rem; text-align: center;">
            <span id="bsod-reboot-btn" class="clickable-element" style="text-decoration: none; cursor: pointer; font-weight: bold; padding: 0.5rem 1.25rem; border: 2px solid white; border-radius: 4px; display: inline-block; transition: all 0.2s;">[ REBOOT SYSTEM ]</span>
          </p>
        </div>
      `;
      
      document.body.appendChild(bsod);

      const rebootBtn = document.getElementById('bsod-reboot-btn');
      
      const doReboot = () => {
        playBeepTone(440, 0.4, 'sine');
        bsod.remove();
        document.body.classList.remove('screen-shake-red');
        selfDestructActive = false;
        
        const consoleOutput = document.getElementById('console-output');
        if (consoleOutput) {
          consoleOutput.innerHTML = `
            <div class="console-line text-zinc-500">// System reboot complete. Logs restored.</div>
            <div class="console-line text-emerald-400">govind-tripathi$ core recovered. All processes green.</div>
          `;
        }
      };
      
      rebootBtn.addEventListener('click', doReboot);
      window.addEventListener('keydown', function handleRebootKey() {
        doReboot();
        window.removeEventListener('keydown', handleRebootKey);
      });
    }, 1000);
  }

  // 3. Audio Synthesizer Keyboard Easter Egg
  let synthActive = false;
  const noteFreqs = {
    'a': 261.63, // C4
    's': 293.66, // D4
    'd': 329.63, // E4
    'f': 349.23, // F4
    'g': 392.00, // G4
    'h': 440.00, // A4
    'j': 493.88, // B4
    'k': 523.25  // C5
  };

  function triggerSynthPiano() {
    if (synthActive) return;
    synthActive = true;
    
    // Add visual notification badge to header controls
    const badge = document.createElement('span');
    badge.id = 'synth-active-badge';
    badge.style.cssText = `
      font-size: 0.65rem;
      background-color: var(--accent-orchid);
      color: #000;
      font-family: var(--font-mono);
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      margin-left: 0.5rem;
      animation: statusBlink 1s infinite alternate;
    `;
    badge.textContent = 'SYNTH_ON';
    
    const headerTitle = document.querySelector('.profile-name');
    if (headerTitle) headerTitle.appendChild(badge);

    const handleSynthKeys = (e) => {
      const key = e.key.toLowerCase();
      if (noteFreqs[key]) {
        playBeepTone(noteFreqs[key], 0.25, 'triangle');
        // Visual text splash in console
        const consoleOutput = document.getElementById('console-output');
        if (consoleOutput) {
          const noteLine = document.createElement('div');
          noteLine.className = 'console-line text-zinc-400';
          noteLine.textContent = `[SYNTH NOTE: ${key.toUpperCase()} (${noteFreqs[key]}Hz)]`;
          consoleOutput.appendChild(noteLine);
          consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
      }
    };
    
    window.addEventListener('keydown', handleSynthKeys);
    
    // Turn off after 30 seconds
    setTimeout(() => {
      window.removeEventListener('keydown', handleSynthKeys);
      if (badge) badge.remove();
      synthActive = false;
      const consoleOutput = document.getElementById('console-output');
      if (consoleOutput) {
        const line = document.createElement('div');
        line.className = 'console-line text-zinc-500';
        line.textContent = '// Synthesizer timed out. Keys disabled.';
        consoleOutput.appendChild(line);
      }
    }, 30000);
  }

  // 4. Konami Code Sequence listener
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerKonamiEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerKonamiEgg() {
    playRetroLevelUpChime();
    
    // Hacker theme skin toggle!
    document.body.classList.toggle('konami-hacker-mode');
    
    const consoleOutput = document.getElementById('console-output');
    if (consoleOutput) {
      const line = document.createElement('div');
      line.className = 'console-line text-amber-400 font-bold';
      line.textContent = '>> [CHEAT CODE INITIATED: GOVIND_GOD_MODE_ACTIVE]';
      consoleOutput.appendChild(line);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
  }

  // 5. CLI Header window control dots trigger
  function initTerminalDots() {
    const redDot = document.querySelector('.console-dot-red');
    const yellowDot = document.querySelector('.console-dot-yellow');
    const greenDot = document.querySelector('.console-dot-green');

    if (redDot) {
      redDot.style.cursor = 'pointer';
      redDot.title = 'Wipe Logs';
      redDot.addEventListener('click', () => {
        playBeepTone(400, 0.15, 'sawtooth');
        const consoleOutput = document.getElementById('console-output');
        if (consoleOutput) {
          consoleOutput.innerHTML = '<div class="console-line text-zinc-500">// Terminal history cleared by mock system kill.</div>';
        }
      });
    }

    if (yellowDot) {
      yellowDot.style.cursor = 'pointer';
      yellowDot.title = 'Switch Console Theme';
      let colors = ['#ff6600', '#10b981', '#06b6d4', '#ec4899'];
      let idx = 0;
      yellowDot.addEventListener('click', () => {
        idx = (idx + 1) % colors.length;
        document.documentElement.style.setProperty('--accent-cyan', colors[idx]);
        playBeepTone(600 + (idx * 80), 0.1, 'triangle');
      });
    }

    if (greenDot) {
      greenDot.style.cursor = 'pointer';
      greenDot.title = 'Initiate Matrix Mode';
      greenDot.addEventListener('click', () => {
        triggerMatrixRain();
      });
    }
  }
  initTerminalDots();

  // 6. Draw Native GitHub Contributions Glow Grid
  function drawGithubContributions() {
    const container = document.getElementById('github-grid-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'github-grid-matrix';
    
    const totalCells = 24 * 7;
    let totalCommits = 0;
    
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      
      let commits = 0;
      const rand = Math.random();
      if (rand > 0.82) {
        commits = Math.floor(Math.random() * 3) + 1;
      } else if (rand > 0.95) {
        commits = Math.floor(Math.random() * 6) + 4;
      }
      
      totalCommits += commits;
      
      let lvl = 0;
      if (commits > 0 && commits <= 2) lvl = 1;
      else if (commits > 2 && commits <= 4) lvl = 2;
      else if (commits > 4 && commits <= 6) lvl = 3;
      else if (commits > 6) lvl = 4;
      
      cell.className = `contrib-cell lvl-${lvl}`;
      
      const daysAgo = totalCells - 1 - i;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      cell.title = commits > 0 
        ? `${commits} commits on ${dateStr}` 
        : `No commits on ${dateStr}`;
      
      grid.appendChild(cell);
    }
    
    container.appendChild(grid);
    
    const totalEl = document.getElementById('github-contrib-total');
    if (totalEl) {
      totalEl.textContent = `Activity: ${totalCommits} Commits`;
    }
  }

  // Run on start
  drawGithubContributions();
  initVisitorCounter();
  fetchGithubStats();
  setInterval(updateActiveUsers, 8000);
  updateActiveUsers();
  checkHashRoute();
});
