// Servidor local sin dependencias: node scripts/serve.mjs [puerto]
import {createServer} from 'node:http';import {readFileSync,existsSync,statSync} from 'node:fs';import {join,extname,normalize} from 'node:path';
const D=join(import.meta.dirname,'..','dist'),T={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);let f=normalize(join(D,p));if(!f.startsWith(D)){r.writeHead(403).end();return}
 if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');
 if(!existsSync(f)){r.writeHead(404,{'content-type':T['.html']}).end(readFileSync(join(D,'404.html')));return}
 r.writeHead(200,{'content-type':T[extname(f)]||'application/octet-stream'}).end(readFileSync(f))}).listen(+process.argv[2]||8080,()=>console.log('http://localhost:'+(process.argv[2]||8080)));
