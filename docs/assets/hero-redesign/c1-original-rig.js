const vertexSource = `
precision highp float;
attribute vec2 aUV;
varying vec2 vUV;
uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform vec2 uOffset;
uniform vec2 uHead;
uniform vec2 uHand;
uniform float uScale;
uniform float uBend;
uniform float uArm;
uniform float uReference;

float softRegion(vec2 point, vec2 center, vec2 radius) {
  return 1.0 - smoothstep(0.55, 1.0, length((point - center) / radius));
}
void main() {
  vUV = aUV;
  vec2 source = aUV * 1280.0;
  vec2 point = source;
  vec2 world;
  if (uReference > 0.5) {
    world = uOrigin + point * uScale;
  } else if (uArm > 0.5) {
    vec2 pivot = vec2(955.0, 885.0);
    vec2 contact = vec2(1135.0, 700.0);
    vec2 axis = normalize(contact - pivot);
    vec2 normal = vec2(-axis.y, axis.x);
    vec2 root = uOrigin + pivot * uScale + uHead * 0.2;
    vec2 targetAxis = normalize(uHand - root);
    vec2 targetNormal = vec2(-targetAxis.y, targetAxis.x);
    float reach = length(uHand - root);
    float along = dot(point - pivot, axis);
    float across = dot(point - pivot, normal);
    float progress = along / length(contact - pivot);
    float thickness = clamp(sqrt(length(contact - pivot) * uScale / reach), 0.85, 1.15);
    world = root + targetAxis * (progress * reach)
      + targetNormal * (across * uScale * thickness)
      + targetNormal * (sin(clamp(progress, 0.0, 1.0) * 3.14159265) * uBend);
  } else {
    float head = softRegion(source, vec2(720.0, 690.0), vec2(440.0, 400.0));
    world = uOrigin + point * uScale + uHead * head;
  }
  world -= uOffset;
  gl_Position = vec4(world.x / uResolution.x * 2.0 - 1.0, 1.0 - world.y / uResolution.y * 2.0, 0.0, 1.0);
}`;

const fragmentSource = `
precision highp float;
varying vec2 vUV;
uniform sampler2D uImage;
uniform float uArm;
uniform float uReference;
void main() {
  vec4 pixel = texture2D(uImage, vUV);
  if (pixel.a < 0.01) discard;
  gl_FragColor = pixel;
}`;

// This curve follows the original cheek, retaining its pixels in the body
// plate. The moving foreleg has its own complete texture, without face pixels.
const removalOutline =
  "M 1018 688 C 1027 776 998 854 929 895 " +
  "L 1280 940 L 1280 605 L 1130 605 C 1084 605 1035 648 1018 688 Z";

function makeParts(image, repair, foreleg) {
  function plate() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1280;
    return [canvas, canvas.getContext("2d")];
  }
  const removal = new Path2D(removalOutline);
  const [bodyOriginal, bodyContext] = plate();
  bodyContext.drawImage(image, 0, 0, 1280, 1280);
  bodyContext.globalCompositeOperation = "destination-out";
  bodyContext.fill(removal);
  const [arm, armContext] = plate();
  armContext.drawImage(foreleg, 0, 0, 1280, 1280);
  const pixels = armContext.getImageData(0, 0, 1280, 1280).data;
  let left = 1280,
    top = 1280,
    right = 0,
    bottom = 0;
  for (let y = 0; y < 1280; y++) {
    for (let x = 0; x < 1280; x++) {
      if (pixels[(y * 1280 + x) * 4 + 3] < 32) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }
  if (right <= left || bottom <= top) throw new Error("Aset kaki C1 kosong.");
  armContext.clearRect(0, 0, 1280, 1280);
  const imageScaleX = foreleg.naturalWidth / 1280;
  const imageScaleY = foreleg.naturalHeight / 1280;
  armContext.drawImage(
    foreleg,
    left * imageScaleX,
    top * imageScaleY,
    (right - left + 1) * imageScaleX,
    (bottom - top + 1) * imageScaleY,
    910,
    625,
    300,
    310,
  );

  const [body, repairedContext] = plate();
  repairedContext.save();
  repairedContext.clip(removal);
  repairedContext.drawImage(repair, 0, 0, 1280, 1280);
  repairedContext.restore();
  repairedContext.drawImage(bodyOriginal, 0, 0);
  return { body, arm };
}

function sample(track, frame) {
  const values = track.k;
  let low = 0,
    high = values.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (values[middle].t <= frame) low = middle;
    else high = middle - 1;
  }
  const a = values[low],
    b = values[Math.min(low + 1, values.length - 1)];
  const progress =
    a.t === b.t ? 0 : Math.min(1, Math.max(0, (frame - a.t) / (b.t - a.t)));
  return a.s.map((value, axis) => value + (b.s[axis] - value) * progress);
}

export function createOriginalC1Rig(canvas, image, motion, repair, foreleg) {
  canvas.width = 1040;
  canvas.height = 660;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
  });
  if (!gl) throw new Error("WebGL tidak tersedia untuk studi gerak C1.");
  function shader(type, source) {
    const result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(result));
    return result;
  }
  const program = gl.createProgram();
  const vertex = shader(gl.VERTEX_SHADER, vertexSource);
  const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const vertices = [];
  const divisions = 64;
  for (let y = 0; y < divisions; y++)
    for (let x = 0; x < divisions; x++) {
      const a = [x / divisions, y / divisions],
        b = [(x + 1) / divisions, y / divisions];
      const c = [x / divisions, (y + 1) / divisions],
        d = [(x + 1) / divisions, (y + 1) / divisions];
      vertices.push(...a, ...b, ...c, ...b, ...d, ...c);
    }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const uv = gl.getAttribLocation(program, "aUV");
  gl.enableVertexAttribArray(uv);
  gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 0, 0);
  const parts = makeParts(image, repair, foreleg);
  const textures = [image, parts.body, parts.arm].map((part) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, part);
    return texture;
  });
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.viewport(0, 0, canvas.width, canvas.height);
  const location = Object.fromEntries(
    [
      "uResolution",
      "uOrigin",
      "uOffset",
      "uHead",
      "uHand",
      "uScale",
      "uBend",
      "uArm",
      "uReference",
    ].map((name) => [name, gl.getUniformLocation(program, name)]),
  );
  gl.uniform2f(location.uResolution, 520, 330);
  gl.uniform2fv(location.uOrigin, motion.origin);
  gl.uniform2fv(location.uOffset, motion.offset);
  gl.uniform1f(location.uScale, motion.width / motion.sourceSize);
  let lost = false;
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    lost = true;
    canvas.dataset.failed = "true";
  });
  return {
    render(frame, reference = false) {
      if (lost) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2fv(location.uHead, sample(motion.head, frame));
      gl.uniform2fv(location.uHand, sample(motion.hand, frame));
      gl.uniform1f(location.uBend, sample(motion.bend, frame)[0]);
      gl.uniform1f(location.uReference, reference ? 1 : 0);
      for (const arm of reference ? [0] : [1, 0]) {
        gl.bindTexture(gl.TEXTURE_2D, textures[reference ? 0 : arm ? 2 : 1]);
        gl.uniform1f(location.uArm, arm);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
      }
    },
    destroy() {
      textures.forEach((texture) => gl.deleteTexture(texture));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}
