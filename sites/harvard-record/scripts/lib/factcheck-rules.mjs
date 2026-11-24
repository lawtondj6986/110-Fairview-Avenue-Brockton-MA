/**
 * Rules for spotting checkable factual statements in prose. Shared by
 * scripts/factcheck.mjs and its tests.
 */
/** Each rule: an id, a label for the editor, a weight for ranking, and a test. */
export const RULES = [
  { id: 'citation', label: 'Legal citation', weight: 5, re: /§|\bU\.S\.C\.|\bC\.F\.R\.|\bPub\. ?L\.|\bM\.G\.L\.|\bc\. ?\d+[A-Z]?\b|\bSection \d+/ },
  { id: 'money', label: 'Dollar amount', weight: 5, re: /\$\s?\d/ },
  { id: 'percent', label: 'Percentage or rate', weight: 4, re: /\d\s?(%|percent\b)/i },
  { id: 'deadline', label: 'Deadline or period', weight: 4, re: /\b\d+[- ](business |working |calendar )?(day|week|month|year)s?\b|\bwithin (a|one|two|three|\d+) (days?|weeks?|months?|years?)\b/i },
  { id: 'threshold', label: 'Threshold or count', weight: 4, re: /\b(\d+|fifteen|twenty|fifty|six|five|ten) or more\b|\bat least \d+|\bmore than \d+|\bfewer than \d+|\b\d+ employees\b/i },
  { id: 'year', label: 'Date or year', weight: 3, re: /\b(1[89]\d\d|20\d\d)\b|\b(January|February|March|April|May|June|July|August|September|October|November|December) \d/ },
  { id: 'recent', label: 'Recent change (may be out of date)', weight: 4, re: /\b(recently|has since|was vacated|struck down|amended in|new rule|revised in|currently|as of)\b/i },
  { id: 'absolute', label: 'Absolute statement', weight: 2, re: /\b(never|always|every state|all states|no state|only (one|two|federal)|first ever|the only)\b/i },
  { id: 'count', label: 'Other number', weight: 1, re: /\b\d{2,}\b/ },
];

/** Split Markdown into checkable sentences, skipping code, headings and link-only lines. */
export function sentences(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#+ .*$/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ');
  return text.split(/(?<=[.!?])\s+(?=[A-Z("“])/).map((s) => s.trim()).filter((s) => s.length > 20);
}

export function flags(sentence) {
  return RULES.filter((r) => r.re.test(sentence));
}

