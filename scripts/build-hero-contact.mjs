import { mkdirSync, writeFileSync } from "node:fs";

const destination = "docs/assets/hero-redesign";
const fps = 60;
const end = 450;
const palette = {
  ink: "#315F5E",
  sage: "#679F9E",
  light: "#8CB7B3",
  edge: "#4C7C7B",
  sand: "#E6D4BE",
  warm: "#F0E2CC",
  binding: "#CBAF8B",
  blue: "#7EADDB",
  blueEdge: "#6092B9",
  paper: "#FAF8F4",
  mint: "#E8F1EC",
};
const fixed = (k) => ({ a: 0, k });
function smoothSample(entries, frame) {
  let n = 0;
  while (n < entries.length - 2 && frame > entries[n + 1][0]) n++;
  const [t0, a] = entries[n];
  const [t1, b] = entries[n + 1];
  const previous = entries[Math.max(0, n - 1)];
  const next = entries[Math.min(entries.length - 1, n + 2)];
  const span = t1 - t0;
  const u = Math.max(0, Math.min(1, (frame - t0) / span));
  function interpolate(p, x, y, z) {
    if (Array.isArray(x))
      return x.map((item, axis) =>
        interpolate(p[axis], item, y[axis], z[axis]),
      );
    if (x && typeof x === "object")
      return Object.fromEntries(
        Object.keys(x).map((key) => [
          key,
          interpolate(p[key], x[key], y[key], z[key]),
        ]),
      );
    if (typeof x !== "number") return x;
    const slope = (y - x) / span;
    const before = t0 === previous[0] ? 0 : (x - p) / (t0 - previous[0]);
    const after = t1 === next[0] ? 0 : (z - y) / (next[0] - t1);
    const tangent = (left, right) =>
      left * right > 0 ? (2 * left * right) / (left + right) : 0;
    return (
      Math.round(
        ((2 * u ** 3 - 3 * u ** 2 + 1) * x +
          (u ** 3 - 2 * u ** 2 + u) * span * tangent(before, slope) +
          (-2 * u ** 3 + 3 * u ** 2) * y +
          (u ** 3 - u ** 2) * span * tangent(slope, after)) *
          1000,
      ) / 1000
    );
  }
  return interpolate(previous[1], a, b, next[1]);
}
function keys(entries) {
  const samples = [];
  for (let t = entries[0][0]; t <= entries.at(-1)[0]; t++)
    samples.push([t, smoothSample(entries, t)]);
  const serialized = samples.map(([, value]) => JSON.stringify(value));
  return {
    a: 1,
    k: samples
      .filter(
        (_, n) =>
          n === 0 ||
          n === samples.length - 1 ||
          serialized[n] !== serialized[n - 1] ||
          serialized[n] !== serialized[n + 1],
      )
      .map(([t, value]) => ({
        t,
        s: Array.isArray(value) ? value : [value],
        i: { x: [0.667], y: [0.667] },
        o: { x: [0.333], y: [0.333] },
      })),
  };
}
const color = (name) =>
  palette[name]
    .slice(1)
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .concat(1);
const fill = (name, opacity = 100) => ({
  ty: "fl",
  c: fixed(color(name)),
  o: fixed(opacity),
  r: 1,
});
const stroke = (name, width) => ({
  ty: "st",
  c: fixed(color(name)),
  o: fixed(100),
  w: fixed(width),
  lc: 2,
  lj: 2,
});
const transform = (extra = {}) => ({
  p: fixed([0, 0]),
  a: fixed([0, 0]),
  s: fixed([100, 100]),
  r: fixed(0),
  o: fixed(100),
  ...extra,
});
const group = (items, extra = {}) => ({
  ty: "gr",
  it: [
    ...items.filter((item) => !["fl", "st"].includes(item.ty)).toReversed(),
    ...items.filter((item) => ["fl", "st"].includes(item.ty)),
    { ty: "tr", ...transform(extra) },
  ],
});
const ellipse = (x, y, rx, ry, tone, opacity = 100) =>
  group([
    { ty: "el", p: fixed([x, y]), s: fixed([rx * 2, ry * 2]) },
    fill(tone, opacity),
  ]);
