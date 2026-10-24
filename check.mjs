// Comprobaciones sobre dist/: enlaces internos, título, h1, descripción, imágenes con alt, ids duplicados.
import {readdirSync,readFileSync,existsSync,statSync} from 'node:fs';import {join} from 'node:path';
const D=join(import.meta.dirname,'..','dist');const err=[];
const walk=d=>readdirSync(d).flatMap(f=>{const p=join(d,f);return statSync(p).isDirectory()?walk(p):[p]});
const files=walk(D),html=files.filter(f=>f.endsWith('.html')&&!f.includes('/admin/'));
const exists=u=>{u=u.split('#')[0].split('?')[0];if(!u)return true;let f=join(D,u);return existsSync(f)&&(!statSync(f).isDirectory()||existsSync(join(f,'index.html')))};
for(const f of html){const s=readFileSync(f,'utf8'),n=f.replace(D,'');
 if(!/<title>[^<]{3,}<\/title>/.test(s))err.push(n+': sin <title>');
 if(!/<meta name="description" content="[^"]{10,}"/.test(s))err.push(n+': sin meta description');
 if((s.match(/<h1[ >]/g)||[]).length!==1)err.push(n+': debe haber exactamente un h1');
 for(const m of s.matchAll(/<img\b[^>]*>/g))if(!/\balt=/.test(m[0]))err.push(n+': img sin alt');
 const ids=[...s.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);ids.filter((x,i)=>ids.indexOf(x)!==i).forEach(x=>err.push(n+': id duplicado '+x));
 for(const m of s.matchAll(/(?:href|src|action)="([^"]+)"/g)){const u=m[1];if(/^(https?:|mailto:|data:|#)/.test(u))continue;if(!u.startsWith('/')){err.push(n+': ruta relativa '+u);continue}if(!exists(u))err.push(n+': enlace roto '+u)}
 if(/\sstyle="/.test(s))err.push(n+': style inline (bloqueado por CSP)');
 if(/<script(?![^>]*(src=|application\/ld\+json))/.test(s))err.push(n+': script inline (bloqueado por CSP)');
 for(const m of s.matchAll(/<a [^>]*target="_blank"[^>]*>/g))if(!/rel="[^"]*noopener/.test(m[0]))err.push(n+': target=_blank sin noopener');}
for(const j of files.filter(f=>f.endsWith('.json')))try{JSON.parse(readFileSync(j,'utf8'))}catch(e){err.push(j+': JSON inválido')}
console.log(`${html.length} páginas revisadas`);if(err.length){console.log(err.join('\n'));process.exit(1)}console.log('Sin errores');
