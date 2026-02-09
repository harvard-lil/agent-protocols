/* ================================================================
   Agent Protocol Tech Tree — Application
   Static SPA: hash-based routing, YAML data, scroll animation
   ================================================================ */

// ── Global State ──────────────────────────────────────────────────
let DATA = null;
let currentView = null;   // 'tree' | 'detail'
let currentProtocolId = null;
let activeSceneIndex = 0;
let scrollObserver = null;
let fadeTimeout = null;
let scrollRafId = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ── Grid Constants ────────────────────────────────────────────────
const CELL_W = 260;
const CELL_H = 100;
const BOX_W = 204;
const BOX_H = 80;

// ── Init ──────────────────────────────────────────────────────────
async function init() {
  try {
    const resp = await fetch('data.yaml');
    if (!resp.ok) throw new Error('Failed to load data.yaml');
    const text = await resp.text();
    DATA = jsyaml.load(text);
  } catch (err) {
    document.getElementById('app').innerHTML =
      `<div class="loading">Error loading data: ${escapeHtml(err.message)}<br>
       <small>Serve via HTTP: python -m http.server</small></div>`;
    return;
  }
  window.addEventListener('hashchange', route);
  route();
}

// ── Router ────────────────────────────────────────────────────────
function route() {
  cleanup();
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && DATA.protocols.find(p => p.id === hash)) {
    showDetail(hash);
  } else {
    showTree();
  }
}

function cleanup() {
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }
  if (fadeTimeout) {
    clearTimeout(fadeTimeout);
    fadeTimeout = null;
  }
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId);
    scrollRafId = null;
  }
}

// ── Navigate ──────────────────────────────────────────────────────
function navigateTo(hash) {
  window.location.hash = hash ? `#${hash}` : '#';
}

// ================================================================
//  TREE VIEW
// ================================================================

