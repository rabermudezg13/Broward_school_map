import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Papa from 'papaparse';
test('directory contains unique Broward public school locations with valid map coordinates',()=>{
 const rows=Papa.parse(fs.readFileSync(new URL('../public/schools.csv',import.meta.url),'utf8'),{header:true,skipEmptyLines:true}).data;
 const meta=JSON.parse(fs.readFileSync(new URL('../public/data-source.json',import.meta.url),'utf8'));
 assert.equal(rows.length,meta.count);assert.equal(new Set(rows.map(r=>r.id)).size,rows.length);
 for(const r of rows){assert.match(r.id,/^12\d{10}$/);assert.equal(r.state,'FL');assert.ok(r.name&&r.address);assert.ok(Number(r.latitude)>25.95&&Number(r.latitude)<26.4);assert.ok(Number(r.longitude)>-80.9&&Number(r.longitude)<-80.0)}
 assert.ok(rows.some(r=>r.name==='DEERFIELD BEACH ELEMENTARY SCHOOL'));
 for(const r of rows.filter(r=>r.city==='MIAMI')) assert.ok(r.addressNote&&meta.addressWarnings.includes(r.id));
});
