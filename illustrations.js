/* Vyla line illustrations: fine monoline drawings in deep water blue,
   a soft sea-glass wash behind, and a single brass accent. */
window.ILL = (() => {
  const wash = (id, cx = 100, cy = 108, rx = 70, ry = 62) => `
    <defs>
      <radialGradient id="w${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#cfe5ec"/><stop offset=".7" stop-color="#b9d8e3" stop-opacity=".75"/><stop offset="1" stop-color="#b9d8e3" stop-opacity="0"/></radialGradient>
      <linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a33"/><stop offset=".45" stop-color="#e1c27f"/><stop offset="1" stop-color="#9c7a3e"/></linearGradient>
      <filter id="f${id}" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="${id.length * 7}"/><feDisplacementMap in="SourceGraphic" scale="14"/><feGaussianBlur stdDeviation="2.4"/></filter>
    </defs>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#w${id})" filter="url(#f${id})"/>`;
  const svg = (id, body, extra = '') => `<svg class="ill" viewBox="0 0 200 200" aria-hidden="true">${wash(id)}${extra}<g fill="none" stroke="#1F4B5E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
  const dots = (pts, r = 1.6) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1F4B5E" stroke="none"/>`).join('');
  return {
    drop: () => svg('drop', `
      <path d="M100 38C86 62 66 86 66 112a34 34 0 0 0 68 0c0-26-20-50-34-74Z"/>
      <path d="M84 116a17 17 0 0 0 12 16" opacity=".6"/>
      <ellipse cx="100" cy="166" rx="34" ry="5" opacity=".55"/><ellipse cx="100" cy="166" rx="56" ry="9" opacity=".3"/>`,
      `<circle cx="100" cy="112" r="6" fill="url(#bdrop)"/>`),
    shower: () => svg('shower', `
      <path d="M36 42h70q18 0 18 18v12"/><path d="M98 72h52l9 18H89Z"/>
      <path d="M96 100l-6 22M108 100l-3 30M120 100v34M132 100l3 26M144 100l6 22" stroke-dasharray="3 7"/>`
      + dots([[88, 140], [104, 150], [122, 156], [140, 146], [152, 134]], 1.8),
      `<rect x="110" y="44" width="11" height="26" rx="3" fill="url(#bshower)"/>`),
    leaf: () => svg('leaf', `
      <path d="M48 120C56 70 104 46 152 52c-4 48-40 86-90 78"/><path d="M48 120C80 96 108 78 140 62"/>
      <path d="M78 104l-6-18M96 92l-2-20M114 80l2-16M88 116l18 2M104 106l20 0"/>
      <path d="M150 74c-4 8-8 13-8 18a8 8 0 0 0 16 0c0-5-4-10-8-18Z"/><path d="M150 112v10M150 132v6" stroke-dasharray="2 6"/>`,
      `<circle cx="150" cy="92" r="3" fill="url(#bleaf)"/>`),
    tub: () => svg('tub', `
      <path d="M34 102h132l-8 34q-6 18-26 18H68q-20 0-26-18Z"/><path d="M56 154l-6 12M144 154l6 12"/>
      <path d="M150 102V58q0-12 12-12h4"/><path d="M162 46v10"/>
      <circle cx="74" cy="90" r="9"/><circle cx="92" cy="84" r="6"/><circle cx="108" cy="92" r="8"/><circle cx="62" cy="76" r="4"/><circle cx="122" cy="80" r="5"/>`,
      `<rect x="150" y="58" width="8" height="18" rx="2" fill="url(#btub)"/>`),
    filter: () => svg('filter', `
      <rect x="80" y="40" width="40" height="120" rx="8"/><path d="M84 52h32M84 148h32"/>
      <path d="M92 160v12h16v-12M92 28v12h16V28"/><path d="M92 31h16M92 35h16M92 165h16M92 169h16" opacity=".6"/>
      <path d="M100 82c-5 8-8 12-8 17a8 8 0 0 0 16 0c0-5-3-9-8-17Z"/>`,
      `<rect x="81" y="41" width="38" height="118" rx="7" fill="url(#bfilter)" opacity=".85"/>`),
    tap: () => svg('tap', `
      <path d="M30 70h60q22 0 22 22v20"/><path d="M30 84h52q16 0 16 16v12"/><path d="M96 112h20"/>
      <circle cx="74" cy="56" r="12"/><path d="M74 44v24M62 56h24" opacity=".6"/>
      <path d="M106 126c-4 7-7 11-7 15a7 7 0 0 0 14 0c0-4-3-8-7-15Z"/><ellipse cx="106" cy="170" rx="22" ry="4" opacity=".5"/>`,
      `<circle cx="74" cy="56" r="4" fill="url(#btap)"/>`),
    steam: () => svg('steam', `
      <path d="M62 150h76"/><path d="M70 150q0-26 30-26t30 26"/>
      <path d="M84 112c-8-10 8-18 0-28s8-18 0-28" opacity=".8"/><path d="M100 108c-8-10 8-18 0-28s8-18 0-28"/><path d="M116 112c-8-10 8-18 0-28s8-18 0-28" opacity=".8"/>`,
      `<circle cx="150" cy="54" r="10" fill="url(#bsteam)" opacity=".9"/>`),
    hair: () => svg('hair', `
      <path d="M86 34c-26 24-20 52-6 74s10 48-8 66"/><path d="M98 34c-22 26-14 54 0 76s8 46-8 64"/>
      <path d="M110 36c-18 28-8 54 6 74s6 44-8 62"/><path d="M122 40c-14 28-2 52 12 70s4 42-8 58"/>`
      + dots([[60, 120], [146, 96], [150, 140], [54, 70], [140, 60]], 1.7),
      `<path d="M92 30q12-8 28 2" stroke="url(#bhair)" stroke-width="5" fill="none" stroke-linecap="round"/>`),
    glass: () => svg('glass', `
      <path d="M66 50h68l-8 112q-1 8-9 8H83q-8 0-9-8Z"/><path d="M70 92q30 8 60 0"/>
      <circle cx="94" cy="124" r="3"/><circle cx="108" cy="142" r="2"/><circle cx="104" cy="110" r="2"/>`,
      `<path d="M71 96q29 7 58 0l-5 66q-1 6-7 6H83q-6 0-7-6Z" fill="#b9d8e3" opacity=".55"/>`),
  };
})();
