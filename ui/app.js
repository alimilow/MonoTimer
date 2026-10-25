(() => {
  'use strict';

  const RING_CIRCUMFERENCE = 2 * Math.PI * 108; // r = 108 -> 678.584

  const ICONS = {
    play: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  // Complete Bilingual Dictionary (ES / EN)
  const I18N = {
    es: {
      tab_sequences: 'Secuencias',
      tab_simple: 'Temporizador Simple',
      tt_palette: 'Cambiar paleta de colores',
      tt_pin: 'Siempre visible (Always on Top)',
      tt_compact: 'Modo compacto superpuesto (Alt+M)',
      tt_settings: 'Ajustes, idioma y sonido',
      tt_minimize: 'Minimizar',
      tt_close: 'Cerrar',
      tt_expand: 'Expandir ventana (Alt+M)',
      tt_play_pause: 'Iniciar / Pausar / Confirmar (Alt+P)',
      tt_next_or_reset: 'Siguiente bloque (Alt+N)',
      tt_new_sequence: 'Crear nueva secuencia',
      tt_edit_sequence: 'Renombrar o eliminar secuencia',
      tt_reset_block: 'Reiniciar tiempo actual (Alt+R)',
      tt_next_block: 'Saltar al siguiente bloque (Alt+N)',
      compact_hk_hint: 'Alt+P Play · Alt+N Sig',
      lbl_active_sequence: 'SECUENCIA / RUTINA ACTIVA',
      lbl_when_block_ends: 'Al terminar bloque:',
      seg_auto: 'Automático',
      seg_confirm: 'Confirmar',
      banner_block_done: '¡Bloque completado!',
      btn_reset_all: 'Reiniciar todo',
      sec_blocks_title: 'Secuencia de Bloques',
      btn_add_block: 'Bloque',
      chip_simple_timer: 'TEMPORIZADOR SIMPLE',
      loop_on: 'Repetir: Sí',
      loop_off: 'Repetir: No',
      ph_simple_label: 'Etiqueta opcional...',
      lbl_configure_duration: 'DURACIÓN DEL TEMPORIZADOR',
      lbl_hours: 'Horas',
      lbl_minutes: 'Minutos',
      lbl_seconds: 'Segundos',
      lbl_quick_presets: 'Ajustes rápidos',
      hk_play_pause: 'Play/Pausa',
      hk_next: 'Siguiente',
      hk_reset: 'Reiniciar',
      hk_mini: 'Mini',
      dlg_palette_title: 'Paleta de Colores',
      dlg_palette_sub: 'Estilo Material UI',
      btn_done: 'Listo',
      btn_cancel: 'Cancelar',
      btn_save: 'Guardar',
      btn_save_block: 'Guardar bloque',
      btn_delete: 'Eliminar',
      dlg_edit_block: 'Editar Bloque',
      dlg_add_block: 'Añadir Bloque',
      lbl_block_name: 'Nombre del bloque',
      ph_block_name: 'Ej. Estudio, Trabajo, Serie 1, Descanso...',
      lbl_block_category: 'Tipo o categoría del bloque',
      opt_type_activity: 'Actividad / Bloque Principal',
      opt_type_focus: 'Enfoque / Estudio / Trabajo',
      opt_type_exercise: 'Ejercicio / Entrenamiento',
      opt_type_rest: 'Descanso / Pausa',
      opt_type_prep: 'Preparación / Transición',
      opt_type_custom: 'Personalizado (Escribir etiqueta propia)',
      lbl_custom_tag: 'Etiqueta personalizada',
      ph_custom_tag: 'Ej. Lectura, Cocina, Reunión...',
      lbl_block_transition: 'Al terminar este bloque',
      opt_trans_inherit: 'Usar ajuste general de la secuencia',
      opt_trans_auto: 'Avanzar automáticamente al siguiente',
      opt_trans_manual: 'Pausar y esperar mi confirmación (Alt+P)',
      dlg_new_seq: 'Nueva Secuencia',
      dlg_edit_seq: 'Editar Secuencia',
      lbl_sequence_name: 'Nombre de la secuencia o rutina',
      ph_sequence_name: 'Ej. Pomodoro Estudio, Entrenamiento, Rutina Diaria...',
      dlg_settings_title: 'Ajustes, Idioma y Sonido',
      lbl_language: 'Idioma de la aplicación / Language',
      lbl_sound_profile: 'Tono de alerta al terminar',
      snd_material: 'Campana Armónica Material (Recomendado)',
      snd_pulse: 'Doble Pulso de Alta Claridad',
      snd_crystal: 'Cristal Minimalista',
      snd_soft: 'Acorde Suave',
      btn_test_sound: 'Probar',
      lbl_volume: 'Volumen de alertas',
      sw_countdown_title: 'Bips en los últimos 3 segundos (3, 2, 1)',
      sw_countdown_desc: 'Te avisa justo antes de que termine el tiempo',
      sw_reminder_title: 'Recordatorio sonoro en espera de confirmación',
      sw_reminder_desc: 'Suena un pulso suave cada 8s si espera que confirmes',
      sw_hotkeys_title: 'Atajos de teclado globales en Windows 11',
      sw_hotkeys_desc: 'Permite usar Alt+P, Alt+N, Alt+R y Alt+M desde cualquier app',
      about_credit: 'Creado para entrenamiento, estudio y productividad',
      // Dynamic strings
      type_activity: 'Actividad',
      type_focus: 'Enfoque',
      type_exercise: 'Ejercicio',
      type_rest: 'Descanso',
      type_prep: 'Preparación',
      type_custom_default: 'Personalizado',
      step_of: (cur, tot) => `Bloque ${cur} de ${tot}`,
      rem_total: (m, s) => `Restante: ${m}m ${String(s).padStart(2, '0')}s`,
      seq_summary: (count, m, s) => `${count} bloque${count === 1 ? '' : 's'} · ${m}m${s ? ` ${s}s` : ''} en total`,
      next_label: (name, time) => `Sig: ${name} (${time})`,
      last_block_label: 'Último bloque de la secuencia',
      simple_mode_sub: 'Temporizador de un solo tiempo',
      status_waiting_confirm: 'Esperando tu confirmación',
      confirm_next_hint: (name, time) => `Siguiente: ${name} (${time}) · Presiona Continuar o Alt+P`,
      status_in_break: (tag) => `En ${tag.toLowerCase()}`,
      status_running: (tag) => `En curso · ${tag}`,
      status_seq_done: '¡Secuencia completada!',
      status_simple_done: '¡Tiempo terminado!',
      status_paused: 'En pausa',
      status_ready: 'Listo para iniciar',
      btn_start: 'Iniciar',
      btn_pause: 'Pausar',
      btn_resume: 'Reanudar',
      btn_continue: 'Continuar',
      btn_repeat: 'Repetir',
      trans_auto: 'Avance automático',
      trans_confirm: 'Espera confirmación',
      trans_always_auto: 'Siempre automático',
      trans_always_confirm: 'Siempre confirmar',
      tt_move_up: 'Subir',
      tt_move_down: 'Bajar',
      tt_edit: 'Editar',
      tt_delete: 'Eliminar',
      msg_palette: (name) => `Paleta aplicada: ${name}`,
      msg_pin_on: 'Modo Siempre Visible activado',
      msg_pin_off: 'Modo Siempre Visible desactivado',
      msg_seq_loaded: (name) => `Secuencia cargada: ${name}`,
      msg_trans_auto: 'Transición automática al terminar cada bloque',
      msg_trans_manual: 'Confirmación manual al terminar cada bloque',
      msg_block_reset: 'Tiempo actual reiniciado',
      msg_seq_reset: 'Secuencia reiniciada al inicio',
      msg_seq_done: '¡Secuencia completada!',
      msg_simple_done: '¡Temporizador terminado!',
      msg_min_1_block: 'La secuencia debe tener al menos 1 bloque',
      msg_block_deleted: 'Bloque eliminado',
      msg_added_10m: 'Añadido bloque de 10 minutos',
      msg_added_1m: 'Añadido descanso de 1 minuto',
      msg_block_updated: 'Bloque actualizado',
      msg_block_created: 'Nuevo bloque añadido',
      msg_seq_created: 'Nueva secuencia creada',
      msg_seq_renamed: 'Nombre de secuencia actualizado',
      msg_seq_deleted: 'Secuencia eliminada',
      msg_settings_saved: 'Ajustes guardados',
      msg_lang_changed: 'Idioma cambiado a Español',
      default_block_name: 'Bloque',
      default_rest_name: 'Descanso / Pausa',
      simple_default_title: 'Temporizador Simple'
    },
    en: {
      tab_sequences: 'Sequences',
      tab_simple: 'Simple Timer',
      tt_palette: 'Change color palette',
      tt_pin: 'Always on Top',
      tt_compact: 'Compact overlay mode (Alt+M)',
      tt_settings: 'Settings, language & sound',
      tt_minimize: 'Minimize',
      tt_close: 'Close',
      tt_expand: 'Expand window (Alt+M)',
      tt_play_pause: 'Start / Pause / Confirm (Alt+P)',
      tt_next_or_reset: 'Next block (Alt+N)',
      tt_new_sequence: 'Create new sequence',
      tt_edit_sequence: 'Rename or delete sequence',
      tt_reset_block: 'Reset current timer (Alt+R)',
      tt_next_block: 'Skip to next block (Alt+N)',
      compact_hk_hint: 'Alt+P Play · Alt+N Next',
      lbl_active_sequence: 'ACTIVE SEQUENCE / ROUTINE',
      lbl_when_block_ends: 'When block ends:',
      seg_auto: 'Auto',
      seg_confirm: 'Confirm',
      banner_block_done: 'Block completed!',
      btn_reset_all: 'Reset all',
      sec_blocks_title: 'Block Sequence',
      btn_add_block: 'Block',
      chip_simple_timer: 'SIMPLE TIMER',
      loop_on: 'Loop: On',
      loop_off: 'Loop: Off',
      ph_simple_label: 'Optional label...',
      lbl_configure_duration: 'TIMER DURATION',
      lbl_hours: 'Hours',
      lbl_minutes: 'Minutes',
      lbl_seconds: 'Seconds',
      lbl_quick_presets: 'Quick presets',
      hk_play_pause: 'Play/Pause',
      hk_next: 'Next',
      hk_reset: 'Reset',
      hk_mini: 'Mini',
      dlg_palette_title: 'Color Palette',
      dlg_palette_sub: 'Material UI Style',
      btn_done: 'Done',
      btn_cancel: 'Cancel',
      btn_save: 'Save',
      btn_save_block: 'Save block',
      btn_delete: 'Delete',
      dlg_edit_block: 'Edit Block',
      dlg_add_block: 'Add Block',
      lbl_block_name: 'Block name',
      ph_block_name: 'E.g. Study, Work, Set 1, Break...',
      lbl_block_category: 'Block type or category',
      opt_type_activity: 'Activity / Main Block',
      opt_type_focus: 'Focus / Study / Work',
      opt_type_exercise: 'Exercise / Workout',
      opt_type_rest: 'Break / Rest',
      opt_type_prep: 'Preparation / Transition',
      opt_type_custom: 'Custom (Write your own tag)',
      lbl_custom_tag: 'Custom tag',
      ph_custom_tag: 'E.g. Reading, Cooking, Meeting...',
      lbl_block_transition: 'When this block ends',
      opt_trans_inherit: 'Use general sequence setting',
      opt_trans_auto: 'Auto-advance to next block',
      opt_trans_manual: 'Pause and wait for confirmation (Alt+P)',
      dlg_new_seq: 'New Sequence',
      dlg_edit_seq: 'Edit Sequence',
      lbl_sequence_name: 'Sequence or routine name',
      ph_sequence_name: 'E.g. Study Pomodoro, Workout, Daily Routine...',
      dlg_settings_title: 'Settings, Language & Sound',
      lbl_language: 'App Language / Idioma',
      lbl_sound_profile: 'Completion alert tone',
      snd_material: 'Material Harmonic Bell (Recommended)',
      snd_pulse: 'High-Clarity Double Pulse',
      snd_crystal: 'Minimalist Crystal',
      snd_soft: 'Soft Chord',
      btn_test_sound: 'Test',
      lbl_volume: 'Alert volume',
      sw_countdown_title: 'Beeps in the last 3 seconds (3, 2, 1)',
      sw_countdown_desc: 'Alerts you right before the timer finishes',
      sw_reminder_title: 'Sound reminder while waiting confirmation',
      sw_reminder_desc: 'Plays a soft pulse every 8s while waiting for you',
      sw_hotkeys_title: 'Global keyboard shortcuts in Windows 11',
      sw_hotkeys_desc: 'Use Alt+P, Alt+N, Alt+R and Alt+M from any app',
      about_credit: 'Built for training, study and productivity',
      // Dynamic strings
      type_activity: 'Activity',
      type_focus: 'Focus',
      type_exercise: 'Exercise',
      type_rest: 'Break',
      type_prep: 'Prep',
      type_custom_default: 'Custom',
      step_of: (cur, tot) => `Block ${cur} of ${tot}`,
      rem_total: (m, s) => `Remaining: ${m}m ${String(s).padStart(2, '0')}s`,
      seq_summary: (count, m, s) => `${count} block${count === 1 ? '' : 's'} · ${m}m${s ? ` ${s}s` : ''} total`,
      next_label: (name, time) => `Next: ${name} (${time})`,
      last_block_label: 'Last block in sequence',
      simple_mode_sub: 'Single countdown timer',
      status_waiting_confirm: 'Waiting for confirmation',
      confirm_next_hint: (name, time) => `Next: ${name} (${time}) · Press Continue or Alt+P`,
      status_in_break: (tag) => `In ${tag.toLowerCase()}`,
      status_running: (tag) => `Running · ${tag}`,
      status_seq_done: 'Sequence completed!',
      status_simple_done: "Time's up!",
      status_paused: 'Paused',
      status_ready: 'Ready to start',
      btn_start: 'Start',
      btn_pause: 'Pause',
      btn_resume: 'Resume',
      btn_continue: 'Continue',
      btn_repeat: 'Repeat',
      trans_auto: 'Auto-advance',
      trans_confirm: 'Wait confirmation',
      trans_always_auto: 'Always auto',
      trans_always_confirm: 'Always confirm',
      tt_move_up: 'Move up',
      tt_move_down: 'Move down',
      tt_edit: 'Edit',
      tt_delete: 'Delete',
      msg_palette: (name) => `Palette applied: ${name}`,
      msg_pin_on: 'Always on Top enabled',
      msg_pin_off: 'Always on Top disabled',
      msg_seq_loaded: (name) => `Sequence loaded: ${name}`,
      msg_trans_auto: 'Auto-advance when each block ends',
      msg_trans_manual: 'Manual confirmation when each block ends',
      msg_block_reset: 'Current timer reset',
      msg_seq_reset: 'Sequence reset to start',
      msg_seq_done: 'Sequence completed!',
      msg_simple_done: 'Timer finished!',
      msg_min_1_block: 'Sequence must have at least 1 block',
      msg_block_deleted: 'Block deleted',
      msg_added_10m: 'Added 10-minute block',
      msg_added_1m: 'Added 1-minute break',
      msg_block_updated: 'Block updated',
      msg_block_created: 'New block added',
      msg_seq_created: 'New sequence created',
      msg_seq_renamed: 'Sequence name updated',
      msg_seq_deleted: 'Sequence deleted',
      msg_settings_saved: 'Settings saved',
      msg_lang_changed: 'Language switched to English',
      default_block_name: 'Block',
      default_rest_name: 'Break / Rest',
      simple_default_title: 'Simple Timer'
    }
  };

  // Material UI 3 Color Palettes (Bilingual)
  const PALETTES = [
    {
      id: 'mono-light',
      name: { es: 'Blanco Puro', en: 'Pure White' },
      subtitle: { es: 'Monocromo Claro', en: 'Monochrome Light' },
      bg: '#F6F7F9',
      surface: '#FFFFFF',
      accent: '#111111'
    },
    {
      id: 'mono-dark',
      name: { es: 'Negro Puro', en: 'Pure Black' },
      subtitle: { es: 'Monocromo Oscuro', en: 'Monochrome Dark' },
      bg: '#09090B',
      surface: '#18181C',
      accent: '#FFFFFF'
    },
    {
      id: 'graphite-dark',
      name: { es: 'Grafito', en: 'Graphite' },
      subtitle: { es: 'Material Oscuro', en: 'Material Dark' },
      bg: '#111316',
      surface: '#20242A',
      accent: '#E2E8F0'
    },
    {
      id: 'ocean-dark',
      name: { es: 'Azul Océano', en: 'Ocean Blue' },
      subtitle: { es: 'Oscuro', en: 'Dark' },
      bg: '#0C131B',
      surface: '#1A2633',
      accent: '#85D0FF'
    },
    {
      id: 'ocean-light',
      name: { es: 'Azul Cobalto', en: 'Cobalt Blue' },
      subtitle: { es: 'Claro', en: 'Light' },
      bg: '#F3F7FC',
      surface: '#FFFFFF',
      accent: '#0B57D0'
    },
    {
      id: 'emerald-dark',
      name: { es: 'Esmeralda', en: 'Emerald' },
      subtitle: { es: 'Oscuro', en: 'Dark' },
      bg: '#0B1410',
      surface: '#182922',
      accent: '#6DD58C'
    },
    {
      id: 'violet-dark',
      name: { es: 'Lavanda', en: 'Lavender' },
      subtitle: { es: 'Oscuro', en: 'Dark' },
      bg: '#12101A',
      surface: '#221E30',
      accent: '#D0BCFF'
    },
    {
      id: 'amber-dark',
      name: { es: 'Ámbar Dorado', en: 'Golden Amber' },
      subtitle: { es: 'Oscuro', en: 'Dark' },
      bg: '#15110C',
      surface: '#292118',
      accent: '#FFB951'
    },
    {
      id: 'crimson-light',
      name: { es: 'Rosa Carmesí', en: 'Crimson Rose' },
      subtitle: { es: 'Claro', en: 'Light' },
      bg: '#FCF4F5',
      surface: '#FFFFFF',
      accent: '#A81E2B'
    }
  ];

  // Default Universal State
  const DEFAULT_STATE = {
    activeMode: 'sequence', // 'sequence' | 'simple'
    activeRoutineId: 'seq-default-21',
    simpleTimer: {
      durationSec: 300, // 5 min default
      label: '',
      loop: false
    },
    settings: {
      language: 'es',
      theme: 'mono-light',
      soundProfile: 'material',
      volume: 85,
      countdownBeep: true,
      repeatConfirmAlert: true,
      globalHotkeys: true
    },
    routines: [
      {
        id: 'seq-default-21',
        name: 'Secuencia Principal (10m · 1m · 10m)',
        transitionMode: 'auto',
        blocks: [
          {
            id: 'blk-1',
            name: 'Bloque 1 — Actividad Principal',
            durationSec: 600,
            type: 'activity',
            customTag: '',
            transition: 'inherit'
          },
          {
            id: 'blk-2',
            name: 'Descanso / Pausa',
            durationSec: 60,
            type: 'rest',
            customTag: '',
            transition: 'inherit'
          },
          {
            id: 'blk-3',
            name: 'Bloque 2 — Actividad Principal',
            durationSec: 600,
            type: 'activity',
            customTag: '',
            transition: 'inherit'
          }
        ]
      },
      {
        id: 'pomodoro-study-55',
        name: 'Pomodoro Estudio / Trabajo (25m · 5m · 25m)',
        transitionMode: 'auto',
        blocks: [
          { id: 'p-1', name: 'Sesión de Enfoque 1', durationSec: 1500, type: 'focus', customTag: '', transition: 'inherit' },
          { id: 'p-2', name: 'Pausa Corta', durationSec: 300, type: 'rest', customTag: '', transition: 'inherit' },
          { id: 'p-3', name: 'Sesión de Enfoque 2', durationSec: 1500, type: 'focus', customTag: '', transition: 'inherit' }
        ]
      },
      {
        id: 'workout-3blocks',
        name: 'Rutina de 3 Bloques (3×10m)',
        transitionMode: 'auto',
        blocks: [
          { id: 'c-1', name: 'Bloque 1', durationSec: 600, type: 'exercise', customTag: '', transition: 'inherit' },
          { id: 'c-2', name: 'Descanso / Transición', durationSec: 60, type: 'rest', customTag: '', transition: 'inherit' },
          { id: 'c-3', name: 'Bloque 2', durationSec: 600, type: 'exercise', customTag: '', transition: 'inherit' },
          { id: 'c-4', name: 'Descanso / Transición', durationSec: 60, type: 'rest', customTag: '', transition: 'inherit' },
          { id: 'c-5', name: 'Bloque 3', durationSec: 600, type: 'exercise', customTag: '', transition: 'inherit' }
        ]
      },
      {
        id: 'quick-session-11',
        name: 'Sesión Rápida (5m · 1m · 5m)',
        transitionMode: 'auto',
        blocks: [
          { id: 'w-1', name: 'Bloque 1', durationSec: 300, type: 'activity', customTag: '', transition: 'inherit' },
          { id: 'w-2', name: 'Pausa breve', durationSec: 60, type: 'rest', customTag: '', transition: 'inherit' },
          { id: 'w-3', name: 'Bloque 2', durationSec: 300, type: 'activity', customTag: '', transition: 'inherit' }
        ]
      }
    ]
  };

  // State
  let appData = loadLocalData();

  // Sequence Timer Runtime State
  let timerState = {
    currentBlockIndex: 0,
    remainingMs: 600 * 1000,
    totalBlockMs: 600 * 1000,
    isRunning: false,
    waitingConfirmation: false,
    lastTickTime: 0,
    lastBeepSecond: null,
    confirmReminderTimer: null
  };

  // Simple Single Timer Runtime State
  let simpleState = {
    remainingMs: (appData.simpleTimer?.durationSec || 300) * 1000,
    totalMs: (appData.simpleTimer?.durationSec || 300) * 1000,
    isRunning: false,
    lastTickTime: 0,
    lastBeepSecond: null
  };

  let hostState = {
    isCompact: false,
    isAlwaysOnTop: false,
    pinnedAlwaysOnTop: false,
    hotkeysEnabled: true
  };

  let editingBlockId = null;
  let routineDialogMode = 'new';

  // i18n Helper
  function getLang() {
    return appData.settings?.language === 'en' ? 'en' : 'es';
  }

  function t(key) {
    const lang = getLang();
    return I18N[lang][key] ?? I18N.es[key] ?? key;
  }

  function getBlockLabel(block) {
    if (block.type === 'custom' && block.customTag && block.customTag.trim()) {
      return block.customTag.trim();
    }
    const map = {
      activity: t('type_activity'),
      focus: t('type_focus'),
      exercise: t('type_exercise'),
      rest: t('type_rest'),
      prep: t('type_prep'),
      custom: t('type_custom_default')
    };
    return map[block.type] || t('type_activity');
  }

  function isBreakOrPrep(block) {
    return block.type === 'rest' || block.type === 'prep';
  }

  // Web Audio Synthesizer
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, durationSec, startTimeOffset = 0, type = 'sine', gainScale = 1.0) {
    const vol = (appData.settings.volume ?? 85) / 100;
    if (vol <= 0.001) return;

    const ctx = getAudioContext();
    const now = ctx.currentTime + startTimeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    const peakGain = Math.min(1, vol * 0.45 * gainScale);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  function playCountdownPip(secondsLeft) {
    if (!appData.settings.countdownBeep) return;
    const freq = secondsLeft === 1 ? 880 : 660;
    playTone(freq, 0.08, 0, 'triangle', 0.55);
  }

  function playBlockCompleteSound(isRoutineFinished = false, nextIsBreak = false) {
    const profile = appData.settings.soundProfile || 'material';

    if (isRoutineFinished) {
      playTone(523.25, 0.22, 0.0, 'sine', 0.9);
      playTone(659.25, 0.22, 0.14, 'sine', 0.9);
      playTone(783.99, 0.24, 0.28, 'sine', 0.95);
      playTone(1046.5, 0.55, 0.42, 'triangle', 1.1);
      return;
    }

    if (profile === 'competitive') {
      const baseFreq = nextIsBreak ? 740 : 987.77;
      playTone(baseFreq, 0.14, 0.0, 'square', 0.65);
      playTone(baseFreq, 0.14, 0.18, 'square', 0.65);
      playTone(baseFreq * 1.25, 0.28, 0.36, 'triangle', 0.9);
    } else if (profile === 'digital') {
      playTone(1046.5, 0.16, 0.0, 'sine', 0.9);
      playTone(1318.5, 0.32, 0.15, 'sine', 1.0);
    } else if (profile === 'soft') {
      playTone(440, 0.35, 0.0, 'sine', 0.8);
      playTone(554.37, 0.45, 0.18, 'sine', 0.85);
    } else {
      if (nextIsBreak) {
        playTone(880.0, 0.22, 0.0, 'sine', 0.95);
        playTone(659.25, 0.25, 0.15, 'sine', 0.95);
        playTone(554.37, 0.45, 0.30, 'triangle', 1.0);
      } else {
        playTone(659.25, 0.20, 0.0, 'sine', 0.95);
        playTone(830.61, 0.22, 0.14, 'sine', 0.95);
        playTone(987.77, 0.45, 0.28, 'triangle', 1.05);
      }
    }
  }

  function playReminderPulse() {
    playTone(587.33, 0.14, 0, 'sine', 0.5);
    playTone(880.0, 0.20, 0.14, 'sine', 0.6);
  }

  // Persistence
  function normalizeSavedState(parsed) {
    if (!parsed || !Array.isArray(parsed.routines) || !parsed.routines.length) {
      return structuredClone(DEFAULT_STATE);
    }
    return {
      ...DEFAULT_STATE,
      ...parsed,
      simpleTimer: { ...DEFAULT_STATE.simpleTimer, ...(parsed.simpleTimer || {}) },
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) }
    };
  }

  function loadLocalData() {
    try {
      const raw = localStorage.getItem('monotimer_universal_data_v3') || localStorage.getItem('monotimer_universal_data_v2');
      if (raw) {
        return normalizeSavedState(JSON.parse(raw));
      }
    } catch (e) {
      console.warn('Error loading localStorage:', e);
    }
    return structuredClone(DEFAULT_STATE);
  }

  function saveAppData() {
    try {
      localStorage.setItem('monotimer_universal_data_v3', JSON.stringify(appData));
    } catch (e) {}
    postToHost({ action: 'save_data', data: appData });
  }

  function postToHost(payload) {
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.postMessage(payload);
    }
  }

  // Formatters
  function formatTime(totalSeconds) {
    const clamped = Math.max(0, Math.ceil(totalSeconds));
    const hrs = Math.floor(clamped / 3600);
    const mins = Math.floor((clamped % 3600) / 60);
    const secs = clamped % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function formatDurationBadge(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0 && secs > 0) return `${mins}m ${secs}s`;
    if (mins > 0) return `${mins} min`;
    return `${secs} s`;
  }

  function getActiveRoutine() {
    let routine = appData.routines.find(r => r.id === appData.activeRoutineId);
    if (!routine) {
      routine = appData.routines[0];
      appData.activeRoutineId = routine.id;
    }
    return routine;
  }

  // DOM Elements
  const els = {
    titlebarDrag: document.getElementById('titlebarDrag'),
    headerRoutineBadge: document.getElementById('headerRoutineBadge'),
    btnLangToggle: document.getElementById('btnLangToggle'),
    langCodeBadge: document.getElementById('langCodeBadge'),
    btnPalette: document.getElementById('btnPalette'),
    btnPinTop: document.getElementById('btnPinTop'),
    btnCompactMode: document.getElementById('btnCompactMode'),
    btnExitCompact: document.getElementById('btnExitCompact'),
    btnSettings: document.getElementById('btnSettings'),
    btnMinimize: document.getElementById('btnMinimize'),
    btnClose: document.getElementById('btnClose'),

    // Mode Tabs & Panels
    tabSequenceMode: document.getElementById('tabSequenceMode'),
    tabSimpleMode: document.getElementById('tabSimpleMode'),
    sequenceModePanel: document.getElementById('sequenceModePanel'),
    simpleModePanel: document.getElementById('simpleModePanel'),

    // Sequence View
    routineSelect: document.getElementById('routineSelect'),
    btnNewRoutine: document.getElementById('btnNewRoutine'),
    btnEditRoutineMeta: document.getElementById('btnEditRoutineMeta'),
    segAuto: document.getElementById('segAuto'),
    segManual: document.getElementById('segManual'),

    stepCounterPill: document.getElementById('stepCounterPill'),
    blockTypePill: document.getElementById('blockTypePill'),
    totalRemainingPill: document.getElementById('totalRemainingPill'),
    ringProgress: document.getElementById('ringProgress'),
    currentBlockName: document.getElementById('currentBlockName'),
    timeReadout: document.getElementById('timeReadout'),
    timerStatusCaption: document.getElementById('timerStatusCaption'),
    confirmBanner: document.getElementById('confirmBanner'),
    confirmNextText: document.getElementById('confirmNextText'),

    btnResetBlock: document.getElementById('btnResetBlock'),
    btnPlayPause: document.getElementById('btnPlayPause'),
    playPauseIcon: document.getElementById('playPauseIcon'),
    playPauseLabel: document.getElementById('playPauseLabel'),
    btnNextBlock: document.getElementById('btnNextBlock'),

    btnMinus15s: document.getElementById('btnMinus15s'),
    btnPlus30s: document.getElementById('btnPlus30s'),
    btnPlus1m: document.getElementById('btnPlus1m'),
    btnResetRoutine: document.getElementById('btnResetRoutine'),

    sequenceSummaryText: document.getElementById('sequenceSummaryText'),
    btnQuickAdd10m: document.getElementById('btnQuickAdd10m'),
    btnQuickAdd1m: document.getElementById('btnQuickAdd1m'),
    btnAddCustomBlock: document.getElementById('btnAddCustomBlock'),
    blocksList: document.getElementById('blocksList'),

    // Simple Timer View
    btnSimpleLoopToggle: document.getElementById('btnSimpleLoopToggle'),
    simpleLoopText: document.getElementById('simpleLoopText'),
    simpleRingProgress: document.getElementById('simpleRingProgress'),
    simpleLabelInput: document.getElementById('simpleLabelInput'),
    simpleTimeReadout: document.getElementById('simpleTimeReadout'),
    simpleStatusCaption: document.getElementById('simpleStatusCaption'),
    btnSimpleReset: document.getElementById('btnSimpleReset'),
    btnSimplePlayPause: document.getElementById('btnSimplePlayPause'),
    simplePlayPauseIcon: document.getElementById('simplePlayPauseIcon'),
    simplePlayPauseLabel: document.getElementById('simplePlayPauseLabel'),
    btnSimplePlus1mCircle: document.getElementById('btnSimplePlus1mCircle'),
    btnSimpleMinus15s: document.getElementById('btnSimpleMinus15s'),
    btnSimplePlus30s: document.getElementById('btnSimplePlus30s'),
    btnSimplePlus1m: document.getElementById('btnSimplePlus1m'),
    btnSimplePlus5m: document.getElementById('btnSimplePlus5m'),
    simpleInputHours: document.getElementById('simpleInputHours'),
    simpleInputMinutes: document.getElementById('simpleInputMinutes'),
    simpleInputSeconds: document.getElementById('simpleInputSeconds'),

    // Compact View
    compactStepPill: document.getElementById('compactStepPill'),
    compactBlockName: document.getElementById('compactBlockName'),
    compactTimeDisplay: document.getElementById('compactTimeDisplay'),
    btnCompactPlayPause: document.getElementById('btnCompactPlayPause'),
    compactPlayIcon: document.getElementById('compactPlayIcon'),
    btnCompactNext: document.getElementById('btnCompactNext'),
    compactProgressFill: document.getElementById('compactProgressFill'),
    compactNextLabel: document.getElementById('compactNextLabel'),

    // Dialogs
    paletteDialog: document.getElementById('paletteDialog'),
    paletteGrid: document.getElementById('paletteGrid'),
    btnClosePaletteDialog: document.getElementById('btnClosePaletteDialog'),

    blockDialog: document.getElementById('blockDialog'),
    blockForm: document.getElementById('blockForm'),
    blockDialogTitle: document.getElementById('blockDialogTitle'),
    inputBlockName: document.getElementById('inputBlockName'),
    inputBlockMinutes: document.getElementById('inputBlockMinutes'),
    inputBlockSeconds: document.getElementById('inputBlockSeconds'),
    inputBlockType: document.getElementById('inputBlockType'),
    customTagField: document.getElementById('customTagField'),
    inputCustomTag: document.getElementById('inputCustomTag'),
    inputBlockTransition: document.getElementById('inputBlockTransition'),
    btnCancelBlockDialog: document.getElementById('btnCancelBlockDialog'),

    routineDialog: document.getElementById('routineDialog'),
    routineForm: document.getElementById('routineForm'),
    routineDialogTitle: document.getElementById('routineDialogTitle'),
    inputRoutineName: document.getElementById('inputRoutineName'),
    btnDeleteRoutine: document.getElementById('btnDeleteRoutine'),
    btnCancelRoutineDialog: document.getElementById('btnCancelRoutineDialog'),

    settingsDialog: document.getElementById('settingsDialog'),
    settingsForm: document.getElementById('settingsForm'),
    selectLanguage: document.getElementById('selectLanguage'),
    selectSoundProfile: document.getElementById('selectSoundProfile'),
    btnTestSound: document.getElementById('btnTestSound'),
    inputVolume: document.getElementById('inputVolume'),
    volumeValueLabel: document.getElementById('volumeValueLabel'),
    chkCountdownBeep: document.getElementById('chkCountdownBeep'),
    chkRepeatConfirmAlert: document.getElementById('chkRepeatConfirmAlert'),
    chkGlobalHotkeys: document.getElementById('chkGlobalHotkeys'),

    snackbar: document.getElementById('snackbar')
  };

  let snackbarTimeout = null;
  function showSnackbar(message) {
    els.snackbar.textContent = message;
    els.snackbar.classList.add('show');
    clearTimeout(snackbarTimeout);
    snackbarTimeout = setTimeout(() => {
      els.snackbar.classList.remove('show');
    }, 2400);
  }

  // Apply Static Translations across DOM
  function applyTranslations() {
    const lang = getLang();
    document.documentElement.lang = lang;
    els.langCodeBadge.textContent = lang.toUpperCase();
    if (els.selectLanguage) {
      els.selectLanguage.value = lang;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (typeof val === 'string') {
        el.setAttribute('title', val);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (typeof val === 'string') {
        el.setAttribute('placeholder', val);
      }
    });

    renderPaletteGrid();
    renderAll();
  }

  function setLanguage(langCode, notify = true) {
    appData.settings.language = langCode === 'en' ? 'en' : 'es';
    applyTranslations();
    saveAppData();
    if (notify) {
      showSnackbar(t('msg_lang_changed'));
    }
  }

  // Theme Management
  function applyTheme(themeId, notifySnackbar = false) {
    const palette = PALETTES.find(p => p.id === themeId) || PALETTES[0];
    appData.settings.theme = palette.id;
    document.body.setAttribute('data-theme', palette.id);
    postToHost({ action: 'set_theme_bg', color: palette.bg });
    renderPaletteGrid();
    if (notifySnackbar) {
      saveAppData();
      const lang = getLang();
      showSnackbar(t('msg_palette')(palette.name[lang] || palette.name.es));
    }
  }

  function renderPaletteGrid() {
    if (!els.paletteGrid) return;
    const currentTheme = appData.settings.theme || 'mono-light';
    const lang = getLang();
    els.paletteGrid.innerHTML = '';

    PALETTES.forEach(p => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `palette-card${p.id === currentTheme ? ' active' : ''}`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', p.id === currentTheme ? 'true' : 'false');

      card.innerHTML = `
        <div class="palette-swatch-preview" style="background: linear-gradient(135deg, ${p.bg} 50%, ${p.surface} 50%);">
          <span class="swatch-accent-dot" style="background: ${p.accent};"></span>
        </div>
        <span class="palette-name">${p.name[lang] || p.name.es}</span>
        <span class="palette-mode-tag">${p.subtitle[lang] || p.subtitle.es}</span>
      `;

      card.addEventListener('click', () => {
        applyTheme(p.id, true);
      });

      els.paletteGrid.appendChild(card);
    });
  }

  // Mode Switching (Sequences vs Simple Timer)
  function setAppMode(mode) {
    appData.activeMode = mode === 'simple' ? 'simple' : 'sequence';
    saveAppData();
    renderAll();
  }

  // ========================================================
  // SEQUENCE TIMER LOGIC
  // ========================================================
  function loadBlock(index, autoStart = false, waitingConfirm = false) {
    const routine = getActiveRoutine();
    if (!routine.blocks.length) {
      timerState.currentBlockIndex = 0;
      timerState.remainingMs = 0;
      timerState.totalBlockMs = 0;
      timerState.isRunning = false;
      timerState.waitingConfirmation = false;
      clearConfirmReminder();
      renderAll();
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, routine.blocks.length - 1));
    const block = routine.blocks[safeIndex];

    timerState.currentBlockIndex = safeIndex;
    timerState.totalBlockMs = block.durationSec * 1000;
    timerState.remainingMs = block.durationSec * 1000;
    timerState.lastBeepSecond = null;
    timerState.waitingConfirmation = waitingConfirm;
    timerState.isRunning = autoStart && !waitingConfirm;
    timerState.lastTickTime = performance.now();

    if (waitingConfirm) {
      startConfirmReminder();
    } else {
      clearConfirmReminder();
    }

    renderAll();
  }

  function startConfirmReminder() {
    clearConfirmReminder();
    if (!appData.settings.repeatConfirmAlert) return;
    timerState.confirmReminderTimer = setInterval(() => {
      if (timerState.waitingConfirmation) {
        playReminderPulse();
      } else {
        clearConfirmReminder();
      }
    }, 8000);
  }

  function clearConfirmReminder() {
    if (timerState.confirmReminderTimer) {
      clearInterval(timerState.confirmReminderTimer);
      timerState.confirmReminderTimer = null;
    }
  }

  function toggleSequencePlayPause() {
    const routine = getActiveRoutine();
    if (!routine.blocks.length) return;

    getAudioContext();

    // Pause simple timer if running
    if (simpleState.isRunning) {
      simpleState.isRunning = false;
    }

    if (timerState.waitingConfirmation) {
      timerState.waitingConfirmation = false;
      clearConfirmReminder();
      timerState.isRunning = true;
      timerState.lastTickTime = performance.now();
      playTone(783.99, 0.12, 0, 'sine', 0.6);
      renderAll();
      return;
    }

    if (timerState.remainingMs <= 0) {
      loadBlock(0, true, false);
      return;
    }

    timerState.isRunning = !timerState.isRunning;
    if (timerState.isRunning) {
      timerState.lastTickTime = performance.now();
    }
    renderAll();
  }

  function skipToNextBlock() {
    const routine = getActiveRoutine();
    if (!routine.blocks.length) return;

    const wasRunning = timerState.isRunning;
    if (timerState.currentBlockIndex < routine.blocks.length - 1) {
      loadBlock(timerState.currentBlockIndex + 1, wasRunning, false);
      showSnackbar(`${t('default_block_name')} ${timerState.currentBlockIndex + 1}: ${routine.blocks[timerState.currentBlockIndex].name}`);
    } else {
      loadBlock(0, false, false);
      showSnackbar(t('msg_seq_reset'));
    }
  }

  function resetCurrentBlock() {
    loadBlock(timerState.currentBlockIndex, false, false);
    showSnackbar(t('msg_block_reset'));
  }

  function resetEntireRoutine() {
    loadBlock(0, false, false);
    showSnackbar(t('msg_seq_reset'));
  }

  function adjustSequenceRemainingTime(deltaSeconds) {
    const routine = getActiveRoutine();
    if (!routine.blocks.length) return;

    const deltaMs = deltaSeconds * 1000;
    timerState.remainingMs = Math.max(1000, timerState.remainingMs + deltaMs);
    if (timerState.remainingMs > timerState.totalBlockMs) {
      timerState.totalBlockMs = timerState.remainingMs;
    }
    timerState.lastBeepSecond = null;
    renderTimerReadouts();
  }

  function getEffectiveTransitionMode(block, routine) {
    if (block.transition && block.transition !== 'inherit') {
      return block.transition;
    }
    return routine.transitionMode || 'auto';
  }

  function handleBlockFinished() {
    const routine = getActiveRoutine();
    const currentBlock = routine.blocks[timerState.currentBlockIndex];
    const hasNext = timerState.currentBlockIndex < routine.blocks.length - 1;

    if (!hasNext) {
      timerState.isRunning = false;
      timerState.remainingMs = 0;
      timerState.waitingConfirmation = false;
      clearConfirmReminder();
      playBlockCompleteSound(true, false);
      showSnackbar(t('msg_seq_done'));
      renderAll();
      return;
    }

    const nextBlock = routine.blocks[timerState.currentBlockIndex + 1];
    playBlockCompleteSound(false, isBreakOrPrep(nextBlock));

    const transitionMode = getEffectiveTransitionMode(currentBlock, routine);
    if (transitionMode === 'auto') {
      loadBlock(timerState.currentBlockIndex + 1, true, false);
    } else {
      loadBlock(timerState.currentBlockIndex + 1, false, true);
    }
  }

  // ========================================================
  // SIMPLE SINGLE TIMER LOGIC
  // ========================================================
  function syncSimpleInputsFromDuration(totalSec) {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    els.simpleInputHours.value = hrs;
    els.simpleInputMinutes.value = mins;
    els.simpleInputSeconds.value = secs;
  }

  function setSimpleDuration(totalSec, resetCurrent = true) {
    const clampedSec = Math.max(5, Math.min(86399, totalSec));
    appData.simpleTimer.durationSec = clampedSec;
    syncSimpleInputsFromDuration(clampedSec);
    if (resetCurrent) {
      simpleState.isRunning = false;
      simpleState.totalMs = clampedSec * 1000;
      simpleState.remainingMs = clampedSec * 1000;
      simpleState.lastBeepSecond = null;
    }
    saveAppData();
    renderAll();
  }

  function toggleSimplePlayPause() {
    getAudioContext();

    // Pause sequence timer if running
    if (timerState.isRunning) {
      timerState.isRunning = false;
    }

    if (simpleState.remainingMs <= 0) {
      const targetMs = (appData.simpleTimer.durationSec || 300) * 1000;
      simpleState.totalMs = targetMs;
      simpleState.remainingMs = targetMs;
      simpleState.lastBeepSecond = null;
      simpleState.isRunning = true;
      simpleState.lastTickTime = performance.now();
      renderAll();
      return;
    }

    simpleState.isRunning = !simpleState.isRunning;
    if (simpleState.isRunning) {
      simpleState.lastTickTime = performance.now();
    }
    renderAll();
  }

  function resetSimpleTimer() {
    simpleState.isRunning = false;
    const targetMs = (appData.simpleTimer.durationSec || 300) * 1000;
    simpleState.totalMs = targetMs;
    simpleState.remainingMs = targetMs;
    simpleState.lastBeepSecond = null;
    renderAll();
    showSnackbar(t('msg_block_reset'));
  }

  function adjustSimpleRemainingTime(deltaSeconds) {
    const deltaMs = deltaSeconds * 1000;
    simpleState.remainingMs = Math.max(1000, simpleState.remainingMs + deltaMs);
    if (simpleState.remainingMs > simpleState.totalMs) {
      simpleState.totalMs = simpleState.remainingMs;
    }
    simpleState.lastBeepSecond = null;
    renderTimerReadouts();
  }

  function handleSimpleTimerFinished() {
    if (appData.simpleTimer.loop) {
      playBlockCompleteSound(false, false);
      const targetMs = (appData.simpleTimer.durationSec || 300) * 1000;
      simpleState.totalMs = targetMs;
      simpleState.remainingMs = targetMs;
      simpleState.lastBeepSecond = null;
      simpleState.lastTickTime = performance.now();
      simpleState.isRunning = true;
      renderAll();
    } else {
      simpleState.isRunning = false;
      simpleState.remainingMs = 0;
      playBlockCompleteSound(true, false);
      showSnackbar(t('msg_simple_done'));
      renderAll();
    }
  }

  // Active Mode Dispatcher for Compact View & Global Hotkeys
  function handleActivePlayPause() {
    if (appData.activeMode === 'simple') {
      toggleSimplePlayPause();
    } else {
      toggleSequencePlayPause();
    }
  }

  function handleActiveNext() {
    if (appData.activeMode === 'simple') {
      adjustSimpleRemainingTime(60);
    } else {
      skipToNextBlock();
    }
  }

  function handleActiveReset() {
    if (appData.activeMode === 'simple') {
      resetSimpleTimer();
    } else {
      resetCurrentBlock();
    }
  }

  // ========================================================
  // HIGH-PRECISION TICK ENGINE
  // ========================================================
  function updateActiveTimers() {
    const now = performance.now();

    if (timerState.isRunning) {
      const elapsed = now - timerState.lastTickTime;
      timerState.lastTickTime = now;
      timerState.remainingMs = Math.max(0, timerState.remainingMs - elapsed);

      const secondsLeft = Math.ceil(timerState.remainingMs / 1000);
      if (secondsLeft >= 1 && secondsLeft <= 3 && timerState.lastBeepSecond !== secondsLeft) {
        timerState.lastBeepSecond = secondsLeft;
        playCountdownPip(secondsLeft);
      }

      if (timerState.remainingMs <= 0) {
        handleBlockFinished();
      } else {
        renderTimerReadouts();
      }
    }

    if (simpleState.isRunning) {
      const elapsed = now - simpleState.lastTickTime;
      simpleState.lastTickTime = now;
      simpleState.remainingMs = Math.max(0, simpleState.remainingMs - elapsed);

      const secondsLeft = Math.ceil(simpleState.remainingMs / 1000);
      if (secondsLeft >= 1 && secondsLeft <= 3 && simpleState.lastBeepSecond !== secondsLeft) {
        simpleState.lastBeepSecond = secondsLeft;
        playCountdownPip(secondsLeft);
      }

      if (simpleState.remainingMs <= 0) {
        handleSimpleTimerFinished();
      } else {
        renderTimerReadouts();
      }
    }
  }

  function tick() {
    updateActiveTimers();
    requestAnimationFrame(tick);
  }

  setInterval(() => {
    if (timerState.isRunning || simpleState.isRunning) {
      updateActiveTimers();
    }
  }, 200);

  // ========================================================
  // RENDERING
  // ========================================================
  function renderTimerReadouts() {
    const isSimple = appData.activeMode === 'simple';

    // 1. Sequence Readout
    const routine = getActiveRoutine();
    const blocks = routine.blocks;
    const currentBlock = blocks[timerState.currentBlockIndex];

    if (currentBlock) {
      const seqSec = timerState.remainingMs / 1000;
      const seqFormatted = formatTime(seqSec);
      els.timeReadout.textContent = seqFormatted;
      els.timeReadout.classList.toggle('has-hours', seqSec >= 3600);

      const seqRatio = timerState.totalBlockMs > 0
        ? Math.max(0, Math.min(1, timerState.remainingMs / timerState.totalBlockMs))
        : 0;
      els.ringProgress.style.strokeDashoffset = (RING_CIRCUMFERENCE * (1 - seqRatio)).toFixed(2);

      let futureBlocksSec = 0;
      for (let i = timerState.currentBlockIndex + 1; i < blocks.length; i++) {
        futureBlocksSec += blocks[i].durationSec;
      }
      const totalRemSec = Math.ceil(seqSec) + futureBlocksSec;
      const totalMins = Math.floor(totalRemSec / 60);
      const totalSecs = totalRemSec % 60;
      els.totalRemainingPill.textContent = t('rem_total')(totalMins, totalSecs);

      if (!isSimple) {
        els.compactTimeDisplay.textContent = seqFormatted;
        els.compactProgressFill.style.width = `${(seqRatio * 100).toFixed(1)}%`;
      }
    }

    // 2. Simple Timer Readout
    const simpSec = simpleState.remainingMs / 1000;
    const simpFormatted = formatTime(simpSec);
    els.simpleTimeReadout.textContent = simpFormatted;
    els.simpleTimeReadout.classList.toggle('has-hours', simpSec >= 3600);

    const simpRatio = simpleState.totalMs > 0
      ? Math.max(0, Math.min(1, simpleState.remainingMs / simpleState.totalMs))
      : 0;
    els.simpleRingProgress.style.strokeDashoffset = (RING_CIRCUMFERENCE * (1 - simpRatio)).toFixed(2);

    if (isSimple) {
      els.compactTimeDisplay.textContent = simpFormatted;
      els.compactProgressFill.style.width = `${(simpRatio * 100).toFixed(1)}%`;
    }
  }

  function renderAll() {
    const isSimple = appData.activeMode === 'simple';
    const routine = getActiveRoutine();
    const blocks = routine.blocks;
    const currentBlock = blocks[timerState.currentBlockIndex] || null;
    const anyRunning = isSimple ? simpleState.isRunning : timerState.isRunning;

    document.body.classList.toggle('timer-running', anyRunning);
    document.body.classList.toggle('waiting-confirmation', !isSimple && timerState.waitingConfirmation);
    document.body.classList.toggle('compact-mode', hostState.isCompact);

    // Mode Tabs
    els.tabSequenceMode.classList.toggle('active', !isSimple);
    els.tabSequenceMode.setAttribute('aria-selected', !isSimple ? 'true' : 'false');
    els.tabSimpleMode.classList.toggle('active', isSimple);
    els.tabSimpleMode.setAttribute('aria-selected', isSimple ? 'true' : 'false');

    els.sequenceModePanel.classList.toggle('hidden', isSimple);
    els.simpleModePanel.classList.toggle('hidden', !isSimple);

    // Header Subtitle
    els.headerRoutineBadge.textContent = isSimple
      ? (appData.simpleTimer.label?.trim() || t('tab_simple'))
      : routine.name;

    els.btnPinTop.classList.toggle('active', hostState.isAlwaysOnTop);
    els.btnCompactMode.classList.toggle('active', hostState.isCompact);

    // Sequence Dropdown
    els.routineSelect.innerHTML = '';
    appData.routines.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      const totalMin = Math.round(r.blocks.reduce((acc, b) => acc + b.durationSec, 0) / 60);
      opt.textContent = `${r.name} (${totalMin}m)`;
      opt.selected = r.id === routine.id;
      els.routineSelect.appendChild(opt);
    });

    els.segAuto.classList.toggle('active', routine.transitionMode === 'auto');
    els.segManual.classList.toggle('active', routine.transitionMode === 'manual');

    // Sequence Hero Info
    if (currentBlock) {
      const stepNum = timerState.currentBlockIndex + 1;
      const tagLabel = getBlockLabel(currentBlock);
      els.stepCounterPill.textContent = t('step_of')(stepNum, blocks.length);
      els.blockTypePill.textContent = tagLabel.toUpperCase();
      els.currentBlockName.textContent = currentBlock.name;

      if (timerState.waitingConfirmation) {
        els.timerStatusCaption.textContent = t('status_waiting_confirm');
        els.confirmBanner.classList.remove('hidden');
        els.confirmNextText.textContent = t('confirm_next_hint')(currentBlock.name, formatTime(currentBlock.durationSec));
        els.playPauseIcon.innerHTML = ICONS.check;
        els.playPauseLabel.textContent = t('btn_continue');
      } else if (timerState.isRunning) {
        els.timerStatusCaption.textContent = isBreakOrPrep(currentBlock)
          ? t('status_in_break')(tagLabel)
          : t('status_running')(tagLabel);
        els.confirmBanner.classList.add('hidden');
        els.playPauseIcon.innerHTML = ICONS.pause;
        els.playPauseLabel.textContent = t('btn_pause');
      } else if (timerState.remainingMs <= 0) {
        els.timerStatusCaption.textContent = t('status_seq_done');
        els.confirmBanner.classList.add('hidden');
        els.playPauseIcon.innerHTML = ICONS.play;
        els.playPauseLabel.textContent = t('btn_repeat');
      } else {
        const isStarted = timerState.remainingMs < timerState.totalBlockMs;
        els.timerStatusCaption.textContent = isStarted ? t('status_paused') : t('status_ready');
        els.confirmBanner.classList.add('hidden');
        els.playPauseIcon.innerHTML = ICONS.play;
        els.playPauseLabel.textContent = isStarted ? t('btn_resume') : t('btn_start');
      }
    }

    // Simple Timer Hero Info
    els.btnSimpleLoopToggle.classList.toggle('active', !!appData.simpleTimer.loop);
    els.simpleLoopText.textContent = appData.simpleTimer.loop ? t('loop_on') : t('loop_off');
    if (document.activeElement !== els.simpleLabelInput) {
      els.simpleLabelInput.value = appData.simpleTimer.label || '';
    }

    if (simpleState.isRunning) {
      els.simpleStatusCaption.textContent = t('status_running')(appData.simpleTimer.label?.trim() || t('tab_simple'));
      els.simplePlayPauseIcon.innerHTML = ICONS.pause;
      els.simplePlayPauseLabel.textContent = t('btn_pause');
    } else if (simpleState.remainingMs <= 0) {
      els.simpleStatusCaption.textContent = t('status_simple_done');
      els.simplePlayPauseIcon.innerHTML = ICONS.play;
      els.simplePlayPauseLabel.textContent = t('btn_repeat');
    } else {
      const isSimpleStarted = simpleState.remainingMs < simpleState.totalMs;
      els.simpleStatusCaption.textContent = isSimpleStarted ? t('status_paused') : t('status_ready');
      els.simplePlayPauseIcon.innerHTML = ICONS.play;
      els.simplePlayPauseLabel.textContent = isSimpleStarted ? t('btn_resume') : t('btn_start');
    }

    // Compact View Info (Reflects active mode!)
    if (isSimple) {
      els.compactStepPill.textContent = '1 / 1';
      els.compactBlockName.textContent = appData.simpleTimer.label?.trim() || t('simple_default_title');
      els.compactNextLabel.textContent = t('simple_mode_sub');
      els.compactPlayIcon.innerHTML = simpleState.isRunning ? ICONS.pause : ICONS.play;
    } else if (currentBlock) {
      const stepNum = timerState.currentBlockIndex + 1;
      els.compactStepPill.textContent = `${stepNum} / ${blocks.length}`;
      els.compactBlockName.textContent = currentBlock.name;
      const nextBlock = blocks[timerState.currentBlockIndex + 1];
      els.compactNextLabel.textContent = nextBlock
        ? t('next_label')(nextBlock.name, formatTime(nextBlock.durationSec))
        : t('last_block_label');
      els.compactPlayIcon.innerHTML = timerState.waitingConfirmation
        ? ICONS.check
        : (timerState.isRunning ? ICONS.pause : ICONS.play);
    }

    renderTimerReadouts();
    renderBlocksList(routine);
  }

  function renderBlocksList(routine) {
    const blocks = routine.blocks;
    const totalSec = blocks.reduce((acc, b) => acc + b.durationSec, 0);
    const totalMin = Math.floor(totalSec / 60);
    const remSec = totalSec % 60;
    els.sequenceSummaryText.textContent = t('seq_summary')(blocks.length, totalMin, remSec);

    els.blocksList.innerHTML = '';

    blocks.forEach((blk, idx) => {
      const isActive = idx === timerState.currentBlockIndex;
      const isCompleted = idx < timerState.currentBlockIndex;

      const row = document.createElement('div');
      row.className = `block-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`;
      row.setAttribute('role', 'listitem');

      const effectiveTrans = getEffectiveTransitionMode(blk, routine);
      const transText = blk.transition === 'inherit'
        ? (effectiveTrans === 'auto' ? t('trans_auto') : t('trans_confirm'))
        : (blk.transition === 'auto' ? t('trans_always_auto') : t('trans_always_confirm'));

      const tagLabel = getBlockLabel(blk);

      row.innerHTML = `
        <div class="block-left" data-action="select-block" data-index="${idx}">
          <div class="block-index-badge">${idx + 1}</div>
          <div class="block-info">
            <div class="block-title-row">
              <span class="block-name">${escapeHtml(blk.name)}</span>
              <span class="block-tag">${escapeHtml(tagLabel)}</span>
            </div>
            <span class="block-meta">${transText}</span>
          </div>
        </div>
        <div class="block-right">
          <span class="block-duration-pill" data-action="select-block" data-index="${idx}">
            ${formatDurationBadge(blk.durationSec)}
          </span>
          <div class="block-actions">
            <button class="block-act-btn" data-action="move-up" data-index="${idx}" title="${t('tt_move_up')}" ${idx === 0 ? 'disabled style="opacity:0.25"' : ''}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
            <button class="block-act-btn" data-action="move-down" data-index="${idx}" title="${t('tt_move_down')}" ${idx === blocks.length - 1 ? 'disabled style="opacity:0.25"' : ''}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button class="block-act-btn" data-action="edit" data-index="${idx}" title="${t('tt_edit')}">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button class="block-act-btn" data-action="delete" data-index="${idx}" title="${t('tt_delete')}">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
            </button>
          </div>
        </div>
      `;

      els.blocksList.appendChild(row);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Material Ripple Effect
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const style = window.getComputedStyle(btn);
    if (style.position === 'static') {
      btn.style.position = 'relative';
    }
    btn.style.overflow = 'hidden';

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = 'm3-ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Event Listeners: Window Header & Language
  els.titlebarDrag.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      postToHost({ action: 'drag_window' });
    }
  });

  els.btnMinimize.addEventListener('click', () => postToHost({ action: 'minimize' }));
  els.btnClose.addEventListener('click', () => postToHost({ action: 'close' }));

  els.btnLangToggle.addEventListener('click', () => {
    const nextLang = getLang() === 'es' ? 'en' : 'es';
    setLanguage(nextLang, true);
  });

  els.btnPalette.addEventListener('click', () => {
    renderPaletteGrid();
    els.paletteDialog.showModal();
  });

  els.btnClosePaletteDialog.addEventListener('click', () => {
    els.paletteDialog.close();
  });

  els.btnPinTop.addEventListener('click', () => {
    hostState.isAlwaysOnTop = !hostState.isAlwaysOnTop;
    postToHost({ action: 'toggle_always_on_top' });
    renderAll();
    showSnackbar(hostState.isAlwaysOnTop ? t('msg_pin_on') : t('msg_pin_off'));
  });

  function toggleCompactView() {
    hostState.isCompact = !hostState.isCompact;
    if (hostState.isCompact) {
      hostState.isAlwaysOnTop = true;
    }
    postToHost({ action: 'toggle_compact' });
    renderAll();
  }

  els.btnCompactMode.addEventListener('click', toggleCompactView);
  els.btnExitCompact.addEventListener('click', toggleCompactView);

  // Mode Tabs Listeners
  els.tabSequenceMode.addEventListener('click', () => setAppMode('sequence'));
  els.tabSimpleMode.addEventListener('click', () => setAppMode('simple'));

  // Sequence Mode Listeners
  els.routineSelect.addEventListener('change', (e) => {
    appData.activeRoutineId = e.target.value;
    saveAppData();
    loadBlock(0, false, false);
    showSnackbar(t('msg_seq_loaded')(getActiveRoutine().name));
  });

  function setRoutineTransitionMode(mode) {
    const routine = getActiveRoutine();
    routine.transitionMode = mode;
    saveAppData();
    renderAll();
    showSnackbar(mode === 'auto' ? t('msg_trans_auto') : t('msg_trans_manual'));
  }

  els.segAuto.addEventListener('click', () => setRoutineTransitionMode('auto'));
  els.segManual.addEventListener('click', () => setRoutineTransitionMode('manual'));

  els.btnPlayPause.addEventListener('click', toggleSequencePlayPause);
  els.btnNextBlock.addEventListener('click', skipToNextBlock);
  els.btnResetBlock.addEventListener('click', resetCurrentBlock);

  els.btnMinus15s.addEventListener('click', () => adjustSequenceRemainingTime(-15));
  els.btnPlus30s.addEventListener('click', () => adjustSequenceRemainingTime(30));
  els.btnPlus1m.addEventListener('click', () => adjustSequenceRemainingTime(60));
  els.btnResetRoutine.addEventListener('click', resetEntireRoutine);

  // Compact View Listeners
  els.btnCompactPlayPause.addEventListener('click', handleActivePlayPause);
  els.btnCompactNext.addEventListener('click', handleActiveNext);

  // Simple Timer Listeners
  els.btnSimplePlayPause.addEventListener('click', toggleSimplePlayPause);
  els.btnSimpleReset.addEventListener('click', resetSimpleTimer);
  els.btnSimplePlus1mCircle.addEventListener('click', () => adjustSimpleRemainingTime(60));
  els.btnSimpleMinus15s.addEventListener('click', () => adjustSimpleRemainingTime(-15));
  els.btnSimplePlus30s.addEventListener('click', () => adjustSimpleRemainingTime(30));
  els.btnSimplePlus1m.addEventListener('click', () => adjustSimpleRemainingTime(60));
  els.btnSimplePlus5m.addEventListener('click', () => adjustSimpleRemainingTime(300));

  els.btnSimpleLoopToggle.addEventListener('click', () => {
    appData.simpleTimer.loop = !appData.simpleTimer.loop;
    saveAppData();
    renderAll();
  });

  els.simpleLabelInput.addEventListener('input', () => {
    appData.simpleTimer.label = els.simpleLabelInput.value;
    saveAppData();
    if (appData.activeMode === 'simple') {
      els.headerRoutineBadge.textContent = appData.simpleTimer.label.trim() || t('tab_simple');
    }
  });

  function onSimpleDurationInputChange() {
    const hrs = Math.max(0, Math.min(23, parseInt(els.simpleInputHours.value || '0', 10)));
    const mins = Math.max(0, Math.min(59, parseInt(els.simpleInputMinutes.value || '0', 10)));
    const secs = Math.max(0, Math.min(59, parseInt(els.simpleInputSeconds.value || '0', 10)));
    const total = Math.max(5, hrs * 3600 + mins * 60 + secs);
    setSimpleDuration(total, !simpleState.isRunning);
  }

  [els.simpleInputHours, els.simpleInputMinutes, els.simpleInputSeconds].forEach(inp => {
    inp.addEventListener('change', onSimpleDurationInputChange);
    inp.addEventListener('input', () => {
      if (!simpleState.isRunning) {
        const hrs = Math.max(0, Math.min(23, parseInt(els.simpleInputHours.value || '0', 10)));
        const mins = Math.max(0, Math.min(59, parseInt(els.simpleInputMinutes.value || '0', 10)));
        const secs = Math.max(0, Math.min(59, parseInt(els.simpleInputSeconds.value || '0', 10)));
        const total = Math.max(5, hrs * 3600 + mins * 60 + secs);
        appData.simpleTimer.durationSec = total;
        simpleState.totalMs = total * 1000;
        simpleState.remainingMs = total * 1000;
        renderTimerReadouts();
      }
    });
  });

  document.querySelectorAll('.simple-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = parseInt(btn.getAttribute('data-sec'), 10);
      setSimpleDuration(sec, true);
    });
  });

  // Sequence List Actions
  els.blocksList.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const idx = parseInt(target.dataset.index, 10);
    const routine = getActiveRoutine();

    if (action === 'select-block') {
      loadBlock(idx, false, false);
    } else if (action === 'move-up' && idx > 0) {
      const temp = routine.blocks[idx - 1];
      routine.blocks[idx - 1] = routine.blocks[idx];
      routine.blocks[idx] = temp;
      if (timerState.currentBlockIndex === idx) timerState.currentBlockIndex = idx - 1;
      else if (timerState.currentBlockIndex === idx - 1) timerState.currentBlockIndex = idx;
      saveAppData();
      renderAll();
    } else if (action === 'move-down' && idx < routine.blocks.length - 1) {
      const temp = routine.blocks[idx + 1];
      routine.blocks[idx + 1] = routine.blocks[idx];
      routine.blocks[idx] = temp;
      if (timerState.currentBlockIndex === idx) timerState.currentBlockIndex = idx + 1;
      else if (timerState.currentBlockIndex === idx + 1) timerState.currentBlockIndex = idx;
      saveAppData();
      renderAll();
    } else if (action === 'edit') {
      openBlockDialog(routine.blocks[idx]);
    } else if (action === 'delete') {
      if (routine.blocks.length <= 1) {
        showSnackbar(t('msg_min_1_block'));
        return;
      }
      routine.blocks.splice(idx, 1);
      saveAppData();
      const nextIdx = Math.min(timerState.currentBlockIndex, routine.blocks.length - 1);
      loadBlock(nextIdx, false, false);
      showSnackbar(t('msg_block_deleted'));
    }
  });

  // Quick Add & Block Dialog
  els.btnQuickAdd10m.addEventListener('click', () => {
    const routine = getActiveRoutine();
    const activeCount = routine.blocks.filter(b => !isBreakOrPrep(b)).length + 1;
    routine.blocks.push({
      id: 'blk-' + Date.now(),
      name: `${t('default_block_name')} ${activeCount}`,
      durationSec: 600,
      type: 'activity',
      customTag: '',
      transition: 'inherit'
    });
    saveAppData();
    renderAll();
    showSnackbar(t('msg_added_10m'));
  });

  els.btnQuickAdd1m.addEventListener('click', () => {
    const routine = getActiveRoutine();
    routine.blocks.push({
      id: 'blk-' + Date.now(),
      name: t('default_rest_name'),
      durationSec: 60,
      type: 'rest',
      customTag: '',
      transition: 'inherit'
    });
    saveAppData();
    renderAll();
    showSnackbar(t('msg_added_1m'));
  });

  els.btnAddCustomBlock.addEventListener('click', () => openBlockDialog(null));

  function updateCustomTagFieldVisibility() {
    const isCustom = els.inputBlockType.value === 'custom';
    els.customTagField.classList.toggle('hidden', !isCustom);
  }

  els.inputBlockType.addEventListener('change', updateCustomTagFieldVisibility);

  function openBlockDialog(block) {
    if (block) {
      editingBlockId = block.id;
      els.blockDialogTitle.textContent = t('dlg_edit_block');
      els.inputBlockName.value = block.name;
      els.inputBlockMinutes.value = Math.floor(block.durationSec / 60);
      els.inputBlockSeconds.value = block.durationSec % 60;
      els.inputBlockType.value = block.type || 'activity';
      els.inputCustomTag.value = block.customTag || '';
      els.inputBlockTransition.value = block.transition || 'inherit';
    } else {
      editingBlockId = null;
      els.blockDialogTitle.textContent = t('dlg_add_block');
      els.inputBlockName.value = '';
      els.inputBlockMinutes.value = 10;
      els.inputBlockSeconds.value = 0;
      els.inputBlockType.value = 'activity';
      els.inputCustomTag.value = '';
      els.inputBlockTransition.value = 'inherit';
    }
    updateCustomTagFieldVisibility();
    els.blockDialog.showModal();
    els.inputBlockName.focus();
  }

  document.querySelectorAll('.block-preset').forEach(pill => {
    pill.addEventListener('click', () => {
      const min = parseInt(pill.dataset.min, 10);
      const sec = parseInt(pill.dataset.sec, 10);
      els.inputBlockMinutes.value = min;
      els.inputBlockSeconds.value = sec;
      if (min === 1 && !els.inputBlockName.value.trim()) {
        els.inputBlockType.value = 'rest';
        els.inputBlockName.value = t('default_rest_name');
        updateCustomTagFieldVisibility();
      }
    });
  });

  els.btnCancelBlockDialog.addEventListener('click', () => els.blockDialog.close());

  els.blockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const routine = getActiveRoutine();
    const mins = Math.max(0, parseInt(els.inputBlockMinutes.value || '0', 10));
    const secs = Math.max(0, Math.min(59, parseInt(els.inputBlockSeconds.value || '0', 10)));
    const totalSec = Math.max(5, mins * 60 + secs);
    const blockType = els.inputBlockType.value;
    const customTag = blockType === 'custom' ? (els.inputCustomTag.value.trim() || t('type_custom_default')) : '';
    const defaultName = blockType === 'rest' ? t('default_rest_name') : t('default_block_name');
    const name = els.inputBlockName.value.trim() || defaultName;

    if (editingBlockId) {
      const idx = routine.blocks.findIndex(b => b.id === editingBlockId);
      if (idx !== -1) {
        routine.blocks[idx] = {
          ...routine.blocks[idx],
          name,
          durationSec: totalSec,
          type: blockType,
          customTag,
          transition: els.inputBlockTransition.value
        };
        if (idx === timerState.currentBlockIndex && !timerState.isRunning) {
          timerState.totalBlockMs = totalSec * 1000;
          timerState.remainingMs = totalSec * 1000;
        }
      }
      showSnackbar(t('msg_block_updated'));
    } else {
      routine.blocks.push({
        id: 'blk-' + Date.now(),
        name,
        durationSec: totalSec,
        type: blockType,
        customTag,
        transition: els.inputBlockTransition.value
      });
      showSnackbar(t('msg_block_created'));
    }

    saveAppData();
    els.blockDialog.close();
    renderAll();
  });

  // New / Edit Routine Dialog
  els.btnNewRoutine.addEventListener('click', () => {
    routineDialogMode = 'new';
    els.routineDialogTitle.textContent = t('dlg_new_seq');
    els.inputRoutineName.value = '';
    els.btnDeleteRoutine.classList.add('hidden');
    els.routineDialog.showModal();
    els.inputRoutineName.focus();
  });

  els.btnEditRoutineMeta.addEventListener('click', () => {
    const routine = getActiveRoutine();
    routineDialogMode = 'edit';
    els.routineDialogTitle.textContent = t('dlg_edit_seq');
    els.inputRoutineName.value = routine.name;
    els.btnDeleteRoutine.classList.toggle('hidden', appData.routines.length <= 1);
    els.routineDialog.showModal();
    els.inputRoutineName.focus();
  });

  els.btnCancelRoutineDialog.addEventListener('click', () => els.routineDialog.close());

  els.routineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = els.inputRoutineName.value.trim();
    if (!name) return;

    if (routineDialogMode === 'new') {
      const newRoutine = {
        id: 'routine-' + Date.now(),
        name,
        transitionMode: 'auto',
        blocks: [
          { id: 'b1-' + Date.now(), name: `${t('default_block_name')} 1`, durationSec: 600, type: 'activity', customTag: '', transition: 'inherit' },
          { id: 'b2-' + Date.now(), name: t('default_rest_name'), durationSec: 60, type: 'rest', customTag: '', transition: 'inherit' },
          { id: 'b3-' + Date.now(), name: `${t('default_block_name')} 2`, durationSec: 600, type: 'activity', customTag: '', transition: 'inherit' }
        ]
      };
      appData.routines.push(newRoutine);
      appData.activeRoutineId = newRoutine.id;
      saveAppData();
      loadBlock(0, false, false);
      showSnackbar(t('msg_seq_created'));
    } else {
      const routine = getActiveRoutine();
      routine.name = name;
      saveAppData();
      renderAll();
      showSnackbar(t('msg_seq_renamed'));
    }
    els.routineDialog.close();
  });

  els.btnDeleteRoutine.addEventListener('click', () => {
    if (appData.routines.length <= 1) return;
    appData.routines = appData.routines.filter(r => r.id !== appData.activeRoutineId);
    appData.activeRoutineId = appData.routines[0].id;
    saveAppData();
    els.routineDialog.close();
    loadBlock(0, false, false);
    showSnackbar(t('msg_seq_deleted'));
  });

  // Settings Dialog
  els.btnSettings.addEventListener('click', () => {
    els.selectLanguage.value = getLang();
    els.selectSoundProfile.value = appData.settings.soundProfile || 'material';
    els.inputVolume.value = appData.settings.volume ?? 85;
    els.volumeValueLabel.textContent = `${els.inputVolume.value}%`;
    els.chkCountdownBeep.checked = !!appData.settings.countdownBeep;
    els.chkRepeatConfirmAlert.checked = !!appData.settings.repeatConfirmAlert;
    els.chkGlobalHotkeys.checked = appData.settings.globalHotkeys !== false;
    els.settingsDialog.showModal();
  });

  els.selectLanguage.addEventListener('change', () => {
    setLanguage(els.selectLanguage.value, false);
  });

  els.inputVolume.addEventListener('input', () => {
    els.volumeValueLabel.textContent = `${els.inputVolume.value}%`;
    appData.settings.volume = parseInt(els.inputVolume.value, 10);
  });

  els.selectSoundProfile.addEventListener('change', () => {
    appData.settings.soundProfile = els.selectSoundProfile.value;
    playBlockCompleteSound(false, false);
  });

  els.btnTestSound.addEventListener('click', () => {
    appData.settings.soundProfile = els.selectSoundProfile.value;
    appData.settings.volume = parseInt(els.inputVolume.value, 10);
    playBlockCompleteSound(false, false);
  });

  els.settingsForm.addEventListener('submit', () => {
    appData.settings.language = els.selectLanguage.value === 'en' ? 'en' : 'es';
    appData.settings.soundProfile = els.selectSoundProfile.value;
    appData.settings.volume = parseInt(els.inputVolume.value, 10);
    appData.settings.countdownBeep = els.chkCountdownBeep.checked;
    appData.settings.repeatConfirmAlert = els.chkRepeatConfirmAlert.checked;
    appData.settings.globalHotkeys = els.chkGlobalHotkeys.checked;

    postToHost({
      action: 'set_hotkeys_enabled',
      value: appData.settings.globalHotkeys
    });

    applyTranslations();
    saveAppData();
    showSnackbar(t('msg_settings_saved'));
  });

  // Light-dismiss dialogs
  [els.paletteDialog, els.blockDialog, els.routineDialog, els.settingsDialog].forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });

  // Local Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, select, textarea')) return;
    if (els.paletteDialog.open || els.blockDialog.open || els.routineDialog.open || els.settingsDialog.open) return;

    if (e.code === 'Space') {
      e.preventDefault();
      handleActivePlayPause();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      handleActiveNext();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      handleActiveReset();
    }
  });

  // Native Host Bridge Listener
  if (window.chrome && window.chrome.webview) {
    window.chrome.webview.addEventListener('message', (event) => {
      const msg = event.data;
      if (!msg || typeof msg !== 'object') return;

      if (msg.type === 'host_state') {
        hostState.isCompact = !!msg.isCompact;
        hostState.isAlwaysOnTop = !!msg.isAlwaysOnTop;
        hostState.pinnedAlwaysOnTop = !!msg.pinnedAlwaysOnTop;
        hostState.hotkeysEnabled = !!msg.hotkeysEnabled;
        renderAll();
      } else if (msg.type === 'loaded_data' && msg.data) {
        if (Array.isArray(msg.data.routines) && msg.data.routines.length > 0) {
          appData = normalizeSavedState(msg.data);
          syncSimpleInputsFromDuration(appData.simpleTimer.durationSec || 300);
          simpleState.totalMs = (appData.simpleTimer.durationSec || 300) * 1000;
          simpleState.remainingMs = simpleState.totalMs;
          applyTheme(appData.settings.theme || 'mono-light', false);
          applyTranslations();
          loadBlock(0, false, false);
        }
      } else if (msg.type === 'global_hotkey') {
        if (msg.command === 'play_pause') {
          handleActivePlayPause();
        } else if (msg.command === 'next_block') {
          handleActiveNext();
        } else if (msg.command === 'reset_block') {
          handleActiveReset();
        }
      }
    });

    postToHost({ action: 'request_init' });
  }

  // Initialize
  syncSimpleInputsFromDuration(appData.simpleTimer.durationSec || 300);
  applyTheme(appData.settings.theme || 'mono-light', false);
  applyTranslations();
  loadBlock(0, false, false);
  requestAnimationFrame(tick);
})();
