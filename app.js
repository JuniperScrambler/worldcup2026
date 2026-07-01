/* ==========================================================================
   World Cup 2026 Dashboard PWA - Core Logic
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Data Models (日本代表、グループ順位、強豪国、ニュース)
// --------------------------------------------------------------------------

const JAPAN_SQUAD = [
  // GK
  { number: 1, name: "Z. Suzuki", kanji: "鈴木 彩艶", pos: "GK", club: "パルマ (ITA)", age: 23, rating: 84 },
  { number: 12, name: "K. Osako", kanji: "大迫 敬介", pos: "GK", club: "サンフレッチェ広島 (JPN)", age: 26, rating: 80 },
  { number: 23, name: "T. Hayakawa", kanji: "早川 友基", pos: "GK", club: "鹿島アントラーズ (JPN)", age: 27, rating: 78 },
  // DF
  { number: 2, name: "Y. Sugawara", kanji: "菅原 由勢", pos: "DF", club: "ヴェルダー・ブレーメン (GER)", age: 26, rating: 82 },
  { number: 3, name: "S. Taniguchi", kanji: "谷口 彰悟", pos: "DF", club: "シント＝トロイデン (BEL)", age: 34, rating: 80 },
  { number: 4, name: "K. Itakura", kanji: "板倉 滉", pos: "DF", club: "アヤックス (NED)", age: 29, rating: 84 },
  { number: 5, name: "Y. Nagatomo", kanji: "長友 佑都", pos: "DF", club: "FC東京 (JPN)", age: 39, rating: 75 },
  { number: 16, name: "T. Watanabe", kanji: "渡辺 剛", pos: "DF", club: "フェイエノールト (NED)", age: 29, rating: 80 },
  { number: 20, name: "A. Seko", kanji: "瀬古 歩夢", pos: "DF", club: "ル・アーヴルAC (FRA)", age: 26, rating: 79 },
  { number: 21, name: "H. Ito", kanji: "伊藤 洋輝", pos: "DF", club: "バイエルン・ミュンヘン (GER)", age: 27, rating: 85 },
  { number: 22, name: "T. Tomiyasu", kanji: "冨安 健洋", pos: "DF", club: "アヤックス (NED)", age: 27, rating: 86 },
  { number: 25, name: "J. Suzuki", kanji: "鈴木 淳之介", pos: "DF", club: "FCコペンハーゲン (DEN)", age: 23, rating: 74 },
  // MF
  { number: 7, name: "A. Tanaka", kanji: "田中 碧", pos: "MF", club: "リーズ (ENG)", age: 27, rating: 82 },
  { number: 8, name: "T. Kubo", kanji: "久保 建英", pos: "MF", club: "レアル・ソシエダ (ESP)", age: 25, rating: 87 },
  { number: 10, name: "R. Doan", kanji: "堂安 律", pos: "MF", club: "フランクフルト (GER)", age: 28, rating: 83 },
  { number: 13, name: "K. Nakamura", kanji: "中村 敬斗", pos: "MF", club: "スタッド・ランス (FRA)", age: 25, rating: 82 },
  { number: 14, name: "J. Ito", kanji: "伊東 純也", pos: "MF", club: "ゲンク (BEL)", age: 33, rating: 84 },
  { number: 15, name: "D. Kamada", kanji: "鎌田 大地", pos: "MF", club: "クリスタル・パレス (ENG)", age: 29, rating: 83 },
  { number: 17, name: "Y. Suzuki", kanji: "鈴木 唯人", pos: "MF", club: "フリーブルク (GER)", age: 24, rating: 81 },
  { number: 24, name: "K. Sano", kanji: "佐野 海舟", pos: "MF", club: "マインツ (GER)", age: 25, rating: 79 },
  // FW
  { number: 6, name: "S. Machino", kanji: "町野 修斗", pos: "FW", club: "ボルシアMG (GER)", age: 26, rating: 78 },
  { number: 9, name: "K. Goto", kanji: "後藤 啓介", pos: "FW", club: "フリーブルク (GER)", age: 21, rating: 76 },
  { number: 11, name: "D. Maeda", kanji: "前田 大然", pos: "FW", club: "セルティック (SCO)", age: 28, rating: 81 },
  { number: 18, name: "A. Ueda", kanji: "上田 綺世", pos: "FW", club: "フェイエノールト (NED)", age: 27, rating: 83 },
  { number: 19, name: "K. Ogawa", kanji: "小川 航基", pos: "FW", club: "NECナイメヘン (NED)", age: 28, rating: 80 },
  { number: 26, name: "K. Shiogai", kanji: "塩貝 健人", pos: "FW", club: "ヴォルフスブルク (GER)", age: 21, rating: 73 }
];

const POWERHOUSE_NATIONS = [
  { id: "ARG", name: "アルゼンチン (前回王者)", flag: "🇦🇷", group: "グループJ (1位)", keyPlayer: "リオネル・メッシ", rating: 92, titles: 3, desc: "メッシのラストダンス。盤石の連携と勝負強さで連覇を狙う。" },
  { id: "FRA", name: "フランス", flag: "🇫🇷", group: "グループI (2位)", keyPlayer: "キリアン・エムバペ", rating: 91, titles: 2, desc: "世界最強の攻撃陣を擁する。圧倒的な個の力とスピードで他を圧倒。" },
  { id: "BRA", name: "ブラジル", flag: "🇧🇷", group: "グループC (1位)", keyPlayer: "ヴィニシウス・ジュニオール", rating: 90, titles: 5, desc: "伝統の王国。復調した攻撃陣と硬い守備で6度目の頂点を目指す。" },
  { id: "ENG", name: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "グループL (1位)", keyPlayer: "ジュード・ベリンガム", rating: 89, titles: 1, desc: "若きタレントが融合。今度こそ「It's coming home」を果たせるか。" },
  { id: "POR", name: "ポルトガル", flag: "🇵🇹", group: "グループK (1位)", keyPlayer: "ブルーノ・フェルナンデス", rating: 88, titles: 0, desc: "新世代の攻撃陣が躍動。堅守と創造性豊かな中盤で初優勝へ。" },
  { id: "ESP", name: "スペイン", flag: "🇪🇸", group: "グループH (1位)", keyPlayer: "ラミン・ヤマル", rating: 89, titles: 1, desc: "圧倒的なポゼッションスタイル。若きエース、ヤマルの突破力に注目。" },
  { id: "GER", name: "ドイツ", flag: "🇩🇪", group: "グループE (1位)", keyPlayer: "ジャマル・ムシアラ", rating: 88, titles: 4, desc: "開催国カナダ・アメリカ・メキシコで復活の狼煙をあげる古豪。" }
];

const LIVE_DATA_CACHE_KEY = 'wc2026_live_data_v1';

// --------------------------------------------------------------------------
// 2. Global State & App Setup
// --------------------------------------------------------------------------

let currentTab = 'home';
let selectedPitchNode = null;
let savedStartingXI = {}; // Format: { "CF": playerNumber, "LWG": playerNumber... }
let bracketPredictions = {}; // Format: { "q1": "ARG", "sf1": "ARG", "f": "ARG" }
let liveMatches = [];
let liveStandings = [];
let liveNews = [];
let lastSuccessfulRefresh = 0;
let refreshPromise = null;
let countdownInterval = null;

// Load state from localStorage on startup
function loadState() {
  try {
    const xi = localStorage.getItem('wc2026_starting_xi');
    if (xi) savedStartingXI = JSON.parse(xi);
    const bp = localStorage.getItem('wc2026_bracket_preds');
    if (bp) bracketPredictions = JSON.parse(bp);
  } catch (error) {
    console.warn('Saved user settings could not be restored:', error);
  }

  try {
    const cached = JSON.parse(localStorage.getItem(LIVE_DATA_CACHE_KEY) || 'null');
    if (cached) {
      liveMatches = Array.isArray(cached.matches) ? cached.matches : [];
      liveStandings = Array.isArray(cached.standings) ? cached.standings : [];
      liveNews = Array.isArray(cached.news) ? cached.news : [];
      lastSuccessfulRefresh = Date.parse(cached.fetchedAt) || 0;
    }
  } catch (error) {
    console.warn('Cached live data could not be restored:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initApp();
});

function updateHeaderDate(date = null, suffix = '更新') {
  const headerDateEl = document.getElementById('headerDate');
  if (headerDateEl) {
    if (!date || Number.isNaN(date.getTime())) {
      headerDateEl.textContent = '最新情報を確認中';
      return;
    }
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    });
    headerDateEl.textContent = `${formatter.format(date).replaceAll('/', '.')} ${suffix}`;
  }
}

function setConnectionStatus(state, text) {
  const status = document.getElementById('connectionStatus');
  const statusText = document.getElementById('connectionStatusText');
  if (!status || !statusText) return;
  status.classList.toggle('updating', state === 'updating');
  status.classList.toggle('offline', state === 'offline');
  statusText.textContent = text;
}

function initApp() {
  updateHeaderDate(lastSuccessfulRefresh ? new Date(lastSuccessfulRefresh) : null, lastSuccessfulRefresh ? '保存データ' : '更新');
  setupTabNavigation();
  renderDashboard();
  renderJapanTab();
  renderPlayersTab();
  renderPredictorTab();
  renderPowersTab();
  setupIOSInstallBanner();
  setupPullToRefresh();
  setupAutomaticRefresh();

  // 引っ張り更新時の現在のタブを復元して、ホームに戻るのを防止
  const savedTab = sessionStorage.getItem('wc2026_saved_tab');
  if (savedTab) {
    sessionStorage.removeItem('wc2026_saved_tab');
    const tabBtn = document.querySelector(`.app-navbar .nav-item[data-tab="${savedTab}"]`);
    if (tabBtn) {
      tabBtn.click();
    }
  }

  // 更新リロードから復帰した際にトースト通知を表示
  const showToastFlag = sessionStorage.getItem('wc2026_show_refresh_toast');
  if (showToastFlag === 'true') {
    sessionStorage.removeItem('wc2026_show_refresh_toast');
    setTimeout(() => {
      showToast("最新情報に更新しました");
    }, 600);
  }

  refreshLiveData({ reason: 'startup' });
}

// --------------------------------------------------------------------------
// 3. Tab & Sub-tab Navigation
// --------------------------------------------------------------------------

function setupTabNavigation() {
  // Main Tab Navigation
  const navItems = document.querySelectorAll('.app-navbar .nav-item');
  const tabViews = document.querySelectorAll('.tab-view');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      if (!tabName) return;

      // Update active nav item
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Show/Hide tab views
      tabViews.forEach(view => {
        if (view.id === `tab-${tabName}`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      currentTab = tabName;
      window.scrollTo(0, 0);
    });
  });

  // Sub Tab Navigation inside Tabs (Japan & Predictor)
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');
  subTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.tab-view');
      const targetSubtabId = btn.getAttribute('data-subtab');
      
      // Update subtab button UI
      container.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update subtab view UI
      container.querySelectorAll('.subtab-view').forEach(v => {
        if (v.id === `subtab-${targetSubtabId}`) {
          v.classList.add('active');
        } else {
          v.classList.remove('active');
        }
      });
    });
  });

  // Shortcut from Japan Match card to Predictor Tab
  window.goToPredictorTab = function() {
    const predictorNavItem = document.querySelector('.app-navbar .nav-item[data-tab="predictor"]');
    if (predictorNavItem) {
      predictorNavItem.click();
    }
  };
}

// --------------------------------------------------------------------------
// 4. Dashboard (Home) Rendering
// --------------------------------------------------------------------------

async function fetchRealNews() {
  // Googleニュースからサッカー日本代表に関するRSSを取得（rss2jsonでJSON変換）
  // 外部変換サービス(rss2json)のCDNキャッシュを回避するため、APIリクエスト自体にタイムスタンプを付与
  const query = "FIFA ワールドカップ 2026 日本代表";
  const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ja&gl=JP&ceid=JP:ja`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleNewsUrl)}&_t=${Date.now()}`;
  const fallbackPromise = fetchWorldCupNewsFallback();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store', signal: controller.signal });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      return data.items.slice(0, 5).map((item, idx) => {
        let dateStr = "今日";
        try {
          const rawDate = item.pubDate || '';
          const parsedDate = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(rawDate) ? rawDate : `${rawDate.replace(' ', 'T')}Z`);
          dateStr = new Intl.DateTimeFormat('ja-JP', {
            timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
          }).format(parsedDate);
        } catch(e) {}
        
        let tag = "blue";
        if (item.title.includes("日本") || item.title.includes("代表") || item.title.includes("森保")) {
          tag = "red";
        } else if (idx % 2 === 0) {
          tag = "gold";
        }
        
        return {
          id: `rss-${idx}`,
          tag: tag,
          date: dateStr,
          title: item.title,
          link: item.link
        };
      });
    }
  } catch (error) {
    console.warn("Failed to fetch RSS news:", error);
  } finally {
    clearTimeout(timeoutId);
  }
  return fallbackPromise;
}

async function fetchWorldCupNewsFallback() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/news?limit=6&_=${Date.now()}`,
      { cache: 'no-store', signal: controller.signal }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return (data.articles || []).slice(0, 5).map((article, index) => ({
      id: `espn-news-${article.id || index}`,
      tag: index === 0 ? 'red' : index % 2 ? 'blue' : 'gold',
      date: new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date(article.published)),
      title: article.headline,
      link: article.links?.web?.href
    }));
  } catch (error) {
    console.warn('Fallback news refresh failed:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch (error) {
    return '';
  }
}

function formatMatchDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '日時未定';
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric', weekday: 'short',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).format(date);
}

function formatMatchStatus(match) {
  if (match.state === 'in') return `LIVE ${match.displayClock || match.statusDetail}`.trim();
  if (match.state === 'post' || match.completed) return '試合終了';
  return '開始前';
}

const TOURNAMENT_STAGE_CONFIG = [
  { id: 'round-of-32', label: 'ラウンド32', shortLabel: 'R32' },
  { id: 'round-of-16', label: 'ラウンド16', shortLabel: 'R16' },
  { id: 'quarterfinals', label: '準々決勝', shortLabel: 'QF' },
  { id: 'semifinals', label: '準決勝', shortLabel: 'SF' },
  { id: '3rd-place-match', label: '3位決定戦', shortLabel: '3rd' },
  { id: 'final', label: '決勝', shortLabel: 'FINAL' }
];

function tournamentStatusClass(match) {
  if (match.state === 'in') return 'live';
  if (match.state === 'post' || match.completed) return 'completed';
  return 'upcoming';
}

function renderLiveBracketMatch(match, index) {
  const statusClass = tournamentStatusClass(match);
  return `
    <article class="live-bracket-match ${statusClass}">
      <div class="live-bracket-match-meta">
        <span>第${index + 1}試合</span>
        <span>${escapeHTML(formatMatchDate(match.date))}</span>
      </div>
      <div class="live-bracket-teams">
        ${match.teams.map(team => `
          <div class="live-bracket-team ${team.winner || team.advanced ? 'winner' : ''} ${!team.logo ? 'placeholder' : ''}">
            <span class="live-bracket-flag">${escapeHTML(team.flag)}</span>
            <span class="live-bracket-team-name">${escapeHTML(team.name)}</span>
            <strong>${match.state === 'pre' ? '-' : escapeHTML(team.score)}</strong>
          </div>
        `).join('')}
      </div>
      <div class="live-bracket-status ${statusClass}">${escapeHTML(formatMatchStatus(match))}</div>
    </article>
  `;
}

function renderTournamentBracket(knockoutMatches) {
  const container = document.getElementById('liveTournamentBracket');
  if (!container) return;
  const bracketStages = TOURNAMENT_STAGE_CONFIG.filter(stage => stage.id !== '3rd-place-match');

  if (!knockoutMatches.length) {
    container.innerHTML = '<div class="tournament-loading">最新のトーナメント表を取得中...</div>';
    return;
  }

  container.innerHTML = bracketStages.map(stage => {
    const matches = knockoutMatches
      .filter(match => match.stage === stage.id)
      .sort((a, b) => Number(a.id) - Number(b.id));
    return `
      <section class="live-bracket-round" data-stage="${stage.id}">
        <div class="live-bracket-round-title">
          <span>${escapeHTML(stage.shortLabel)}</span>
          <strong>${escapeHTML(stage.label)}</strong>
        </div>
        <div class="live-bracket-round-matches">
          ${matches.length
            ? matches.map((match, index) => renderLiveBracketMatch(match, index)).join('')
            : '<div class="live-bracket-empty">組み合わせ未定</div>'}
        </div>
      </section>
    `;
  }).join('');
}

function renderTournamentSchedule(knockoutMatches) {
  const container = document.getElementById('knockoutScheduleList');
  if (!container) return;
  if (!knockoutMatches.length) {
    container.innerHTML = '<div class="match-card empty-state-card">最新の日程・結果を取得中...</div>';
    return;
  }

  const featured = window.WorldCupLiveData?.selectFeaturedMatch(knockoutMatches);
  container.innerHTML = TOURNAMENT_STAGE_CONFIG.map(stage => {
    const bracketOrder = knockoutMatches
      .filter(match => match.stage === stage.id)
      .sort((a, b) => Number(a.id) - Number(b.id));
    const matches = bracketOrder
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp);
    if (!matches.length) return '';
    return `
      <section class="knockout-stage-group">
        <div class="knockout-stage-heading">
          <h4>${escapeHTML(stage.label)}</h4>
          <span>${matches.length}試合</span>
        </div>
        <div class="knockout-stage-matches">
          ${matches.map((match, index) => {
            const statusClass = tournamentStatusClass(match);
            const detailUrl = safeExternalUrl(match.link);
            const matchNumber = bracketOrder.findIndex(item => item.id === match.id) + 1;
            return `
              <article class="knockout-schedule-card ${statusClass} ${featured?.id === match.id ? 'highlight' : ''}">
                <div class="knockout-schedule-meta">
                  <span>第${matchNumber || index + 1}試合・${escapeHTML(formatMatchDate(match.date))}</span>
                  <strong class="schedule-status ${statusClass}">${escapeHTML(formatMatchStatus(match))}</strong>
                </div>
                <div class="knockout-schedule-teams">
                  ${match.teams.map(team => `
                    <div class="schedule-team-row ${team.winner || team.advanced ? 'winner' : ''}">
                      <span class="flag">${escapeHTML(team.flag)}</span>
                      <span class="team-name">${escapeHTML(team.name)}</span>
                      <strong class="score">${match.state === 'pre' ? '-' : escapeHTML(team.score)}</strong>
                    </div>
                  `).join('')}
                </div>
                <div class="knockout-schedule-footer">
                  <span>${escapeHTML([match.venue, match.city].filter(Boolean).join('・') || '会場未定')}</span>
                  ${detailUrl ? `<a href="${escapeHTML(detailUrl)}" target="_blank" rel="noopener noreferrer">試合詳細 ↗</a>` : ''}
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }).join('');
}

function renderLiveTournament() {
  const knockoutMatches = window.WorldCupLiveData?.knockoutMatches(liveMatches) || [];
  renderTournamentBracket(knockoutMatches);
  renderTournamentSchedule(knockoutMatches);

  const updatedAt = document.getElementById('tournamentUpdatedAt');
  if (updatedAt) {
    updatedAt.textContent = lastSuccessfulRefresh
      ? `${new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date(lastSuccessfulRefresh))} 更新`
      : '最新情報を取得中';
  }
}

function renderNewsList(newsItems = liveNews) {
  const newsListContainer = document.getElementById('homeNewsList');
  if (!newsListContainer) return;

  if (!newsItems.length) {
    newsListContainer.innerHTML = '<div class="news-card empty-state-card">最新ニュースを取得中...</div>';
    return;
  }

  newsListContainer.innerHTML = newsItems.map(news => {
    const link = safeExternalUrl(news.link);
    const tagType = link ? 'a' : 'div';
    const linkAttr = link ? `href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer"` : '';
    const tag = ['red', 'blue', 'gold'].includes(news.tag) ? news.tag : 'blue';
    return `
      <${tagType} class="news-card" ${linkAttr}>
        <span class="news-tag-dot ${tag}"></span>
        <div class="news-content">
          <div class="news-meta">
            <span>REALTIME NEWS</span>
            <span>${escapeHTML(news.date)}</span>
          </div>
          <div class="news-title">${escapeHTML(news.title)}</div>
        </div>
      </${tagType}>
    `;
  }).join('');
}

function renderGroupStandings(standings = liveStandings) {
  const tableContainer = document.getElementById('homeGroupTable');
  if (!tableContainer) return;

  if (!standings.length) {
    tableContainer.innerHTML = '<tr><td colspan="8">最新順位を取得中...</td></tr>';
    return;
  }

  tableContainer.innerHTML = standings.map(team => `
      <tr class="${team.name === '日本' ? 'highlight-row' : ''}">
        <td class="font-bold">${team.rank}</td>
        <td style="text-align: left;"><span class="flag">${escapeHTML(team.flag)}</span>${escapeHTML(team.name)}</td>
        <td class="font-bold">${escapeHTML(team.points)}</td>
        <td>${escapeHTML(team.matches)}</td>
        <td>${escapeHTML(team.won)}</td>
        <td>${escapeHTML(team.drawn)}</td>
        <td>${escapeHTML(team.lost)}</td>
        <td>${escapeHTML(team.gd)}</td>
      </tr>
    `).join('');
  const groupDescription = document.getElementById('japanGroupDescription');
  if (groupDescription) {
    groupDescription.textContent = `グループF：${standings.map(team => team.name).join('、')}`;
  }
}

function updateCountdown(match) {
  const label = document.getElementById('countdownLabel');
  const timer = document.getElementById('countdownTimer');
  if (!label || !timer || !match) return;

  if (match.state === 'in') {
    label.textContent = '現在の試合状況';
    timer.textContent = `LIVE ${match.displayClock || match.statusDetail}`.trim();
    return;
  }
  if (match.state === 'post' || match.completed) {
    label.textContent = '直近の試合結果';
    timer.textContent = `${match.teams[0].score} - ${match.teams[1].score}`;
    return;
  }

  const diffMs = match.timestamp - Date.now();
  label.textContent = 'キックオフまで';
  if (diffMs <= 0) {
    timer.textContent = 'まもなく開始';
    return;
  }
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHours = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  timer.textContent = diffDays > 0
    ? `${diffDays}日 ${diffHours}時間 ${diffMins}分`
    : `${diffHours}時間 ${diffMins}分`;
}

function renderFeaturedMatch(match) {
  const matchup = document.getElementById('featuredMatchup');
  if (!match || !match.teams || match.teams.length !== 2) {
    if (matchup) matchup.hidden = true;
    return;
  }

  const [teamA, teamB] = match.teams;
  document.getElementById('featuredMatchBadge').textContent = match.state === 'in'
    ? 'KNOCKOUT STAGE UNDERWAY • LIVE'
    : match.state === 'pre' ? 'KNOCKOUT STAGE UNDERWAY • NEXT MATCH' : 'KNOCKOUT STAGE UNDERWAY • LATEST RESULT';
  document.getElementById('featuredMatchTitle').textContent = match.stageName;
  document.getElementById('featuredMatchMeta').textContent = [formatMatchDate(match.date), match.venue, match.city]
    .filter(Boolean).join(' • ');
  document.getElementById('featuredFlagA').textContent = teamA.flag;
  document.getElementById('featuredTeamA').textContent = teamA.name;
  document.getElementById('featuredFlagB').textContent = teamB.flag;
  document.getElementById('featuredTeamB').textContent = teamB.name;
  document.getElementById('featuredScore').textContent = match.state === 'pre'
    ? 'VS'
    : `${teamA.score} - ${teamB.score}`;
  matchup.hidden = false;

  if (countdownInterval) clearInterval(countdownInterval);
  updateCountdown(match);
  countdownInterval = setInterval(() => updateCountdown(match), match.state === 'in' ? 15000 : 60000);
}

function goalSummary(match) {
  const teamNames = Object.fromEntries(match.teams.map(team => [team.id, team.name]));
  const goals = (match.details || []).filter(detail => detail.scoringPlay);
  if (!goals.length) return '';
  return goals.map(goal => {
    const scorer = goal.athletesInvolved?.[0]?.displayName || '得点者不明';
    const minute = goal.clock?.displayValue || '';
    const team = teamNames[goal.team?.id] || '';
    return `${team}：${scorer}${minute ? ` (${minute})` : ''}`;
  }).join(' / ');
}

function renderJapanMatches() {
  const container = document.getElementById('japanMatchList');
  if (!container) return;
  const matches = window.WorldCupLiveData?.matchesForTeam(liveMatches, 'JPN') || [];
  if (!matches.length) {
    container.innerHTML = '<div class="match-card empty-state-card">日本代表の最新試合を取得中...</div>';
    return;
  }

  const featured = window.WorldCupLiveData.selectFeaturedMatch(matches);
  container.innerHTML = matches.map(match => {
    const goals = goalSummary(match);
    const classes = [
      'match-card',
      match.state === 'post' ? 'completed' : 'upcoming',
      match.state === 'in' ? 'live-match' : '',
      featured?.id === match.id ? 'highlight' : ''
    ].filter(Boolean).join(' ');
    return `
      <div class="${classes}">
        <div class="match-meta">${escapeHTML(match.stageName)} - 日本時間 ${escapeHTML(formatMatchDate(match.date))} | ${escapeHTML(formatMatchStatus(match))}</div>
        <div class="match-teams">
          ${match.teams.map(team => `
            <div class="team-row">
              <span class="flag">${escapeHTML(team.flag)}</span>
              <span class="team-name ${team.abbreviation === 'JPN' ? 'font-bold' : ''}">${escapeHTML(team.name)}</span>
              <span class="score ${team.winner ? 'font-bold' : ''}">${match.state === 'pre' ? '-' : escapeHTML(team.score)}</span>
            </div>
          `).join('')}
        </div>
        ${goals ? `<div class="match-detail-summary"><p>【得点】${escapeHTML(goals)}</p></div>` : ''}
      </div>
    `;
  }).join('');
}

function renderDashboard() {
  renderNewsList();
  renderGroupStandings();
  renderJapanMatches();
  const featured = window.WorldCupLiveData?.selectFeaturedMatch(liveMatches);
  if (featured) renderFeaturedMatch(featured);
}

function saveLiveDataCache(fetchedAt) {
  try {
    localStorage.setItem(LIVE_DATA_CACHE_KEY, JSON.stringify({
      matches: liveMatches,
      standings: liveStandings,
      news: liveNews,
      fetchedAt
    }));
  } catch (error) {
    console.warn('Latest data could not be cached:', error);
  }
}

function renderAllLiveSections() {
  const featured = window.WorldCupLiveData?.selectFeaturedMatch(liveMatches);
  if (featured) renderFeaturedMatch(featured);
  renderGroupStandings();
  renderJapanMatches();
  renderNewsList();
  renderPowersTab();
  renderLiveTournament();
  syncPredictorMatches(liveMatches);
}

async function refreshLiveData({ reason = 'manual' } = {}) {
  if (refreshPromise) return refreshPromise;
  setConnectionStatus('updating', '更新中');

  refreshPromise = (async () => {
    try {
      const [tournamentResult, newsResult] = await Promise.allSettled([
        window.WorldCupLiveData.fetchTournamentData(),
        fetchRealNews()
      ]);

      let receivedNetworkData = false;
      let partial = false;
      if (tournamentResult.status === 'fulfilled') {
        if (Array.isArray(tournamentResult.value.matches)) {
          liveMatches = tournamentResult.value.matches;
          receivedNetworkData = true;
        }
        if (Array.isArray(tournamentResult.value.standings)) {
          liveStandings = tournamentResult.value.standings;
          receivedNetworkData = true;
        }
        partial = tournamentResult.value.partial;
      } else {
        partial = true;
        console.warn('Tournament data refresh failed:', tournamentResult.reason);
      }

      if (newsResult.status === 'fulfilled' && Array.isArray(newsResult.value) && newsResult.value.length) {
        liveNews = newsResult.value;
        receivedNetworkData = true;
      } else {
        partial = true;
      }

      if (!receivedNetworkData) throw new Error('No live data source responded');

      const fetchedAt = new Date().toISOString();
      lastSuccessfulRefresh = Date.parse(fetchedAt);
      saveLiveDataCache(fetchedAt);
      renderAllLiveSections();
      updateHeaderDate(new Date(fetchedAt));
      setConnectionStatus('live', partial ? '一部最新' : 'LIVE');
      return true;
    } catch (error) {
      console.warn('Live refresh failed; keeping the latest saved data:', error);
      renderAllLiveSections();
      const hasSavedData = liveMatches.length || liveStandings.length || liveNews.length;
      setConnectionStatus('offline', hasSavedData ? '保存データ' : 'オフライン');
      updateHeaderDate(lastSuccessfulRefresh ? new Date(lastSuccessfulRefresh) : null, hasSavedData ? '保存データ' : '更新');
      if (reason === 'pull') showToast('通信できないため保存データを表示しています');
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function checkForAppUpdate() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then(registration => registration.update()).catch(() => {});
}

function setupAutomaticRefresh() {
  const refreshIfVisible = () => {
    if (document.visibilityState !== 'visible') return;
    checkForAppUpdate();
    refreshLiveData({ reason: 'resume' });
  };

  document.addEventListener('visibilitychange', refreshIfVisible);
  window.addEventListener('pageshow', event => {
    if (event.persisted || Date.now() - lastSuccessfulRefresh > 30000) refreshIfVisible();
  });
  window.addEventListener('online', refreshIfVisible);
  setInterval(() => {
    if (document.visibilityState === 'visible') refreshLiveData({ reason: 'poll' });
  }, 60000);
}

// --------------------------------------------------------------------------
// 5. SAMURAI BLUE Tab - Pitch / Starting XI Builder
// --------------------------------------------------------------------------

function renderJapanTab() {
  const pitch = document.getElementById('soccerPitch');
  const nodes = document.querySelectorAll('.pitch-node');
  const modal = document.getElementById('playerModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const clearPitchBtn = document.getElementById('clearPitchBtn');
  const savePitchBtn = document.getElementById('savePitchBtn');
  
  // Add soccer field visual markings that are better represented with DOM
  const markings = document.createElement('div');
  markings.className = 'soccer-pitch-penalty-bottom';
  pitch.appendChild(markings);
  
  const markingsGoal = document.createElement('div');
  markingsGoal.className = 'soccer-pitch-goal-bottom';
  pitch.appendChild(markingsGoal);

  const markingsTop = document.createElement('div');
  markingsTop.className = 'soccer-pitch-penalty-top';
  pitch.appendChild(markingsTop);

  // Restore saved lineup on pitch nodes
  nodes.forEach(node => {
    const position = node.getAttribute('data-position');
    if (savedStartingXI[position]) {
      const playerNum = savedStartingXI[position];
      const player = JAPAN_SQUAD.find(p => p.number === playerNum);
      if (player) {
        setPlayerOnNode(node, player);
      }
    }

    // Node click handler
    node.addEventListener('click', () => {
      selectedPitchNode = node;
      openPlayerSelectorModal(position);
    });
  });

  // Close modal click
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  // Clear Pitch
  if (clearPitchBtn) {
    clearPitchBtn.addEventListener('click', () => {
      nodes.forEach(node => {
        const innerNode = node.querySelector('.node-player');
        innerNode.textContent = '+';
        innerNode.classList.remove('selected');
        innerNode.style.backgroundImage = 'none';
        node.querySelector('.node-label').textContent = node.getAttribute('data-position');
      });
      savedStartingXI = {};
      localStorage.removeItem('wc2026_starting_xi');
    });
  }

  // Save Pitch
  if (savePitchBtn) {
    savePitchBtn.addEventListener('click', () => {
      localStorage.setItem('wc2026_starting_xi', JSON.stringify(savedStartingXI));
      alert('スターティングXIを保存しました！');
    });
  }
}

function openPlayerSelectorModal(position) {
  const modal = document.getElementById('playerModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalList = document.getElementById('modalPlayerList');
  
  if (!modal || !modalList) return;

  modalTitle.textContent = `${position} ポジションの選手を選択`;
  modal.classList.add('active');

  // Filter players that could fit this position roughly, or show all
  // Let's show all players but highlight matching positions first
  let filteredSquad = [...JAPAN_SQUAD];
  
  // Sort: matching position type (e.g. GK for GK node, DF for CB/SB, MF for DMF/OH, FW for CF/LWG/RWG)
  function getPositionCategory(pos) {
    if (pos === 'GK') return 'GK';
    if (['CB', 'SB', 'LSB', 'RSB', 'LCB', 'RCB'].includes(pos)) return 'DF';
    if (['DMF', 'LDMF', 'RDMF', 'OH', 'MF'].includes(pos)) return 'MF';
    if (['CF', 'LWG', 'RWG', 'FW'].includes(pos)) return 'FW';
    return '';
  }

  const nodeCategory = getPositionCategory(position);
  
  // Sort so matching position category is at the top
  filteredSquad.sort((a, b) => {
    const aCat = getPositionCategory(a.pos);
    const bCat = getPositionCategory(b.pos);
    if (aCat === nodeCategory && bCat !== nodeCategory) return -1;
    if (aCat !== nodeCategory && bCat === nodeCategory) return 1;
    return a.number - b.number;
  });

  // Render player items
  modalList.innerHTML = filteredSquad.map(player => {
    // Check if player is already selected in ANOTHER position
    const isSelectedElsewhere = Object.values(savedStartingXI).includes(player.number);
    const isSelectedThisNode = savedStartingXI[position] === player.number;
    
    return `
      <li class="modal-player-item ${isSelectedThisNode ? 'selected' : ''}" 
          onclick="selectPlayerForPitch(${player.number}, ${isSelectedElsewhere})">
        <div class="player-info-row">
          <div class="player-avatar-wrap" style="width: 32px; height: 32px; margin-right: 4px;">
            <img src="assets/players/${player.number}.jpg" 
                 onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(player.name)}'" 
                 alt="${player.kanji}" 
                 class="player-avatar-img">
          </div>
          <div class="details">
            <span class="name">${player.kanji}</span>
            <span class="pos-club">${player.pos} | ${player.club}</span>
          </div>
        </div>
        ${isSelectedThisNode ? '<span class="selection-marker">選択中</span>' : ''}
        ${isSelectedElsewhere && !isSelectedThisNode ? '<span class="selection-marker" style="color: var(--text-tertiary);">他で起用中</span>' : ''}
      </li>
    `;
  }).join('');
}

// Global click wrapper for selector list
window.selectPlayerForPitch = function(playerNumber, isSelectedElsewhere) {
  if (isSelectedElsewhere) {
    if (!confirm('この選手はすでに別のポジションで起用されています。配置を移動しますか？')) {
      return;
    }
    // Remove player from other position
    for (const pos in savedStartingXI) {
      if (savedStartingXI[pos] === playerNumber) {
        delete savedStartingXI[pos];
        const otherNode = document.querySelector(`.pitch-node[data-position="${pos}"]`);
        if (otherNode) {
          const innerNode = otherNode.querySelector('.node-player');
          innerNode.textContent = '+';
          innerNode.classList.remove('selected');
          otherNode.querySelector('.node-label').textContent = pos;
        }
      }
    }
  }

  const player = JAPAN_SQUAD.find(p => p.number === playerNumber);
  const position = selectedPitchNode.getAttribute('data-position');
  
  savedStartingXI[position] = playerNumber;
  setPlayerOnNode(selectedPitchNode, player);
  
  // Close Modal
  document.getElementById('playerModal').classList.remove('active');
};

function setPlayerOnNode(node, player) {
  const innerNode = node.querySelector('.node-player');
  innerNode.innerHTML = `
    <img src="assets/players/${player.number}.jpg" 
         onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(player.name)}'" 
         alt="${player.kanji}" 
         class="node-avatar-img">
  `;
  innerNode.classList.add('selected');
  
  // Label updates to player kanji name (shortened/family name if too long)
  const shortName = player.kanji.split(' ').pop() || player.kanji;
  node.querySelector('.node-label').textContent = shortName;
}

// --------------------------------------------------------------------------
// 6. Players List Filter & Render
// --------------------------------------------------------------------------

function renderPlayersTab() {
  const playersGrid = document.getElementById('playersGrid');
  const chips = document.querySelectorAll('.filter-chip');
  
  if (!playersGrid) return;

  function displayPlayers(posFilter) {
    const filtered = posFilter === 'ALL' 
      ? JAPAN_SQUAD 
      : JAPAN_SQUAD.filter(p => p.pos === posFilter);
      
    playersGrid.innerHTML = filtered.map(player => `
      <div class="player-card" onclick="showPlayerDetail(${player.number})">
        <div class="player-card-num">${player.number}</div>
        <div class="player-card-header">
          <div class="player-avatar-wrap">
            <img src="assets/players/${player.number}.jpg" 
                 onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(player.name)}'" 
                 alt="${player.kanji}" 
                 class="player-avatar-img">
          </div>
          <div class="player-card-meta">
            <span class="player-jersey">#${player.number}</span>
            <span class="player-card-name">${player.kanji}</span>
          </div>
        </div>
        <div class="player-card-details">
          <div><span class="player-card-pos ${player.pos.toLowerCase()}">${player.pos}</span></div>
          <div>年齢: ${player.age}歳</div>
          <div style="font-weight: 500;">${player.club}</div>
          <div class="mt-1" style="color: var(--color-accent); font-weight: 700;">レーティング: ${player.rating}</div>
        </div>
      </div>
    `).join('');
  }

  // Filter click actions
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const pos = chip.getAttribute('data-pos');
      displayPlayers(pos);
    });
  });

  // Initial render
  displayPlayers('ALL');
}

// --------------------------------------------------------------------------
// 6.5. Player Detail Bottom Sheet Modal
// --------------------------------------------------------------------------

window.showPlayerDetail = function(playerNumber) {
  const player = JAPAN_SQUAD.find(p => p.number === playerNumber);
  if (!player) return;

  const modal = document.getElementById('playerDetailModal');
  const body = document.getElementById('playerDetailModalBody');
  const closeBtn = document.getElementById('closeDetailModalBtn');
  
  if (!modal || !body) return;

  // Position full names
  const positionNames = {
    'GK': 'ゴールキーパー (GK)',
    'DF': 'ディフェンダー (DF)',
    'MF': 'ミッドフィルダー (MF)',
    'FW': 'フォワード (FW)'
  };
  
  const playStyles = {
    'GK': '高いセービング技術と抜群の反射神経を持ち、正確なフィードで最後方から攻撃の起点となる現代的な守護神。',
    'DF': '強固なフィジカルによる高い守備力とインテンシティを誇り、ビルドアップ力も兼ね備えた最終ラインの盾。',
    'MF': '卓越した戦術眼、広い視野、精密なパス精度を誇り、攻守のリンクマンとしてゲームを支配する司令塔。',
    'FW': '圧倒的なアジリティとスピードで裏スペースへ抜け出し、ゴール前での鋭い嗅覚で得点を量産するストライカー。'
  };

  // Generate deterministic mock stats based on jersey number & rating
  const offset = (n) => ((player.number * n) % 11) - 5; // -5 to 5
  const r = player.rating;

  const stats = {};
  if (player.pos === 'GK') {
    stats.defense = Math.min(99, r + 4 + offset(1));
    stats.attack = Math.min(99, Math.max(10, r - 50 + offset(2)));
    stats.speed = Math.min(99, r - 12 + offset(3));
    stats.stamina = Math.min(99, r - 8 + offset(4));
    stats.technique = Math.min(99, r - 15 + offset(5));
  } else if (player.pos === 'DF') {
    stats.defense = Math.min(99, r + 3 + offset(1));
    stats.attack = Math.min(99, r - 22 + offset(2));
    stats.speed = Math.min(99, r - 4 + offset(3));
    stats.stamina = Math.min(99, r + 2 + offset(4));
    stats.technique = Math.min(99, r - 8 + offset(5));
  } else if (player.pos === 'MF') {
    stats.defense = Math.min(99, r - 8 + offset(1));
    stats.attack = Math.min(99, r - 3 + offset(2));
    stats.speed = Math.min(99, r - 2 + offset(3));
    stats.stamina = Math.min(99, r - 1 + offset(4));
    stats.technique = Math.min(99, r + 3 + offset(5));
  } else { // FW
    stats.defense = Math.min(99, Math.max(15, r - 35 + offset(1)));
    stats.attack = Math.min(99, r + 4 + offset(2));
    stats.speed = Math.min(99, r + 5 + offset(3));
    stats.stamina = Math.min(99, r - 4 + offset(4));
    stats.technique = Math.min(99, r + 2 + offset(5));
  }

  // Calculate mock market value
  const marketValueYen = Math.round(player.rating * player.rating * (35 - player.age) * 45000);
  const marketValueEuro = (marketValueYen / 160).toFixed(1);
  let valStr = "";
  if (marketValueYen >= 100000000) {
    valStr = `約 ${(marketValueYen / 100000000).toFixed(1)} 億円 (${(marketValueEuro / 100).toFixed(1)}M €)`;
  } else {
    valStr = `約 ${(marketValueYen / 10000).toLocaleString('ja-JP')} 万円`;
  }

  body.innerHTML = `
    <div class="player-detail-profile">
      <div class="player-detail-avatar-wrap">
        <img src="assets/players/${player.number}.jpg" 
             onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(player.name)}'" 
             alt="${player.kanji}" 
             class="player-detail-avatar">
      </div>
      <div class="player-detail-meta">
        <div class="player-detail-name">${player.kanji}</div>
        <div class="player-detail-subname">${player.name}</div>
        <div class="player-detail-badge-row">
          <span class="player-detail-badge number">#${player.number}</span>
          <span class="player-detail-badge position">${positionNames[player.pos] || player.pos}</span>
        </div>
      </div>
    </div>

    <div class="player-detail-info-grid">
      <div class="player-detail-info-box">
        <div class="player-detail-info-label">年齢</div>
        <div class="player-detail-info-val">${player.age}歳</div>
      </div>
      <div class="player-detail-info-box">
        <div class="player-detail-info-val" style="font-size: 0.72rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${player.club}</div>
        <div class="player-detail-info-label" style="margin-top: 4px;">所属クラブ</div>
      </div>
      <div class="player-detail-info-box">
        <div class="player-detail-info-label">総合評価</div>
        <div class="player-detail-info-val" style="color: var(--color-accent);">${player.rating}</div>
      </div>
    </div>

    <div class="player-detail-stats">
      <h4>📈 実力パラメータ（詳細AI分析）</h4>
      
      <div class="player-detail-stat-row">
        <span class="player-detail-stat-name">攻撃力</span>
        <div class="player-detail-stat-bar-outer">
          <div class="player-detail-stat-bar-inner" style="width: ${stats.attack}%;"></div>
        </div>
        <span class="player-detail-stat-val">${stats.attack}</span>
      </div>

      <div class="player-detail-stat-row">
        <span class="player-detail-stat-name">守備力</span>
        <div class="player-detail-stat-bar-outer">
          <div class="player-detail-stat-bar-inner" style="width: ${stats.defense}%;"></div>
        </div>
        <span class="player-detail-stat-val">${stats.defense}</span>
      </div>

      <div class="player-detail-stat-row">
        <span class="player-detail-stat-name">スピード</span>
        <div class="player-detail-stat-bar-outer">
          <div class="player-detail-stat-bar-inner" style="width: ${stats.speed}%;"></div>
        </div>
        <span class="player-detail-stat-val">${stats.speed}</span>
      </div>

      <div class="player-detail-stat-row">
        <span class="player-detail-stat-name">スタミナ</span>
        <div class="player-detail-stat-bar-outer">
          <div class="player-detail-stat-bar-inner" style="width: ${stats.stamina}%;"></div>
        </div>
        <span class="player-detail-stat-val">${stats.stamina}</span>
      </div>

      <div class="player-detail-stat-row">
        <span class="player-detail-stat-name">テクニック</span>
        <div class="player-detail-stat-bar-outer">
          <div class="player-detail-stat-bar-inner" style="width: ${stats.technique}%;"></div>
        </div>
        <span class="player-detail-stat-val">${stats.technique}</span>
      </div>
    </div>

    <div class="player-detail-desc">
      <strong>想定市場価値:</strong> ${valStr}<br>
      <strong style="margin-top: 4px; display: inline-block;">プレースタイル:</strong> ${playStyles[player.pos] || ''}
    </div>
  `;

  modal.classList.add('active');

  const closeModal = () => {
    modal.classList.remove('active');
  };
  
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
  
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
};

// --------------------------------------------------------------------------
// 7. Overseas Odds Predictor & Bracket
// --------------------------------------------------------------------------

const ALL_TEAMS = [
  { id: "JPN", name: "日本", flag: "🇯🇵", rating: 84 },
  { id: "SWE", name: "スウェーデン", flag: "🇸🇪", rating: 85 },
  { id: "NED", name: "オランダ", flag: "🇳🇱", rating: 87 },
  { id: "TUN", name: "チュニジア", flag: "🇹🇳", rating: 78 },
  { id: "ARG", name: "アルゼンチン", flag: "🇦🇷", rating: 92 },
  { id: "FRA", name: "フランス", flag: "🇫🇷", rating: 91 },
  { id: "BRA", name: "ブラジル", flag: "🇧🇷", rating: 90 },
  { id: "ENG", name: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 89 },
  { id: "POR", name: "ポルトガル", flag: "🇵🇹", rating: 88 },
  { id: "ESP", name: "スペイン", flag: "🇪🇸", rating: 89 },
  { id: "GER", name: "ドイツ", flag: "🇩🇪", rating: 88 },
  { id: "AUT", name: "オーストリア", flag: "🇦🇹", rating: 82 },
  { id: "NOR", name: "ノルウェー", flag: "🇳🇴", rating: 83 },
  { id: "SCO", name: "スコットランド", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 79 },
  { id: "URU", name: "ウルグアイ", flag: "🇺🇾", rating: 86 },
  { id: "ECU", name: "エクアドル", flag: "🇪🇨", rating: 81 },
  { id: "CRO", name: "クロアチア", flag: "🇭🇷", rating: 84 }
];

let ACTUAL_MATCH_CARDS = [];

function ensurePredictorTeam(team) {
  if (!team?.abbreviation || ALL_TEAMS.some(item => item.id === team.abbreviation)) return;
  ALL_TEAMS.push({
    id: team.abbreviation,
    name: team.name,
    flag: team.flag,
    rating: 82
  });
}

function populatePredictorMatches() {
  const matchSelector = document.getElementById('oddsMatchSelector');
  if (!matchSelector) return;
  const previousValue = matchSelector.value;
  const fragment = document.createDocumentFragment();
  if (!ACTUAL_MATCH_CARDS.length) {
    const loadingOption = document.createElement('option');
    loadingOption.textContent = '最新の対戦カードを取得中...';
    loadingOption.disabled = true;
    loadingOption.selected = true;
    fragment.appendChild(loadingOption);
    const placeholders = {
      flagSelectA: '⚽', flagSelectB: '⚽',
      nameTeamA: '取得中', nameTeamB: '取得中',
      ratingA: 'Rating: --', ratingB: 'Rating: --'
    };
    Object.entries(placeholders).forEach(([id, text]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    });
  }
  ACTUAL_MATCH_CARDS.forEach(match => {
    const option = document.createElement('option');
    option.value = match.id;
    option.textContent = match.name;
    fragment.appendChild(option);
  });
  matchSelector.replaceChildren(fragment);
  if (ACTUAL_MATCH_CARDS.some(match => match.id === previousValue)) {
    matchSelector.value = previousValue;
  }
}

function syncPredictorMatches(matches) {
  if (!Array.isArray(matches) || !matches.length) return;
  const now = Date.now();
  const usable = matches.filter(match => (
    match.teams.length === 2 &&
    match.teams.every(team => team.abbreviation && team.name !== '未定' && !/Winner|Loser|[123][A-L][WQ]/i.test(team.originalName || ''))
  ));
  const live = usable.filter(match => match.state === 'in');
  const upcoming = usable.filter(match => match.state === 'pre' && match.timestamp >= now)
    .sort((a, b) => a.timestamp - b.timestamp).slice(0, 16);
  const completed = usable.filter(match => match.state === 'post')
    .sort((a, b) => b.timestamp - a.timestamp).slice(0, 12);
  const selected = [...live, ...upcoming, ...completed]
    .filter((match, index, array) => array.findIndex(item => item.id === match.id) === index);
  if (!selected.length) return;

  selected.forEach(match => match.teams.forEach(ensurePredictorTeam));
  ACTUAL_MATCH_CARDS = selected.map(match => {
    const [teamA, teamB] = match.teams;
    const result = match.state === 'post' ? `・最終結果 ${teamA.score}-${teamB.score}` : '';
    const liveLabel = match.state === 'in' ? `・LIVE ${match.displayClock}` : '';
    return {
      id: `espn-${match.id}`,
      name: `${teamA.name} vs ${teamB.name} (${formatMatchDate(match.date)}${liveLabel}${result})`,
      teamA: teamA.abbreviation,
      teamB: teamB.abbreviation,
      odds: match.state === 'pre',
      state: match.state
    };
  });
  populatePredictorMatches();
  calculateOddsAndPredictions();
}

function renderPredictorTab() {
  const matchSelector = document.getElementById('oddsMatchSelector');
  
  if (!matchSelector) {
    restoreBracketUI();
    return;
  }

  // Populate match dropdown (use saved live data immediately when available)
  if (liveMatches.length) syncPredictorMatches(liveMatches);
  else populatePredictorMatches();

  // Selector change handler
  matchSelector.addEventListener('change', () => {
    calculateOddsAndPredictions();
  });

  // Initial calculation
  calculateOddsAndPredictions();

  // Restore bracket predictions UI
  restoreBracketUI();
  renderLiveTournament();
}

function calculateOddsAndPredictions() {
  const matchSelector = document.getElementById('oddsMatchSelector');
  if (!matchSelector) return;

  const matchId = matchSelector.value;
  const match = ACTUAL_MATCH_CARDS.find(m => m.id === matchId);
  if (!match) return;

  const teamA = ALL_TEAMS.find(t => t.id === match.teamA);
  const teamB = ALL_TEAMS.find(t => t.id === match.teamB);
  
  if (!teamA || !teamB) return;

  // 1. Team visual elements updates
  document.getElementById('flagSelectA').textContent = teamA.flag;
  document.getElementById('nameTeamA').textContent = teamA.name;
  document.getElementById('ratingA').textContent = `Rating: ${teamA.rating}`;

  document.getElementById('flagSelectB').textContent = teamB.flag;
  document.getElementById('nameTeamB').textContent = teamB.name;
  document.getElementById('ratingB').textContent = `Rating: ${teamB.rating}`;

  document.getElementById('labelWinA').textContent = `${teamA.name} 勝`;
  document.getElementById('labelWinB').textContent = `${teamB.name} 勝`;

  const oddsElements = [
    'oddsA-bet365', 'oddsD-bet365', 'oddsB-bet365',
    'oddsA-williamhill', 'oddsD-williamhill', 'oddsB-williamhill',
    'oddsA-unibet', 'oddsD-unibet', 'oddsB-unibet'
  ];

  // オッズ情報がない場合の処理 ("オッズなし" の対応)
  if (!match.odds) {
    oddsElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = '-';
        el.classList.remove('highlight-odds');
      }
    });

    document.getElementById('probLabelA').textContent = `${teamA.name}: -%`;
    document.getElementById('probLabelD').textContent = `引分: -%`;
    document.getElementById('probLabelB').textContent = `${teamB.name}: -%`;
    document.getElementById('probBarA').style.width = '0%';
    document.getElementById('probBarD').style.width = '0%';
    document.getElementById('probBarB').style.width = '0%';

    const scorePredList = document.getElementById('scorePredList');
    if (scorePredList) {
      scorePredList.innerHTML = `<li class="score-pred-item" style="justify-content: center; color: var(--text-tertiary);">オッズ情報なし (対戦終了または対象外)</li>`;
    }

    const commentaryText = document.getElementById('aiAnalysisText');
    if (commentaryText) {
      commentaryText.textContent = 'この試合は終了済みのため、試合前予測の対象外です。順位表や対戦結果タブをご確認ください。';
    }
    return;
  }

  // 2. Probability calculations based on rating diff (Only when odds: true)
  const diff = teamA.rating - teamB.rating;
  
  let pA = 0.37 + diff * 0.022;
  let pB = 0.37 - diff * 0.022;
  let pD = 0.26;

  pA = Math.max(0.08, Math.min(0.80, pA));
  pB = Math.max(0.08, Math.min(0.80, pB));
  pD = Math.max(0.12, Math.min(0.35, 1.0 - pA - pB));

  const totalP = pA + pB + pD;
  const probA = pA / totalP;
  const probB = pB / totalP;
  const probD = pD / totalP;

  const pctA = Math.round(probA * 100);
  const pctB = Math.round(probB * 100);
  const pctD = 100 - pctA - pctB;

  document.getElementById('probLabelA').textContent = `${teamA.name}: ${pctA}%`;
  document.getElementById('probLabelD').textContent = `引分: ${pctD}%`;
  document.getElementById('probLabelB').textContent = `${teamB.name}: ${pctB}%`;

  document.getElementById('probBarA').style.width = `${pctA}%`;
  document.getElementById('probBarD').style.width = `${pctD}%`;
  document.getElementById('probBarB').style.width = `${pctB}%`;

  // 3. Bookmaker Odds calculation
  const bookies = {
    bet365: { payout: 0.935, var: 0.015 },
    williamhill: { payout: 0.925, var: -0.01 },
    unibet: { payout: 0.940, var: 0.005 }
  };

  const oddsFieldMapping = {
    bet365: { a: 'oddsA-bet365', d: 'oddsD-bet365', b: 'oddsB-bet365' },
    williamhill: { a: 'oddsA-williamhill', d: 'oddsD-williamhill', b: 'oddsB-williamhill' },
    unibet: { a: 'oddsA-unibet', d: 'oddsD-unibet', b: 'oddsB-unibet' }
  };

  function getOddsValue(prob, payout, variance) {
    const baseOdds = 1 / prob;
    const finalOdds = baseOdds * payout * (1 + variance);
    return Math.max(1.02, Math.round(finalOdds * 100) / 100).toFixed(2);
  }

  document.querySelectorAll('.odds-val').forEach(el => el.classList.remove('highlight-odds'));

  for (const bId in bookies) {
    const payout = bookies[bId].payout;
    const vari = bookies[bId].var;
    
    const oA = getOddsValue(probA, payout, vari * 0.7);
    const oD = getOddsValue(probD, payout, -vari * 0.2);
    const oB = getOddsValue(probB, payout, -vari * 0.5);

    const elA = document.getElementById(oddsFieldMapping[bId].a);
    const elD = document.getElementById(oddsFieldMapping[bId].d);
    const elB = document.getElementById(oddsFieldMapping[bId].b);

    if (elA && elD && elB) {
      elA.textContent = oA;
      elD.textContent = oD;
      elB.textContent = oB;

      const numericA = parseFloat(oA);
      const numericD = parseFloat(oD);
      const numericB = parseFloat(oB);
      
      const minOdds = Math.min(numericA, numericD, numericB);
      if (numericA === minOdds) elA.classList.add('highlight-odds');
      else if (numericD === minOdds) elD.classList.add('highlight-odds');
      else elB.classList.add('highlight-odds');
    }
  }

  // 4. Poisson Goal Distribution for Top 3 Scorelines
  let lambdaA = 1.35 + diff * 0.08;
  let lambdaB = 1.35 - diff * 0.08;
  lambdaA = Math.max(0.4, Math.min(2.8, lambdaA));
  lambdaB = Math.max(0.4, Math.min(2.8, lambdaB));

  function poisson(k, lambda) {
    let factorial = 1;
    for (let i = 1; i <= k; i++) factorial *= i;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial;
  }

  const scoresList = [];
  for (let scoreA = 0; scoreA <= 4; scoreA++) {
    for (let scoreB = 0; scoreB <= 4; scoreB++) {
      const prob = poisson(scoreA, lambdaA) * poisson(scoreB, lambdaB);
      scoresList.push({ scoreA, scoreB, prob });
    }
  }

  scoresList.sort((a, b) => b.prob - a.prob);

  const scorePredList = document.getElementById('scorePredList');
  if (scorePredList) {
    scorePredList.innerHTML = scoresList.slice(0, 3).map((item, idx) => {
      const pct = (item.prob * 100).toFixed(1);
      return `
        <li class="score-pred-item">
          <span class="rank">#${idx + 1}</span>
          <span class="score-text">${escapeHTML(teamA.name)} ${item.scoreA} - ${item.scoreB} ${escapeHTML(teamB.name)}</span>
          <span class="percentage">${pct}%</span>
        </li>
      `;
    }).join('');
  }

  // 5. AI Commentary Report
  const commentaryText = document.getElementById('aiAnalysisText');
  if (commentaryText) {
    let report = "";
    const avgOddsA = ((parseFloat(getOddsValue(probA, bookies.bet365.payout, 0)) + 
                       parseFloat(getOddsValue(probA, bookies.williamhill.payout, 0)) + 
                       parseFloat(getOddsValue(probA, bookies.unibet.payout, 0))) / 3).toFixed(2);
    const avgOddsB = ((parseFloat(getOddsValue(probB, bookies.bet365.payout, 0)) + 
                       parseFloat(getOddsValue(probB, bookies.williamhill.payout, 0)) + 
                       parseFloat(getOddsValue(probB, bookies.unibet.payout, 0))) / 3).toFixed(2);

    if (diff > 4) {
      report = `レーティングモデルは、${teamA.flag} ${teamA.name}の優位を予測しています。参考オッズは${avgOddsA}倍、勝率評価は${pctA}%です。チーム評価の差から、${teamA.name}が試合を優位に進める可能性が高いと算出されました。`;
    } else if (diff >= 1) {
      report = `レーティングモデルでは、${teamA.flag} ${teamA.name}がわずかに優勢です（勝率${pctA}%、参考オッズ${avgOddsA}倍）。${teamB.flag} ${teamB.name}の勝率も${pctB}%あり、引き分けを含めて接戦になる可能性が高いカードです。`;
    } else if (diff === 0) {
      report = `レーティング上は完全な互角です。両チームの勝率評価はほぼ同等（約${pctA}%）で、引き分けを含むどの結果も十分に考えられます。`;
    } else if (diff >= -4) {
      report = `レーティングモデルでは、${teamB.flag} ${teamB.name}がわずかに優勢です（勝率${pctB}%、参考オッズ${avgOddsB}倍）。一方、${teamA.flag} ${teamA.name}の勝率も${pctA}%あり、ドローまたは1点差の接戦が有力です。`;
    } else {
      report = `レーティングモデルは、${teamB.flag} ${teamB.name}の優位を予測しています。参考オッズは${avgOddsB}倍、勝率評価は${pctB}%です。チーム評価の差から、${teamB.name}が試合を優位に進める可能性が高いと算出されました。`;
    }
    commentaryText.textContent = report;
  }
}

// --------------------------------------------------------------------------
// Bracket Predictor Logic
// --------------------------------------------------------------------------

const TEAMS_MAP = {
  "ARG": { name: "アルゼンチン", flag: "🇦🇷" },
  "ENG": { name: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  "ESP": { name: "スペイン", flag: "🇪🇸" },
  "GER": { name: "ドイツ", flag: "🇩🇪" },
  "FRA": { name: "フランス", flag: "🇫🇷" },
  "POR": { name: "ポルトガル", flag: "🇵🇹" },
  "BRA": { name: "ブラジル", flag: "🇧🇷" },
  "JPN": { name: "日本", flag: "🇯🇵" }
};

window.predictBracketWinner = function(matchId, teamId) {
  // Update selection in bracket
  const matchElement = document.querySelector(`.bracket-match[data-match-id="${matchId}"]`);
  if (!matchElement) return;

  const teamElements = matchElement.querySelectorAll('.bracket-team');
  teamElements.forEach(el => {
    const elTeamId = el.getAttribute('data-team-id');
    if (elTeamId === teamId) {
      el.classList.remove('loser');
      el.classList.add('winner');
    } else {
      el.classList.remove('winner');
      el.classList.add('loser');
    }
  });

  bracketPredictions[matchId] = teamId;
  localStorage.setItem('wc2026_bracket_preds', JSON.stringify(bracketPredictions));

  // Advance winner to the next round slot
  advanceBracket(matchId, teamId);
};

function advanceBracket(matchId, winnerId) {
  let nextMatchId = '';
  let nextSlot = '';

  if (matchId === 'q1') {
    nextMatchId = 'sf1';
    nextSlot = 'q1-winner';
  } else if (matchId === 'q2') {
    nextMatchId = 'sf1';
    nextSlot = 'q2-winner';
  } else if (matchId === 'q3') {
    nextMatchId = 'sf2';
    nextSlot = 'q3-winner';
  } else if (matchId === 'q4') {
    nextMatchId = 'sf2';
    nextSlot = 'q4-winner';
  } else if (matchId === 'sf1') {
    nextMatchId = 'f';
    nextSlot = 'sf1-winner';
  } else if (matchId === 'sf2') {
    nextMatchId = 'f';
    nextSlot = 'sf2-winner';
  } else if (matchId === 'f') {
    // Show Champion
    displayChampion(winnerId);
    return;
  }

  // Update target team element in next match
  const nextMatchEl = document.querySelector(`.bracket-match[data-match-id="${nextMatchId}"]`);
  if (!nextMatchEl) return;

  const slotEl = nextMatchEl.querySelector(`.bracket-team[data-slot="${nextSlot}"]`);
  
  if (slotEl) {
    const teamData = TEAMS_MAP[winnerId];
    
    // Convert placeholder slot into normal team slot
    slotEl.className = 'bracket-team';
    slotEl.setAttribute('data-team-id', winnerId);
    slotEl.innerHTML = `<span class="flag">${teamData.flag}</span> <span class="name">${teamData.name}</span>`;
    
    // Set standard click event
    slotEl.onclick = function() {
      predictBracketWinner(nextMatchId, winnerId);
    };

    // If there was an old prediction for this slot, it might be invalid now. Clear it downstream.
    clearDownstreamPredictions(nextMatchId);
  }
}

function clearDownstreamPredictions(startingMatchId) {
  if (startingMatchId === 'sf1' || startingMatchId === 'sf2') {
    // Clear final
    const finalEl = document.querySelector(`.bracket-match[data-match-id="f"]`);
    const slot = startingMatchId === 'sf1' ? 'sf1-winner' : 'sf2-winner';
    const targetSlotEl = finalEl.querySelector(`[data-slot="${slot}"], [data-team-id]`);
    
    if (targetSlotEl) {
      targetSlotEl.className = 'bracket-team placeholder';
      targetSlotEl.removeAttribute('data-team-id');
      targetSlotEl.setAttribute('data-slot', slot);
      targetSlotEl.innerHTML = `<span class="name">${startingMatchId === 'sf1' ? 'SF1' : 'SF2'}勝者</span>`;
      targetSlotEl.onclick = null;
    }
    
    delete bracketPredictions['f'];
    document.getElementById('championDisplay').classList.add('hidden');
  }
  localStorage.setItem('wc2026_bracket_preds', JSON.stringify(bracketPredictions));
}

function displayChampion(teamId) {
  const champDisplay = document.getElementById('championDisplay');
  const champText = document.getElementById('champTeamText');
  const teamData = TEAMS_MAP[teamId];

  if (champDisplay && champText && teamData) {
    champText.textContent = `${teamData.flag} ${teamData.name}`;
    champDisplay.classList.remove('hidden');
    champDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function restoreBracketUI() {
  // Restore Quarter Finals clicks & classes
  for (const qMatch of ['q1', 'q2', 'q3', 'q4']) {
    const winnerId = bracketPredictions[qMatch];
    if (winnerId) {
      predictBracketWinner(qMatch, winnerId);
    }
  }

  // Restore Semi Finals selections
  for (const sfMatch of ['sf1', 'sf2']) {
    const winnerId = bracketPredictions[sfMatch];
    if (winnerId) {
      predictBracketWinner(sfMatch, winnerId);
    }
  }

  // Restore Final
  const finalWinnerId = bracketPredictions['f'];
  if (finalWinnerId) {
    predictBracketWinner('f', finalWinnerId);
  }

  // Setup Reset Button
  const resetBtn = document.getElementById('resetBracketBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      bracketPredictions = {};
      localStorage.removeItem('wc2026_bracket_preds');
      
      // Reload page to reset DOM cleanly
      window.location.reload();
    });
  }
}

// --------------------------------------------------------------------------
// 8. Powerhouse nations (Tab 5) Rendering
// --------------------------------------------------------------------------

function getNationTournamentStatus(nation) {
  const matches = window.WorldCupLiveData?.matchesForTeam(liveMatches, nation.id) || [];
  if (!matches.length) return nation.group;
  const live = matches.find(match => match.state === 'in');
  if (live) {
    const opponent = live.teams.find(team => team.abbreviation !== nation.id);
    return `${live.stageName} 試合中（vs ${opponent?.name || '未定'}）`;
  }
  const upcoming = matches.filter(match => match.state === 'pre' && match.timestamp >= Date.now())
    .sort((a, b) => a.timestamp - b.timestamp)[0];
  if (upcoming) {
    const opponent = upcoming.teams.find(team => team.abbreviation !== nation.id);
    return `次戦 ${upcoming.stageName}（vs ${opponent?.name || '未定'}・${formatMatchDate(upcoming.date)}）`;
  }
  const latest = matches.filter(match => match.state === 'post')
    .sort((a, b) => b.timestamp - a.timestamp)[0];
  if (!latest || latest.stage === 'group-stage') return nation.group;
  const team = latest.teams.find(item => item.abbreviation === nation.id);
  return `${latest.stageName}${team?.winner || team?.advanced ? '突破' : '敗退'}`;
}

function renderPowersTab() {
  const container = document.getElementById('powersList');
  if (!container) return;

  container.innerHTML = POWERHOUSE_NATIONS.map(nation => `
    <div class="power-card">
      <span class="power-team-flag">${escapeHTML(nation.flag)}</span>
      <div class="power-info">
        <div class="power-header">
          <span class="power-name">${escapeHTML(nation.name)}</span>
          <div class="power-rating-star">
            <svg class="star-icon" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>${(nation.rating / 10).toFixed(1)}</span>
          </div>
        </div>
        <div class="power-stats">
          <div><span style="font-weight: 700; color: var(--text-primary);">キープレイヤー:</span> <span class="power-key-player">${escapeHTML(nation.keyPlayer)}</span></div>
          <div><span style="font-weight: 700; color: var(--text-primary);">現在の状況:</span> ${escapeHTML(getNationTournamentStatus(nation))}</div>
          <div><span style="font-weight: 700; color: var(--text-primary);">W杯優勝回数:</span> ${nation.titles > 0 ? `${nation.titles}回` : 'なし'}</div>
          <p class="mt-1" style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35;">${escapeHTML(nation.desc)}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// 9. iOS PWA Install Instruction Banner
// --------------------------------------------------------------------------

function setupIOSInstallBanner() {
  const banner = document.getElementById('iosInstallBanner');
  const closeBtn = document.getElementById('closeInstallBannerBtn');
  
  if (!banner) return;

  // Check if iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // Check if running in standalone mode (installed as PWA)
  const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  
  // Check if user dismissed it already in this browser
  const isDismissed = localStorage.getItem('wc2026_pwa_dismissed') === 'true';

  // Only show banner on iOS, when NOT installed, and NOT dismissed
  if (isIOS && !isStandalone && !isDismissed) {
    // Show banner after a slight delay for better experience
    setTimeout(() => {
      banner.classList.remove('hidden');
    }, 1500);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('wc2026_pwa_dismissed', 'true');
    });
  }
}

// --------------------------------------------------------------------------
// 10. Pull to Refresh Implementation
// --------------------------------------------------------------------------

function setupPullToRefresh() {
  const ptr = document.getElementById('ptrContainer');
  const ptrIconWrap = ptr ? ptr.querySelector('.ptr-icon-wrap') : null;
  const ptrText = document.getElementById('ptrText');
  
  if (!ptr || !ptrIconWrap || !ptrText) return;

  let startY = 0;
  let currentY = 0;
  let isPulling = false;
  const pullThreshold = 70; // 閾値 (px)
  const maxPull = 100;       // 最大プル深度 (px)

  document.addEventListener('touchstart', (e) => {
    // モーダルが表示されている場合は更新ジェスチャーを無効化
    if (document.querySelector('.modal-overlay.active')) return;

    // スクロール位置が最上部のときのみジェスチャーを許可 (iOS Safariのバウンスによるマイナス値や端数も考慮)
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop <= 0) {
      startY = e.touches[0].pageY;
      isPulling = true;
      
      // ドラッグ中のリアルタイムな動きのためにアニメーションを一時無効化
      ptr.style.transition = 'none';
      ptrIconWrap.style.transition = 'none';
    }
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;
    
    currentY = e.touches[0].pageY;
    const diff = currentY - startY;

    if (diff > 0) {
      // 下方向に引っ張っている間はSafariのスクロールバウンス等を抑制
      if (e.cancelable) e.preventDefault();
      
      // 抵抗感を与える計算
      const pullDepth = Math.min(maxPull, diff * 0.4);
      
      ptr.classList.add('active');
      ptr.style.height = `${pullDepth}px`;
      ptr.style.marginBottom = '16px';
      
      // プルの深さに応じてアイコンを回転
      const rotation = Math.min(360, (pullDepth / pullThreshold) * 360);
      ptrIconWrap.style.transform = `rotate(${rotation}deg)`;
      
      if (pullDepth >= pullThreshold) {
        ptrText.textContent = "指を離して更新";
        ptrText.style.color = "var(--color-accent)";
      } else {
        ptrText.textContent = "引っ張って更新";
        ptrText.style.color = "var(--text-secondary)";
      }
    }
  }, { passive: false });

  document.addEventListener('touchend', async () => {
    if (!isPulling) return;
    isPulling = false;
    
    // スムーズなアニメーションを復元
    ptr.style.transition = '';
    ptrIconWrap.style.transition = '';

    const finalDiff = currentY - startY;
    const finalPullDepth = Math.min(maxPull, finalDiff * 0.4);

    if (finalPullDepth >= pullThreshold) {
      // 更新処理の実行
      ptr.classList.add('refreshing');
      ptrText.textContent = "更新中...";
      ptrText.style.color = "var(--color-success)";
      ptr.style.height = '60px';
      
      // 画面やタブを維持したまま、データとアプリ本体の更新を確認する
      let appUpdatePromise = Promise.resolve();
      if ('serviceWorker' in navigator) {
        appUpdatePromise = navigator.serviceWorker.ready
          .then(registration => registration.update())
          .catch(() => {});
      }
      const refreshed = await refreshLiveData({ reason: 'pull' });
      await appUpdatePromise;
      if (refreshed) showToast('最新情報に更新しました');

      ptr.style.height = '0';
      ptr.style.marginBottom = '0';
      ptr.classList.remove('active', 'refreshing');
      ptrIconWrap.style.transform = 'rotate(0deg)';
      ptrText.textContent = '引っ張って更新';
      ptrText.style.color = 'var(--text-secondary)';
    } else {
      // キャンセル
      ptr.style.height = '0';
      ptr.style.marginBottom = '0';
      ptr.classList.remove('active');
      ptrIconWrap.style.transform = 'rotate(0deg)';
    }
    
    startY = 0;
    currentY = 0;
  });
}

// --------------------------------------------------------------------------
// 11. Toast Notification Utility
// --------------------------------------------------------------------------

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = toast ? toast.querySelector('.toast-icon') : null;
  
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  
  if (iconEl) {
    iconEl.classList.add('spin');
  }

  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    if (iconEl) {
      iconEl.classList.remove('spin');
    }
  }, 2200);
}
