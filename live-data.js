/* ==========================================================================
   World Cup 2026 live data adapter
   ========================================================================== */

(function attachLiveData(globalScope) {
  'use strict';

  const SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
  const STANDINGS_URL = 'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings';

  const TEAM_NAMES_JA = {
    ALB: 'アルバニア', ALG: 'アルジェリア', ARG: 'アルゼンチン', AUS: 'オーストラリア',
    AUT: 'オーストリア', BEL: 'ベルギー', BIH: 'ボスニア・ヘルツェゴビナ', BRA: 'ブラジル',
    CAN: 'カナダ', CIV: 'コートジボワール', CMR: 'カメルーン', COD: 'コンゴ民主共和国',
    COL: 'コロンビア', CPV: 'カーボベルデ', CRC: 'コスタリカ', CRO: 'クロアチア', CUW: 'キュラソー',
    CZE: 'チェコ', DEN: 'デンマーク', ECU: 'エクアドル', EGY: 'エジプト',
    ENG: 'イングランド', ESP: 'スペイン', FRA: 'フランス', GER: 'ドイツ',
    GHA: 'ガーナ', HAI: 'ハイチ', IRN: 'イラン', IRQ: 'イラク',
    ITA: 'イタリア', JAM: 'ジャマイカ', JOR: 'ヨルダン', JPN: '日本',
    KOR: '韓国', KSA: 'サウジアラビア', MAR: 'モロッコ', MEX: 'メキシコ',
    NED: 'オランダ', NGA: 'ナイジェリア', NOR: 'ノルウェー', NZL: 'ニュージーランド',
    PAN: 'パナマ', PAR: 'パラグアイ', POL: 'ポーランド', POR: 'ポルトガル',
    QAT: 'カタール', IRL: 'アイルランド', ROU: 'ルーマニア', RSA: '南アフリカ',
    SCO: 'スコットランド', SEN: 'セネガル', SRB: 'セルビア', SUI: 'スイス',
    SVK: 'スロバキア', SWE: 'スウェーデン', TUN: 'チュニジア', TUR: 'トルコ',
    UKR: 'ウクライナ', URU: 'ウルグアイ', USA: 'アメリカ', UZB: 'ウズベキスタン'
  };

  const TEAM_FLAGS = {
    ALB: '🇦🇱', ALG: '🇩🇿', ARG: '🇦🇷', AUS: '🇦🇺', AUT: '🇦🇹', BEL: '🇧🇪',
    BIH: '🇧🇦', BRA: '🇧🇷', CAN: '🇨🇦', CIV: '🇨🇮', CMR: '🇨🇲', COD: '🇨🇩',
    COL: '🇨🇴', CPV: '🇨🇻', CRC: '🇨🇷', CRO: '🇭🇷', CUW: '🇨🇼', CZE: '🇨🇿', DEN: '🇩🇰',
    ECU: '🇪🇨', EGY: '🇪🇬', ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ESP: '🇪🇸', FRA: '🇫🇷', GER: '🇩🇪',
    GHA: '🇬🇭', HAI: '🇭🇹', IRN: '🇮🇷', IRQ: '🇮🇶', ITA: '🇮🇹', JAM: '🇯🇲',
    JOR: '🇯🇴', JPN: '🇯🇵', KOR: '🇰🇷', KSA: '🇸🇦', MAR: '🇲🇦', MEX: '🇲🇽',
    NED: '🇳🇱', NGA: '🇳🇬', NOR: '🇳🇴', NZL: '🇳🇿', PAN: '🇵🇦', PAR: '🇵🇾',
    POL: '🇵🇱', POR: '🇵🇹', QAT: '🇶🇦', IRL: '🇮🇪', ROU: '🇷🇴', RSA: '🇿🇦',
    SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', SEN: '🇸🇳', SRB: '🇷🇸', SUI: '🇨🇭', SVK: '🇸🇰', SWE: '🇸🇪',
    TUN: '🇹🇳', TUR: '🇹🇷', UKR: '🇺🇦', URU: '🇺🇾', USA: '🇺🇸', UZB: '🇺🇿'
  };

  const STAGE_NAMES_JA = {
    'group-stage': 'グループステージ',
    'round-of-32': '決勝T ラウンド32',
    'round-of-16': '決勝T ラウンド16',
    quarterfinals: '準々決勝',
    semifinals: '準決勝',
    '3rd-place-match': '3位決定戦',
    final: '決勝'
  };

  const KNOCKOUT_STAGES = [
    'round-of-32',
    'round-of-16',
    'quarterfinals',
    'semifinals',
    '3rd-place-match',
    'final'
  ];

  function localizePlaceholder(name) {
    if (!name) return '未定';
    const replacements = [
      [/^Group ([A-L]) Winners?$/i, 'グループ$1 1位'],
      [/^Group ([A-L]) Runners?-Up$/i, 'グループ$1 2位'],
      [/^Group ([A-L]) Third Place$/i, 'グループ$1 3位'],
      [/^Round of 32 (?:Match )?(\d+) Winners?$/i, 'R32 第$1試合 勝者'],
      [/^Round of 16 (?:Match )?(\d+) Winners?$/i, 'R16 第$1試合 勝者'],
      [/^Quarterfinal (\d+) Winners?$/i, '準々決勝$1 勝者'],
      [/^Semifinal (\d+) Winners?$/i, '準決勝$1 勝者'],
      [/^Semifinal (\d+) Losers?$/i, '準決勝$1 敗者']
    ];
    for (const [pattern, replacement] of replacements) {
      if (pattern.test(name)) return name.replace(pattern, replacement);
    }
    return name;
  }

  function withCacheBust(url, params) {
    const query = new URLSearchParams({ ...params, _: String(Date.now()) });
    return `${url}?${query.toString()}`;
  }

  async function fetchJSON(url, timeoutMs = 12000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  function normalizeTeam(competitor) {
    const team = competitor?.team || {};
    const abbreviation = team.abbreviation || '';
    const originalName = team.displayName || team.name || '';
    return {
      id: team.id || '',
      abbreviation,
      name: TEAM_NAMES_JA[abbreviation] || localizePlaceholder(originalName),
      originalName,
      flag: TEAM_FLAGS[abbreviation] || '⚽',
      logo: team.logo || team.logos?.[0]?.href || '',
      homeAway: competitor?.homeAway || '',
      score: competitor?.score ?? '-',
      winner: competitor?.winner === true,
      advanced: competitor?.advance === true
    };
  }

  function normalizeEvent(event) {
    const competition = event?.competitions?.[0] || {};
    const status = competition.status || event?.status || {};
    const statusType = status.type || {};
    const teams = (competition.competitors || [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(normalizeTeam);
    const stage = event?.season?.slug || '';

    return {
      id: event?.id || competition.id || '',
      date: event?.date || competition.date || competition.startDate || '',
      timestamp: Date.parse(event?.date || competition.date || competition.startDate || ''),
      stage,
      stageName: STAGE_NAMES_JA[stage] || competition.altGameNote?.replace('FIFA World Cup, ', '') || 'FIFA World Cup',
      group: competition.altGameNote?.match(/Group ([A-L])/)?.[1] || '',
      state: statusType.state || 'pre',
      completed: statusType.completed === true,
      statusDetail: statusType.shortDetail || statusType.detail || statusType.description || '',
      displayClock: status.displayClock || '',
      teams,
      venue: competition.venue?.fullName || event?.venue?.displayName || '',
      city: competition.venue?.address?.city || '',
      details: competition.details || [],
      link: event?.links?.find(link => link.rel?.includes('summary'))?.href || ''
    };
  }

  function statValue(entry, name, fallback = '0') {
    return entry?.stats?.find(stat => stat.name === name)?.displayValue ?? fallback;
  }

  function normalizeStandings(payload, groupName = 'Group F') {
    const group = payload?.children?.find(item => item.name === groupName || item.abbreviation === groupName);
    const entries = group?.standings?.entries || [];

    return entries.map(entry => {
      const abbreviation = entry.team?.abbreviation || '';
      return {
        rank: Number(statValue(entry, 'rank', '99')),
        name: TEAM_NAMES_JA[abbreviation] || entry.team?.displayName || '未定',
        abbreviation,
        flag: TEAM_FLAGS[abbreviation] || '⚽',
        points: statValue(entry, 'points'),
        matches: statValue(entry, 'gamesPlayed'),
        won: statValue(entry, 'wins'),
        drawn: statValue(entry, 'ties'),
        lost: statValue(entry, 'losses'),
        gd: statValue(entry, 'pointDifferential'),
        advanced: Number(statValue(entry, 'advanced')) === 1
      };
    }).sort((a, b) => a.rank - b.rank);
  }

  function selectFeaturedMatch(matches, now = Date.now()) {
    const valid = (matches || []).filter(match => Number.isFinite(match.timestamp) && match.teams.length === 2);
    const live = valid
      .filter(match => match.state === 'in')
      .sort((a, b) => a.timestamp - b.timestamp);
    if (live.length) return live[0];

    const upcoming = valid
      .filter(match => match.state === 'pre' && match.timestamp >= now - 5 * 60 * 1000)
      .sort((a, b) => a.timestamp - b.timestamp);
    if (upcoming.length) return upcoming[0];

    return valid
      .filter(match => match.state === 'post' || match.completed)
      .sort((a, b) => b.timestamp - a.timestamp)[0] || null;
  }

  function matchesForTeam(matches, abbreviation) {
    return (matches || [])
      .filter(match => match.teams.some(team => team.abbreviation === abbreviation))
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  function knockoutMatches(matches) {
    return (matches || [])
      .filter(match => KNOCKOUT_STAGES.includes(match.stage))
      .sort((a, b) => {
        const stageDiff = KNOCKOUT_STAGES.indexOf(a.stage) - KNOCKOUT_STAGES.indexOf(b.stage);
        if (stageDiff !== 0) return stageDiff;
        const idDiff = Number(a.id) - Number(b.id);
        return Number.isFinite(idDiff) && idDiff !== 0 ? idDiff : a.timestamp - b.timestamp;
      });
  }

  async function fetchTournamentData() {
    const [scoreboardResult, standingsResult] = await Promise.allSettled([
      fetchJSON(withCacheBust(SCOREBOARD_URL, {
        dates: '20260601-20260731',
        limit: '200'
      })),
      fetchJSON(withCacheBust(STANDINGS_URL, { season: '2026' }))
    ]);

    if (scoreboardResult.status === 'rejected' && standingsResult.status === 'rejected') {
      throw scoreboardResult.reason;
    }

    return {
      matches: scoreboardResult.status === 'fulfilled'
        ? (scoreboardResult.value.events || []).map(normalizeEvent)
        : null,
      standings: standingsResult.status === 'fulfilled'
        ? normalizeStandings(standingsResult.value)
        : null,
      fetchedAt: new Date().toISOString(),
      partial: scoreboardResult.status === 'rejected' || standingsResult.status === 'rejected'
    };
  }

  const api = {
    TEAM_FLAGS,
    TEAM_NAMES_JA,
    STAGE_NAMES_JA,
    KNOCKOUT_STAGES,
    fetchTournamentData,
    knockoutMatches,
    localizePlaceholder,
    matchesForTeam,
    normalizeEvent,
    normalizeStandings,
    selectFeaturedMatch
  };

  globalScope.WorldCupLiveData = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
