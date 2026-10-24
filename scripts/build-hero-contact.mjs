import { mkdirSync, writeFileSync } from "node:fs";

const destination = "docs/assets/hero-redesign";
const fps = 60;
const end = 336;
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
function armOutline([x, y]) {
  const shoulder = [300, 299];
  const dx = x - shoulder[0],
    dy = y - shoulder[1];
  const length = Math.hypot(dx, dy);
  const normal = [-dy / length, dx / length];
  const middle = [shoulder[0] + dx * 0.53 - 4, shoulder[1] + dy * 0.53 + 10];
  const offset = (point, width) =>
    point.map((v, a) => round(v + normal[a] * width));
  return curve(
    [
      offset(shoulder, -23),
      offset(middle, -19),
      offset([x, y], -17),
      [round(x + (dx / length) * 17), round(y + (dy / length) * 17)],
      offset([x, y], 17),
      offset(middle, 19),
      offset(shoulder, 23),
    ],
    0.92,
  );
}

paint("Ground contact", [
  ellipse(277, 346, 213, 24, "mint"),
  ellipse(208, 334, 122, 9, "ink", 8),
]);
paint("Rear feet planted", [
  ellipse(113, 319, 28, 18, "sand"),
  ellipse(240, 322, 26, 17, "sand"),
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

paint("Soft belly", [
  drawn(
    [
      [122, 278],
      [170, 259],
      [235, 265],
      [269, 300],
      [244, 327],
      [160, 328],
      [123, 310],
    ],
    "sand",
  ),
]);
const shell = [
  [92, 280],
  [104, 201],
  [160, 133],
  [239, 120],
  [313, 155],
  [350, 217],
  [351, 291],
  [195, 318],
];
const shellDeform = (dx, dy, squash) =>
  curve(
    shell.map(([x, y]) => [round(x + dx + (y - 280) * squash), round(y + dy)]),
  );
paint(
  "Shell contour deformation",
  [
    group([
      morph([
        [0, shellDeform(0, 1, 0.025)],
        [47, shellDeform(-3, -1, -0.015)],
        [72, shellDeform(-4, -5, -0.02)],
        [107, shellDeform(1, 0, 0.02)],
        [158, shellDeform(5, 5, 0.05)],
        [195, shellDeform(1, 1, 0.01)],
        [239, shellDeform(0, 0, 0)],
        [end, shellDeform(0, 0, 0)],
      ]),
      fill("sage"),
    ]),
    drawn(
      [
        [96, 270],
        [137, 286],
        [172, 262],
        [196, 233],
        [185, 271],
        [166, 302],
        [110, 306],
      ],
      "edge",
      0.75,
    ),
  ],
  {
    p: keys([
      [0, [0, 0]],
      [70, [-2, -2]],
      [156, [3, 3]],
      [220, [0, 0]],
      [end, [0, 0]],
    ]),
  },
);
paint(
  "Shell light plane",
  [
    group([
      shape(
        curve(
          [
            [120, 196],
            [161, 151],
            [209, 133],
          ],
          0.8,
          false,
        ),
      ),
      stroke("light", 9),
    ]),
  ],
  {
    p: keys([
      [0, [0, 0]],
      [70, [-4, -5]],
      [156, [4, 5]],
      [220, [0, 0]],
      [end, [0, 0]],
    ]),
  },
);

paint("Far front foot planted", [ellipse(245, 324, 29, 19, "sand")]);
const headPosition = keys([
  [0, [262, 250]],
  [38, [263, 253]],
  [58, [252, 237]],
  [79, [256, 238]],
  [107, [273, 255]],
  [160, [279, 270]],
  [191, [278, 266]],
  [224, [265, 252]],
  [251, [266, 254]],
  [end, [266, 254]],
]);
const headRotation = keys([
  [0, -5],
  [38, -3],
  [58, -12],
  [79, -8],
  [112, 0],
  [160, 10],
  [191, 5],
  [224, -4],
  [end, -4],
]);
const face = [
  [-78, -17],
  [-50, -62],
  [6, -72],
  [62, -48],
  [81, 0],
  [58, 53],
  [0, 68],
  [-59, 47],
];
paint(
  "Head and acting",
  [
    drawn(face, "sand"),
    group([
      shape(
        curve(
          [
            [-52, -31],
            [-32, -52],
            [-4, -59],
          ],
          0.8,
          false,
        ),
      ),
      stroke("warm", 9),
    ]),
    ellipse(-57, 24, 10, 4, "binding", 40),
    ellipse(58, 17, 9, 4, "binding", 40),
    group(
      [
        group([ellipse(0, 0, 14, 20, "edge"), ellipse(4, -7, 4, 5, "paper")], {
          p: fixed([-40, -6]),
          r: fixed(15),
        }),
        group(
          [ellipse(0, 0, 12, 18, "edge"), ellipse(4, -6, 3.6, 4.8, "paper")],
          { p: fixed([44, -9]), r: fixed(12) },
        ),
      ],
      {
        p: keys([
          [0, [4, 1]],
          [41, [4, 2]],
          [61, [-2, -4]],
          [87, [0, -2]],
          [126, [4, 3]],
          [183, [3, 4]],
          [223, [-1, 0]],
          [end, [-1, 0]],
        ]),
        s: keys([
          [0, [100, 100]],
          [22, [100, 100]],
          [26, [100, 9]],
          [30, [100, 100]],
          [53, [100, 100]],
          [66, [108, 113]],
          [90, [100, 100]],
          [207, [100, 100]],
          [211, [100, 7]],
          [215, [100, 100]],
          [end, [100, 100]],
        ]),
      },
    ),
    group(
      [
        shape(
          curve(
            [
              [-16, 26],
              [-2, 33],
              [12, 33],
              [26, 25],
              [26, 34],
              [14, 44],
              [0, 43],
              [-13, 35],
            ],
            0.95,
            true,
          ),
        ),
        fill("edge"),
      ],
      {
        o: keys([
          [0, 100],
          [49, 100],
          [52, 0],
          [92, 0],
          [96, 100],
          [end, 100],
        ]),
      },
    ),
    group([ellipse(7, 28, 5, 7.5, "edge")], {
      o: keys([
        [0, 0],
        [52, 0],
        [56, 100],
        [88, 100],
        [92, 0],
        [end, 0],
      ]),
    }),
  ],
  { p: headPosition, r: headRotation },
);
paint("Reaching arm", [
  group([morph(handPoses.map(([t, p]) => [t, armOutline(p)])), fill("sand")]),
]);
paint(
  "Contact paw",
  [ellipse(0, 0, 23, 19, "sand"), ellipse(3, -5, 12, 5, "warm", 45)],
  {
    p: keys(handPoses),
    s: keys([
      [0, [100, 100]],
      [90, [97, 105]],
      [171, [110, 86]],
      [208, [100, 100]],
      [end, [100, 100]],
    ]),
  },
);
paint(
  "Near supporting foot",
  [ellipse(175, 323, 38, 27, "sand"), ellipse(167, 309, 16, 6, "warm", 35)],
  {
    s: keys([
      [0, [100, 100]],
      [70, [100, 100]],
      [157, [103, 97]],
      [221, [100, 100]],
      [end, [100, 100]],
    ]),
    a: fixed([177, 338]),
    p: fixed([177, 338]),
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
  nm: "C1 contact study: reach, lower, release",
  ddd: 0,
  assets: [],
  layers: layers.reverse(),
  markers: [
    { tm: 0, cm: "observe", dr: 42 },
    { tm: 42, cm: "anticipate", dr: 28 },
    { tm: 70, cm: "reach", dr: 21 },
    { tm: 91, cm: "contact", dr: 93 },
    { tm: 184, cm: "release", dr: 53 },
    { tm: 237, cm: "settle", dr: 99 },
  ],
};
writeFileSync(`${destination}/contact-study.json`, JSON.stringify(animation));
console.log(
  `Wrote ${destination}/contact-study.json (${Buffer.byteLength(JSON.stringify(animation))} bytes)`,
);