function showTree() {
  currentView = 'tree';
  currentProtocolId = null;
  document.title = DATA.title;

  const protocols = DATA.protocols;
  const maxCol = Math.max(...protocols.map(p => p.tree.col));
  const maxRow = Math.max(...protocols.map(p => p.tree.row));
  const cols = maxCol + 1;
  const rows = maxRow + 1;
  const gridW = cols * CELL_W;
  const gridH = rows * CELL_H;

  // Build era labels
  const erasHtml = DATA.eras.map(e =>
    `<div class="tree-era" style="grid-column:${e.col + 1}">${escapeHtml(e.label)}</div>`
  ).join('');

  // Build grid cells (empty placeholders + nodes)
  let cellsHtml = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const proto = protocols.find(p => p.tree.col === c && p.tree.row === r);
      if (proto) {
        cellsHtml += `
          <div class="tree-cell" style="grid-column:${c + 1};grid-row:${r + 1}">
            <div class="tree-node" tabindex="0" role="button"
                 data-id="${proto.id}"
                 aria-label="${escapeHtml(proto.title)}: ${escapeHtml(proto.tagline)}">
              <div class="node-header">
                <div class="node-icon" aria-hidden="true">${escapeHtml(proto.icon_alt)}</div>
                <div class="node-title">${escapeHtml(proto.title)}</div>
              </div>
              <div class="node-tagline">${escapeHtml(proto.tagline)}</div>
            </div>
          </div>`;
      } else {
        cellsHtml += `<div class="tree-cell" style="grid-column:${c + 1};grid-row:${r + 1}"></div>`;
      }
    }
  }

  // Build SVG connections
  let svgPaths = '';
  svgPaths += `<defs>
    <marker id="ah" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
      <polygon points="0 0, 10 4, 0 8" class="arrow-head"/>
    </marker>
  </defs>`;

  protocols.forEach(proto => {
    proto.tree.depends_on.forEach(depId => {
      const dep = protocols.find(p => p.id === depId);
      if (!dep) return;
      const x1 = dep.tree.col * CELL_W + (CELL_W + BOX_W) / 2;
      const y1 = dep.tree.row * CELL_H + CELL_H / 2;
      const x2 = proto.tree.col * CELL_W + (CELL_W - BOX_W) / 2;
      const y2 = proto.tree.row * CELL_H + CELL_H / 2;
      const midX = (x1 + x2) / 2;
      svgPaths += `<path d="M${x1},${y1} H${midX} V${y2} H${x2}" marker-end="url(#ah)"/>`;
    });
  });

  // Build group outlines
  let groupsHtml = '';
  DATA.groups.forEach(group => {
    const members = protocols.filter(p => group.members.includes(p.id));
    if (!members.length) return;
    const minCol = Math.min(...members.map(m => m.tree.col));
    const maxCol = Math.max(...members.map(m => m.tree.col));
    const minRow = Math.min(...members.map(m => m.tree.row));
    const maxRow = Math.max(...members.map(m => m.tree.row));
    const pad = 10;
    const x = minCol * CELL_W + (CELL_W - BOX_W) / 2 - pad;
    const y = minRow * CELL_H + (CELL_H - BOX_H) / 2 - pad;
    const w = (maxCol - minCol) * CELL_W + BOX_W + pad * 2;
    const h = (maxRow - minRow) * CELL_H + BOX_H + pad * 2;
    groupsHtml += `
      <div class="tree-group" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
        <span class="tree-group-label">${escapeHtml(group.label)}</span>
      </div>`;
  });

  document.getElementById('app').innerHTML = `
    <div class="tree-page">
      <header class="tree-header">
        <h1>${escapeHtml(DATA.title)}</h1>
        <p>${escapeHtml(DATA.subtitle)}</p>
      </header>
      <div class="tree-container">
        <div class="tree-eras" style="display:grid;grid-template-columns:repeat(${cols},${CELL_W}px)">
          ${erasHtml}
        </div>
        <div class="tree-wrapper" style="width:${gridW}px;height:${gridH}px">
          <svg class="tree-svg" width="${gridW}" height="${gridH}" viewBox="0 0 ${gridW} ${gridH}">
            ${svgPaths}
          </svg>
          ${groupsHtml}
          <div class="tree-grid" style="grid-template-columns:repeat(${cols},${CELL_W}px);grid-template-rows:repeat(${rows},${CELL_H}px)">
            ${cellsHtml}
          </div>
        </div>
      </div>
      <footer class="tree-footer">Click a protocol to explore how it works</footer>
    </div>`;

  // Center the tree scroll on the root node
  const treeContainer = document.querySelector('.tree-container');
  if (treeContainer) {
    // Find the first protocol (root of the tree) and center on it
    const rootProto = protocols.find(p => p.tree.depends_on.length === 0) || protocols[0];
    const rootCenterX = rootProto.tree.col * CELL_W + CELL_W / 2;
    const wrapper = document.querySelector('.tree-wrapper');
    if (wrapper) {
      const wrapperLeft = wrapper.offsetLeft;
      const targetScroll = wrapperLeft + rootCenterX - treeContainer.clientWidth / 2;
      treeContainer.scrollLeft = Math.max(0, targetScroll);
    }
  }

  // Attach click handlers
  document.querySelectorAll('.tree-node').forEach(node => {
    node.addEventListener('click', () => navigateTo(node.dataset.id));
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(node.dataset.id);
      }
    });
  });
}

// ================================================================
//  DETAIL VIEW
// ================================================================

