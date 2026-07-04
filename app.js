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
  // 5. SUBTLE BACKGROUND WEBGL SHADER
  // ========================================================================
  const glCanvas = document.getElementById('gl-canvas');
  const gl = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');

  if (!gl) {
    console.warn("WebGL not supported. Fallback to CSS.");
    glCanvas.style.display = 'none';
  } else {
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // A beautiful, low-contrast liquid gradient background that adapts to theme
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_light_mode;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 m = u_mouse / u_resolution.xy;
        
        float t = u_time * 0.08;
        
        // Complex fluid coordinates
        vec2 p = uv * 3.0 - vec2(1.5);
        p.x += sin(p.y + t) * 0.4 + m.x * 0.15;
        p.y += cos(p.x - t) * 0.4 + m.y * 0.15;
        
        float val = sin(length(p) * 2.0 - t);
        
        // Fluid dark/light adaptive palette
        vec3 baseBg = mix(vec3(0.02, 0.02, 0.02), vec3(1.0, 1.0, 1.0), u_light_mode);
        vec3 deepOrange = mix(vec3(0.5, 0.15, 0.0), vec3(1.0, 0.8, 0.7), u_light_mode);
        vec3 warmAmber = mix(vec3(0.4, 0.25, 0.0), vec3(1.0, 0.9, 0.8), u_light_mode);
        
        vec3 col = mix(baseBg, deepOrange, clamp(val, 0.0, 1.0) * (u_light_mode > 0.5 ? 0.15 : 0.05));
        col = mix(col, warmAmber, clamp(cos(p.y * 2.5), 0.0, 1.0) * (u_light_mode > 0.5 ? 0.12 : 0.04));
        
        // Vignette
        float edge = length(uv - vec2(0.5));
        col *= (1.0 - edge * (u_light_mode > 0.5 ? 0.15 : 0.55));
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function buildShader(gl, source, type) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = buildShader(gl, vsSource, gl.VERTEX_SHADER);
    const fs = buildShader(gl, fsSource, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const posAttr = gl.getAttribLocation(prog, 'position');
    const resUnif = gl.getUniformLocation(prog, 'u_resolution');
    const timeUnif = gl.getUniformLocation(prog, 'u_time');
    const mouseUnif = gl.getUniformLocation(prog, 'u_mouse');
    const lightUnif = gl.getUniformLocation(prog, 'u_light_mode');

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    let mouseLoc = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouseLoc = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', (e) => {
      mouseLoc.x = e.clientX;
      mouseLoc.y = window.innerHeight - e.clientY;
    });

    function sizeGl() {
      glCanvas.width = window.innerWidth;
      glCanvas.height = window.innerHeight;
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    }
    window.addEventListener('resize', sizeGl);
    sizeGl();

    let currentLightModeVal = document.body.getAttribute('data-theme') === 'light' ? 1.0 : 0.0;

    function drawGl(time) {
      currentMouseLoc.x += (mouseLoc.x - currentMouseLoc.x) * 0.08;
      currentMouseLoc.y += (mouseLoc.y - currentMouseLoc.y) * 0.08;

      const targetLightModeVal = document.body.getAttribute('data-theme') === 'light' ? 1.0 : 0.0;
      currentLightModeVal += (targetLightModeVal - currentLightModeVal) * 0.05;

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.enableVertexAttribArray(posAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resUnif, glCanvas.width, glCanvas.height);
      gl.uniform1f(timeUnif, time * 0.01);
      gl.uniform2f(mouseUnif, currentMouseLoc.x, currentMouseLoc.y);
      gl.uniform1f(lightUnif, currentLightModeVal);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    requestAnimationFrame(drawGl);
  }

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
