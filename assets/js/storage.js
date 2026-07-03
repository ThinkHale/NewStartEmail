// Local persistence layer. Everything lives in localStorage so the app works
// entirely from static GitHub Pages hosting with no backend.
const STORAGE_KEYS = {
  templates: 'nse_templates_v1',
  settings: 'nse_settings_v1',
};

const RESERVED_TOKENS = [
  'emailType', 'client', 'shift', 'date',
  'senderName', 'senderTitle', 'senderPhone', 'senderEmail', 'senderCompany',
  'recipientEmail',
];

const RESERVED_TOKEN_LABELS = {
  emailType: 'Email Type',
  client: 'Client',
  shift: 'Shift',
  date: 'Date',
  senderName: 'Sender Name',
  senderTitle: 'Sender Title',
  senderPhone: 'Sender Phone',
  senderEmail: 'Sender Email',
  senderCompany: 'Sender Company',
  recipientEmail: 'Recipient Email',
};

function uid() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

async function loadTemplates() {
  const raw = localStorage.getItem(STORAGE_KEYS.templates);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through to seed */ }
  }
  try {
    const res = await fetch('data/templates.json');
    if (!res.ok) throw new Error('seed fetch failed');
    const seed = await res.json();
    saveTemplates(seed);
    return seed;
  } catch (e) {
    return [];
  }
}

function saveTemplates(templates) {
  localStorage.setItem(STORAGE_KEYS.templates, JSON.stringify(templates));
}

function loadSettings() {
  const raw = localStorage.getItem(STORAGE_KEYS.settings);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through */ }
  }
  return {
    senderName: '',
    senderTitle: '',
    senderPhone: '',
    senderEmail: '',
    senderCompany: '',
  };
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}
