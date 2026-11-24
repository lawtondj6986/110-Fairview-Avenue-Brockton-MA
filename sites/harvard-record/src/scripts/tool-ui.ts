/**
 * Browser helpers shared by the pages under /tools/. The tools' logic lives in
 * src/lib/tools/ and has no DOM code; this file only wires forms to it.
 * Nothing here makes a network request or sets a cookie.
 */

/** Show the controls that need JavaScript and hide the "no JavaScript" notes. */
export function enhance(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-js-only]').forEach((e) => { e.hidden = false; });
  root.querySelectorAll<HTMLElement>('[data-no-js]').forEach((e) => { e.hidden = true; });
}

/** Every named control's value: checked radios, checkboxes ('yes' or ''), text fields and selects. */
export function readForm(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) || !el.name || el.dataset.remember !== undefined) continue;
    if (el instanceof HTMLInputElement && el.type === 'radio') { if (el.checked) out[el.name] = el.value; else out[el.name] ??= ''; continue; }
    if (el instanceof HTMLInputElement && el.type === 'checkbox') { out[el.name] = el.checked ? 'yes' : ''; continue; }
    out[el.name] = el.value;
  }
  return out;
}

export function writeForm(form: HTMLFormElement, values: Record<string, string>): void {
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) || !el.name || !(el.name in values)) continue;
    if (el instanceof HTMLInputElement && el.type === 'radio') el.checked = values[el.name] === el.value;
    else if (el instanceof HTMLInputElement && el.type === 'checkbox') el.checked = values[el.name] === 'yes';
    else el.value = values[el.name];
  }
}

const store = {
  get(key: string): string | null { try { return window.localStorage.getItem(key); } catch { return null; } },
  set(key: string, v: string): void { try { window.localStorage.setItem(key, v); } catch { /* storage unavailable */ } },
  remove(key: string): void { try { window.localStorage.removeItem(key); } catch { /* storage unavailable */ } },
};

/**
 * Optional "remember my answers on this device". Off by default. When the box is
 * ticked, answers are kept in this browser's localStorage under one key; when it
 * is unticked, that key is deleted.
 */
export function remember(form: HTMLFormElement, key: string, onRestore: () => void): () => void {
  const box = form.querySelector<HTMLInputElement>('[data-remember]');
  const k = `tools:${key}`;
  if (!box) return () => {};
  const saved = store.get(k);
  if (saved) {
    try { writeForm(form, JSON.parse(saved)); box.checked = true; onRestore(); } catch { store.remove(k); }
  }
  const save = () => { if (box.checked) store.set(k, JSON.stringify(readForm(form))); };
  box.addEventListener('change', () => { if (box.checked) save(); else store.remove(k); });
  return save;
}

/** Wire a form: recompute on every change, restore remembered answers, handle reset and print. */
export function wireTool(form: HTMLFormElement, key: string, update: (values: Record<string, string>) => void): void {
  enhance();
  const run = () => update(readForm(form));
  const save = remember(form, key, run);
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); save(); });
  form.addEventListener('input', () => { run(); save(); });
  form.addEventListener('change', () => { run(); save(); });
  form.addEventListener('reset', () => setTimeout(() => {
    const box = form.querySelector<HTMLInputElement>('[data-remember]');
    if (box) { box.checked = false; store.remove(`tools:${key}`); }
    run();
  }));
  document.querySelectorAll<HTMLButtonElement>('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
  wireCopy();
  run();
}

/** Copy buttons: <button data-copy="target-id">. Falls back to selecting the text for a manual copy. */
export function wireCopy(root: ParentNode = document): void {
  root.querySelectorAll<HTMLButtonElement>('button[data-copy]').forEach((btn) => {
    if (btn.dataset.wired) return;
    btn.dataset.wired = '1';
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.copy!);
      const status = btn.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
      const say = (m: string) => { if (status) status.textContent = m; };
      if (!target) return;
      const text = target instanceof HTMLTextAreaElement ? target.value : target.textContent ?? '';
      if (!text.trim()) { say('Nothing to copy yet.'); return; }
      try {
        await navigator.clipboard.writeText(text);
        say('Copied.');
      } catch {
        selectText(target);
        let ok = false;
        try { ok = document.execCommand('copy'); } catch { ok = false; }
        say(ok ? 'Copied.' : 'The text is selected. Press Ctrl+C (or Command+C) to copy it.');
      }
    });
  });
}

function selectText(el: HTMLElement): void {
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) { el.focus(); el.select(); return; }
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/** Tiny element builder. Children are text unless they are nodes, so no HTML is ever injected. */
export function h(tag: string, attrs: Record<string, string> = {}, ...children: (Node | string | null | undefined | false)[]): HTMLElement {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  for (const c of children) if (c !== null && c !== undefined && c !== false) el.append(c);
  return el;
}

/** A <ul> of strings, or nothing for an empty list. */
export const list = (items: string[], cls = ''): HTMLElement | null =>
  items.length ? h('ul', cls ? { class: cls } : {}, ...items.map((t) => h('li', {}, t))) : null;

/** Replace an element's contents. */
export function render(target: Element, ...nodes: (Node | string | null | undefined | false)[]): void {
  target.replaceChildren(...nodes.filter((n): n is Node | string => n !== null && n !== undefined && n !== false));
}

/** A grade badge matching src/components/Grade.astro (without the link). */
export const gradeBadge = (g: string, label: string): HTMLElement =>
  h('span', { class: `grade grade-${g}`, title: `${g}: ${label}` }, h('span', { class: 'visually-hidden' }, 'Reliability grade '), g);

/** A state badge matching src/components/State.astro. */
export const stateBadge = (s: string, label: string, definition: string): HTMLElement =>
  h('span', { class: `state state-${s}`, title: definition }, h('i', { 'aria-hidden': 'true' }), label);