const round = (n) => Math.round(n * 100) / 100;
function curve(vertices, tension = 0.88, closed = true) {
  const at = (n) => vertices[(n + vertices.length) % vertices.length];
  const tangent = (n) => {
    if (!closed && (n === 0 || n === vertices.length - 1)) return [0, 0];
    return [0, 1].map((axis) =>
      round(((at(n + 1)[axis] - at(n - 1)[axis]) * tension) / 6),
    );
  };
  return {
    c: closed,
    v: vertices,
    i: vertices.map((_, n) => tangent(n).map((v) => -v)),
    o: vertices.map((_, n) => tangent(n)),
  };
}
const shape = (data) => ({ ty: "sh", ks: fixed(data) });
const morph = (poses) => ({
  ty: "sh",
  ks: keys(poses.map(([t, data]) => [t, [data]])),
});
const drawn = (vertices, tone, tension = 0.88) =>
  group([shape(curve(vertices, tension)), fill(tone)]);
let index = 0;
const layers = [];
function paint(name, shapes, extra = {}) {
  layers.push({
    ddd: 0,
    ind: ++index,
    ty: 4,
    nm: name,
    sr: 1,
    ks: transform(extra),
    shapes: shapes.toReversed(),
    ip: 0,
    op: end,
    st: 0,
    bm: 0,
  });
}
function roundedQuad(corners, inset = 0.13) {
  const vertices = [],
    incoming = [],
    outgoing = [];
  const mix = (a, b, n) => a.map((x, axis) => round(x + (b[axis] - x) * n));
  corners.forEach((corner, n) => {
    const previous = corners[(n + 3) % 4];
    const next = corners[(n + 1) % 4];
    const before = mix(corner, previous, inset);
    const after = mix(corner, next, inset);
    vertices.push(before, after);
    incoming.push(
      [0, 0],
      corner.map((x, axis) => round((x - after[axis]) * 0.67)),
    );
    outgoing.push(
      corner.map((x, axis) => round((x - before[axis]) * 0.67)),
      [0, 0],
    );
  });
  return { c: true, v: vertices, i: incoming, o: outgoing };
}

