import { readFileSync, writeFileSync } from "node:fs";
import * as fontkit from "fontkit";

const source = JSON.parse(
  readFileSync("docs/assets/landing-motion/phone-source.json", "utf8"),
);
const palette = {
  ink: "#315F5E",
  sage: "#679F9E",
  blue: "#7EADDB",
  sand: "#E6D4BE",
  paper: "#FAF8F4",
  mint: "#E8F1EC",
  edge: "#4C7C7B",
  binding: "#CBAF8B",
};
const color = (name) => [
  ...palette[name]
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255),
  1,
];
const fixed = (k) => ({ a: 0, k });
const storyTime = (frame) => {
  if (frame <= 139) return frame * 0.75;
  if (frame <= 158) return 104.25 + (frame - 139) * 2.65;
  return 154.6 + (frame - 158) * (25.4 / 22);
};
const keys = (values) => ({
  a: 1,
  k: values.map(([t, s]) => ({
    t: storyTime(t),
    s: Array.isArray(s) ? s : [s],
    i: { x: [0.67], y: [1] },
    o: { x: [0.33], y: [0] },
  })),
});
const transform = (p = [0, 0, 0], extra = {}) => ({
  p: fixed(p),
  a: fixed([0, 0, 0]),
  s: fixed([100, 100, 100]),
  r: fixed(0),
  o: fixed(100),
  ...extra,
});
const fill = (name) => ({
  ty: "fl",
  c: fixed(color(name)),
  o: fixed(100),
  r: 1,
});
const stroke = (name, width = 4) => ({
  ty: "st",
  c: fixed(color(name)),
  o: fixed(100),
  w: fixed(width),
  lc: 2,
  lj: 2,
});
const group = (shapes, p = [0, 0]) => ({
  ty: "gr",
  it: [...shapes, { ty: "tr", ...transform(p) }],
});
const rect = (x, y, w, h, radius, tone) =>
  group([
    {
      ty: "rc",
      s: fixed([w, h]),
      p: fixed([x + w / 2, y + h / 2]),
      r: fixed(radius),
    },
    fill(tone),
  ]);
const circle = (x, y, radius, tone) =>
  group([
    { ty: "el", s: fixed([radius * 2, radius * 2]), p: fixed([x, y]) },
    fill(tone),
  ]);
const path = (vertices, closed = true, incoming, outgoing) => ({
  ty: "sh",
  ks: fixed({
    v: vertices,
    i: incoming || vertices.map(() => [0, 0]),
    o: outgoing || vertices.map(() => [0, 0]),
    c: closed,
  }),
});
const polygon = (v, tone) => group([path(v), fill(tone)]);
const line = (v, tone, width = 4) =>
  group([path(v, false), stroke(tone, width)]);
let index = 1;
const layer = (nm, shapes, ks = transform()) => ({
  ddd: 0,
  ind: index++,
  ty: 4,
  nm,
  sr: 1,
  ks,
  shapes,
  ip: 0,
  op: 180,
  st: 0,
  bm: 0,
});
const precomp = (nm, refId, w, h, ks) => ({
  ddd: 0,
  ind: index++,
  ty: 0,
  nm,
  refId,
  w,
  h,
  sr: 1,
  ks,
  ip: 0,
  op: 180,
  st: 0,
  bm: 0,
});
const font = fontkit
  .openSync("docs/assets/turtle-c1/Nunito-Variable.ttf")
  .getVariation({ wght: 800 });

