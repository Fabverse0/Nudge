function ChooseArt() {
  return (
    <svg viewBox="0 0 260 170" aria-hidden="true">
      <path d="M52 50q68-27 153 7l-5 92H48Z" fill="#E6D4BE" />
      <rect x="36" y="25" width="184" height="115" rx="22" fill="#FAF8F4" />
      {["#E6D4BE", "#7EADDB", "#679F9E"].map((color, index) => {
        const x = 80 + index * 50;
        return (
          <g key={color} className={`how-mood how-mood-${index}`}>
            <circle cx={x} cy="65" r="21" fill={color} />
            <g className="how-mood-eyes" fill="#315F5E">
              <circle cx={x - 6} cy="63" r="2.5" />
              <circle cx={x + 6} cy="63" r="2.5" />
            </g>
            <path
              d={
                index === 0
                  ? `M${x - 6} 72h12`
                  : `M${x - 6} 71q6 ${index === 1 ? 5 : 8} 12 0`
              }
              fill="none"
              stroke="#315F5E"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      <circle
        className="how-mood-focus"
        cx="180"
        cy="65"
        r="27"
        fill="none"
        stroke="#315F5E"
        strokeWidth="2.5"
      />
      <rect x="57" y="105" width="138" height="10" rx="5" fill="#D5E0DB" />
      <rect
        className="how-choice-fill"
        x="57"
        y="105"
        width="138"
        height="10"
        rx="5"
        fill="#679F9E"
      />
      <g className="how-choice">
        <circle cx="198" cy="117" r="19" fill="#315F5E" />
        <path
          d="m190 117 6 6 11-13"
          fill="none"
          stroke="#FAF8F4"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function SuggestionArt() {
  return (
    <svg viewBox="0 0 260 170" aria-hidden="true">
      <rect
        x="51"
        y="30"
        width="156"
        height="115"
        rx="21"
        fill="#679F9E"
        transform="rotate(7 130 87)"
      />
      <g className="how-suggestion">
        <rect x="44" y="22" width="170" height="119" rx="20" fill="#FAF8F4" />
        <path
          d="M69 49q28-11 57 0 29-11 57 0v47q-29-10-57 0-29-10-57 0Z"
          fill="#E6D4BE"
        />
        <path
          d="M126 49v47m-44-32h28m-28 11h21m38-11h28m-28 11h20"
          fill="none"
          stroke="#9A805F"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M83 118h88"
          stroke="#679F9E"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <circle cx="207" cy="127" r="23" fill="#7EADDB" />
      <path
        d="M196 128a11 11 0 0 1 19-8m0-7v9h-9m12 5a11 11 0 0 1-19 8m0 7v-9h9"
        fill="none"
        stroke="#315F5E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BeginArt() {
  return (
    <svg viewBox="0 0 260 170" aria-hidden="true">
      <path
        d="M117 19h27"
        stroke="#315F5E"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M131 19v13m45 12 9-9"
        stroke="#315F5E"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="131" cy="94" r="61" fill="#679F9E" />
      <circle cx="131" cy="94" r="49" fill="#FAF8F4" />
      <path
        d="M131 55v7m39 32h-7m-32 39v-7m-39-32h7"
        stroke="#679F9E"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g className="how-timer-hand">
        <path
          d="M131 94V69"
          stroke="#315F5E"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <circle cx="131" cy="94" r="6" fill="#7EADDB" />
      <circle cx="185" cy="132" r="23" fill="#E6D4BE" />
      <path
        d="m176 132 7 7 12-15"
        fill="none"
        stroke="#315F5E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HowStory() {
  return (
    <section
      className="how-story"
      aria-labelledby="how-story-title"
      data-alive-scene="how"
    >
      <h2 id="how-story-title">Dari bingung, jadi mulai.</h2>
      <ol className="how-journey">
        <li>
          <ChooseArt />
          <div>
            <h3>Pilih.</h3>
            <p>Tujuan, waktu, dan mood jika kamu mau.</p>
          </div>
        </li>
        <li>
          <SuggestionArt />
          <div>
            <h3>Coba.</h3>
            <p>Satu saran. Boleh ganti kalau belum cocok.</p>
          </div>
        </li>
        <li>
          <BeginArt />
          <div>
            <h3>Jalani.</h3>
            <p>Mulai timer. Kamu yang menentukan selesai.</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
