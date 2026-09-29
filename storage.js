// ══════════════════════════════════════════════════════════════
// ---- DEPRECATED FILE: storage.js ---- Codigo trasladado a script.js para centralizarlo.
// CIS-DF Quiz — Gestión de persistencia y estadísticas
// Este fichero maneja todo lo que se guarda entre sesiones
// ══════════════════════════════════════════════════════════════

const Storage = {

  // ── LEER / ESCRIBIR ─────────────────────────────────────────

  _read() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.app.storageKey) || '{}');
    } catch { return {}; }
  },

  _write(data) {
    try {
      localStorage.setItem(CONFIG.app.storageKey, JSON.stringify(data));
    } catch(e) {
      console.warn('CIS-DF Quiz: no se pudo guardar en localStorage', e);
    }
  },

  // ── INICIALIZAR estructura vacía si no existe ───────────────

  init() {
    const d = this._read();
    if (!d.sessions)      d.sessions = 0;
    if (!d.qStats)        d.qStats = {};        // { num: {seen, correct, wrong} }
    if (!d.flaggedBank)   d.flaggedBank = [];    // nums de preguntas marcadas
    if (!d.wrongBank)     d.wrongBank = [];      // nums de preguntas falladas
    if (!d.scoreHistory)  d.scoreHistory = [];   // array de % por sesión
    if (!d.bestStreak)     d.bestStreak = 0;       // racha más larga histórica
    this._write(d);
    return d;
  },

  // ── SESIÓN: guardar resultado completo ──────────────────────

  saveSession(sessionResults, sessionStreak = 0) {
    const d = this.init();
    const correct  = sessionResults.filter(r => r.correct);
    const wrong    = sessionResults.filter(r => !r.correct);
    const total    = sessionResults.length;
    const pct      = Math.round(correct.length / total * 100);

    // Historial de puntuaciones (con límite)
    d.scoreHistory.push(pct);
    const max = CONFIG.history.scoreHistoryMax;
    if (d.scoreHistory.length > max) d.scoreHistory = d.scoreHistory.slice(-max);

    // Contador de sesiones
    d.sessions = (d.sessions || 0) + 1;

    // Estadísticas por pregunta
    sessionResults.forEach(r => {
      if (!d.qStats[r.num]) d.qStats[r.num] = { seen: 0, correct: 0, wrong: 0 };
      d.qStats[r.num].seen++;
      if (r.correct) d.qStats[r.num].correct++;
      else           d.qStats[r.num].wrong++;
    });

    // Banco de falladas: añade nuevas, elimina las que se acertaron
    const okNums  = correct.map(r => r.num);
    const badNums = wrong.map(r => r.num);
    d.wrongBank = [...new Set([...(d.wrongBank || []), ...badNums])]
      .filter(n => !okNums.includes(n));

    // Update best streak if session streak beats it
    if (typeof sessionStreak === 'number' && sessionStreak > (d.bestStreak || 0)) {
      d.bestStreak = sessionStreak;
    }
    this._write(d);
    return pct;
  },

  // ── MARCADAS ────────────────────────────────────────────────

  getFlagged() {
    return this.init().flaggedBank || [];
  },

  addFlagged(num) {
    const d = this.init();
    if (!d.flaggedBank.includes(num)) d.flaggedBank.push(num);
    this._write(d);
  },

  removeFlagged(num) {
    const d = this.init();
    d.flaggedBank = d.flaggedBank.filter(n => n !== num);
    this._write(d);
  },

  isFlagged(num) {
    return (this.init().flaggedBank || []).includes(num);
  },

  // ── FALLADAS ────────────────────────────────────────────────

  getWrong() {
    return this.init().wrongBank || [];
  },

  // ── ESTADÍSTICAS CALCULADAS ─────────────────────────────────

  getStats() {
    const d    = this.init();
    const sh   = d.scoreHistory || [];
    const n    = CONFIG.history.recentScoresCount;
    const last = sh.slice(-n);

    return {
      sessions:     d.sessions || 0,
      best:         sh.length ? Math.max(...sh) : null,
      recentAvg:    last.length ? Math.round(last.reduce((a,b) => a+b, 0) / last.length) : null,
      recentCount:  last.length,
      totalSeen:    Object.keys(d.qStats).length,
      globalAcc:    this._globalAccuracy(d.qStats),
      scoreHistory: sh,
      qStats:       d.qStats,
      bestStreak:   d.bestStreak || 0,
      flaggedBank:  d.flaggedBank || [],
      wrongBank:    d.wrongBank || [],
    };
  },

  _globalAccuracy(qStats) {
    const vals   = Object.values(qStats);
    const totC   = vals.reduce((a, s) => a + s.correct, 0);
    const totA   = vals.reduce((a, s) => a + s.seen, 0);
    return totA > 0 ? Math.round(totC / totA * 100) : null;
  },

  // ── STATS POR PREGUNTA ───────────────────────────────────────

  getQuestionStat(num) {
    const d = this.init();
    return d.qStats[num] || { seen: 0, correct: 0, wrong: 0 };
  },

  getQuestionPct(num) {
    const s = this.getQuestionStat(num);
    return s.seen > 0 ? Math.round(s.correct / s.seen * 100) : null;
  },

  isWeak(num) {
    const pct = this.getQuestionPct(num);
    return pct !== null && pct < CONFIG.history.weakThreshold;
  },

  // ── ORDEN INTELIGENTE ────────────────────────────────────────

  smartSort(pool) {
    const d  = this.init();
    const qs = d.qStats || {};
    return [...pool].sort((a, b) => {
      const sa = qs[a.num]?.seen || 0;
      const sb = qs[b.num]?.seen || 0;
      if (sa !== sb) return sa - sb;

      // Si prioritizeWeak está activo, dentro del mismo nivel de vistas
      // las preguntas débiles van primero
      if (CONFIG.smart.prioritizeWeak) {
        const wa = this.isWeak(a.num) ? 0 : 1;
        const wb = this.isWeak(b.num) ? 0 : 1;
        if (wa !== wb) return wa - wb;
      }
      return Math.random() - 0.5;
    });
  },

  // ── RESET COMPLETO ───────────────────────────────────────────

  reset() {
    localStorage.removeItem(CONFIG.app.storageKey);
  },

  // ── RESET PARCIAL ────────────────────────────────────────────

  resetHistory() {
    const d = this.init();
    d.scoreHistory = [];
    d.sessions = 0;
    this._write(d);
  },

  resetQuestionStats() {
    const d = this.init();
    d.qStats = {};
    d.wrongBank = [];
    this._write(d);
  },

  resetStreak() {
    const d = this.init();
    d.bestStreak = 0;
    this._write(d);
  },

  resetFlagged() {
    const d = this.init();
    d.flaggedBank = [];
    this._write(d);
  },

  // ── EXPORT / IMPORT ──────────────────────────────────────────

  exportJSON() {
    const d    = this.init();
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `cisdf-stats-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      // Validate minimal structure
      if (typeof data !== 'object') throw new Error('Formato inválido');
      this._write(data);
      return true;
    } catch(e) {
      alert('Error al importar: ' + e.message);
      return false;
    }
  },
};