function lettering(text, size, center, baseline, tone = "ink") {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  let cursor =
    center - run.positions.reduce((sum, p) => sum + p.xAdvance * scale, 0) / 2;
  const contours = [];
  for (let n = 0; n < run.glyphs.length; n++) {
    let v = [],
      i = [],
      o = [];
    const point = (x, y) => [
      cursor + (x + run.positions[n].xOffset) * scale,
      baseline - (y + run.positions[n].yOffset) * scale,
    ];
    const append = (p) => {
      v.push(p);
      i.push([0, 0]);
      o.push([0, 0]);
    };
    const finish = () => {
      if (v.length) contours.push(path(v, true, i, o));
      v = [];
      i = [];
      o = [];
    };
    for (const command of run.glyphs[n].path.commands) {
      const a = command.args;
      if (command.command === "moveTo") {
        finish();
        append(point(a[0], a[1]));
      } else if (command.command === "lineTo") append(point(a[0], a[1]));
      else if (command.command === "quadraticCurveTo") {
        const previous = v.at(-1),
          control = point(a[0], a[1]),
          end = point(a[2], a[3]);
        o[o.length - 1] = control.map((c, j) => ((c - previous[j]) * 2) / 3);
        append(end);
        i[i.length - 1] = control.map((c, j) => ((c - end[j]) * 2) / 3);
      } else if (command.command === "bezierCurveTo") {
        const previous = v.at(-1),
          first = point(a[0], a[1]),
          second = point(a[2], a[3]),
          end = point(a[4], a[5]);
        o[o.length - 1] = first.map((c, j) => c - previous[j]);
        append(end);
        i[i.length - 1] = second.map((c, j) => c - end[j]);
      } else if (command.command === "closePath") finish();
    }
    finish();
    cursor += run.positions[n].xAdvance * scale;
  }
  return group([...contours, fill(tone)]);
}

function book() {
  return [
    polygon(
      [
        [-80, -38],
        [-3, -45],
        [77, -34],
        [80, 54],
        [0, 44],
        [-80, 51],
      ],
      "sage",
    ),
    polygon(
      [
        [-76, -46],
        [-3, -53],
        [0, 36],
        [-76, 43],
      ],
      "sand",
    ),
    polygon(
      [
        [0, -53],
        [74, -42],
        [77, 46],
        [0, 36],
      ],
      "paper",
    ),
    line(
      [
        [0, -51],
        [0, 36],
      ],
      "binding",
      3,
    ),
    line(
      [
        [-60, -25],
        [-22, -28],
      ],
      "binding",
      4,
    ),
    line(
      [
        [-60, -10],
        [-30, -13],
      ],
      "binding",
      4,
    ),
    line(
      [
        [16, -24],
        [57, -18],
      ],
      "sage",
      4,
    ),
    line(
      [
        [16, -9],
        [51, -4],
      ],
      "sage",
      4,
    ),
    polygon(
      [
        [43, 9],
        [53, 11],
        [53, 47],
        [48, 39],
        [43, 46],
      ],
      "blue",
    ),
  ];
}

function sprout() {
  return [
    line(
      [
        [0, 17],
        [0, -57],
      ],
      "ink",
      6,
    ),
    group([
      path(
        [
          [0, -24],
          [-39, -62],
          [-44, -28],
        ],
        true,
        [
          [-5, -25],
          [0, 0],
          [0, 0],
        ],
        [
          [-17, -21],
          [-5, 23],
          [20, 14],
        ],
      ),
      fill("sage"),
    ]),
    group([
      path(
        [
          [0, -44],
          [39, -85],
          [45, -47],
        ],
        true,
        [
          [5, -28],
          [0, 0],
          [0, 0],
        ],
        [
          [16, -21],
          [9, 23],
          [-22, 17],
        ],
      ),
      fill("ink"),
    ]),
    polygon(
      [
        [-31, 0],
        [32, 0],
        [23, 53],
        [-22, 53],
      ],
      "binding",
    ),
    polygon(
      [
        [-32, -5],
        [31, -5],
        [24, 43],
        [-24, 43],
      ],
      "sand",
    ),
    rect(-36, -10, 72, 15, 6, "sand"),
  ];
}

