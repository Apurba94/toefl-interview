/* Interview Simulator: answer spoken interview questions with timed recordings. */
(function () {
  'use strict';
  const App = {
    about: 'The updated TOEFL Speaking section includes Take an Interview: you answer a series of spoken questions on one topic. This simulator has eight original question sets. It reads each question aloud, records your answer for a set time, and keeps the recordings so you can listen back.',
    how: ['Choose a topic and an answer time in **Interview**. 45 seconds is a sensible practice default; check ets.org for the current test timing.', 'Listen to each question, then answer in full sentences: a direct answer, a reason, an example.', 'Listen to your recordings at the end. Did you answer the question that was asked?'],
    tabs: [{ id: 'interview', label: 'Interview', render(el, ctx) {
      const sets = ctx.data.interview.sets;
      let pick = sets[0].id, secs = 45;
      const run = () => {
        const set = sets.find((s) => s.id === pick);
        const clips = [];
        const step = (k) => {
          SK.clear(el);
          if (k >= set.questions.length) {
            el.appendChild(SK.card('Interview finished: ' + set.topic, clips.length ? clips.map((c, i) => SK.h('div', { style: { marginBottom: '10px' } }, SK.h('p', {}, SK.h('strong', { text: 'Q' + (i + 1) + '. ' }), c.q), SK.h('audio', { controls: true, src: URL.createObjectURL(c.blob), style: { width: '100%' } }))) : SK.h('p', { class: 'sk-muted', text: 'No recordings were made. You can still practise aloud with the timer.' }),
              SK.btn('Another interview', () => SK.show('interview'), 'ghost', { 'data-auto': 'once' })));
            SK.logPractice((secs * set.questions.length) / 60, 'Interview');
            return;
          }
          const q = set.questions[k];
          el.appendChild(SK.card('Question ' + (k + 1) + ' of ' + set.questions.length, SK.audioPlayer({ title: 'Interviewer', text: q }), SK.h('details', {}, SK.h('summary', { text: 'Show the question' }), SK.h('p', { text: q })),
            SK.recorder({ seconds: secs, onDone: (blob, s) => { clips.push({ q, blob }); SK.clips.save({ id: 'iv-' + Date.now(), at: Date.now(), app: 'toefl-interview', q, seconds: s, blob }).catch(() => {}); } }),
            SK.h('div', { style: { marginTop: '10px' } }, SK.btn(k + 1 < set.questions.length ? 'Next question' : 'Finish', () => step(k + 1), 'ghost', { 'data-auto': '1' }))));
          if (SK.speech.ok() && !SK.selftesting) SK.speech.say(q);
        };
        step(0);
      };
      el.appendChild(SK.card('Interview simulator', SK.select(sets.map((s) => [s.id, s.topic]), pick, (v) => { pick = v; }, 'Topic'), SK.select([[30, '30 seconds'], [45, '45 seconds'], [60, '60 seconds']], secs, (v) => { secs = Number(v); }, 'Answer time'), SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start', run, '', { 'data-auto': 'once' }))));
    } }],
    checks: { 'eight sets of four questions': (data, assert) => { assert.equal(data.interview.sets.length, 8); for (const s of data.interview.sets) { assert.equal(s.questions.length, 4); for (const q of s.questions) assert.ok(q.endsWith('?') || q.endsWith('.'), q); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
