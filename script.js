/* ----------------------------------------------------
   BwithU Website Interactions & Simulator - script.js
   Adhering strictly to BwithU Brand Guidelines
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Background Particles Generator ---
  generateAmbientParticles();

  // --- 2. Scroll-Induced Sticky Header Effects ---
  initScrollHeader();

  // --- 3. Interactive FAQ Accordion Panels ---
  initFAQAccordion();

  // --- 4. Interactive Mood Customizer ---
  initMoodCustomizer();

  // --- 5. Interactive Simulated Companion Playground ---
  initPlayground();

  // --- 6. Newsletter Subscription Handler ---
  initNewsletterForm();
});

/* ===================================================
   1. Dynamic Background Particles Generator
   =================================================== */
function generateAmbientParticles() {
  const container = document.getElementById('bg-particles');
  if (!container) return;

  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize initial sizing, positioning and speeds
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${Math.random() * 20}px`;
    
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 6;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Soft random gradients for ambient neon cyan/purple feel
    if (Math.random() > 0.5) {
      particle.style.backgroundColor = 'var(--color-aurora-purple)';
      particle.style.boxShadow = '0 0 8px var(--color-aurora-purple)';
    } else {
      particle.style.backgroundColor = 'var(--color-neon-cyan)';
      particle.style.boxShadow = '0 0 8px var(--color-neon-cyan)';
    }
    
    container.appendChild(particle);
  }
}

/* ===================================================
   2. Scroll-Induced Sticky Header Effects
   =================================================== */
function initScrollHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===================================================
   3. Interactive FAQ Accordion Panels
   =================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    questionButton.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other open accordion panels first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current panel
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===================================================
   4. Interactive Mood Customizer
   =================================================== */
function initMoodCustomizer() {
  const moodButtons = document.querySelectorAll('.btn-mood');
  const mascotImg = document.getElementById('customizer-mascot');
  const balloonText = document.getElementById('customizer-balloon-text');
  const glowRing = document.getElementById('mood-glow-ring');
  const customizerSection = document.getElementById('customize');
  const expTitle = document.getElementById('mood-explanation-title');
  const expDesc = document.getElementById('mood-explanation-desc');
  
  if (!mascotImg) return;

  const moodData = {
    idle: {
      balloon: "Hi! I'm feeling warm and calm. Floating gently...",
      glow: "radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 60%)",
      title: "Idle / Warm Accent",
      desc: "Bumi is in his natural resting state. He undergoes tiny breath movements, occasional winks, and is content to float gently beside your webpage without getting in the way.",
      sectionClass: "state-idle",
      mascotStyle: "scale(1) rotate(0deg)"
    },
    thinking: {
      balloon: "Grok is helping me analyze the webpage context. Let me think...",
      glow: "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 60%)",
      title: "Active Thinking Accent",
      desc: "Bumi tilts his head slightly and pulses with a beautiful, soft Neon Cyan glow while waiting for the LLM server response. Perfect for visually tracing operations.",
      sectionClass: "state-thinking",
      mascotStyle: "scale(1.05) rotate(-2deg)"
    },
    listening: {
      balloon: "I'm listening to your voice right now! Say anything...",
      glow: "radial-gradient(circle, rgba(34, 197, 94, 0.18) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 60%)",
      title: "Live Mic / Recording Accent",
      desc: "An ambient green audio wave ring activates. Bumi blinks in alert anticipation. Indicates Voice Activity Detection is actively streaming your microphone input.",
      sectionClass: "state-listening",
      mascotStyle: "scale(1.08) rotate(1deg)"
    },
    yawning: {
      balloon: "A bit sleepy, but always ready to wake up when you call!",
      glow: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, rgba(168, 85, 247, 0.02) 40%, transparent 60%)",
      title: "Sleepy / Idle Timeout Accent",
      desc: "If left completely idle for several minutes, Bumi's neon aura dims down to a faint warm amber. He enters a light sleep state to save power and visual clutter.",
      sectionClass: "state-yawning",
      mascotStyle: "scale(0.95) rotate(-1deg) translateY(4px)"
    }
  };

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.getAttribute('data-mood');
      const data = moodData[mood];
      if (!data) return;

      // Update active button state
      moodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update mascot animations & styles
      mascotImg.style.transform = data.mascotStyle;
      
      // Update balloon text
      balloonText.textContent = data.balloon;
      
      // Update backdrop glow gradient & explanation descriptions
      glowRing.style.background = data.glow;
      expTitle.textContent = data.title;
      expDesc.textContent = data.desc;

      // Update section state-class
      customizerSection.className = `customizer-section ${data.sectionClass}`;
      
      // Dynamic filter flashes based on state
      if (mood === 'thinking') {
        mascotImg.style.filter = 'drop-shadow(0 12px 24px rgba(56, 189, 248, 0.45)) brightness(1.1)';
      } else if (mood === 'listening') {
        mascotImg.style.filter = 'drop-shadow(0 12px 24px rgba(34, 197, 94, 0.4)) brightness(1.05)';
      } else if (mood === 'yawning') {
        mascotImg.style.filter = 'drop-shadow(0 8px 12px rgba(245, 158, 11, 0.15)) opacity(0.85)';
      } else {
        mascotImg.style.filter = 'drop-shadow(0 12px 24px rgba(168, 85, 247, 0.35))';
      }
    });
  });
}

/* ===================================================
   5. Interactive Simulated Companion Playground
   =================================================== */
function initPlayground() {
  const chatForm = document.getElementById('playground-chat-form');
  const chatInput = document.getElementById('playground-chat-input');
  const chatLog = document.getElementById('playground-chat-log');
  const consoleEl = document.getElementById('playground-console');
  
  // Simulated components
  const simMascot = document.getElementById('sim-mascot-element');
  const simSpeechBubble = document.getElementById('sim-speech-bubble-el');
  const simSpeechText = document.getElementById('sim-bubble-text-el');
  const simTabTitle = document.getElementById('sim-tab-title-1');
  const simAddress = document.getElementById('sim-address-input');
  
  // Overlays
  const overlayDefault = document.getElementById('sim-viewport-default');
  const overlaySearch = document.getElementById('sim-overlay-search');
  const overlayCalendar = document.getElementById('sim-overlay-calendar');

  // Chips
  const chipSearch = document.getElementById('chip-search');
  const chipCalendar = document.getElementById('chip-calendar');
  const chipSummary = document.getElementById('chip-summary');
  const chipJoke = document.getElementById('chip-joke');

  if (!chatForm || !chatInput || !chatLog) return;

  // Active status triggers
  let isThinking = false;

  // Preset responses bank
  const bumiReplies = {
    search: {
      bubble: "I've searched for that! Opening a fresh tab...",
      chat: "Sure, let me check the internet using the Brave Search API. I've gathered top results on BwithU's growth and tab controls! You can view them in the browser viewport.",
      action: () => {
        simTabTitle.textContent = "Google Search: latest AI agents";
        simAddress.value = "https://google.com/search?q=latest+ai+news";
        overlayDefault.classList.add('hidden');
        overlayCalendar.classList.add('hidden');
        overlaySearch.classList.remove('hidden');
      }
    },
    calendar: {
      bubble: "Drafting calendar invite... OAuth ready!",
      chat: "Draft created successfully! I grabbed your current timezone and created a 30-minute Team Sync meeting on Google Calendar. Review it in the mockup viewport.",
      action: () => {
        simTabTitle.textContent = "Google Calendar";
        simAddress.value = "https://calendar.google.com";
        overlayDefault.classList.add('hidden');
        overlaySearch.classList.add('hidden');
        overlayCalendar.classList.remove('hidden');
      }
    },
    summary: {
      bubble: "Summarized the current active tab!",
      chat: "Done! I read through the active article text. Key takeaways: 1. BwithU runs standard Manifest V3 for ultimate speed. 2. Real-time voice streams at 24kHz with under 50ms latency. 3. Privacy is 100% local, storing keys securely on-device.",
      action: () => {
        simTabTitle.textContent = "Researching BwithU";
        simAddress.value = "https://bwithu.ai/playground";
        overlaySearch.classList.add('hidden');
        overlayCalendar.classList.add('hidden');
        overlayDefault.classList.remove('hidden');
      }
    },
    joke: {
      bubble: "Warm greetings! Happy to be here.",
      chat: "Hello there! Bumi is always with you in the browser. Remember: 'Never cold, never robotic, always warm and helpful!' Let me know what tab task I can solve for you today.",
      action: () => {}
    },
    default: {
      bubble: "Got it! Thinking with Grok...",
      chat: "I hear you! That sounds like a wonderful plan. In the full browser extension, I can switch tabs, open calendar invites, transcribe your microphone voice, or read page text instantly using my Grok brain client.",
      action: () => {}
    }
  };

  // Chat form submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text || isThinking) return;

    chatInput.value = '';
    executeSimTurn(text);
  });

  // Action Chip Triggers
  chipSearch.addEventListener('click', () => {
    if (isThinking) return;
    executeSimTurn("Bumi, search latest AI news", "search");
  });

  chipCalendar.addEventListener('click', () => {
    if (isThinking) return;
    executeSimTurn("Schedule a Team Sync tomorrow at 2 PM", "calendar");
  });

  chipSummary.addEventListener('click', () => {
    if (isThinking) return;
    executeSimTurn("Summarize this page", "summary");
  });

  chipJoke.addEventListener('click', () => {
    if (isThinking) return;
    executeSimTurn("Tell me a warm greeting", "joke");
  });

  // Main turn handling logic
  function executeSimTurn(userText, detectedKey = null) {
    isThinking = true;

    // 1. Add user message bubble to sidebar log
    appendMessage(userText, 'user');
    logConsole(`[User] Query: "${userText}"`);

    // 2. Animate mascot to "Thinking" status
    simMascot.style.transform = 'scale(1.1) rotate(-3deg)';
    simMascot.style.filter = 'drop-shadow(0 12px 24px rgba(56, 189, 248, 0.5)) brightness(1.1)';
    logConsole('[System] Grok thinking triggered. Pulse accent activated.');

    // 3. Determine matching intent
    let key = detectedKey;
    if (!key) {
      const lower = userText.toLowerCase();
      if (lower.includes('search') || lower.includes('google') || lower.includes('find')) {
        key = 'search';
      } else if (lower.includes('schedule') || lower.includes('calendar') || lower.includes('time') || lower.includes('meeting')) {
        key = 'calendar';
      } else if (lower.includes('summarize') || lower.includes('read') || lower.includes('about')) {
        key = 'summary';
      } else if (lower.includes('joke') || lower.includes('hello') || lower.includes('hi') || lower.includes('greeting')) {
        key = 'joke';
      } else {
        key = 'default';
      }
    }

    const replyData = bumiReplies[key];

    // Show companion bubble winking
    setTimeout(() => {
      simSpeechText.textContent = replyData.bubble;
      simSpeechBubble.classList.remove('hidden');
      logConsole(`[Bumi] Speech Bubble update: "${replyData.bubble}"`);
    }, 600);

    // 4. Simulate response delay and typewriter output
    setTimeout(() => {
      // Restore mascot
      simMascot.style.transform = 'scale(1) rotate(0deg)';
      simMascot.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))';
      
      // Append assistant message in log
      appendMessage('', 'assistant', (bubbleEl) => {
        typewriteText(bubbleEl, replyData.chat, () => {
          isThinking = false;
          simSpeechBubble.classList.add('hidden');
          
          // Trigger browser UI overlay action
          replyData.action();
          logConsole(`[Bumi] Action completed for intent: ${key.toUpperCase()}`);
        });
      });
    }, 1800);
  }

  // Scribe console logs
  function logConsole(message) {
    const line = document.createElement('div');
    line.classList.add('console-line');
    if (message.startsWith('[System]')) {
      line.classList.add('text-muted');
    }
    line.textContent = message;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  // Append message to sidebar log
  function appendMessage(text, role, callback = null) {
    const turn = document.createElement('div');
    turn.classList.add('chat-turn', `${role}-turn`);
    
    const avatar = document.createElement('div');
    avatar.classList.add('chat-avatar');
    avatar.textContent = role === 'user' ? '👤' : '🐻';
    
    const bubble = document.createElement('div');
    bubble.classList.add('chat-message-bubble');
    
    const msgText = document.createElement('span');
    msgText.classList.add('chat-message-text');
    msgText.textContent = text;
    
    bubble.appendChild(msgText);
    turn.appendChild(avatar);
    turn.appendChild(bubble);
    chatLog.appendChild(turn);
    chatLog.scrollTop = chatLog.scrollHeight;

    if (callback) {
      callback(msgText);
    }
  }

  // Typewriter text generator
  function typewriteText(element, text, callback) {
    let index = 0;
    const speed = 15; // milliseconds per letter
    element.textContent = '';
    
    function write() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        chatLog.scrollTop = chatLog.scrollHeight;
        setTimeout(write, speed);
      } else {
        if (callback) callback();
      }
    }
    write();
  }
}

/* ===================================================
   6. Newsletter Subscription Handler
   =================================================== */
function initNewsletterForm() {
  const form = document.getElementById('cta-newsletter-form');
  const input = document.getElementById('cta-newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');
  
  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    // Simulate database update
    feedback.textContent = `✨ Thanks for joining! Beta access invites will be sent to ${email}.`;
    feedback.classList.remove('hidden');
    input.value = '';

    setTimeout(() => {
      feedback.style.opacity = '1';
    }, 10);
  });
}
