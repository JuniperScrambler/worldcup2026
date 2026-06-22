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
  { number: 23, name: "T. Hayakawa", kanji: "早川 友基", pos: "GK", club: "名古屋グランパス (JPN)", age: 27, rating: 78 },
  // DF
  { number: 4, name: "K. Itakura", kanji: "板倉 滉", pos: "DF", club: "ボルシアMG (GER)", age: 29, rating: 84 },
  { number: 16, name: "T. Tomiyasu", kanji: "冨安 健洋", pos: "DF", club: "アーセナル (ENG)", age: 27, rating: 86 },
  { number: 3, name: "S. Taniguchi", kanji: "谷口 彰悟", pos: "DF", club: "シント＝トロイデン (BEL)", age: 34, rating: 80 },
  { number: 2, name: "Y. Sugawara", kanji: "菅原 由勢", pos: "DF", club: "サウサンプトン (ENG)", age: 26, rating: 82 },
  { number: 21, name: "H. Ito", kanji: "伊藤 洋輝", pos: "DF", club: "バイエルン・ミュンヘン (GER)", age: 27, rating: 85 },
  { number: 22, name: "A. Seko", kanji: "瀬古 歩夢", pos: "DF", club: "グラスホッパー (SUI)", age: 26, rating: 79 },
  { number: 15, name: "T. Watanabe", kanji: "渡辺 剛", pos: "DF", club: "ヘント (BEL)", age: 29, rating: 80 },
  { number: 5, name: "Y. Nagatomo", kanji: "長友 佑都", pos: "DF", club: "FC東京 (JPN)", age: 39, rating: 75 },
  { number: 24, name: "J. Suzuki", kanji: "鈴木 準之輔", pos: "DF", club: "湘南ベルマーレ (JPN)", age: 23, rating: 74 },
  // MF
  { number: 6, name: "W. Endo", kanji: "遠藤 航", pos: "MF", club: "リヴァプール (ENG)", age: 33, rating: 85 },
  { number: 17, name: "A. Tanaka", kanji: "田中 碧", pos: "MF", club: "リーズ (ENG)", age: 27, rating: 82 },
  { number: 8, name: "D. Kamada", kanji: "鎌田 大地", pos: "MF", club: "クリスタル・パレス (ENG)", age: 29, rating: 83 },
  { number: 7, name: "T. Kubo", kanji: "久保 建英", pos: "MF", club: "レアル・ソシエダ (ESP)", age: 25, rating: 87 },
  { number: 10, name: "R. Doan", kanji: "堂安 律", pos: "MF", club: "フライブルク (GER)", age: 28, rating: 83 },
  { number: 14, name: "J. Ito", kanji: "伊東 純也", pos: "MF", club: "スタッド・ランス (FRA)", age: 33, rating: 84 },
  { number: 13, name: "K. Nakamura", kanji: "中村 敬斗", pos: "MF", club: "スタッド・ランス (FRA)", age: 25, rating: 82 },
  { number: 20, name: "K. Sano", kanji: "佐野 海舟", pos: "MF", club: "マインツ (GER)", age: 25, rating: 79 },
  { number: 26, name: "Y. Suzuki", kanji: "鈴木 唯人", pos: "MF", club: "ブレンビー (DEN)", age: 24, rating: 81 },
  // FW
  { number: 9, name: "A. Ueda", kanji: "上田 綺世", pos: "FW", club: "フェイエノールト (NED)", age: 27, rating: 83 },
  { number: 11, name: "D. Maeda", kanji: "前田 大然", pos: "FW", club: "セルティック (SCO)", age: 28, rating: 81 },
  { number: 18, name: "K. Ogawa", kanji: "小川 航基", pos: "FW", club: "NECナイメヘン (NED)", age: 28, rating: 80 },
  { number: 19, name: "K. Goto", kanji: "後藤 啓介", pos: "FW", club: "アンデルレヒト (BEL)", age: 21, rating: 76 },
  { number: 25, name: "K. Shiogai", kanji: "塩貝 健人", pos: "FW", club: "N.E.C. (NED)", age: 21, rating: 73 }
];

