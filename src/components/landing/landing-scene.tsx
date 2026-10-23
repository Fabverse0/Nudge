import Image from "next/image";

export type LandingSceneKind =
  "hero" | "phone" | "time" | "move" | "tidy" | "journal" | "welcome";

const descriptions: Record<LandingSceneKind, string> = {
  hero: "Kura-kura Nudge melangkah dari ponsel menuju kartu kegiatan kecil",
  phone:
    "Feed pada ponsel bergulir lalu berganti menjadi ajakan memilih kegiatan",
  time: "Kura-kura menemani jam dan kartu pilihan dua, lima, atau sepuluh menit",
  move: "Kura-kura melangkah bergantian dan meregangkan kaki di atas pijakan kartu",
  tidy: "Kura-kura mengambil benda kecil dan meletakkannya ke kotak penyimpanan",
  journal: "Kura-kura menggerakkan pensil dan menulis garis pendek di jurnal",
  welcome: "Kura-kura Nudge tersenyum dan melambaikan kaki untuk menyambutmu",
};

function TurtleRig({ priority }: { priority: boolean }) {
  const parts = [
    ["back", "foot-back", 213, 200],
    ["shell", "shell", 560, 452],
    ["head", "head", 425, 354],
    ["happy", "happy", 424, 355],
    ["left", "foot-left", 316, 269],
    ["right", "foot-right", 316, 269],
  ] as const;
  return (
    <div className="alive-rig">
      <div className="alive-rig-body">
        {parts.map(([part, file, width, height]) => (
          <Image
            key={part}
            src={`/brand/landing/alive/${file}.webp`}
            alt=""
            width={width}
            height={height}
            unoptimized
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority && part === "shell" ? "high" : "auto"}
            className={`rig-part rig-${part}`}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

function Phone({ id }: { id: string }) {
  return (
    <g className="prop-phone">
      <rect x="64" y="41" width="180" height="314" rx="30" fill="#315F5E" />
      <rect x="73" y="49" width="162" height="294" rx="23" fill="#FAF8F4" />
      <rect x="125" y="57" width="59" height="9" rx="4.5" fill="#315F5E" />
      <defs>
        <clipPath id={`feed-${id}`}>
          <rect x="85" y="84" width="138" height="229" rx="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#feed-${id})`}>
        <g className="phone-feed">
          {[0, 1, 2, 3, 4].map((item) => (
            <g key={item} transform={`translate(85 ${84 + item * 111})`}>
              <rect
                width="138"
                height="78"
                rx="11"
                fill={item % 2 ? "#E6D4BE" : "#7EADDB"}
              />
              <circle cx="33" cy="32" r="15" fill="#FAF8F4" />
              <path d="M57 58 87 23l32 35Z" fill="#315F5E" opacity=".35" />
              <rect y="87" width="96" height="6" rx="3" fill="#679F9E" />
              <rect y="98" width="64" height="5" rx="2.5" fill="#E6D4BE" />
            </g>
          ))}
        </g>
      </g>
      <g className="phone-invitation">
        <rect x="85" y="84" width="138" height="229" rx="12" fill="#E8F1EC" />
        <path
          d="m123 177 23 23 43-54"
          fill="none"
          stroke="#315F5E"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="105" y="235" width="98" height="28" rx="9" fill="#315F5E" />
        <path
          d="M132 249h44m-6-6 6 6-6 6"
          fill="none"
          stroke="#FAF8F4"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <rect x="129" y="327" width="51" height="4" rx="2" fill="#679F9E" />
    </g>
  );
}

function ActivityCards() {
  return (
    <g className="prop-cards">
      <g transform="translate(305 267) rotate(-11)">
        <rect x="0" y="7" width="115" height="87" rx="17" fill="#5A8D8B" />
        <rect width="115" height="87" rx="17" fill="#E8F1EC" />
        <path
          d="m26 45 18 17 43-39"
          fill="none"
          stroke="#679F9E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="card-forward" transform="translate(398 218) rotate(14)">
        <rect y="6" width="83" height="72" rx="14" fill="#6898C2" />
        <rect width="83" height="72" rx="14" fill="#7EADDB" />
        <path
          d="m27 36 15-15 15 15M42 21v32"
          stroke="#FAF8F4"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

function Clock() {
  return (
    <g className="prop-clock">
      <circle cx="155" cy="150" r="93" fill="#679F9E" />
      <circle cx="155" cy="145" r="83" fill="#E8F1EC" />
      <circle cx="155" cy="145" r="66" fill="#FAF8F4" />
      <path
        d="M155 86v9m59 50h-9m-50 59v-9m-59-50h9"
        stroke="#679F9E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g className="clock-hand">
        <path
          d="M155 145v-41"
          stroke="#315F5E"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <path
        d="m155 145 27 14"
        stroke="#315F5E"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="155" cy="145" r="7" fill="#315F5E" />
    </g>
  );
}

function Steps() {
  return (
    <g className="prop-steps">
      {[0, 1, 2].map((step) => (
        <g
          key={step}
          className={`step-card step-card-${step}`}
          transform={`translate(${65 + step * 130} ${330 - step * 30}) rotate(-12)`}
        >
          <rect y="7" width="121" height="65" rx="15" fill="#5A8D8B" />
          <rect
            width="121"
            height="65"
            rx="15"
            fill={step === 1 ? "#7EADDB" : "#E8F1EC"}
          />
          <ellipse
            cx="49"
            cy="29"
            rx="9"
            ry="15"
            transform="rotate(-25 49 29)"
            fill="#679F9E"
          />
          <ellipse
            cx="77"
            cy="37"
            rx="9"
            ry="15"
            transform="rotate(-25 77 37)"
            fill="#679F9E"
          />
        </g>
      ))}
    </g>
  );
}

function TidyProps() {
  return (
    <g>
      <g className="tidy-box">
        <path d="m322 260 105-13 48 33-104 16Z" fill="#F0E2CC" />
        <path d="m322 260 49 36v80l-49-35Z" fill="#CBAF8B" />
        <path d="m371 296 104-16v80l-104 16Z" fill="#E6D4BE" />
        <path d="m322 260 105-13 48 33-104 16Z" fill="#315F5E" opacity=".18" />
        <rect x="393" y="321" width="43" height="11" rx="5" fill="#CBAF8B" />
      </g>
      <g className="tidy-grip">
        <g className="tidy-object">
          <rect x="251" y="284" width="51" height="45" rx="10" fill="#7EADDB" />
          <path
            d="m251 294 24 9 27-9"
            stroke="#6898C2"
            strokeWidth="4"
            fill="none"
          />
        </g>
        <image
          href="/brand/landing/alive/foot-right.webp"
          x="220"
          y="230"
          width="77"
          height="66"
        />
      </g>
      <path d="m371 296 104-16v80l-104 16Z" fill="#E6D4BE" />
      <rect x="393" y="321" width="43" height="11" rx="5" fill="#CBAF8B" />
      <g className="tidy-book" transform="rotate(-12 96 346)">
        <rect x="57" y="319" width="88" height="56" rx="10" fill="#679F9E" />
        <rect x="65" y="319" width="80" height="49" rx="7" fill="#E6D4BE" />
        <path
          d="M79 336h48m-48 10h33"
          stroke="#CBAF8B"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

function JournalProps() {
  return (
    <g className="prop-journal">
      <path d="m170 310 130-13 130 25-128 66Z" fill="#679F9E" />
      <path d="m170 302 130-15 130 26-128 64Z" fill="#E6D4BE" />
      <path d="m170 302 130-15 2 90Z" fill="#F7ECD9" />
      <path d="m300 287 130 26-128 64Z" fill="#FAF8F4" />
      <path d="m300 287 2 90" stroke="#CBAF8B" strokeWidth="3" />
      <g
        className="journal-lines"
        stroke="#679F9E"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path className="journal-line line-one" d="m322 316 61 8" />
        <path className="journal-line line-two" d="m319 330 46 5" />
        <path className="journal-line line-three" d="m316 344 29 3" />
      </g>
      <g className="journal-hand">
        <g transform="translate(-60 15)">
          <path d="m360 232 14-11 40 78-10 8Z" fill="#679F9E" />
          <path d="m404 307 10-8 1 24Z" fill="#E6D4BE" />
          <path d="m411 314 4 9-8-6Z" fill="#315F5E" />
        </g>
        <image
          href="/brand/landing/alive/foot-right.webp"
          x="306"
          y="225"
          width="88"
          height="75"
        />
      </g>
    </g>
  );
}

export function LandingScene({
  kind,
  priority = false,
}: {
  kind: LandingSceneKind;
  priority?: boolean;
}) {
  return (
    <div
      className={`alive-scene scene-${kind}`}
      data-alive-scene={kind}
      role="img"
      aria-label={descriptions[kind]}
    >
      <div className="scene-ground" aria-hidden="true" />
      <svg
        className="scene-props"
        viewBox="0 0 520 430"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {(kind === "hero" || kind === "phone") && <Phone id={kind} />}
        {(kind === "hero" || kind === "welcome") && <ActivityCards />}
        {kind === "time" && <Clock />}
        {kind === "move" && <Steps />}
        {kind === "tidy" && <TidyProps />}
        {kind === "journal" && <JournalProps />}
      </svg>
      <TurtleRig priority={priority} />
      {kind === "time" && (
        <div className="scene-time-cards" aria-hidden="true">
          <span>
            2<small>menit</small>
          </span>
          <span>
            5<small>menit</small>
          </span>
          <span>
            10<small>menit</small>
          </span>
        </div>
      )}
    </div>
  );
}
