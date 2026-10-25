'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Props = { voices: string[]; playLabel: string; stopLabel: string };

/** Reads <main> aloud with the browser's own speech engine. Hidden if no suitable voice exists. */
export function ListenButton({ voices, playLabel, stopLabel }: Props) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const pick = () => {
      const available = synth.getVoices();
      for (const want of voices) {
        const match = available.find((v) => v.lang.toLowerCase().startsWith(want.toLowerCase()));
        if (match) return setVoice(match);
      }
      setVoice(null);
    };
    pick();
    synth.addEventListener('voiceschanged', pick);
    return () => {
      synth.removeEventListener('voiceschanged', pick);
      synth.cancel();
    };
  }, [voices]);

  if (!voice) return null;

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const text = document.querySelector('main')?.innerText ?? '';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      className="no-print inline-flex min-h-tap items-center gap-2 rounded-lg border border-teal px-4 text-base font-medium text-teal hover:bg-teal hover:text-white"
    >
      <Icon name="speaker" className="size-5" />
      {speaking ? stopLabel : playLabel}
    </button>
  );
}
