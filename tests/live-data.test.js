const test = require('node:test');
const assert = require('node:assert/strict');
const {
  knockoutMatches,
  localizePlaceholder,
  normalizeEvent,
  normalizeStandings,
  selectFeaturedMatch
} = require('../live-data.js');

function eventFixture({ id, date, state = 'pre', completed = false, stage = 'round-of-32' }) {
  return {
    id,
    date,
    season: { slug: stage },
    competitions: [{
      altGameNote: 'FIFA World Cup, Round of 32',
      status: {
        displayClock: state === 'in' ? "67'" : "0'",
        type: { state, completed, shortDetail: state === 'post' ? 'FT' : 'Scheduled' }
      },
      competitors: [
        { order: 0, homeAway: 'home', score: '2', team: { id: '203', abbreviation: 'MEX', displayName: 'Mexico' } },
        { order: 1, homeAway: 'away', score: '1', team: { id: '424', abbreviation: 'ECU', displayName: 'Ecuador' } }
      ]
    }]
  };
}

test('normalizes event teams and stage for Japanese UI', () => {
  const match = normalizeEvent(eventFixture({ id: 'next', date: '2026-07-01T01:00:00Z' }));
  assert.equal(match.stageName, '決勝T ラウンド32');
  assert.equal(match.teams[0].name, 'メキシコ');
  assert.equal(match.teams[1].name, 'エクアドル');
  assert.equal(match.teams[0].flag, '🇲🇽');
});

test('featured match priority is live, upcoming, then latest completed', () => {
  const completed = normalizeEvent(eventFixture({
    id: 'completed', date: '2026-06-30T01:00:00Z', state: 'post', completed: true
  }));
  const upcoming = normalizeEvent(eventFixture({
    id: 'upcoming', date: '2026-07-01T01:00:00Z'
  }));
  const live = normalizeEvent(eventFixture({
    id: 'live', date: '2026-06-30T23:30:00Z', state: 'in'
  }));
  const now = Date.parse('2026-06-30T23:45:00Z');

  assert.equal(selectFeaturedMatch([completed, upcoming], now).id, 'upcoming');
  assert.equal(selectFeaturedMatch([completed, upcoming, live], now).id, 'live');
  assert.equal(selectFeaturedMatch([completed], now).id, 'completed');
});

test('standings are normalized and sorted by rank', () => {
  const makeEntry = (abbreviation, rank, points) => ({
    team: { abbreviation, displayName: abbreviation },
    stats: [
      { name: 'rank', displayValue: String(rank) },
      { name: 'points', displayValue: String(points) },
      { name: 'gamesPlayed', displayValue: '3' },
      { name: 'wins', displayValue: '1' },
      { name: 'ties', displayValue: '1' },
      { name: 'losses', displayValue: '1' },
      { name: 'pointDifferential', displayValue: '0' },
      { name: 'advanced', displayValue: '1' }
    ]
  });
  const standings = normalizeStandings({
    children: [{
      name: 'Group F',
      standings: { entries: [makeEntry('SWE', 3, 4), makeEntry('JPN', 2, 5), makeEntry('NED', 1, 7)] }
    }]
  });

  assert.deepEqual(standings.map(team => team.abbreviation), ['NED', 'JPN', 'SWE']);
  assert.equal(standings[1].name, '日本');
});

test('localizes knockout placeholders', () => {
  assert.equal(localizePlaceholder('Round of 32 Match 4 Winner'), 'R32 第4試合 勝者');
  assert.equal(localizePlaceholder('Quarterfinal 2 Winner'), '準々決勝2 勝者');
  assert.equal(localizePlaceholder('Semifinal 1 Loser'), '準決勝1 敗者');
});

test('filters and orders knockout matches by round and match id', () => {
  const matches = [
    normalizeEvent(eventFixture({ id: '760510', date: '2026-07-09T00:00:00Z', stage: 'quarterfinals' })),
    normalizeEvent(eventFixture({ id: '760487', date: '2026-06-29T17:00:00Z', stage: 'round-of-32' })),
    normalizeEvent(eventFixture({ id: '760486', date: '2026-06-28T17:00:00Z', stage: 'round-of-32' })),
    normalizeEvent(eventFixture({ id: 'group', date: '2026-06-20T00:00:00Z', stage: 'group-stage' }))
  ];

  assert.deepEqual(knockoutMatches(matches).map(match => match.id), ['760486', '760487', '760510']);
});