const phonePoses = [
  [
    0,
    [
      [361, 166],
      [431, 178],
      [407, 333],
      [337, 321],
    ],
  ],
  [
    70,
    [
      [361, 166],
      [431, 178],
      [407, 333],
      [337, 321],
    ],
  ],
  [
    91,
    [
      [360, 164],
      [431, 177],
      [408, 333],
      [337, 321],
    ],
  ],
  [
    109,
    [
      [367, 186],
      [437, 199],
      [411, 335],
      [338, 323],
    ],
  ],
  [
    133,
    [
      [379, 243],
      [450, 258],
      [418, 340],
      [341, 328],
    ],
  ],
  [
    153,
    [
      [376, 300],
      [453, 315],
      [423, 348],
      [340, 335],
    ],
  ],
  [
    170,
    [
      [355, 327],
      [441, 338],
      [419, 355],
      [330, 344],
    ],
  ],
  [
    184,
    [
      [350, 325],
      [438, 335],
      [418, 354],
      [328, 343],
    ],
  ],
  [
    end,
    [
      [350, 325],
      [438, 335],
      [418, 354],
      [328, 343],
    ],
  ],
];
const insetQuad = (points, factor) => {
  const center = [0, 1].map(
    (a) => points.reduce((sum, p) => sum + p[a], 0) / 4,
  );
  return points.map((p) =>
    p.map((v, a) => round(center[a] + (v - center[a]) * factor)),
  );
};
const phoneContact = (points) => [
  round(points[0][0] * 0.72 + points[3][0] * 0.28 - 3),
  round(points[0][1] * 0.72 + points[3][1] * 0.28 + 1),
];
const handPoses = [
  [0, [305, 321]],
  [42, [305, 321]],
  [62, [307, 294]],
  [78, [331, 245]],
  ...Array.from({ length: 94 }, (_, n) => [
    91 + n,
    phoneContact(smoothSample(phonePoses, 91 + n)),
  ]),
  [207, [317, 317]],
  [237, [306, 325]],
  [258, [309, 323]],
  [end, [309, 323]],
];
paint("Ground contact", [
  ellipse(277, 346, 213, 24, "mint"),
  ellipse(208, 334, 122, 9, "ink", 8),
]);
paint("Phone thickness", [
  group([
    morph(
      phonePoses.map(([t, q]) => [
        t,
        roundedQuad(q.map(([x, y]) => [x + 3, y + 5])),
      ]),
    ),
    fill("blueEdge"),
  ]),
]);
paint("Phone frame", [
  group([morph(phonePoses.map(([t, q]) => [t, roundedQuad(q)])), fill("blue")]),
]);
paint(
  "Phone screen",
  [
    group([
      morph(phonePoses.map(([t, q]) => [t, roundedQuad(insetQuad(q, 0.84))])),
      fill("paper"),
    ]),
  ],
  {
    o: keys([
      [0, 100],
      [125, 100],
      [158, 0],
      [end, 0],
    ]),
  },
);
paint(
  "Illustrated feed",
  [
    ellipse(377, 201, 6, 6, "sage"),
    drawn(
      [
        [370, 225],
        [415, 233],
        [407, 273],
        [363, 266],
      ],
      "blue",
      0,
    ),
    drawn(
      [
        [365, 257],
        [382, 240],
        [392, 253],
        [407, 244],
        [407, 273],
        [363, 266],
      ],
      "sage",
      0,
    ),
    ellipse(404, 241, 4, 4, "warm"),
    group([
      shape(
        curve(
          [
            [365, 286],
            [393, 291],
          ],
          0,
          false,
        ),
      ),
      stroke("binding", 5),
    ]),
  ],
  {
    o: keys([
      [0, 100],
      [103, 100],
      [139, 0],
      [end, 0],
    ]),
    p: keys([
      [0, [0, 3]],
      [34, [0, -4]],
      [70, [0, 0]],
      [end, [0, 0]],
    ]),
  },
);
paint(
  "Phone back camera",
  [ellipse(419, 338, 5, 2.4, "ink"), ellipse(406, 336, 4, 2.2, "ink")],
  {
    o: keys([
      [0, 0],
      [157, 0],
      [176, 100],
      [end, 100],
    ]),
  },
);

mkdirSync(destination, { recursive: true });
for (const item of layers) {
  if (item.ks.p.a === 0)
    item.ks.p.k = item.ks.p.k.map((value, axis) => value - [20, 65][axis]);
  else
    for (const key of item.ks.p.k)
      key.s = key.s.map((value, axis) => value - [20, 65][axis]);
}
const animation = {
  v: "5.13.0",
  fr: fps,
  ip: 0,
  op: end,
  w: 520,
  h: 330,
  nm: "C1 contact to journal study",
  ddd: 0,
  assets: [],
  c1Motion: {
    source: "/c1-master.png",
    sourceSize: 1280,
    origin: [26, 25],
    width: 360,
    offset: [20, 65],
    hand: keys(handPoses),
    head: keys([
      [0, [0, 0]],
      [38, [1, 1]],
      [58, [-3, -5]],
      [79, [-2, -4]],
      [107, [2, 0]],
      [160, [5, 4]],
      [191, [3, 2]],
      [224, [0, 0]],
      [251, [0, 1]],
      [end, [0, 1]],
    ]),
    bend: keys([
      [0, 1],
      [58, 3],
      [91, -3],
      [133, 5],
      [170, 2],
      [208, -1],
      [237, 0],
      [end, 0],
    ]),
  },
  layers: layers.reverse(),
  markers: [
    { tm: 0, cm: "observe", dr: 42 },
    { tm: 42, cm: "anticipate", dr: 28 },
    { tm: 70, cm: "reach", dr: 21 },
    { tm: 91, cm: "contact", dr: 93 },
    { tm: 184, cm: "release", dr: 53 },
    { tm: 237, cm: "settle", dr: 99 },
    { tm: 336, cm: "open-journal", dr: 54 },
    { tm: 390, cm: "make-first-mark", dr: 60 },
  ],
};
writeFileSync(`${destination}/contact-study.json`, JSON.stringify(animation));
console.log(
  `Wrote ${destination}/contact-study.json (${Buffer.byteLength(JSON.stringify(animation))} bytes)`,
);
