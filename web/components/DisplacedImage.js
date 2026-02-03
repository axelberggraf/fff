"use client";

import { useEffect, useRef } from "react";

// ---------- TWEAK ----------
// All the knobs in one place.
// octaves is baked into the shader at compile time (GLSL1 needs a constant loop bound).
// The rest are uniforms, so they could be made dynamic / animated if you wanted.

const PERIOD = 50.0; // spatial frequency of the noise. higher = tighter ripples
const AMPLITUDE = 0.2; // displacement magnitude in UV space (~15 px at 512 wide)
const OCTAVES = 1; // number of noise layers summed (1–6 is the useful range)
const SPEED = 0.0; // time multiplier. higher = faster
const MOUSE_EASE = 0.08; // how fast the offset decays back to zero when mouse stops (0–1)

// ---------- GLSL ----------

const VERT = `
attribute vec2 a_pos;
varying   vec2 v_uv;
void main() {
  v_uv        = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// function buildFrag(octaves) {
//   return `
// precision highp float;
// varying  vec2 v_uv;
// uniform  sampler2D u_image;
// uniform  float     u_time;
// uniform  float     u_amplitude;  // displacement magnitude in UV space
// uniform  float     u_period;     // spatial frequency base
// uniform  float     u_speed;      // time multiplier
// uniform  vec2      u_offset;     // accumulated mouse-driven noise offset

// /* ---------- 2-D simplex noise ---------- */
// vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
// vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
// vec3 permute(vec3 x){ return mod289(((x*34.0)+10.0)*x); }

// float snoise(vec2 v) {
//   const vec4 C = vec4(0.211325, 0.366025, -0.577350, 0.024192);
//   vec2 i  = floor(v + dot(v, C.yy));
//   vec2 x0 = v - i + dot(i, C.xx);

//   vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
//   vec4 x12 = vec4(x0.xy, x0.xy) + vec4(C.xx, C.yy) - vec4(i1, 0.0, 0.0);
//   x12.zw += C.xx;

//   i = mod289(i);
//   vec3 p = permute(permute(
//     i.y  + vec3(0.0, i1.y, 1.0))
//   + i.x  + vec3(0.0, i1.x, 1.0));

//   vec3 m = max(0.5 - vec3(
//     dot(x0,  x0),
//     dot(x12.xy, x12.xy),
//     dot(x12.zw, x12.zw)
//   ), 0.0);
//   m = m*m;

//   vec3 x  = 2.0*fract(p * 0.024192) - 1.0;
//   vec3 h  = 1.0 - abs(x);
//   vec3 a0 = x - sign(x) * step(h, vec3(0.0));

//   vec3 norm = 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
//   a0 *= norm.xyz;
//   h  *= norm.xyz;

//   vec3 g;
//   g.x = a0.x*x0.x  + h.x*x0.y;
//   g.y = a0.y*x12.x + h.y*x12.y;
//   g.z = a0.z*x12.z + h.z*x12.w;

//   m = m*m*m;
//   return 130.0 * dot(m, g);
// }

// // fbm: sums ${octaves} octave(s). loop bound is a compile-time literal.
// float fbm(vec2 p) {
//   float value = 0.0;
//   float amp   = 1.0;
//   float freq  = 1.0;
//   for (int i = 0; i < ${octaves}; i++) {
//     value += amp * snoise(p * freq);
//     freq  *= 2.0;   // lacunarity
//     amp   *= 0.5;   // persistence / gain
//   }
//   return value;
// }
// /* ---------------------------------------- */

// void main() {
//   float t = u_time * u_speed;

//   // u_offset translates the noise field; mouse pushes it in the opposite direction
//   float nx = fbm( v_uv * u_period + vec2(t, 0.0)        + u_offset );
//   float ny = fbm( v_uv * u_period + vec2(0.0, t + 3.71) + u_offset );

//   vec2 displaced = v_uv + vec2(nx, ny) * u_amplitude;
//   gl_FragColor    = texture2D(u_image, displaced);
// }
// `;
// }

