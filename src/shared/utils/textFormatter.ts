export function formatCardText(text?: string): string {
  if (!text) return '';

  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/:rb_exhaust:/g, '⟳')
    .replace(/:rb_might:/g, '⚔️')
    .replace(/:rb_rune_calm:/g, '💧')
    .replace(/:rb_rune_fury:/g, '🔥')
    .replace(/:rb_rune_body:/g, '🛡️')
    .replace(/:rb_rune_mind:/g, '🧠')
    .replace(/:rb_rune_chaos:/g, '⚡')
    .replace(/:rb_rune_order:/g, '⚖️')
    .replace(/:rb_rune_rainbow:/g, '🌈')
    .replace(/:rb_energy_(\d+):/g, (_, n) => `(${n})`)
    .replace(/:rb_energy_x:/g, '(X)');
}
