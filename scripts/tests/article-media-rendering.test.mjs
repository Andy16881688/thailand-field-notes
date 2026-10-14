import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';
const read = path => JSON.parse(fs.readFileSync(path,'utf8'));
const figures = read('src/data/article-figures.json');
const assets = read('src/data/editorial-media.json');
const attr = (node,key) => node.attrs?.find(a => a.name === key)?.value;
const text = n => n.nodeName === '#text' ? n.value : (n.childNodes || []).map(text).join('');
const nodes = html => {const list=[]; const walk=n=>{list.push(n);(n.childNodes||[]).forEach(walk)};walk(parse(html));return list;};

test('each authored diagram is emitted once beside its section with accessible text and proportional dimensions', () => {
  assert.equal(figures.length,18);
  for (const f of figures) {
    const ns=nodes(fs.readFileSync(`dist/post/${f.slug}/index.html`,'utf8'));
    const image=ns.filter(n=>n.tagName==='img' && attr(n,'src')===f.src);
    assert.equal(image.length,1,f.slug);
    assert.equal(attr(image[0],'alt'),f.alt);
    assert.equal(attr(image[0],'loading'),'lazy');
    assert.equal(attr(image[0],'width'),String(f.width));
    assert.equal(attr(image[0],'height'),String(f.height));
    assert.equal(image[0].parentNode.tagName,'figure');
    const caption=image[0].parentNode.childNodes.find(n=>n.tagName==='figcaption');
    assert.equal(text(caption),f.caption);
    const preceding=ns.slice(0,ns.indexOf(image[0])).filter(n=>n.tagName==='h2').at(-1);
    assert.equal(text(preceding),f.afterHeading);
    const svg=fs.readFileSync('public'+f.src,'utf8');
    assert.match(svg,new RegExp(`viewBox="0 0 ${f.width} ${f.height}"`));
    assert.doesNotMatch(svg.replace('http://www.w3.org/2000/svg',''), /<script|foreignObject|https?:\/\//i);
    assert.equal(fs.readFileSync('dist'+f.src,'utf8'),svg);
  }
});
test('priority destination and culture gaps have real local photos with visible credit links', () => {
  for (const slug of ['chiang-rai-travel-guide','historical-day-trips-from-bangkok','koh-samui-travel-guide','pai-travel-guide-first-time-visitors','phuket-first-time-visitors','thai-food-first-time-visitors','thai-temple-etiquette-visitors']) {
    const ns=nodes(fs.readFileSync(`dist/post/${slug}/index.html`,'utf8'));
    const hero=ns.find(n=>attr(n,'class')?.split(/\s+/).includes('article-photo'));
    assert.ok(hero,slug);
    const children=[];const walk=n=>{children.push(n);(n.childNodes||[]).forEach(walk)};walk(hero);
    const img=children.find(n=>n.tagName==='img');
    const asset=assets.find(a=>a.src===attr(img,'src'));
    assert.ok(asset?.verified,slug);
    assert.ok(children.some(n=>n.tagName==='a' && attr(n,'href')===asset.sourceUrl));
    assert.equal(attr(img,'loading'),'eager');
  }
});
test('all photo original hashes and derivative byte sizes match the published manifest',()=>{
  for(const a of assets){
    const bytes=fs.readFileSync('public'+a.originalSrc);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256,a.id);
    for(const v of a.variants) assert.equal(fs.statSync('public'+v.src).size,v.bytes,v.src);
  }
});
test('article photo reserves its proportional height while its network request is still pending', {skip:!process.env.PLAYWRIGHT_MODULE}, async()=>{
  const {chromium}=await import(process.env.PLAYWRIGHT_MODULE);
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,body:''}));
    let releaseImage;
    const gate=new Promise(resolve=>{releaseImage=resolve});
    await page.route('**/supplement-chiang-rai-*.webp',async r=>{await gate;await r.continue().catch(()=>{});});
    try{
      await page.goto((process.env.SHELL_BASE_URL||'http://127.0.0.1:4323')+'/post/chiang-rai-travel-guide/',{waitUntil:'domcontentloaded'});
      await page.evaluate(()=>document.fonts.ready);
      const rect=await page.locator('.article-photo img').evaluate(i=>({width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height,loaded:i.complete}));
      assert.equal(rect.loaded,false,'test must observe the still-pending image');
      assert.ok(Math.abs(rect.height-rect.width*540/960)<1,JSON.stringify(rect));
    }finally{releaseImage();}
  }finally{await browser.close();}
});
