// 작업 사이트 첫 화면 캡처 : node scripts/capture-works.mjs
// 직접 넣은 이미지가 없고 주소가 있는 작업만 Edge 를 화면 없이 띄워 찍음
// 결과는 public/works/sites/, 같은 주소는 한 번만 찍음
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { WORKS } from '../src/data/works.js'

const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)
const OUT = 'public/works/sites'

// 주소를 파일 이름으로, lib.ice.go.kr/jungang/index.do → lib-ice-go-kr-jungang
export const shotName = (url) => {
  const { hostname, pathname } = new URL(url)
  const path = pathname.split('/').filter((p) => p && !p.includes('.'))
  return [hostname.replace(/^www\./, ''), ...path].join('-').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
}

// 앱 마켓 링크는 사이트 화면이 아니라 빼고, 이미 이 스크립트로 찍은 건 다시 찍음(직접 올린 이미지는 그대로)
const targets = [
  ...new Set(
    WORKS.filter((w) => w.url && !w.url.includes('play.google.com'))
      .filter((w) => !w.image || w.image === `/works/sites/${shotName(w.url)}.jpg`)
      .map((w) => w.url),
  ),
]

if (!EDGE) throw new Error('Edge 를 찾지 못함')
mkdirSync(OUT, { recursive: true })
// Edge 프로필은 한 번만 만들어 같이 씀, 끝난 직후엔 Edge 가 잡고 있어 바로 못 지움
const profile = mkdtempSync(join(tmpdir(), 'capture-works-'))

for (const url of targets) {
  const file = join(OUT, `${shotName(url)}.jpg`)
  try {
    execFileSync(
      EDGE,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--user-data-dir=${profile}`,
        '--window-size=1280,960',
        '--virtual-time-budget=8000',
        `--screenshot=${join(process.cwd(), file)}`,
        url,
      ],
      { stdio: 'ignore', timeout: 45000 },
    )
    console.log(`ok   ${file}  ${Math.round(statSync(file).size / 1024)}KB  ${url}`)
  } catch {
    console.log(`fail ${url}`)
  }
}

try {
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 })
} catch {
  // 못 지우면 임시 폴더에 남겨 둠, 다음 정리 때 지워짐
}