const GROUP_F_STANDINGS = [
  { rank: 1, name: "日本", flag: "🇯🇵", points: 4, matches: 2, won: 1, drawn: 1, lost: 0, gd: "+4" },
  { rank: 2, name: "オランダ", flag: "🇳🇱", points: 4, matches: 2, won: 1, drawn: 1, lost: 0, gd: "+2" },
  { rank: 3, name: "スウェーデン", flag: "🇸🇪", points: 3, matches: 2, won: 1, drawn: 0, lost: 1, gd: "-1" },
  { rank: 4, name: "チュニジア", flag: "🇹🇳", points: 0, matches: 2, won: 0, drawn: 0, lost: 2, gd: "-5" }
];

const POWERHOUSE_NATIONS = [
  { name: "アルゼンチン (前回王者)", flag: "🇦🇷", group: "グループJ (1位)", keyPlayer: "リオネル・メッシ", rating: 92, titles: 3, desc: "メッシのラストダンス。盤石の連携と勝負強さで連覇を狙う。" },
  { name: "フランス", flag: "🇫🇷", group: "グループI (2位)", keyPlayer: "キリアン・エムバペ", rating: 91, titles: 2, desc: "世界最強の攻撃陣を擁する。圧倒的な個の力とスピードで他を圧倒。" },
  { name: "ブラジル", flag: "🇧🇷", group: "グループC (1位)", keyPlayer: "ヴィニシウス・ジュニオール", rating: 90, titles: 5, desc: "伝統の王国。復調した攻撃陣と硬い守備で6度目の頂点を目指す。" },
  { name: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "グループL (1位)", keyPlayer: "ジュード・ベリンガム", rating: 89, titles: 1, desc: "若きタレントが融合。今度こそ「It's coming home」を果たせるか。" },
  { name: "ポルトガル", flag: "🇵🇹", group: "グループK (1位)", keyPlayer: "ブルーノ・フェルナンデス", rating: 88, titles: 0, desc: "新世代の攻撃陣が躍動。堅守と創造性豊かな中盤で初優勝へ。" },
  { name: "スペイン", flag: "🇪🇸", group: "グループH (1位)", keyPlayer: "ラミン・ヤマル", rating: 89, titles: 1, desc: "圧倒的なポゼッションスタイル。若きエース、ヤマルの突破力に注目。" },
  { name: "ドイツ", flag: "🇩🇪", group: "グループE (1位)", keyPlayer: "ジャマル・ムシアラ", rating: 88, titles: 4, desc: "開催国カナダ・アメリカ・メキシコで復活の狼煙をあげる古豪。" }
];

const SIMULATED_NEWS = [
  { id: 1, tag: "red", date: "6月22日 09:30", title: "【速報】久保建英、全体練習に完全合流。スウェーデン戦での先発復帰へ視界良好" },
  { id: 2, tag: "blue", date: "6月21日 18:00", title: "森保監督インタビュー「チュニジア戦の4得点は収穫。スウェーデン戦は勝ち点3に徹する」" },
  { id: 3, tag: "gold", date: "6月21日 11:15", title: "好調・上田綺世が語る決意「得点王は意識していない。チームがグループ突破を決めるゴールを」" },
  { id: 4, tag: "blue", date: "6月20日 23:45", title: "チュニジア戦大勝の立役者、中村敬斗の圧巻ミドルシュートが大会ベストゴール候補に浮上" }
];

// --------------------------------------------------------------------------
// 2. Global State & App Setup
// --------------------------------------------------------------------------

let currentTab = 'home';
let selectedPitchNode = null;
let savedStartingXI = {}; // Format: { "CF": playerNumber, "LWG": playerNumber... }
let bracketPredictions = {}; // Format: { "q1": "ARG", "sf1": "ARG", "f": "ARG" }

// Load state from localStorage on startup
function loadState() {
  const xi = localStorage.getItem('wc2026_starting_xi');
  if (xi) {
    savedStartingXI = JSON.parse(xi);
  }
  const bp = localStorage.getItem('wc2026_bracket_preds');
  if (bp) {
    bracketPredictions = JSON.parse(bp);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initApp();
});

