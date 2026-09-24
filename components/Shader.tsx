"use client";
import { useEffect, useRef, useState } from "react";
import { reduced } from "@/lib/hooks";

const frag = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; float asp=r.x/r.y; vec2 p=uv*vec2(asp,1.)*2.4;
  float q=fbm(p+vec2(t*.035,t*.02));
  float w=fbm(p+q*1.7+vec2(-t*.02,t*.015));
  vec3 bone=vec3(.949,.937,.91), sage=vec3(.863,.91,.875), lilac=vec3(.851,.827,.925), sig=vec3(1.,.31,.1);
  vec3 c=mix(bone,sage,smoothstep(.38,.78,w));
  c=mix(c,lilac,smoothstep(.5,.85,q*w*1.7));
  float d=distance(uv*vec2(asp,1.),m*vec2(asp,1.));
  c=mix(c,sig,smoothstep(.26,0.,d+(w-.5)*.12)*.55);
  c+=(h(gl_FragCoord.xy+fract(t))-.5)*.04;
  gl_FragColor=vec4(c,1.);
}`;
const vert = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

export default function Shader() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const c = cv.current;
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    // Static fallback on reduced motion, save-data and low-power devices.
    if (!c || reduced() || nav.connection?.saveData || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4) return;
    const gl = c.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const [ur, ut, um] = ["r", "t", "m"].map((u) => gl.getUniformLocation(prog, u));

    // ponytail: half resolution; the field is soft anyway. Raise the scale if it looks blurry on big screens.
    const size = () => { const s = 0.5; c.width = c.clientWidth * s; c.height = c.clientHeight * s; gl.viewport(0, 0, c.width, c.height); gl.uniform2f(ur, c.width, c.height); };
    size();
    addEventListener("resize", size);

    const target = { x: 0.72, y: 0.6 };
    const mouse = { ...target };
    const move = (e: PointerEvent) => { const b = c.getBoundingClientRect(); target.x = (e.clientX - b.left) / b.width; target.y = 1 - (e.clientY - b.top) / b.height; };
    addEventListener("pointermove", move, { passive: true });

    let raf = 0, visible = true;
    const t0 = performance.now();
    const frame = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      gl.uniform1f(ut, (now - t0) / 1000);
      gl.uniform2f(um, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    const sync = () => { cancelAnimationFrame(raf); if (visible && !document.hidden) raf = requestAnimationFrame(frame); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(c);
    document.addEventListener("visibilitychange", sync);
    setOn(true);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", size); removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return (
    <div className="grain absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_40%,#D9D3EC_0%,transparent_70%),radial-gradient(50%_50%_at_20%_80%,#DCE8DF_0%,transparent_70%)] bg-bone" aria-hidden>
      <canvas ref={cv} className="absolute inset-0 size-full transition-opacity duration-[var(--t-slow)]" style={{ opacity: on ? 1 : 0 }} />
    </div>
  );
}
