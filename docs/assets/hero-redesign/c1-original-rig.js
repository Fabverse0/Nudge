const vertexSource = `
precision highp float;
attribute vec2 aUV;
varying vec2 vUV;
uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform vec2 uOffset;
uniform float uScale;
uniform float uFrame;
void main() {
  vUV = aUV;
  vec2 point = aUV * 1280.0;
  float breath = sin(uFrame * 0.055) * 0.004;
  point = (point - vec2(650.0, 930.0)) * (1.0 + breath) + vec2(650.0, 930.0);
  vec2 world = uOrigin + point * uScale;
  world -= uOffset;
  gl_Position = vec4(world.x / uResolution.x * 2.0 - 1.0, 1.0 - world.y / uResolution.y * 2.0, 0.0, 1.0);
}`;

const fragmentSource = `
precision highp float;
varying vec2 vUV;
uniform sampler2D uImage;
void main() {
  vec4 pixel = texture2D(uImage, vUV);
  if (pixel.a < 0.01) discard;
  gl_FragColor = pixel;
}`;

export function createOriginalC1Rig(canvas, image, motion) {
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
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.viewport(0, 0, canvas.width, canvas.height);
  const location = Object.fromEntries(
    [
      "uResolution",
      "uOrigin",
      "uOffset",
      "uScale",
      "uFrame",
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
    render(frame) {
      if (lost) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(location.uFrame, frame);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    },
    destroy() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}