function article(y, variant) {
  const artwork =
    variant % 3 === 0
      ? [
          rect(0, 0, 154, 85, 12, "blue"),
          circle(119, 21, 11, "paper"),
          polygon(
            [
              [0, 70],
              [51, 27],
              [95, 70],
            ],
            "sage",
          ),
          polygon(
            [
              [54, 85],
              [112, 43],
              [154, 82],
              [154, 85],
            ],
            "ink",
          ),
        ]
      : variant % 3 === 1
        ? [rect(0, 0, 154, 85, 12, "sand"), group(book(), [77, 44])]
        : [rect(0, 0, 154, 85, 12, "mint"), group(sprout(), [79, 48])];
  // Scale the same book and plant drawings inside the feed before they become physical props.
  if (variant % 3 === 1) artwork[1].it.at(-1).s = fixed([55, 55, 100]);
  if (variant % 3 === 2) artwork[1].it.at(-1).s = fixed([47, 47, 100]);
  return group(
    [
      ...artwork,
      circle(9, 98, 6, "sage"),
      rect(22, 94, 71, 7, 3, "sage"),
      rect(22, 107, 101, 5, 2, "sand"),
    ],
    [7, y],
  );
}

const feedMove = keys([
  [0, [0, 0, 0]],
  [24, [0, -65, 0]],
  [40, [0, -65, 0]],
  [63, [0, -134, 0]],
  [83, [0, -144, 0]],
  [96, [0, -144, 0]],
  [160, [0, -144, 0]],
  [174, [0, 0, 0]],
  [180, [0, 0, 0]],
]);
const feedOpacity = keys([
  [0, 100],
  [84, 100],
  [101, 0],
  [167, 0],
  [180, 100],
]);
const feed = layer(
  "Colorful illustrated feed",
  [article(0, 0), article(126, 1), article(252, 2), article(378, 0)],
  transform([0, 0, 0], { p: feedMove, o: feedOpacity }),
);
const invitation = layer(
  "Pause invitation",
  [
    rect(0, 0, 168, 235, 10, "mint"),
    lettering("Jeda sebentar?", 18, 84, 65),
    lettering("Mulai kecil.", 14, 84, 89),
    group(book(), [84, 155]),
  ],
  transform([0, 0, 0], {
    o: keys([
      [0, 0],
      [84, 0],
      [102, 100],
      [158, 100],
      [175, 0],
      [180, 0],
    ]),
  }),
);
invitation.shapes.at(-1).it.at(-1).s = fixed([55, 55, 100]);
invitation.shapes.at(-1).it.at(-1).o = keys([
  [0, 100],
  [94, 100],
  [103, 0],
  [180, 0],
]);
const screenAsset = { id: "nudge-screen", layers: [invitation, feed] };
const sourceOutline = structuredClone(
  source.layers.find((l) => l.nm === "Outline").shapes[0].it[0],
);
sourceOutline.s = fixed([200, 326]);
sourceOutline.p = fixed([130, 180]);
sourceOutline.r = fixed(29);
const handset = layer("Dimensional sage handset", [
  rect(36, 26, 206, 330, 33, "edge"),
  rect(27, 14, 206, 330, 33, "ink"),
  rect(38, 25, 184, 307, 23, "paper"),
  group([sourceOutline, stroke("sage", 3)]),
  rect(100, 35, 63, 13, 7, "ink"),
  circle(153, 41, 3, "sage"),
  rect(231, 104, 5, 45, 3, "sage"),
  rect(20, 92, 5, 23, 3, "edge"),
  rect(108, 321, 48, 4, 2, "sage"),
]);
// Lottie shape arrays paint their first items last; reverse authored back-to-front shapes.
const reverseGroups = (node) => {
  if (node.ty === "gr") {
    const tr = node.it.at(-1);
    const shapes = node.it.slice(0, -1);
    shapes.forEach(reverseGroups);
    // Fill/stroke must remain after their associated geometry.
    if (shapes.every((s) => s.ty === "gr")) node.it = [...shapes.reverse(), tr];
  }
};
const screen = precomp(
  "Feed viewport",
  "nudge-screen",
  168,
  235,
  transform([46, 76, 0]),
);
const phoneAsset = { id: "nudge-handset", layers: [screen, handset] };
const phone = precomp(
  "Tilted phone",
  "nudge-handset",
  260,
  370,
  transform([288, 204, 0], {
    a: fixed([130, 185, 0]),
    r: keys([
      [0, -8],
      [84, -8],
      [122, -13],
      [158, -13],
      [180, -8],
    ]),
  }),
);
const emergingBook = layer(
  "Book leaves the screen",
  book(),
  transform([298, 248, 0], {
    p: keys([
      [0, [298, 248, 0]],
      [94, [298, 248, 0]],
      [132, [144, 327, 0]],
      [155, [144, 327, 0]],
      [180, [298, 248, 0]],
    ]),
    s: keys([
      [0, [55, 55, 100]],
      [94, [55, 55, 100]],
      [132, [100, 100, 100]],
      [155, [100, 100, 100]],
      [180, [55, 55, 100]],
    ]),
    r: keys([
      [0, -8],
      [94, -8],
      [132, -14],
      [155, -14],
      [180, -8],
    ]),
    o: keys([
      [0, 0],
      [94, 0],
      [103, 100],
      [157, 100],
      [176, 0],
      [180, 0],
    ]),
  }),
);
const plant = layer(
  "Plant grows beside the phone",
  sprout(),
  transform([410, 331, 0], {
    s: keys([
      [0, [14, 14, 100]],
      [110, [14, 14, 100]],
      [139, [100, 100, 100]],
      [158, [100, 100, 100]],
      [180, [14, 14, 100]],
    ]),
    r: keys([
      [0, 7],
      [110, 7],
      [139, 0],
      [150, 0],
      [158, 0],
      [180, 7],
    ]),
    o: keys([
      [0, 0],
      [110, 0],
      [124, 100],
      [158, 100],
      [178, 0],
      [180, 0],
    ]),
  }),
);
const trail = layer(
  "A small path into the real world",
  [
    circle(78, 378, 6, "sage"),
    rect(86, 358, 12, 19, 6, "sage"),
    circle(110, 391, 6, "sage"),
    rect(118, 371, 12, 19, 6, "sage"),
  ],
  transform([0, 0, 0], {
    o: keys([
      [0, 0],
      [117, 0],
      [140, 70],
      [158, 70],
      [179, 0],
    ]),
  }),
);
// Reverse groups of independent painted objects, preserving the transform at each group's end.
for (const l of [handset, emergingBook, plant, trail, feed, invitation]) {
  l.shapes.forEach(reverseGroups);
  l.shapes.reverse();
}
const animation = {
  v: "5.13.0",
  fr: 30,
  ip: 0,
  op: 180,
  w: 520,
  h: 430,
  ddd: 0,
  nm: "Nudge: from colorful scrolling to a small activity",
  assets: [screenAsset, phoneAsset],
  layers: [emergingBook, plant, phone, trail],
};
// Spatial handles keep the book's flight on one arc, without stopping midway.
emergingBook.ks.p.k[1].to = [-74, -16, 0];
emergingBook.ks.p.k[1].ti = [18, -68, 0];
emergingBook.ks.p.k[3].to = [65, 0, 0];
emergingBook.ks.p.k[3].ti = [-55, 20, 0];
for (const [item, name] of [
  [feed, "feed"],
  [invitation, "invitation"],
  [emergingBook, "book"],
  [plant, "plant"],
  [phone, "handset"],
])
  item.cl = `phone-story-${name}`;
const output = "public/brand/landing/motion/phone.json";
writeFileSync(
  output,
  JSON.stringify(animation, (_key, value) =>
    typeof value === "number" ? Math.round(value * 100) / 100 : value,
  ),
);
console.log(`${output}: ${readFileSync(output).length} bytes`);
