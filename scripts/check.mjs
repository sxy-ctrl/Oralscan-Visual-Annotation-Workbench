import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
for(const file of ['src/app.js','data/demo-data.js'])new vm.Script(fs.readFileSync(path.join(root,file),'utf8'));
const box={window:{}};vm.createContext(box);vm.runInContext(fs.readFileSync(path.join(root,'data/demo-data.js'),'utf8'),box);
const data=box.window.DATA;
if(data.targets.length!==2)throw Error('Expected two demo targets');
for(const t of data.targets)for(const im of t.images)if(!fs.existsSync(path.join(root,im.src)))throw Error('Missing image');
for(const asset of JSON.parse(fs.readFileSync(path.join(root,'data/asset-manifest.json'),'utf8'))){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,asset.file))).digest('hex');
 if(hash!==asset.sha256)throw Error('Image hash mismatch');
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!ref.startsWith('http')&&!fs.existsSync(path.join(root,ref)))throw Error('Missing page resource: '+ref);
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 if(['.git','node_modules'].includes(entry.name))continue;
 const file=path.join(dir,entry.name);if(entry.isDirectory()){walk(file);continue;}
 if(!/\.(js|mjs|html|css|json|md)$/.test(file))continue;
 const s=fs.readFileSync(file,'utf8');
 if(/\/Users\/[^/]+\/|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{30,}|\bsk-[A-Za-z0-9]{24,}/.test(s))throw Error('Potential private data: '+path.relative(root,file));
}}
walk(root);
console.log('PASS: syntax, 2 targets, resource paths, image hashes, basic secret and local-path scan');