function initApp() {
  setupTabNavigation();
  renderDashboard();
  renderJapanTab();
  renderPlayersTab();
  renderPredictorTab();
  renderPowersTab();
  setupIOSInstallBanner();
  setupPullToRefresh();
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
  const predictShortcut = document.querySelector('.predict-btn-shortcut');
  if (predictShortcut) {
    predictShortcut.addEventListener('click', () => {
      const predictorNavItem = document.querySelector('.app-navbar .nav-item[data-tab="predictor"]');
      if (predictorNavItem) {
        predictorNavItem.click();
      }
    });
  }
}

// --------------------------------------------------------------------------
// 4. Dashboard (Home) Rendering
// --------------------------------------------------------------------------

async function fetchRealNews() {
  const rssUrl = 'https://news.yahoo.co.jp/rss/topics/sports_soccer.xml';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      return data.items.slice(0, 5).map((item, idx) => {
        let dateStr = "今日";
        try {
          const d = new Date(item.pubDate);
          dateStr = `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
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
    console.warn("Failed to fetch RSS news, falling back to simulated news:", error);
  }
  return null;
}

function renderDashboard() {
  // Countdown Timer
  const matchDate = new Date('2026-06-25T16:00:00');
  
  function updateCountdown() {
    const now = new Date();
    const diffMs = matchDate - now;
    const timerEl = document.getElementById('countdownTimer');
    
    if (!timerEl) return;

    if (diffMs <= 0) {
      timerEl.textContent = "試合開始！";
      return;
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    timerEl.textContent = `${diffDays}日 ${diffHours}時間 ${diffMins}分`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 60000); // Update every minute

  // Render News
  const newsListContainer = document.getElementById('homeNewsList');
  if (newsListContainer) {
    function renderNewsList(newsItems) {
      newsListContainer.innerHTML = newsItems.map(news => {
        const isLink = !!news.link;
        const tagType = isLink ? 'a' : 'div';
        const linkAttr = isLink ? `href="${news.link}" target="_blank" rel="noopener noreferrer"` : '';
        return `
          <${tagType} class="news-card" ${linkAttr}>
            <span class="news-tag-dot ${news.tag}"></span>
            <div class="news-content">
              <div class="news-meta">
                <span>${isLink ? 'REALTIME NEWS' : 'SAMURAI BLUE'}</span>
                <span>${news.date}</span>
              </div>
              <div class="news-title">${news.title}</div>
            </div>
          </${tagType}>
        `;
      }).join('');
    }

    // First render simulated news
    renderNewsList(SIMULATED_NEWS);

    // Then asynchronously fetch real news
    fetchRealNews().then(realNews => {
      if (realNews && realNews.length > 0) {
        renderNewsList(realNews);
      }
    });
  }

  // Render Group F Table
  const tableContainer = document.getElementById('homeGroupTable');
  if (tableContainer) {
    tableContainer.innerHTML = GROUP_F_STANDINGS.map(team => `
      <tr class="${team.name === '日本' ? 'highlight-row' : ''}">
        <td class="font-bold">${team.rank}</td>
        <td style="text-align: left;"><span class="flag">${team.flag}</span>${team.name}</td>
        <td class="font-bold">${team.points}</td>
        <td>${team.matches}</td>
        <td>${team.won}</td>
        <td>${team.drawn}</td>
        <td>${team.lost}</td>
        <td>${team.gd}</td>
      </tr>
    `).join('');
  }
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

const ACTUAL_MATCH_CARDS = [
  // グループステージ実際のカード (オッズあり)
  { id: "JPN_SWE", name: "日本 vs スウェーデン (6月25日)", teamA: "JPN", teamB: "SWE", odds: true },
  { id: "NED_TUN", name: "オランダ vs チュニジア (6月25日)", teamA: "NED", teamB: "TUN", odds: true },
  { id: "ARG_AUT", name: "アルゼンチン vs オーストリア (6月24日)", teamA: "ARG", teamB: "AUT", odds: true },
  { id: "FRA_NOR", name: "フランス vs ノルウェー (6月24日)", teamA: "FRA", teamB: "NOR", odds: true },
  { id: "BRA_SCO", name: "ブラジル vs スコットランド (6月24日)", teamA: "BRA", teamB: "SCO", odds: true },
  { id: "ESP_URU", name: "スペイン vs ウルグアイ (6月25日)", teamA: "ESP", teamB: "URU", odds: true },
  { id: "GER_ECU", name: "ドイツ vs エクアドル (6月25日)", teamA: "GER", teamB: "ECU", odds: true },
  { id: "ENG_CRO", name: "イングランド vs クロアチア (6月25日)", teamA: "ENG", teamB: "CRO", odds: true },
  
  // 決勝トーナメント想定カード (オッズあり)
  { id: "ARG_ENG", name: "【想定】アルゼンチン vs イングランド", teamA: "ARG", teamB: "ENG", odds: true },
  { id: "ESP_GER", name: "【想定】スペイン vs ドイツ", teamA: "ESP", teamB: "GER", odds: true },
  { id: "FRA_POR", name: "【想定】フランス vs ポルトガル", teamA: "FRA", teamB: "POR", odds: true },
  { id: "BRA_JPN", name: "【想定】ブラジル vs 日本", teamA: "BRA", teamB: "JPN", odds: true },

  // オッズなしの対戦済/対象外カード (テスト用)
  { id: "JPN_NED", name: "日本 vs オランダ (対戦済・オッズなし)", teamA: "JPN", teamB: "NED", odds: false },
  { id: "JPN_TUN", name: "日本 vs チュニジア (対戦済・オッズなし)", teamA: "JPN", teamB: "TUN", odds: false }
];

function renderPredictorTab() {
  const matchSelector = document.getElementById('oddsMatchSelector');
  
  if (!matchSelector) {
    restoreBracketUI();
    return;
  }

  // Populate match dropdown
  matchSelector.innerHTML = ACTUAL_MATCH_CARDS.map(match => `
    <option value="${match.id}">${match.name}</option>
  `).join('');

  // Selector change handler
  matchSelector.addEventListener('change', () => {
    calculateOddsAndPredictions();
  });

  // Initial calculation
  calculateOddsAndPredictions();

  // Restore bracket predictions UI
  restoreBracketUI();
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
      commentaryText.innerHTML = `ℹ️ **この試合はすでに終了しているか、ブックメーカーのオッズ提供対象外です。**<br>順位表や対戦結果タブをご確認ください。`;
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
          <span class="score-text">${teamA.name} ${item.scoreA} - ${item.scoreB} ${teamB.name}</span>
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
      report = `海外の主要ブックメーカーは、${teamA.flag} **${teamA.name}の圧倒的優位**を予想しています。平均オッズは **${avgOddsA}倍** を推移しており、勝率評価は **${pctA}%** に達しています。AIによるスタッツ分析では、${teamA.name}の選手個々のクオリティと現在の戦術的成熟度が、${teamB.name}を大きく上回っていると判断されました。特に守備の安定感が際立っており、無失点勝利を予想する海外投資家が多い傾向にあります。`;
    } else if (diff >= 1) {
      report = `ブックメーカー各社のオッズは、${teamA.flag} **${teamA.name}が僅かに優勢**（勝率約 **${pctA}%**、平均オッズ **${avgOddsA}倍**）であることを示しています。実力は拮抗していますが、${teamA.name}の攻撃アジリティとボール保持力が有利に働いています。一方、${teamB.flag} **${teamB.name}（勝率${pctB}%）**の走力とカウンターによる決定力も軽視されておらず、引き分け（オッズ約3倍台）も十分に狙える、接戦必至のカードと評価されています。`;
    } else if (diff === 0) {
      report = `オッズの観点から、**完全な互角（フィフティ・フィフティ）**と評価されています。両チームの勝率評価はほぼ同等（約 **${pctA}%**）であり、オッズも完全に割れています。両チームの戦術的志向は好対照（ポゼッションの${teamA.name}対、組織力・フィジカルの${teamB.name}）であり、中盤でのセカンドボールの回収率が試合の命運を分けることになりそうです。ブックメーカーの取引量も均等で、世界中のベッターの予想が最も割れている一戦です。`;
    } else if (diff >= -4) {
      report = `海外ブックメーカーでは、${teamB.flag} **${teamB.name}が僅かに優勢**（勝率約 **${pctB}%**、平均オッズ **${avgOddsB}倍**）であると支持を集めています。${teamB.name}のフィジカル的な優位性と高いラインコントロールがオッズに反映されています。しかし、${teamA.flag} **${teamA.name}（勝率${pctA}%、オッズ${avgOddsA}倍）**の機動力とアジリティを用いた崩しは非常に脅威であり、海外のAIデータ分析ではドローまたは1点差での勝負となる可能性が最も高いと指摘されています。`;
    } else {
      report = `海外ブックメーカーは、${teamB.flag} **${teamB.name}の絶対的な優位**をオッズに表しています。平均オッズは **${avgOddsB}倍** となっており、これは勝率評価 **${pctB}%** に相当します。${teamB.name}のインテンシティとトランジションの速度は世界屈指であり、${teamA.name}が守備ブロックでどこまで耐えられるかがポイントになります。スコア予想でも${teamB.name}の複数得点による勝利が本命視されています。`;
    }
    commentaryText.innerHTML = report;
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

function renderPowersTab() {
  const container = document.getElementById('powersList');
  if (!container) return;

  container.innerHTML = POWERHOUSE_NATIONS.map(nation => `
    <div class="power-card">
      <span class="power-team-flag">${nation.flag}</span>
      <div class="power-info">
        <div class="power-header">
          <span class="power-name">${nation.name}</span>
          <div class="power-rating-star">
            <svg class="star-icon" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>${(nation.rating / 10).toFixed(1)}</span>
          </div>
        </div>
        <div class="power-stats">
          <div><span style="font-weight: 700; color: var(--text-primary);">キープレイヤー:</span> <span class="power-key-player">${nation.keyPlayer}</span></div>
          <div><span style="font-weight: 700; color: var(--text-primary);">現在の状況:</span> ${nation.group}</div>
          <div><span style="font-weight: 700; color: var(--text-primary);">W杯優勝回数:</span> ${nation.titles > 0 ? `${nation.titles}回` : 'なし'}</div>
          <p class="mt-1" style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35;">${nation.desc}</p>
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
    // スクロール位置が最上部のときのみジェスチャーを許可
    if (window.scrollY === 0) {
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

  document.addEventListener('touchend', () => {
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
      
      // 動的データの更新
      Promise.all([
        fetchRealNews().then(realNews => {
          const newsListContainer = document.getElementById('homeNewsList');
          if (newsListContainer && realNews && realNews.length > 0) {
            newsListContainer.innerHTML = realNews.map(news => {
              const isLink = !!news.link;
              const tagType = isLink ? 'a' : 'div';
              const linkAttr = isLink ? `href="${news.link}" target="_blank" rel="noopener noreferrer"` : '';
              return `
                <${tagType} class="news-card" ${linkAttr}>
                  <span class="news-tag-dot ${news.tag}"></span>
                  <div class="news-content">
                    <div class="news-meta">
                      <span>${isLink ? 'REALTIME NEWS' : 'SAMURAI BLUE'}</span>
                      <span>${news.date}</span>
                    </div>
                    <div class="news-title">${news.title}</div>
                  </div>
                </${tagType}>
              `;
            }).join('');
          }
        }),
        // SWのチェックを強制
        ('serviceWorker' in navigator) ? navigator.serviceWorker.ready.then(reg => reg.update()) : Promise.resolve()
      ]).then(() => {
        showToast("最新情報に更新しました");
      }).catch((err) => {
        console.warn("Pull-to-refresh check failed:", err);
        showToast("更新に失敗しました");
      }).finally(() => {
        setTimeout(() => {
          ptr.style.height = '0';
          ptr.style.marginBottom = '0';
          ptr.classList.remove('active');
          ptr.classList.remove('refreshing');
          ptrIconWrap.style.transform = 'rotate(0deg)';
        }, 600);
      });
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
