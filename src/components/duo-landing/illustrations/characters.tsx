import type { ReactNode } from "react";
import "./characters.css";

/*
 * Shared flat character library for the Duolingo-style Nudge landing.
 * Everything is original inline SVG. Limbs live inside "pivot" groups whose
 * bounding box is a centred invisible circle, so CSS fill-box rotations turn
 * exactly around the shoulder or hip.
 */

type Pt = readonly [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function a11y(title?: string) {
  return title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);
}

/** Rounded capsule from one point to another (a limb). */
function Capsule({
  from,
  to,
  w,
  fill,
}: {
  from: Pt;
  to: Pt;
  w: number;
  fill: string;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ang = (Math.atan2(-(x2 - x1), y2 - y1) * 180) / Math.PI;
  return (
    <rect
      x={r2(x1 - w / 2)}
      y={r2(y1 - w / 2)}
      width={w}
      height={r2(len + w)}
      rx={w / 2}
      fill={fill}
      transform={`rotate(${r2(ang)} ${x1} ${y1})`}
    />
  );
}

/** Group whose fill-box centre is `at`, so CSS rotations pivot there. */
function Pivot({
  at,
  r,
  className,
  children,
}: {
  at: Pt;
  r: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <g className={cx("dl-ch-pv", className)}>
      <circle cx={at[0]} cy={at[1]} r={r} fill="none" stroke="none" />
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Turtle (Nudge C1)                                                   */
/* ------------------------------------------------------------------ */

export type TurtlePose = "wave" | "cheer" | "think" | "walk" | "read" | "sleep";

const TC = {
  shell: "#679f9e",
  shellDark: "#578e8d",
  shellLight: "#8fc4c0",
  rim: "#4f8483",
  sand: "#e6d4be",
  sandShade: "#d6bf9f",
  sandLight: "#f5ecdf",
  limb: "#d9c09f",
  eye: "#3f7776",
  ink: "#2f5c5b",
  cheek: "#f3a493",
  tongue: "#f28d8d",
};

const T_SHOULDER_L: Pt = [62, 124];
const T_SHOULDER_R: Pt = [138, 124];

const TURTLE_HANDS: Record<TurtlePose, [Pt, Pt]> = {
  wave: [
    [44, 154],
    [160, 88],
  ],
  cheer: [
    [40, 88],
    [160, 88],
  ],
  think: [
    [44, 154],
    [114, 144],
  ],
  walk: [
    [44, 154],
    [156, 154],
  ],
  read: [
    [76, 152],
    [124, 152],
  ],
  sleep: [
    [50, 156],
    [150, 156],
  ],
};

function TurtleEye({ x, y }: { x: number; y: number }) {
  return (
    <>
      <ellipse cx={x} cy={y} rx={10} ry={13} fill={TC.eye} />
      <circle cx={x + 3.5} cy={y - 5} r={3.6} fill={TC.sandLight} />
      <circle cx={x - 3} cy={y + 5} r={1.6} fill={TC.sandLight} />
    </>
  );
}

function TurtleMouth({ pose }: { pose: TurtlePose }) {
  if (pose === "wave" || pose === "cheer") {
    const big = pose === "cheer";
    return (
      <g>
        <path
          d={big ? "M82 120 Q100 152 118 120 Z" : "M85 122 Q100 145 115 122 Z"}
          fill={TC.ink}
        />
        <path
          d={
            big
              ? "M91 136 Q100 129 109 136 Q105 143 100 143 Q95 143 91 136 Z"
              : "M93 134 Q100 128 107 134 Q104 139 100 139 Q96 139 93 134 Z"
          }
          fill={TC.tongue}
        />
      </g>
    );
  }
  const d =
    pose === "think"
      ? "M90 130 Q101 125 111 129"
      : pose === "sleep"
        ? "M93 128 Q100 133 107 128"
        : "M88 124 Q100 137 112 124";
  return (
    <path
      d={d}
      fill="none"
      stroke={TC.ink}
      strokeWidth={4.5}
      strokeLinecap="round"
    />
  );
}

function MiniStar({
  x,
  y,
  s,
  className,
}: {
  x: number;
  y: number;
  s: number;
  className?: string;
}) {
  return (
    <path
      className={className}
      d={`M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s} Z`}
      fill="#ffc94a"
    />
  );
}

export function Turtle({
  pose = "wave",
  className,
  title,
}: {
  pose?: TurtlePose;
  className?: string;
  title?: string;
}) {
  const [handL, handR] = TURTLE_HANDS[pose];
  const look =
    pose === "think"
      ? "translate(4 -5)"
      : pose === "read"
        ? "translate(0 5)"
        : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cx("dl-ch dl-turtle", `dl-turtle--${pose}`, className)}
      focusable="false"
      {...a11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <ellipse
        className="dl-ch-shadow"
        cx={100}
        cy={187}
        rx={60}
        ry={8}
        fill="#1f3b3a"
        opacity={0.1}
      />

      <g className="dl-ch-body">
        {/* back feet */}
        <g className="dl-ch-pv dl-ch-foot dl-ch-foot-l">
          <ellipse cx={72} cy={176} rx={20} ry={12} fill={TC.limb} />
          <circle cx={63} cy={183} r={3.2} fill={TC.sandLight} />
          <circle cx={72} cy={185} r={3.2} fill={TC.sandLight} />
          <circle cx={81} cy={183} r={3.2} fill={TC.sandLight} />
        </g>
        <g className="dl-ch-pv dl-ch-foot dl-ch-foot-r">
          <ellipse cx={128} cy={176} rx={20} ry={12} fill={TC.limb} />
          <circle cx={119} cy={183} r={3.2} fill={TC.sandLight} />
          <circle cx={128} cy={185} r={3.2} fill={TC.sandLight} />
          <circle cx={137} cy={183} r={3.2} fill={TC.sandLight} />
        </g>

        {/* shell: wide sage dome, no pattern */}
        <path
          d="M22 132 C22 70 56 28 100 28 C144 28 178 70 178 132 Z"
          fill={TC.shell}
        />
        <path
          d="M134 38 C162 54 178 88 178 124 L163 124 C161 92 153 62 134 38 Z"
          fill={TC.shellDark}
        />
        <rect x={16} y={120} width={168} height={24} rx={12} fill={TC.rim} />
        <path
          d="M50 80 C57 60 71 47 90 40"
          fill="none"
          stroke={TC.shellLight}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <circle cx={44} cy={97} r={4.5} fill={TC.shellLight} />
        {/* shell opening: the head pokes out of the dome */}
        <path
          d="M56 92 C56 68 76 52 100 52 C124 52 144 68 144 92 Z"
          fill={TC.rim}
        />
        {/* little tail peeking out */}
        <path d="M168 150 Q186 152 188 140 Q178 146 166 142 Z" fill={TC.limb} />

        {/* big sand face and body */}
        <path
          d="M100 58 C134 58 152 82 152 116 C152 150 132 172 100 172 C68 172 48 150 48 116 C48 82 66 58 100 58 Z"
          fill={TC.sand}
        />
        <path
          d="M130 68 C145 80 152 96 152 116 C152 148 134 170 106 172 C128 160 142 140 142 114 C142 96 138 80 130 68 Z"
          fill={TC.sandShade}
          opacity={0.6}
        />
        <ellipse cx={100} cy={152} rx={30} ry={16} fill={TC.sandLight} />

        {/* face */}
        <ellipse cx={64} cy={122} rx={8} ry={5} fill={TC.cheek} opacity={0.7} />
        <ellipse
          cx={136}
          cy={122}
          rx={8}
          ry={5}
          fill={TC.cheek}
          opacity={0.7}
        />
        {pose === "sleep" ? (
          <g
            fill="none"
            stroke={TC.eye}
            strokeWidth={4.5}
            strokeLinecap="round"
          >
            <path d="M68 105 Q78 112 88 105" />
            <path d="M112 105 Q122 112 132 105" />
          </g>
        ) : (
          <g transform={look}>
            <g className="dl-ch-look">
              <g className="dl-ch-blink">
                <TurtleEye x={78} y={104} />
                <TurtleEye x={122} y={104} />
              </g>
            </g>
          </g>
        )}
        <circle cx={96} cy={116} r={1.6} fill={TC.sandShade} />
        <circle cx={104} cy={116} r={1.6} fill={TC.sandShade} />
        <TurtleMouth pose={pose} />

        {/* front feet */}
        <Pivot at={T_SHOULDER_L} r={52} className="dl-ch-arm dl-ch-arm-l">
          <Capsule from={T_SHOULDER_L} to={handL} w={26} fill={TC.limb} />
        </Pivot>
        <Pivot at={T_SHOULDER_R} r={52} className="dl-ch-arm dl-ch-arm-r">
          <Capsule from={T_SHOULDER_R} to={handR} w={26} fill={TC.limb} />
        </Pivot>

        {pose === "read" ? (
          <g className="dl-ch-pv dl-ch-book">
            <path
              d="M64 135 Q84 129 100 137 Q116 129 136 135 L136 169 Q116 163 100 171 Q84 163 64 169 Z"
              fill="#ff8a65"
            />
            <path
              d="M69 136 Q86 130 100 138 L100 166 Q86 159 69 163 Z"
              fill="#ffffff"
            />
            <path
              d="M131 136 Q114 130 100 138 L100 166 Q114 159 131 163 Z"
              fill="#ffffff"
            />
            <g stroke="#d9e3e2" strokeWidth={2} strokeLinecap="round">
              <path d="M76 142 L94 145" />
              <path d="M76 149 L94 152" />
              <path d="M76 156 L90 158" />
              <path d="M106 145 L124 142" />
              <path d="M106 152 L124 149" />
            </g>
            <path
              className="dl-ch-page"
              d="M100 138 Q114 130 131 136 L131 163 Q114 159 100 166 Z"
              fill="#f6f1ea"
            />
            <circle cx={70} cy={151} r={10} fill={TC.limb} />
            <circle cx={130} cy={151} r={10} fill={TC.limb} />
          </g>
        ) : null}

        {pose === "think" ? (
          <circle cx={114} cy={144} r={13} fill={TC.limb} />
        ) : null}
      </g>

      {pose === "wave" ? (
        <g
          className="dl-ch-swish"
          fill="none"
          stroke="#7eaddb"
          strokeWidth={4}
          strokeLinecap="round"
        >
          <path d="M176 66 Q183 74 182 86" />
          <path d="M186 58 Q195 70 193 86" />
        </g>
      ) : null}

      {pose === "cheer" ? (
        <g>
          <MiniStar x={30} y={50} s={9} className="dl-ch-twinkle" />
          <MiniStar
            x={172}
            y={44}
            s={11}
            className="dl-ch-twinkle dl-ch-twinkle--late"
          />
          <MiniStar x={182} y={92} s={6} className="dl-ch-twinkle" />
        </g>
      ) : null}

      {pose === "think" ? (
        <g>
          <circle
            className="dl-ch-dot dl-ch-dot-1"
            cx={150}
            cy={60}
            r={4}
            fill="#b9d5ee"
          />
          <circle
            className="dl-ch-dot dl-ch-dot-2"
            cx={160}
            cy={45}
            r={6}
            fill="#b9d5ee"
          />
          <g className="dl-ch-dot dl-ch-dot-3">
            <circle cx={176} cy={24} r={15} fill="#ddf0fb" />
            <text
              x={176}
              y={31}
              textAnchor="middle"
              fontSize={20}
              fontWeight={900}
              fill={TC.ink}
              fontFamily="inherit"
            >
              ?
            </text>
          </g>
        </g>
      ) : null}

      {pose === "sleep" ? (
        <g fill="#7eaddb" fontWeight={900} fontFamily="inherit">
          <text className="dl-ch-z" x={146} y={62} fontSize={14}>
            z
          </text>
          <text className="dl-ch-z dl-ch-z-2" x={158} y={48} fontSize={19}>
            z
          </text>
          <text className="dl-ch-z dl-ch-z-3" x={172} y={32} fontSize={24}>
            Z
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Humans                                                              */
/* ------------------------------------------------------------------ */

export type HumanVariant = "lina" | "bima" | "sari" | "raka" | "dewi" | "tono";
export type HumanPose = "wave" | "jump" | "sit" | "walk" | "write" | "stretch";

type Spec = {
  skin: string;
  shade: string;
  hair: string;
  hairLight?: string;
  brow: string;
  top: string;
  topShade: string;
  bottom: string;
  shoe: string;
  accent: string;
};

const HUMANS: Record<HumanVariant, Spec> = {
  lina: {
    skin: "#c68a5f",
    shade: "#a96f48",
    hair: "#f07c8c",
    hairLight: "#f7a6b0",
    brow: "#3b2416",
    top: "#ffc94a",
    topShade: "#e0a91c",
    bottom: "#5a8cbd",
    shoe: "#315f5e",
    accent: "#ffffff",
  },
  bima: {
    skin: "#8a5638",
    shade: "#6e4128",
    hair: "#231815",
    brow: "#231815",
    top: "#45b29d",
    topShade: "#2f8a78",
    bottom: "#2b3a55",
    shoe: "#ff8a65",
    accent: "#ffffff",
  },
  sari: {
    skin: "#e2ae86",
    shade: "#c48d66",
    hair: "#2a1a14",
    brow: "#2a1a14",
    top: "#a98bdb",
    topShade: "#8a6bc0",
    bottom: "#315f5e",
    shoe: "#f49ac1",
    accent: "#ffc94a",
  },
  raka: {
    skin: "#a8704a",
    shade: "#8a5636",
    hair: "#3b2416",
    brow: "#3b2416",
    top: "#7eaddb",
    topShade: "#5a8cbd",
    bottom: "#3c4b4a",
    shoe: "#ffc94a",
    accent: "#ffffff",
  },
  dewi: {
    skin: "#d39a6c",
    shade: "#b47c52",
    hair: "#231815",
    brow: "#231815",
    top: "#f49ac1",
    topShade: "#e07aa6",
    bottom: "#d39a6c",
    shoe: "#ff8a65",
    accent: "#ffc94a",
  },
  tono: {
    skin: "#9c6644",
    shade: "#7d4f33",
    hair: "#cbc5bd",
    brow: "#bdb6ad",
    top: "#b5652e",
    topShade: "#94501f",
    bottom: "#6f5a48",
    shoe: "#3a2b22",
    accent: "#f3c27a",
  },
};

const SHOULDER_L: Pt = [58, 116];
const SHOULDER_R: Pt = [102, 116];
const HIP_L: Pt = [70, 176];
const HIP_R: Pt = [90, 176];

const ARM_TARGETS: Record<HumanPose, [Pt, Pt]> = {
  wave: [
    [46, 164],
    [128, 72],
  ],
  jump: [
    [30, 80],
    [130, 80],
  ],
  sit: [
    [66, 166],
    [94, 166],
  ],
  walk: [
    [46, 164],
    [114, 164],
  ],
  write: [
    [64, 150],
    [92, 148],
  ],
  stretch: [
    [34, 70],
    [126, 70],
  ],
};

const LEG_TARGETS: Partial<Record<HumanPose, [Pt, Pt]>> = {
  jump: [
    [60, 214],
    [100, 214],
  ],
  stretch: [
    [62, 220],
    [98, 220],
  ],
};
const LEG_REST: [Pt, Pt] = [
  [66, 220],
  [94, 220],
];

function Leg({
  hip,
  foot,
  side,
  s,
}: {
  hip: Pt;
  foot: Pt;
  side: -1 | 1;
  s: Spec;
}) {
  return (
    <Pivot
      at={hip}
      r={66}
      className={`dl-ch-leg dl-ch-leg-${side < 0 ? "l" : "r"}`}
    >
      <Capsule from={hip} to={foot} w={20} fill={s.bottom} />
      <ellipse
        cx={foot[0] + side * 3}
        cy={foot[1] + 7}
        rx={13}
        ry={7.5}
        fill={s.shoe}
      />
    </Pivot>
  );
}

function HairBack({ v, s }: { v: HumanVariant; s: Spec }) {
  switch (v) {
    case "lina":
      return (
        <path
          d="M80 18 C108 18 126 40 126 68 C126 88 120 98 122 112 C122 124 110 132 80 132 C50 132 38 124 38 112 C40 98 34 88 34 68 C34 40 52 18 80 18 Z"
          fill={s.hair}
        />
      );
    case "sari":
      return (
        <g fill={s.hair}>
          <circle cx={80} cy={20} r={14} />
          <path d="M38 64 C38 34 58 22 80 22 C102 22 122 34 122 64 L124 114 C116 121 104 121 98 114 L62 114 C56 121 44 121 36 114 Z" />
        </g>
      );
    case "dewi":
      return (
        <g>
          <circle cx={36} cy={64} r={14} fill={s.hair} />
          <circle cx={124} cy={64} r={14} fill={s.hair} />
          <path
            d="M36 44 L26 36 L28 52 Z M36 44 L46 36 L44 52 Z"
            fill={s.accent}
          />
          <path
            d="M124 44 L114 36 L116 52 Z M124 44 L134 36 L132 52 Z"
            fill={s.accent}
          />
          <circle cx={36} cy={44} r={4} fill={s.accent} />
          <circle cx={124} cy={44} r={4} fill={s.accent} />
        </g>
      );
    default:
      return null;
  }
}

function HairFront({ v, s }: { v: HumanVariant; s: Spec }) {
  switch (v) {
    case "lina":
      return (
        <g>
          <path
            d="M50 66 C50 42 64 32 80 32 C96 32 110 42 110 66 C104 51 94 44 80 44 C66 44 56 51 50 66 Z"
            fill={s.hairLight}
          />
          <circle cx={108} cy={104} r={3.5} fill="#ffffff" />
        </g>
      );
    case "bima":
      return (
        <path
          d="M42 64 C40 36 58 22 80 22 C104 22 120 36 118 64 C114 54 108 48 100 46 C92 52 78 54 64 50 C56 54 48 58 42 64 Z"
          fill={s.hair}
        />
      );
    case "raka":
      return (
        <g fill={s.hair}>
          <path d="M42 62 C42 40 60 30 80 30 C100 30 118 40 118 62 C108 51 94 47 80 47 C66 47 52 51 42 62 Z" />
          <circle cx={48} cy={50} r={11} />
          <circle cx={56} cy={36} r={12} />
          <circle cx={70} cy={27} r={12} />
          <circle cx={86} cy={26} r={12} />
          <circle cx={101} cy={31} r={12} />
          <circle cx={112} cy={45} r={11} />
        </g>
      );
    case "sari":
      return (
        <path
          d="M42 64 C42 38 60 26 82 26 C104 26 118 40 118 62 C104 56 90 46 82 36 C74 48 58 58 42 64 Z"
          fill={s.hair}
        />
      );
    case "dewi":
      return (
        <path
          d="M42 62 C42 36 60 24 80 24 C100 24 118 36 118 62 C114 54 108 50 102 50 L96 42 L90 50 L80 43 L71 50 L64 43 L58 52 C52 54 46 58 42 62 Z"
          fill={s.hair}
        />
      );
    case "tono":
      return (
        <g>
          <ellipse cx={45} cy={56} rx={6} ry={12} fill={s.hair} />
          <ellipse cx={115} cy={56} rx={6} ry={12} fill={s.hair} />
          <rect x={48} y={12} width={64} height={26} rx={7} fill="#1f1f24" />
          <path
            d="M56 20 L80 18"
            stroke="#3d3d46"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
  }
}

function TorsoDetail({ v, s }: { v: HumanVariant; s: Spec }) {
  switch (v) {
    case "bima":
      return (
        <g>
          <path
            d="M68 106 L80 114 L74 121 Z M92 106 L80 114 L86 121 Z"
            fill="#ffffff"
          />
          <path
            d="M80 116 L80 132"
            stroke={s.topShade}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      );
    case "raka":
      return (
        <g>
          <path
            d="M74 110 L72 132 M86 110 L88 132"
            stroke="#ffffff"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <rect
            x={62}
            y={144}
            width={36}
            height={16}
            rx={7}
            fill={s.topShade}
          />
        </g>
      );
    case "sari":
      return (
        <g>
          <path
            d="M70 110 Q80 122 90 110"
            fill="none"
            stroke={s.accent}
            strokeWidth={2.5}
          />
          <circle cx={80} cy={119} r={3.5} fill={s.accent} />
        </g>
      );
    case "tono":
      return (
        <g fill={s.accent}>
          <path d="M71 106 L80 118 L89 106 Z" fill={s.topShade} />
          {(
            [
              [64, 126],
              [96, 126],
              [72, 142],
              [88, 142],
              [62, 158],
              [80, 156],
              [98, 158],
              [80, 130],
            ] as const
          ).map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M${x} ${y - 4} L${x + 4} ${y} L${x} ${y + 4} L${x - 4} ${y} Z`}
            />
          ))}
          <path d="M80 118 L80 166" stroke={s.topShade} strokeWidth={2} />
        </g>
      );
    default:
      return null;
  }
}

function HumanFace({
  v,
  s,
  pose,
}: {
  v: HumanVariant;
  s: Spec;
  pose: HumanPose;
}) {
  const happyEyes = pose === "stretch";
  const open = pose === "wave" || pose === "jump" || pose === "stretch";
  const mouthShift = v === "tono" ? "translate(0 6)" : undefined;
  return (
    <g>
      <ellipse cx={57} cy={79} rx={6} ry={3.5} fill="#f08a7a" opacity={0.5} />
      <ellipse cx={103} cy={79} rx={6} ry={3.5} fill="#f08a7a" opacity={0.5} />
      <g
        fill="none"
        stroke={s.brow}
        strokeWidth={v === "tono" ? 4 : 3.2}
        strokeLinecap="round"
      >
        <path d="M60 54 Q67 50 74 54" />
        <path d="M86 54 Q93 50 100 54" />
      </g>
      {happyEyes ? (
        <g fill="none" stroke="#2b2230" strokeWidth={3.2} strokeLinecap="round">
          <path d="M61 68 Q67 61 73 68" />
          <path d="M87 68 Q93 61 99 68" />
        </g>
      ) : (
        <g className="dl-ch-blink">
          <ellipse cx={67} cy={66} rx={4.5} ry={6} fill="#2b2230" />
          <ellipse cx={93} cy={66} rx={4.5} ry={6} fill="#2b2230" />
          <circle cx={68.6} cy={63.6} r={1.6} fill="#ffffff" />
          <circle cx={94.6} cy={63.6} r={1.6} fill="#ffffff" />
        </g>
      )}
      {v === "raka" ? (
        <g fill="#ffffff" fillOpacity={0.18} stroke="#1f2a44" strokeWidth={3}>
          <circle cx={67} cy={66} r={10} />
          <circle cx={93} cy={66} r={10} />
          <path d="M77 65 Q80 62 83 65" fill="none" />
        </g>
      ) : null}
      {v === "tono" ? (
        <g fill="none" stroke={s.shade} strokeWidth={2} strokeLinecap="round">
          <path d="M53 62 L49 60 M53 67 L49 68" />
          <path d="M107 62 L111 60 M107 67 L111 68" />
        </g>
      ) : null}
      <path
        d="M77 75 Q80 79 83 75"
        fill="none"
        stroke={s.shade}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <g transform={mouthShift}>
        {open ? (
          <g>
            <path d="M70 82 Q80 98 90 82 Z" fill="#6b2a2a" />
            <path
              d="M75 89 Q80 86 85 89 Q83 93 80 93 Q77 93 75 89 Z"
              fill="#f08a8a"
            />
          </g>
        ) : pose === "write" ? (
          <g>
            <path
              d="M74 85 Q80 89 86 85"
              fill="none"
              stroke="#6b2a2a"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <ellipse cx={85} cy={88} rx={2.6} ry={2.2} fill="#f08a8a" />
          </g>
        ) : (
          <path
            d="M71 83 Q80 92 89 83"
            fill="none"
            stroke="#6b2a2a"
            strokeWidth={3.2}
            strokeLinecap="round"
          />
        )}
      </g>
      {v === "tono" ? (
        <path
          d="M64 84 C70 77 77 78 80 81 C83 78 90 77 96 84 C90 87 84 86 80 84 C76 86 70 87 64 84 Z"
          fill={s.hair}
        />
      ) : null}
    </g>
  );
}

export function Human({
  variant,
  pose = "wave",
  className,
  title,
}: {
  variant: HumanVariant;
  pose?: HumanPose;
  className?: string;
  title?: string;
}) {
  const s = HUMANS[variant];
  const [handL, handR] = ARM_TARGETS[pose];
  const [footL, footR] = LEG_TARGETS[pose] ?? LEG_REST;
  const kid = variant === "dewi";
  const sit = pose === "sit";
  const write = pose === "write";
  const hijab = variant === "lina";

  return (
    <svg
      viewBox="0 0 160 240"
      className={cx(
        "dl-ch dl-human",
        `dl-human--${pose}`,
        `dl-human--${variant}`,
        className,
      )}
      focusable="false"
      {...a11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <ellipse
        className="dl-ch-shadow"
        cx={80}
        cy={234}
        rx={sit ? 50 : 38}
        ry={5.5}
        fill="#1f3b3a"
        opacity={0.1}
      />
      <g
        transform={
          kid ? "translate(80 234) scale(0.8) translate(-80 -234)" : undefined
        }
      >
        <g className="dl-ch-body">
          {sit ? (
            <g>
              <rect
                x={34}
                y={196}
                width={92}
                height={32}
                rx={14}
                fill="#e6d4be"
              />
              <rect
                x={34}
                y={214}
                width={92}
                height={14}
                rx={7}
                fill="#d6bf9f"
              />
              <rect
                x={52}
                y={186}
                width={56}
                height={22}
                rx={11}
                fill={s.bottom}
              />
              <Capsule from={[66, 204]} to={[64, 222]} w={18} fill={s.bottom} />
              <Capsule from={[94, 204]} to={[96, 222]} w={18} fill={s.bottom} />
              <ellipse cx={61} cy={229} rx={13} ry={7.5} fill={s.shoe} />
              <ellipse cx={99} cy={229} rx={13} ry={7.5} fill={s.shoe} />
            </g>
          ) : (
            <g>
              <Leg hip={HIP_L} foot={footL} side={-1} s={s} />
              <Leg hip={HIP_R} foot={footR} side={1} s={s} />
            </g>
          )}

          <g transform={sit ? "translate(0 24)" : undefined}>
            <g className="dl-ch-upper">
              {kid ? null : (
                <rect
                  x={54}
                  y={160}
                  width={52}
                  height={26}
                  rx={10}
                  fill={s.bottom}
                />
              )}
              <rect x={72} y={92} width={16} height={18} rx={6} fill={s.skin} />
              <path
                d="M54 124 C54 110 64 104 80 104 C96 104 106 110 106 124 L108 164 C108 170 104 172 98 172 L62 172 C56 172 52 170 52 164 Z"
                fill={s.top}
              />
              <path
                d="M96 106 C103 110 106 116 106 124 L108 164 C108 170 104 172 98 172 L95 172 C99 152 100 128 96 106 Z"
                fill={s.topShade}
                opacity={0.55}
              />
              {kid ? (
                <g>
                  <path
                    d="M54 150 L106 150 L118 190 C119 195 115 198 110 198 L50 198 C45 198 41 195 42 190 Z"
                    fill={s.top}
                  />
                  <rect
                    x={53}
                    y={146}
                    width={54}
                    height={8}
                    rx={4}
                    fill={s.accent}
                  />
                  <circle cx={66} cy={176} r={3} fill="#ffffff" opacity={0.7} />
                  <circle cx={86} cy={184} r={3} fill="#ffffff" opacity={0.7} />
                  <circle
                    cx={102}
                    cy={172}
                    r={3}
                    fill="#ffffff"
                    opacity={0.7}
                  />
                </g>
              ) : null}
              <TorsoDetail v={variant} s={s} />

              <Pivot at={[80, 104]} r={100} className="dl-ch-head">
                <HairBack v={variant} s={s} />
                {hijab ? (
                  <ellipse cx={80} cy={68} rx={30} ry={32} fill={s.skin} />
                ) : (
                  <g>
                    <circle cx={42} cy={68} r={8} fill={s.skin} />
                    <circle cx={118} cy={68} r={8} fill={s.skin} />
                    <circle cx={42} cy={68} r={3.5} fill={s.shade} />
                    <circle cx={118} cy={68} r={3.5} fill={s.shade} />
                    <circle cx={80} cy={64} r={38} fill={s.skin} />
                  </g>
                )}
                <HairFront v={variant} s={s} />
                <HumanFace v={variant} s={s} pose={pose} />
              </Pivot>

              <Pivot at={SHOULDER_L} r={60} className="dl-ch-arm dl-ch-arm-l">
                <Capsule from={SHOULDER_L} to={handL} w={15} fill={s.top} />
                {write ? null : (
                  <circle cx={handL[0]} cy={handL[1]} r={8} fill={s.skin} />
                )}
              </Pivot>
              <Pivot at={SHOULDER_R} r={60} className="dl-ch-arm dl-ch-arm-r">
                <Capsule from={SHOULDER_R} to={handR} w={15} fill={s.top} />
                {write ? null : (
                  <circle cx={handR[0]} cy={handR[1]} r={8} fill={s.skin} />
                )}
              </Pivot>

              {write ? (
                <g>
                  <g transform="rotate(-8 70 142)">
                    <rect
                      x={52}
                      y={128}
                      width={34}
                      height={28}
                      rx={3}
                      fill="#ffffff"
                    />
                    <rect
                      x={52}
                      y={128}
                      width={5}
                      height={28}
                      rx={2}
                      fill="#ff8a65"
                    />
                    <g stroke="#b9d5ee" strokeWidth={2} strokeLinecap="round">
                      <path d="M61 136 L81 136" />
                      <path d="M61 142 L81 142" />
                      <path d="M61 148 L75 148" />
                    </g>
                  </g>
                  <circle cx={handL[0]} cy={handL[1]} r={8} fill={s.skin} />
                  <g className="dl-ch-pv dl-ch-scribble">
                    <g
                      transform={`translate(${handR[0]} ${handR[1]}) rotate(25)`}
                    >
                      <rect
                        x={-3}
                        y={-20}
                        width={6}
                        height={24}
                        rx={1.5}
                        fill="#ffc94a"
                      />
                      <rect
                        x={-3}
                        y={-22}
                        width={6}
                        height={6}
                        rx={2}
                        fill="#f49ac1"
                      />
                      <path d="M-3 4 L3 4 L0 10 Z" fill="#3c4b4a" />
                    </g>
                    <circle cx={handR[0]} cy={handR[1]} r={8} fill={s.skin} />
                  </g>
                </g>
              ) : null}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Four-point twinkle star. Colour follows CSS `color` (defaults to sun). */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx("dl-ch-sparkle", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="dl-ch-pv dl-ch-sparkle-star"
        d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Flat puffy cloud with a soft underside, gently drifting. */
export function Cloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={cx("dl-ch-cloud", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g className="dl-ch-cloud-puff">
        <path
          d="M18 56 C6 56 2 46 6 39 C10 32 18 31 24 34 C24 20 36 12 48 15 C54 4 72 2 82 12 C88 8 100 10 104 20 C116 22 120 34 115 44 C112 52 106 56 98 56 Z"
          fill="#ffffff"
        />
        <path
          d="M10 48 C14 53 18 56 24 56 L98 56 C106 56 112 52 115 44 C108 49 96 50 84 48 C68 52 44 52 30 48 C22 50 15 50 10 48 Z"
          fill="#ddf0fb"
        />
      </g>
    </svg>
  );
}