function buildFrag() {
  return `
precision highp float;

varying  vec2 v_uv;
uniform  sampler2D u_image;
uniform  float     u_time;
uniform  float     u_amplitude;  // overall effect strength
uniform  float     u_period;     // used as "detail / frequency" control
uniform  float     u_speed;      // time multiplier
uniform  vec2      u_offset;     // mouse-driven offset (MUST be used)

/* ---------- helpers ---------- */
float hash21(vec2 p) {
  // simple hash for subtle camera jitter/noise
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

vec2 rot(vec2 p, float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c) * p;
}

/* Mirror tiling around cell center */
vec2 mirrorTile(vec2 uv, float tiles) {
  vec2 g = uv * tiles;
  vec2 cell = floor(g);
  vec2 f = fract(g);

  // mirror every other cell (checkerboard)
  if (mod(cell.x + cell.y, 2.0) > 0.5) {
    f = 1.0 - f;
  }

  return (cell + f) / tiles;
}

/* Kaleidoscope fold around a point (camera lens center) */
vec2 kaleidoscope(vec2 uv, vec2 center, float slices) {
  vec2 p = uv - center;
  float r = length(p);
  float a = atan(p.y, p.x);

  float sector = 6.28318530718 / slices;         // 2π / slices
  a = mod(a, sector);
  a = abs(a - sector * 0.5);                      // mirror fold inside sector

  return center + vec2(cos(a), sin(a)) * r;
}

/* Lens barrel distortion around a center */
vec2 barrel(vec2 uv, vec2 center, float k) {
  vec2 p = uv - center;
  float r2 = dot(p, p);
  return center + p * (1.0 + k * r2);
}

/* Safe sampling (prevents black edges when distortion pushes out of bounds) */
vec4 sampleClamp(vec2 uv) {
  uv = clamp(uv, 0.001, 0.999);
  return texture2D(u_image, uv);
}

void main() {
  float t = u_time * u_speed;

  // Cursor-driven center shift.
  // u_offset is typically "accumulated" and can be >1; keep it tame:
  vec2 mouse = 0.5 + 0.15 * clamp(u_offset, vec2(-2.0), vec2(2.0));

  // Slight handheld camera wobble (time + hash), influenced by u_offset
  float jitter = (hash21(v_uv * (u_period * 0.5) + u_offset * 0.25 + t) - 0.5);
  vec2 wobble = vec2(jitter, -jitter) * (0.001 + 0.01 * u_amplitude);

  // Base uv with a tiny wobble
  vec2 uv = v_uv + wobble;

  // --- MIRROR / KALEIDOSCOPE STAGE ---
  // Tiles driven by u_period (but clamped to a reasonable range)
  float tiles = clamp(u_period * 0.5, 1.0, 10.0);

  // Mirror tiling, then kaleidoscope fold around the cursor-shifted lens center
  uv = mirrorTile(uv, tiles);

  // Slices changes subtly over time (camera-like rotating mirror rig)
  float slices = floor(6.0 + 6.0 * abs(sin(t * 0.35)) + 0.5); // 6..12-ish
  uv = kaleidoscope(uv, mouse, max(3.0, slices));

  // --- CAMERA LENS DISTORTION STAGE ---
  // Barrel distortion strength controlled by u_amplitude; cursor affects sign slightly
  float k = (0.35 * u_amplitude) * (0.7 + 0.3 * sin(t + dot(u_offset, vec2(1.7, 2.3))));
  uv = barrel(uv, mouse, k);

  // Add a slight rotational “camera roll” (tiny)
  vec2 p = uv - mouse;
  p = rot(p, 0.05 * u_amplitude * sin(t * 0.6));
  uv = mouse + p;

  // --- CHROMATIC ABERRATION (camera artifact) ---
  // Radial direction from lens center
  vec2 d = uv - mouse;
  float r = length(d);

  // Aberration grows toward edges
  float ca = (0.002 + 0.02 * u_amplitude) * smoothstep(0.2, 0.9, r);

  vec2 dir = (r > 1e-5) ? (d / r) : vec2(0.0);

  // Sample RGB at slightly different UVs
  float R = sampleClamp(uv + dir * ca).r;
  float G = sampleClamp(uv).g;
  float B = sampleClamp(uv - dir * ca).b;

  vec3 color = vec3(R, G, B);

  // --- Subtle vignette (camera)
  float vig = smoothstep(1.05, 0.35, length(v_uv - 0.5));
  color *= mix(0.75, 1.05, vig);

  gl_FragColor = vec4(color, 1.0);
}
`;
}

// ---------- Component ----------

export default function DisplacedImage({ src, width = 512, height = 512 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // --- compile helper ---
    const compile = (src, type) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(VERT, gl.VERTEX_SHADER);
    const fs = compile(buildFrag(OCTAVES), gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // --- full-screen quad ---
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // --- uniforms ---
    const uImage = gl.getUniformLocation(prog, "u_image");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uAmplitude = gl.getUniformLocation(prog, "u_amplitude");
    const uPeriod = gl.getUniformLocation(prog, "u_period");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");
    const uOffset = gl.getUniformLocation(prog, "u_offset");

    gl.uniform1f(uAmplitude, AMPLITUDE);
    gl.uniform1f(uPeriod, PERIOD);
    gl.uniform1f(uSpeed, SPEED);

    // --- texture ---
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // 1x1 transparent placeholder
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );

    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      // CLAMP_TO_EDGE is required on both axes for non-power-of-two textures in WebGL1
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = src;

    const mouse = { offset: [0, 0], target: [0, 0] };

    const onMouseMove = (e) => {
      mouse.target[0] -= (e.movementX / window.innerWidth) * -2;
      mouse.target[1] -= (e.movementY / window.innerHeight) * -2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- render loop ---
    const draw = (ms) => {
      // lerp current offset toward target
      mouse.offset[0] += (mouse.target[0] - mouse.offset[0]) * MOUSE_EASE;
      mouse.offset[1] += (mouse.target[1] - mouse.offset[1]) * MOUSE_EASE;
      // decay target back toward zero so it drifts to rest when mouse stops
      mouse.target[0] *= 0.98;
      mouse.target[1] *= 0.98;

      gl.uniform1i(uImage, 0);
      gl.uniform1f(uTime, ms * 0.001);
      gl.uniform2f(uOffset, mouse.offset[0], mouse.offset[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: "block" }}
    />
  );
}
