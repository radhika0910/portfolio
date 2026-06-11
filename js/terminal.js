// terminal.js — Interactive Terminal Easter Egg
// Press ` (backtick) or click the terminal icon to open

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // CREATE TERMINAL DOM ELEMENTS
  // ==========================================

  // Terminal hint button
  const hint = document.createElement("div");
  hint.className = "terminal-hint";
  hint.title = "Press ` to open terminal";
  document.body.appendChild(hint);

  // Terminal overlay
  const overlay = document.createElement("div");
  overlay.className = "terminal-overlay";
  overlay.innerHTML = `
    <div class="terminal-window">
      <div class="terminal-titlebar">
        <div class="terminal-dots">
          <div class="terminal-dot red" id="terminalClose"></div>
          <div class="terminal-dot yellow"></div>
          <div class="terminal-dot green"></div>
        </div>
        <div class="terminal-title">radhika@portfolio ~ zsh</div>
        <div class="terminal-tab">⌘ + \`</div>
      </div>
      <div class="terminal-body" id="terminalBody">
        <div class="terminal-input-line">
          <span class="prompt">radhika@portfolio ~ $</span>
          <input type="text" class="terminal-input" id="terminalInput" placeholder="type 'help' to start..." autocomplete="off" spellcheck="false" />
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const body = document.getElementById("terminalBody");
  const input = document.getElementById("terminalInput");
  const closeBtn = document.getElementById("terminalClose");
  let isOpen = false;
  let commandHistory = [];
  let historyIndex = -1;

  // ==========================================
  // COMMAND DEFINITIONS
  // ==========================================

  const ASCII_LOGO = `
 ╦═╗╔═╗╔╦╗╦ ╦╦╦╔═╔═╗
 ╠╦╝╠═╣ ║║╠═╣║╠╩╗╠═╣
 ╩╚═╩ ╩═╩╝╩ ╩╩╩ ╩╩ ╩`;

  const commands = {
    help: () => [
      { text: "", type: "output" },
      { text: "  Available Commands:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "  about        →  Who is Radhika?", type: "output" },
      { text: "  skills       →  Tech stack & superpowers", type: "output" },
      { text: "  projects     →  Featured work", type: "output" },
      { text: "  experience   →  Work history", type: "output" },
      { text: "  achievements →  Awards & leadership", type: "output" },
      { text: "  contact      →  Get in touch", type: "output" },
      { text: "  hire         →  Why you should hire me", type: "output" },
      { text: "  camera       →  🤫 Secret...", type: "dim" },
      { text: "  clear        →  Clear terminal", type: "output" },
      { text: "  exit         →  Close terminal", type: "output" },
      { text: "", type: "output" },
      { text: "  Tip: Try 'sudo hire radhika' 😏", type: "yellow" },
      { text: "", type: "output" },
    ],

    about: () => [
      { text: "", type: "output" },
      { text: ASCII_LOGO, type: "pre" },
      { text: "", type: "output" },
      { text: "  Radhika Bhoyar", type: "accent bold" },
      { text: "  AI & Data Science Engineer", type: "cyan" },
      { text: "  Nagpur, India 🇮🇳", type: "output" },
      { text: "", type: "output" },
      { text: "  I turn messy data into 'aha!' moments.", type: "output" },
      { text: "  From ETL pipelines to ML models, I build", type: "output" },
      { text: "  systems that make real-world impact.", type: "output" },
      { text: "", type: "output" },
      { text: "  Currently: Software Engineer @ Fendahl Technologies", type: "green" },
      { text: "  Education: B.Tech AI & Data Science, YCCE (2021-2025)", type: "output" },
      { text: "  Honours: AWS Cloud & DevOps", type: "output" },
      { text: "", type: "output" },
      { text: "  Fun fact: I never leave the house without my camera 📷", type: "pink" },
      { text: "", type: "output" },
    ],

    skills: () => [
      { text: "", type: "output" },
      { text: "  ⚡ Tech Stack:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  Programming    │ Python, SQL, JavaScript", type: "output" },
      { text: "  AI/ML          │ Machine Learning, GenAI, LLMs", type: "accent" },
      { text: "  Data           │ Pandas, NumPy, ETL, PostgreSQL", type: "output" },
      { text: "  Visualization  │ Power BI, Dashboards, KPIs", type: "accent" },
      { text: "  Cloud          │ AWS, Docker, CI/CD, GitHub Actions", type: "output" },
      { text: "  Web            │ Next.js, Flask, Node.js, REST APIs", type: "accent" },
      { text: "", type: "output" },
      { text: "  Proficiency Levels:", type: "cyan bold" },
      { text: "  Python     ████████████████████░  95%", type: "green" },
      { text: "  SQL        ███████████████████░░  90%", type: "green" },
      { text: "  ML/AI      ████████████████░░░░░  80%", type: "yellow" },
      { text: "  AWS        ███████████████░░░░░░  75%", type: "yellow" },
      { text: "  Next.js    ██████████████░░░░░░░  70%", type: "cyan" },
      { text: "", type: "output" },
    ],

    projects: () => [
      { text: "", type: "output" },
      { text: "  🚀 Featured Projects:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  01 │ JalRakshak", type: "accent bold" },
      { text: "     │ AI-powered water quality monitoring & analytics", type: "output" },
      { text: "     │ Python, Flask, Next.js, Pandas, TensorFlow", type: "dim" },
      { text: "     │ 🏆 Smart India Hackathon 2023 Winner", type: "green" },
      { text: "", type: "output" },
      { text: "  02 │ FamWallet", type: "accent bold" },
      { text: "     │ Personal finance analytics & recommendations", type: "output" },
      { text: "     │ Node.js, PostgreSQL, GitHub Actions, GitOps", type: "dim" },
      { text: "", type: "output" },
      { text: "  03 │ Ayantra", type: "accent bold" },
      { text: "     │ Distributed mobility data platform", type: "output" },
      { text: "     │ Node.js, PostgreSQL, Apache Kafka", type: "dim" },
      { text: "", type: "output" },
      { text: "  04 │ Aap Ki Awaz", type: "accent bold" },
      { text: "     │ Sign language → text recognition system", type: "output" },
      { text: "     │ ML, OpenCV, Flask, Bootstrap", type: "dim" },
      { text: "", type: "output" },
    ],

    experience: () => [
      { text: "", type: "output" },
      { text: "  💼 Work Experience:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  Software Engineer  │  Fendahl Technologies", type: "accent bold" },
      { text: "  July 2025 – Present  │  Nagpur", type: "dim" },
      { text: "  • Enterprise data systems (100k+ records, 25+ dimensions)", type: "output" },
      { text: "  • Query optimization → 60% latency reduction", type: "green" },
      { text: "  • CI/CD with AWS, Docker, GitHub Actions", type: "output" },
      { text: "", type: "output" },
      { text: "  Software Engineering Intern  │  Fendahl Technologies", type: "accent bold" },
      { text: "  Feb 2025 – June 2025  │  Nagpur", type: "dim" },
      { text: "  • SQL optimization & backend services", type: "output" },
      { text: "", type: "output" },
    ],

    achievements: () => [
      { text: "", type: "output" },
      { text: "  🏆 Achievements:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  🥇 Winner — Smart India Hackathon 2023", type: "yellow bold" },
      { text: "     National-Level Government Innovation Competition", type: "dim" },
      { text: "", type: "output" },
      { text: "  🥇 Winner — Code by the Beach, BITS Pilani", type: "yellow bold" },
      { text: "", type: "output" },
      { text: "  👑 President — Codeware Coding Club, YCCE", type: "accent bold" },
      { text: "     Led & mentored 40+ active members", type: "dim" },
      { text: "", type: "output" },
      { text: "  📊 100,000+ records processed in production", type: "green" },
      { text: "  ⚡ 60% latency reduction via query optimization", type: "green" },
      { text: "", type: "output" },
    ],

    contact: () => [
      { text: "", type: "output" },
      { text: "  📬 Let's Connect:", type: "cyan bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  📧 radhika.bhoyar09@gmail.com", type: "accent" },
      { text: "  💼 linkedin.com/in/radhika-bhoyar", type: "cyan" },
      { text: "  🐙 github.com/radhika0910", type: "output" },
      { text: "  📍 Nagpur, India", type: "output" },
      { text: "", type: "output" },
      { text: "  Response time: Usually within 24 hours ⚡", type: "green" },
      { text: "", type: "output" },
    ],

    hire: () => [
      { text: "", type: "output" },
      { text: "  ✨ Why hire me?", type: "accent bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  ✅ National hackathon winner (not once, twice)", type: "green" },
      { text: "  ✅ Built production systems processing 100k+ records", type: "green" },
      { text: "  ✅ Reduced latency by 60% through optimization", type: "green" },
      { text: "  ✅ Led a coding club of 40+ members as President", type: "green" },
      { text: "  ✅ Full-stack + AI/ML + Cloud — the complete package", type: "green" },
      { text: "  ✅ Actually reads documentation (rare breed)", type: "green" },
      { text: "", type: "output" },
      { text: "  Loading carrier pigeon... 🕊️", type: "pink" },
      { text: "  Just kidding. Email me: radhika.bhoyar09@gmail.com", type: "yellow" },
      { text: "", type: "output" },
    ],

    camera: () => [
      { text: "", type: "output" },
      { text: "  📸 You found the secret command!", type: "pink bold" },
      { text: "  ─────────────────────────────────────", type: "dim" },
      { text: "", type: "output" },
      { text: "  Yes, I'm obsessed with cameras.", type: "output" },
      { text: "  I believe the best engineers are also observers.", type: "output" },
      { text: "  Photography taught me to notice details", type: "output" },
      { text: "  that others miss — in code and in life.", type: "output" },
      { text: "", type: "output" },
      { text: "  Current gear: wouldn't you like to know 😏", type: "pink" },
      { text: "  Favorite subject: city lights at golden hour 🌆", type: "yellow" },
      { text: "", type: "output" },
      { text: "  \"The best camera is the one you have with you.\"", type: "dim" },
      { text: "  — Chase Jarvis", type: "dim" },
      { text: "", type: "output" },
    ],

    "sudo hire radhika": () => [
      { text: "", type: "output" },
      { text: "  [sudo] password for recruiter: ********", type: "dim" },
      { text: "", type: "output" },
      { text: "  ✅ ACCESS GRANTED", type: "green bold" },
      { text: "", type: "output" },
      { text: "  Deploying Radhika to your team...", type: "accent" },
      { text: "  ████████████████████████████████ 100%", type: "green" },
      { text: "", type: "output" },
      { text: "  🎉 Congratulations! You've made the right choice.", type: "yellow bold" },
      { text: "  She brings AI, data, code, and camera skills.", type: "output" },
      { text: "  Side effects may include: increased productivity,", type: "output" },
      { text: "  cleaner code, and random photography breaks.", type: "output" },
      { text: "", type: "output" },
      { text: "  → Email radhika.bhoyar09@gmail.com to confirm 📧", type: "cyan" },
      { text: "", type: "output" },
    ],

    whoami: () => [
      { text: "  radhika — AI & Data Science Engineer", type: "accent" },
    ],

    pwd: () => [
      { text: "  /home/radhika/portfolio", type: "output" },
    ],

    ls: () => [
      { text: "  about.txt   skills.json   projects/   resume.pdf   camera-roll/", type: "cyan" },
    ],

    date: () => [
      { text: `  ${new Date().toString()}`, type: "output" },
    ],

    echo: (args) => [
      { text: `  ${args || ""}`, type: "output" },
    ],

    neofetch: () => [
      { text: "", type: "output" },
      { text: "  radhika@portfolio", type: "accent bold" },
      { text: "  ─────────────────", type: "dim" },
      { text: "  OS:      Portfolio v2.0 (Dark Mode)", type: "output" },
      { text: "  Host:    Nagpur, India", type: "output" },
      { text: "  Kernel:  AI & Data Science", type: "cyan" },
      { text: "  Shell:   Python / SQL / JS", type: "output" },
      { text: "  WM:      GSAP + Lenis", type: "output" },
      { text: "  Theme:   Neon Dark [purple/cyan/pink]", type: "accent" },
      { text: "  Icons:   Camera 📷", type: "pink" },
      { text: "  CPU:     100% determination", type: "green" },
      { text: "  Memory:  2× hackathon wins loaded", type: "yellow" },
      { text: "  Uptime:  Since 2021 (and counting)", type: "output" },
      { text: "", type: "output" },
    ],
  };

  // ==========================================
  // TERMINAL LOGIC
  // ==========================================

  const addLine = (text, type = "output") => {
    const inputLine = body.querySelector(".terminal-input-line");
    const line = document.createElement("div");
    line.className = "terminal-line";

    if (type === "pre") {
      const pre = document.createElement("pre");
      pre.textContent = text;
      line.appendChild(pre);
    } else {
      const span = document.createElement("span");
      const classes = type.split(" ");
      span.className = classes.join(" ");
      span.textContent = text;
      line.appendChild(span);
    }

    body.insertBefore(line, inputLine);
    body.scrollTop = body.scrollHeight;
  };

  const addCommandLine = (cmd) => {
    const inputLine = body.querySelector(".terminal-input-line");
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.innerHTML = `<span class="prompt">radhika@portfolio ~ $</span> <span class="command">${cmd}</span>`;
    body.insertBefore(line, inputLine);
  };

  const processCommand = (rawInput) => {
    const trimmed = rawInput.trim().toLowerCase();
    addCommandLine(rawInput.trim());

    if (trimmed === "") return;
    if (trimmed === "clear") {
      const inputLine = body.querySelector(".terminal-input-line");
      while (body.firstChild !== inputLine) {
        body.removeChild(body.firstChild);
      }
      return;
    }
    if (trimmed === "exit") {
      closeTerminal();
      return;
    }

    // Check for exact command match
    if (commands[trimmed]) {
      const output = commands[trimmed]();
      let delay = 0;
      output.forEach((item) => {
        setTimeout(() => {
          addLine(item.text, item.type);
        }, delay);
        delay += 30; // Staggered typing effect
      });
      return;
    }

    // Check for echo command
    if (trimmed.startsWith("echo ")) {
      const args = rawInput.trim().substring(5);
      const output = commands.echo(args);
      output.forEach((item) => addLine(item.text, item.type));
      return;
    }

    // Unknown command
    addLine(`  Command not found: ${trimmed}`, "pink");
    addLine(`  Type 'help' for available commands`, "dim");
  };

  // ==========================================
  // OPEN / CLOSE
  // ==========================================

  const openTerminal = () => {
    if (isOpen) return;
    isOpen = true;
    overlay.classList.add("active");
    setTimeout(() => input.focus(), 300);

    // Show welcome message on first open
    if (body.querySelectorAll(".terminal-line").length === 0) {
      const welcome = [
        { text: "", type: "output" },
        { text: "  Welcome to Radhika's interactive terminal 🖥️", type: "accent bold" },
        { text: "  ─────────────────────────────────────────────", type: "dim" },
        { text: "  Type 'help' to see available commands", type: "output" },
        { text: "  Type 'hire' if you know what you want 😉", type: "pink" },
        { text: "", type: "output" },
      ];
      let delay = 100;
      welcome.forEach((item) => {
        setTimeout(() => addLine(item.text, item.type), delay);
        delay += 60;
      });
    }
  };

  const closeTerminal = () => {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("active");
  };

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  // Backtick key to toggle
  document.addEventListener("keydown", (e) => {
    if (e.key === "`" && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      if (isOpen) closeTerminal();
      else openTerminal();
    }
    if (e.key === "Escape" && isOpen) {
      closeTerminal();
    }
  });

  // Click hint button
  hint.addEventListener("click", () => {
    if (isOpen) closeTerminal();
    else openTerminal();
  });

  // Click overlay background to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeTerminal();
  });

  // Click red dot to close
  closeBtn.addEventListener("click", closeTerminal);

  // Input handling
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      commandHistory.unshift(value);
      historyIndex = -1;
      processCommand(value);
      input.value = "";
    }

    // Command history with up/down arrows
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }
    }
  });

  // Keep focus on input when terminal is open
  body.addEventListener("click", () => {
    if (isOpen) input.focus();
  });
});
