/* Coraline's Arcade — shared on-screen touch pad
 * Bridge for keyboard-only web games so they work on iPad/iPhone touch.
 * Dispatches REAL KeyboardEvents on `document` (bubbles to window + document.onkeydown).
 * Self-configures from <script data-game="..."> or window.CORALINE_TOUCH.
 * Deps: none. Works on iOS Safari (touch events) + Chrome (pointer).
 */
(function () {
  if (window.__coralineTouchPad) return;
  window.__coralineTouchPad = true;

  var CONFIGS = {
    // ---- 11 arcade ports ----
    pacman:     { title: "Pac-Man",    dpad: ["up","down","left","right"], buttons: [ {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    "space-invaders": { title:"Space Invaders", dpad:["left","right"], buttons:[ {label:"🔥", keys:P(" "), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    breakout:   { title: "Breakout",   dpad: ["left","right"], buttons: [ {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    pong:       { title: "Pong",       dpad: ["up","down"], buttons:[ {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    asteroids:  { title:"Asteroids",  dpad:["left","right","up"], buttons:[ {label:"🔥", keys:P(" "), kind:"press"}, {label:"🌀", keys:P("Shift"), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    galaxian:   { title:"Galaxian",   dpad:["left","right"], buttons:[ {label:"🔥", keys:P(" "), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    defender:   { title:"Defender",   dpad:["left","right","up","down"], buttons:[ {label:"🔥", keys:P("Space"), kind:"press"}, {label:"💣", keys:P("KeyD"), kind:"press"}, {label:"🌀", keys:P("KeyH"), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    "lunar-lander": { title:"Lunar Lander", dpad:["left","right","up"], buttons:[ {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    centipede:  { title:"Centipede",  dpad:["left","right","up","down"], buttons:[ {label:"🔥", keys:P(" "), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    "gun-fight":{ title:"Gun Fight",  dpad:["up","down","left","right"], dpadKeys:{ up:"KeyW", down:"KeyS", left:"KeyA", right:"KeyD" }, buttons:[ {label:"🔫", keys:P("KeyF"), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    "computer-space": { title:"Computer Space", dpad:["left","right","up"], buttons:[ {label:"🔥", keys:P(" "), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ] },
    "missile-command": { title:"Missile Command", dpad:[], buttons:[ {label:"①", keys:P("Digit1"), kind:"press"}, {label:"②", keys:P("Digit2"), kind:"press"}, {label:"③", keys:P("Digit3"), kind:"press"}, {label:"⏵", keys:P("Enter"), kind:"press"} ], note:"aim with your finger on the screen" },
    // ---- dog bone (kids) ----
    "dog-bone": { title:"Dog Bone",   dpad:["up","down","left","right"], repeatOnHold: true, repeatMs: 60, dogBone: true }
  };

  // helper: key spec = { key, code, keyCode } + bubbles
  function P(code) {
    var m = {
      "ArrowLeft":  ["ArrowLeft", "ArrowLeft", 37],
      "ArrowRight": ["ArrowRight","ArrowRight",39],
      "ArrowUp":    ["ArrowUp", "ArrowUp", 38],
      "ArrowDown":  ["ArrowDown", "ArrowDown", 40],
      "Enter":      ["Enter", "Enter", 13],
      " ":          [" ", "Space", 32],
      "Shift":      ["Shift", "ShiftLeft", 16],
      "KeyD":       ["d", "KeyD", 68],
      "KeyZ":       ["z", "KeyZ", 90],
      "KeyH":       ["h", "KeyH", 72],
      "KeyF":       ["f", "KeyF", 70],
      "Digit1":     ["1", "Digit1", 49],
      "Digit2":     ["2", "Digit2", 50],
      "Digit3":     ["3", "Digit3", 51]
    };
    var k = m[code] || [code, code, code.length && code.charCodeAt(0) || 0];
    return { key: k[0], code: k[1], keyCode: k[2] };
  }

  // resolve config
  var script = document.currentScript;
  var gameName = script && script.getAttribute("data-game");
  var cfg = CONFIGS[gameName] || (typeof window.CORALINE_TOUCH === "object" ? window.CORALINE_TOUCH : null);
  if (!cfg || !cfg.dpad.length && !cfg.buttons.length) return;

  // ---- dispatch helpers ----
  function fire(type, spec) {
    var ev = new KeyboardEvent(type, {
      key: spec.key, code: spec.code, keyCode: spec.keyCode, which: spec.keyCode,
      bubbles: true, cancelable: true
    });
    // let it bubble from document -> window, and trigger document.onkeydown (dog bone)
    document.dispatchEvent(ev);
  }
  function press(spec, repeat) {
    fire("keydown", spec);
    if (repeat) return; // held; keyup sent when finger lifts
    setTimeout(function () { fire("keyup", spec); }, 60);
  }

  // ---- build DOM ----
  var el = document.createElement("div");
  el.id = "_ctp";
  el.innerHTML =
    '<style>' +
    '#_ctp{position:fixed;left:0;right:0;bottom:0;z-index:999999;pointer-events:none;user-select:none;-webkit-user-select:none;touch-action:none;' +
      'display:flex;justify-content:space-between;align-items:flex-end;padding:0 18px calc(14px + env(safe-area-inset-bottom));padding:0 18px 14px;}' +
    '#_ctp .zone{position:relative;display:flex;gap:10px;pointer-events:auto;}' +
    '#_ctp .btn{display:flex;align-items:center;justify-content:center;background:rgba(22,10,28,.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);' +
      'border:2px solid rgba(255,217,236,.75);border-radius:16px;color:#fff;font-size:22px;line-height:1;box-shadow:0 3px 10px rgba(0,0,0,.35);touch-action:none;' +
      'text-shadow:0 1px 3px rgba(0,0,0,.5);-webkit-tap-highlight-color:transparent;}' +
    '#_ctp .btn:active,#_ctp .btn.on{background:rgba(255,155,200,.65);border-color:#ffe4f2;' +
      'box-shadow:0 0 18px rgba(255,140,190,.8) inset,0 3px 10px rgba(0,0,0,.35);}' +
    '#_ctp .dpad{position:relative;width:132px;height:132px;opacity:.92;}' +
    '#_ctp .dpad .btn{position:absolute;width:44px;height:44px;font-size:18px;}' +
    '#_ctp .dbtn-u{left:44px;top:0}#_ctp .dbtn-d{left:44px;bottom:0}#_ctp .dbtn-l{left:0;top:44px}#_ctp .dbtn-r{right:0;top:44px}' +
    '#_ctp .act{flex-direction:column;}' +
    '#_ctp .act .btn{width:58px;height:48px;margin-bottom:8px;}' +
    '#_ctp .collapse{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));right:14px;bottom:14px;z-index:1000000;' +
      'width:46px;height:46px;border-radius:50%;border:2px solid rgba(255,217,236,.8);background:rgba(22,10,28,.6);' +
      'color:#fff;font-size:20px;display:flex;align-items:center;justify-content:center;pointer-events:auto;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}' +
    '#_ctp.hid,#_ctp.hid .collapse{display:none;}' +
    '</style>';
  var pad = document.createElement("div");
  pad.className = "zone";
  el.appendChild(pad);
  document.body.appendChild(el);

  // dpad
  if (cfg.dpad && cfg.dpad.length) {
    var dp = document.createElement("div");
    dp.className = "dpad";
    ["up","down","left","right"].forEach(function (d) {
      if ((cfg.dpad||[]).indexOf(d) === -1) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn dbtn-" + d[0];
      b.textContent = {up:"▲",down:"▼",left:"◀",right:"▶"}[d];
      b.dataset.dir = d;
      dp.appendChild(b);
    });
    pad.appendChild(dp);
  }
  // action buttons
  if (cfg.buttons && cfg.buttons.length) {
    var ac = document.createElement("div");
    ac.className = "zone act";
    cfg.buttons.forEach(function (btn) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn";
      b.textContent = btn.label || "·";
      b.dataset.kind = btn.kind || "press";
      b.dataset.keyIdx = String((cfg.buttons||[]).indexOf(btn));
      ac.appendChild(b);
    });
    el.appendChild(ac);
  }
  // collapse toggle
  var tog = document.createElement("button");
  tog.type = "button";
  tog.className = "collapse";
  tog.textContent = "🎮";
  tog.addEventListener("click", function () {
    if (el.classList.contains("hid")) { el.classList.remove("hid"); state.last = Date.now(); }
  });
  document.body.appendChild(tog);

  // ---- touch wiring (shared): key states ----
  var state = { active: {}, last: Date.now(), busy: false };
  var IDLE = 6000;

  function keyIdx(spec) {
    return spec.key + "_" + spec.code;
  }
  function specFor(btn) {
    // dpad buttons -> arrow spec; action buttons -> their keys
    if (btn.dataset.dir) {
      var override = (cfg.dpadKeys||{})[btn.dataset.dir];
      if (override) return P(override);
      return P("Arrow" + btn.dataset.dir[0].toUpperCase() + btn.dataset.dir.slice(1));
    }
    var idx = Number(btn.dataset.keyIdx);
    var bt = (cfg.buttons||[])[idx];
    if (bt && bt.keys) {
      // keys may be a single spec object or an array of specs
      var first = Array.isArray(bt.keys) ? bt.keys[0] : bt.keys;
      if (first) return first;
    }
    return null;
  }

  function touchStart(btn, ev) {
    ev.preventDefault();
    state.last = Date.now();
    btn.classList.add("on");
    var spec = specFor(btn);
    if (!spec) return;
    var k = keyIdx(spec);
    if (state.active[k]) return;
    var kind = btn.dataset.kind || "press";
    if (kind === "hold" || (btn.dataset.dir)) {
      // hold: keydown now, keyup on release
      state.active[k] = { btn: btn, spec: spec, timer: null };
      fire("keydown", spec);
      if (cfg.repeatOnHold) {
        state.active[k].timer = setInterval(function () { fire("keydown", spec); }, cfg.repeatMs || 120);
      }
    } else {
      press(spec, false);
    }
  }
  function touchEnd(btn, ev) {
    if (ev) ev.preventDefault();
    btn.classList.remove("on");
    var spec = specFor(btn);
    if (!spec) return;
    var k = keyIdx(spec);
    var a = state.active[k];
    if (!a) return;
    if (a.timer) { clearInterval(a.timer); }
    fire("keyup", spec);
    delete state.active[k];
  }

  // attach: support touch + mouse fallback (desktop test)
  function bind(el2) {
    if (window.PointerEvent) {
      el2.addEventListener("pointerdown", function (e) { e.preventDefault(); touchStart(el2, e); });
      el2.addEventListener("pointerup", function (e) { touchEnd(el2, e); });
      el2.addEventListener("pointercancel", function (e) { touchEnd(el2, e); });
      el2.addEventListener("pointerleave", function (e) {
        // releasing off button while still holding — release only if not switching
        if (e.pointerType === "mouse") touchEnd(el2, e);
      });
    } else {
      el2.addEventListener("touchstart", function (e) { touchStart(el2, e); }, { passive: false });
      el2.addEventListener("touchend", function (e) { touchEnd(el2, e); }, { passive: false });
      el2.addEventListener("touchcancel", function (e) { touchEnd(el2, e); }, { passive: false });
      // mouse fallback for non-touch
      el2.addEventListener("mousedown", function (e) { touchStart(el2, e); });
      el2.addEventListener("mouseup", function (e) { touchEnd(el2, e); });
    }
  }
  el.querySelectorAll(".btn").forEach(bind);

  // auto-hide after idle
  setInterval(function () {
    if (Date.now() - state.last > IDLE && !el.classList.contains("hid")) {
      el.classList.add("hid");
    }
  }, 2000);

  // Missile Command note
  if (cfg.note) {
    var tip = document.createElement("div");
    tip.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(90px + env(safe-area-inset-bottom));bottom:90px;z-index:999999;background:rgba(22,10,28,.75);color:#ffe4f2;padding:8px 14px;border-radius:999px;font-size:13px;pointer-events:none;font-family:system-ui;";
    tip.textContent = cfg.note + " · use the buttons below";
    document.body.appendChild(tip);
    setTimeout(function () { tip.remove(); }, 5000);
  }

})();
