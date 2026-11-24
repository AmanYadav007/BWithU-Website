// Size guard for public/social/. Fails if an image is over 1.5 MB or wider than 1080 px,
// or a video is over 25 MB (Cloudflare static asset limit). Fix with:
//   python3 marketing/tools/post.py prepare <queue-file>   (resizes automatically)
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dir = new URL('../public/social/', import.meta.url).pathname
const IMG_MAX = 1.5 * 1024 * 1024
const VID_MAX = 25 * 1024 * 1024
let bad = 0
if (existsSync(dir)) {
  for (const f of readdirSync(dir)) {
    if (f === 'README.txt' || f.startsWith('.')) continue
    const p = join(dir, f)
    const size = statSync(p).size
    const ext = f.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      if (size > IMG_MAX) { console.error(`${f}: ${size} bytes > 1.5 MB`); bad++ }
      const b = readFileSync(p)
      let w = 0
      if (ext === 'png') w = b.readUInt32BE(16)
      else { // JPEG: find SOF marker
        let i = 2
        while (i < b.length) {
          if (b[i] !== 0xff) { i++; continue }
          const m = b[i + 1]
          if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) { w = b.readUInt16BE(i + 7); break }
          i += 2 + b.readUInt16BE(i + 2)
        }
      }
      if (w > 1080) { console.error(`${f}: ${w}px wide > 1080`); bad++ }
    } else if (['mp4', 'mov'].includes(ext)) {
      if (size > VID_MAX) { console.error(`${f}: video ${size} bytes > 25 MB`); bad++ }
    } else { console.error(`${f}: unexpected file type`); bad++ }
  }
}
if (bad) process.exit(1)
console.log('social assets OK')