function showDetail(protocolId) {
  currentView = 'detail';
  currentProtocolId = protocolId;
  activeSceneIndex = 0;

  const proto = DATA.protocols.find(p => p.id === protocolId);
  if (!proto) { navigateTo(''); return; }

  document.title = `${proto.title} — ${DATA.title}`;

  const detail = proto.detail;
  const scenes = proto.animation.scenes;

  // Steps HTML
  const stepsHtml = scenes.map((scene, i) => `
    <div class="step${i === 0 ? ' active' : ''}" data-scene="${i}">
      <div class="step__content">
        <div class="step__number">Step ${i + 1} of ${scenes.length}</div>
        <div class="step__title">
          ${escapeHtml(scene.title)}
          ${scene.sparkle ? '<span class="step__sparkle" aria-label="Interoperable">&#10022;</span>' : ''}
        </div>
        <div class="step__description">${escapeHtml(scene.description)}</div>
      </div>
    </div>
  `).join('');

  // Reduced‑motion: show all scenes stacked
  const isReduced = prefersReducedMotion.matches;

  document.getElementById('app').innerHTML = `
    <div class="detail-page">
      <header class="detail-header">
        <button class="back-btn" onclick="navigateTo('')">&larr; Tree</button>
        <div class="header-icon" aria-hidden="true">${escapeHtml(proto.icon_alt)}</div>
        <h1>${escapeHtml(proto.title)}</h1>
      </header>
      <div class="detail-content">
        <div class="detail-hero">
          <div class="tagline">${escapeHtml(proto.tagline)}</div>
        </div>

        <div class="detail-section">
          <div class="section-label">What it solves</div>
          <div class="section-body">${escapeHtml(detail.what_it_solves)}</div>
        </div>

        <div class="how-it-works detail-section">
          <div class="section-label">How it works</div>
          <div class="scrolly" id="scrolly">
            <div class="scrolly__graphic" id="anim-stage">
              <div class="anim-stage" id="anim-root"></div>
            </div>
            <div class="scrolly__steps" id="scrolly-steps">
              ${stepsHtml}
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-label">Why it&rsquo;s an open protocol</div>
          <div class="section-body">${escapeHtml(detail.why_open)}</div>
        </div>

        <div class="detail-section">
          <div class="section-label">Where it came from</div>
          <div class="section-body">${escapeHtml(detail.where_from)}</div>
        </div>

        <div class="detail-section">
          <div class="section-label">Who maintains it</div>
          <div class="section-body">${escapeHtml(detail.who_maintains)}</div>
        </div>
      </div>
    </div>`;

  // Initialize animation
  initAnimation(proto);

  // Setup scroll observer (unless reduced motion or narrow viewport)
  if (!isReduced && window.innerWidth > 768) {
    setupScrollObserver(proto);
  } else {
    // In stacked mode, show first scene; clicking steps switches scenes
    document.querySelectorAll('.step').forEach(step => {
      step.addEventListener('click', () => {
        const idx = parseInt(step.dataset.scene, 10);
        transitionToScene(proto, idx);
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      });
    });
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ================================================================
//  ANIMATION ENGINE
// ================================================================

function initAnimation(proto) {
  const root = document.getElementById('anim-root');
  if (!root) return;

  const allActors = proto.animation.actors;

  // Create persistent actor elements
  let actorsHtml = '<div class="anim-actors" id="anim-actors">';
  allActors.forEach(actor => {
    actorsHtml += `
      <div class="anim-actor" id="actor-${actor.id}" data-id="${actor.id}" style="opacity:0;">
        <div class="actor-icon">${escapeHtml(actorIconText(actor.type))}</div>
        <div class="actor-label">${escapeHtml(actor.label)}</div>
      </div>`;
  });
  actorsHtml += '</div>';

  actorsHtml += '<div class="anim-messages" id="anim-messages"></div>';
  actorsHtml += '<div class="sparkle-badge" id="sparkle-badge" style="display:none;"><span class="star">&#10022;</span> Interoperable</div>';

  root.innerHTML = actorsHtml;

  // Show first scene
  setActiveScene(proto, 0);
}

function setActiveScene(proto, index) {
  activeSceneIndex = index;
  const scene = proto.animation.scenes[index];
  if (!scene) return;

  const allActors = proto.animation.actors;
  const visibleIds = scene.actors_visible;
  const n = visibleIds.length;

  // Position and show/hide actors
  allActors.forEach(actor => {
    const el = document.getElementById(`actor-${actor.id}`);
    if (!el) return;
    const visibleIdx = visibleIds.indexOf(actor.id);
    if (visibleIdx >= 0) {
      const leftPct = ((visibleIdx + 0.5) / n) * 100;
      el.style.left = leftPct + '%';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0';
    }
  });

  // Render messages
  renderMessages(scene, visibleIds, n);

  // Sparkle badge
  const badge = document.getElementById('sparkle-badge');
  if (badge) {
    badge.style.display = scene.sparkle ? 'flex' : 'none';
  }
}

function renderMessages(scene, visibleIds, numActors) {
  const container = document.getElementById('anim-messages');
  if (!container) return;

  let html = '';
  scene.messages.forEach((msg, mi) => {
    const fromIdx = visibleIds.indexOf(msg.from);
    const toIdx = visibleIds.indexOf(msg.to);
    if (fromIdx < 0 || toIdx < 0) return;

    const fromPct = ((fromIdx + 0.5) / numActors) * 100;
    const toPct = ((toIdx + 0.5) / numActors) * 100;
    const leftPct = Math.min(fromPct, toPct);
    const widthPct = Math.abs(toPct - fromPct);
    const direction = toPct > fromPct ? 'right' : 'left';

    const hasDetail = msg.json_full && msg.json_full.trim();
    const detailId = `msg-detail-${activeSceneIndex}-${mi}`;

    html += `
      <div class="anim-message">
        <div class="msg-label" style="margin-left:${leftPct}%;width:${widthPct}%">
          ${escapeHtml(msg.label)}
        </div>
        <div class="msg-arrow" style="margin-left:${leftPct}%;width:${widthPct}%">
          <div class="msg-arrow-head ${direction}"></div>
        </div>
        ${msg.json_preview ? `
          <div class="msg-preview${hasDetail ? ' expandable' : ''}" style="margin-left:${Math.max(0, leftPct - 5)}%;width:${Math.min(100, widthPct + 10)}%"
               ${hasDetail ? `onclick="toggleDetail('${detailId}')" onkeydown="if(event.key==='Enter')toggleDetail('${detailId}')" role="button" tabindex="0" title="Click to expand"` : ''}>
            <code>${escapeHtml(msg.json_preview)}</code>${hasDetail ? ' <span class="expand-hint">[+]</span>' : ''}
          </div>` : ''}
        ${hasDetail ? `
          <div class="msg-detail" id="${detailId}" style="margin-left:${Math.max(0, leftPct - 5)}%;width:${Math.min(100, widthPct + 10)}%">${escapeHtml(msg.json_full.trim())}</div>` : ''}
      </div>`;
  });

  container.innerHTML = html;
}

// ── Scroll-based Scene Switching ──────────────────────────────────

function transitionToScene(proto, index) {
  if (index === activeSceneIndex) return;

  const root = document.getElementById('anim-root');
  if (!root) { setActiveScene(proto, index); return; }

  // Cancel any pending transition and remove leftover overlay
  if (fadeTimeout) clearTimeout(fadeTimeout);
  const oldOverlay = document.getElementById('anim-crossfade');
  if (oldOverlay) oldOverlay.remove();

  // Update index immediately so scroll handler doesn't retrigger
  activeSceneIndex = index;

  // Clone current content as a crossfade overlay
  const overlay = root.cloneNode(true);
  overlay.id = 'anim-crossfade';
  // Strip IDs from clone so getElementById still finds the real elements
  overlay.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.transition = 'opacity 0.5s ease';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '10';
  overlay.style.background = 'var(--bg)';
  root.appendChild(overlay);

  // Disable actor transitions so new positions appear instantly (hidden under overlay)
  root.querySelectorAll('.anim-actor').forEach(a => { a.style.transition = 'none'; });

  // Update the real content underneath the overlay
  setActiveScene(proto, index);

  // Restore actor transitions then fade out overlay to reveal new scene
  requestAnimationFrame(() => {
    root.querySelectorAll('.anim-actor').forEach(a => { a.style.transition = ''; });
    overlay.style.opacity = '0';
  });

  // Remove overlay after fade completes
  fadeTimeout = setTimeout(() => {
    overlay.remove();
    fadeTimeout = null;
  }, 550);
}

function setupScrollObserver(proto) {
  const graphic = document.querySelector('.scrolly__graphic');
  const steps = document.querySelectorAll('.step');
  if (!graphic || !steps.length) return;

  function checkScroll() {
    scrollRafId = null;
    const graphicBottom = graphic.getBoundingClientRect().bottom;

    // Active step = last step whose top edge is above the graphic's bottom edge
    let newIdx = 0;
    steps.forEach((step, i) => {
      if (step.getBoundingClientRect().top < graphicBottom) {
        newIdx = i;
      }
    });

    if (newIdx !== activeSceneIndex) {
      transitionToScene(proto, newIdx);
      steps.forEach(s => s.classList.remove('active'));
      steps[newIdx].classList.add('active');
    }
  }

  function onScroll() {
    if (!scrollRafId) {
      scrollRafId = requestAnimationFrame(checkScroll);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  checkScroll(); // initial check

  // Compatible with cleanup() which calls .disconnect()
  scrollObserver = {
    disconnect: () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRafId) { cancelAnimationFrame(scrollRafId); scrollRafId = null; }
    }
  };
}

// ── Toggle JSON Detail ────────────────────────────────────────────
function toggleDetail(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('expanded');
}

// ── Actor Icon Text ───────────────────────────────────────────────
function actorIconText(type) {
  const icons = {
    app: 'APP',
    model: 'LLM',
    server: 'SRV',
    agent: 'AGT',
    file: 'DOC',
    repo: 'REPO',
    website: 'WEB',
    registry: 'REG',
    merchant: 'SHOP',
    skill: 'SKILL',
  };
  return icons[type] || type.toUpperCase().slice(0, 4);
}

// ── Escape HTML ───────────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Boot ──────────────────────────────────────────────────────────
init();
