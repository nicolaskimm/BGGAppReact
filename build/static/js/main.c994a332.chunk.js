(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    12(e, t, a) {
      e.exports = a(22);
    },
    17(e, t, a) {},
    18(e, t, a) {},
    19(e, t, a) {},
    22(e, t, a) {
      a.r(t);
      const n = a(0);

      const s = a.n(n);

      const l = a(6);

      const i = a.n(l);

      const o = (a(17), a(7));

      const r = a(8);

      const m = a(10);

      const c = a(9);

      const u = a(1);

      const h = a(11);

      const y = (a(18),
      a(19),
      function(e) {
        return s.a.createElement(
          'li',
          { className: 'singleGame', key: e.index },
          s.a.createElement('img', { className: 'photo', src: e.src, alt: 'game' }),
          s.a.createElement(
            'div',
            { className: 'textInfo' },
            s.a.createElement('p', { className: 'textInfo_title' }, ' ', e.title, ' '),
            s.a.createElement('p', { className: 'textInfo_time' }, ' ', e.time, ' min '),
            s.a.createElement(
              'p',
              { className: 'textInfo_players' },
              ' ',
              e.playersMin,
              ' - ',
              e.playersMax,
              ' players ',
            ),
            s.a.createElement('p', { className: 'textInfo_numOfPlays' }, ' ', e.numOfPlays, ' '),
            s.a.createElement('button', {
              className: 'textinfo_button-notSelected',
              onClick: e.onClick,
            }),
          ),
        );
      });

      const p = function(e) {
        return e.itemsFit.map(function(t, a) {
          return s.a.createElement(y, {
            key: a,
            index: a,
            src: t.getElementsByTagName('image')[0].innerHTML,
            title: t.getElementsByTagName('name')[0].innerHTML,
            time: t.getElementsByTagName('stats')[0].getAttribute('playingtime'),
            playersMin: t.getElementsByTagName('stats')[0].getAttribute('minplayers'),
            playersMax: t.getElementsByTagName('stats')[0].getAttribute('maxplayers'),
            numOfPlays:
              parseInt(t.getElementsByTagName('numplays')[0].innerHTML) === 0
                ? "ouch, you didn't play this one"
                : `Number of plays: ${t.getElementsByTagName('numplays')[0].innerHTML}`,
            onClick: e.onClick,
          });
        });
      };

      const d = a(3);

      const g = a.n(d);

      const b = (function(e) {
        function t(e) {
          let a;
          return (
            Object(o.a)(this, t),
            ((a = Object(m.a)(this, Object(c.a)(t).call(this, e))).state = {
              itemsFit: [],
              itemsFitMutable: [],
              nick: '',
              players: '',
              time: '',
              totalTime: 0,
            }),
            (a.checkForSelection = a.checkForSelection.bind(Object(u.a)(a))),
            a
          );
        }
        return (
          Object(h.a)(t, e),
          Object(r.a)(t, [
            {
              key: 'init',
              value() {
                this.setState({
                  nick: '',
                  players: '',
                  time: '',
                  totalTime: 0,
                  itemsFitMutable: [],
                  itemsFit: [],
                });
                const e = document.querySelector('.buttonSection');

                const t = document.querySelector('.totalTime');

                const a = document.querySelector('.loader');
                (e.style.display = 'none'), (a.style.display = 'none'), (t.style.display = 'none');
              },
            },
            {
              key: 'handleChange',
              value(e) {
                switch (e.target.className) {
                  case 'inputs_nick':
                    this.setState({ nick: e.target.value });
                    break;
                  case 'inputs_time':
                    this.setState({ time: e.target.value });
                    break;
                  case 'inputs_players':
                    this.setState({ players: e.target.value });
                }
              },
            },
            {
              key: 'createGameList',
              value(e) {
                for (
                  var t = e.getElementsByTagName('item'), a = Array.from(t), n = [], s = 0;
                  s <= a.length - 1;
                  s++
                ) {
                  const l = parseInt(this.state.time);

                  const i = parseInt(this.state.players);

                  const o = a[s].getElementsByTagName('stats')[0].getAttribute('playingtime');

                  const r = a[s].getElementsByTagName('stats')[0].getAttribute('minplayers');

                  const m = a[s].getElementsByTagName('stats')[0].getAttribute('maxplayers');
                  l >= parseInt(o) && i >= r && i <= m && n.push(a[s]);
                }
                this.setState({ itemsFitMutable: n, itemsFit: n });
              },
            },
            {
              key: 'handleClick',
              value() {
                const e = document.querySelector('.loader');

                const t = document.querySelector('.buttonSection');

                const a = document.querySelector('.totalTime');
                e.style.display = 'flex';
                const n = new XMLHttpRequest();
                if (
                  (n.open(
                    'GET',
                    `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${
                      this.state.nick
                    }&stats=1&subtype=boardgame&own=1`,
                    !1,
                  ),
                  (n.onreadystatechange = function() {
                    e.style.display = 'none';
                  }),
                  n.send(),
                  n.status === 200)
                ) {
                  (t.style.display = 'flex'), (a.style.display = 'block');
                  const s = n.responseText;

                  const l = new DOMParser().parseFromString(s, 'text/xml');
                  l.getElementsByTagName('message')[0]
                    ? (g()('oops..', 'Invalid username', 'error'), this.init())
                    : l.getElementsByTagName('item') &&
                      ((e.style.display = 'none'), this.createGameList(l));
                } else
                  n.status !== 200 &&
                    (g()('Ooops..', 'Something went wrong, please try again', 'error'),
                    (t.style.display = 'none'),
                    (a.style.display = 'none'));
              },
            },
            {
              key: 'checkForSelection',
              value(e) {
                const t = e.target.parentNode.parentNode;

                const a = parseInt(t.querySelector('.textInfo_time').innerHTML);
                if (e.target.className === 'textinfo_button-selected') {
                  const n = parseInt(this.state.totalTime) - a;
                  this.setState({ totalTime: n }),
                    e.target.classList.remove('textinfo_button-selected'),
                    e.target.classList.add('textinfo_button-notSelected');
                } else {
                  const s = parseInt(this.state.totalTime) + a;
                  this.setState({ totalTime: s }),
                    e.target.classList.remove('textinfo_button-notSelected'),
                    e.target.classList.add('textinfo_button-selected');
                }
              },
            },
            {
              key: 'checkForNumOfPlays',
              value(e) {
                for (var t = this.state.itemsFit, a = [], n = [], s = 0; s <= t.length - 1; s++) {
                  parseInt(t[s].getElementsByTagName('numplays')[0].innerHTML) === 0
                    ? a.push(t[s])
                    : n.push(t[s]);
                }
                e.target.className === 'buttonSection_played'
                  ? this.setState({ itemsFitMutable: n })
                  : this.setState({ itemsFitMutable: a });
              },
            },
            {
              key: 'randomGame',
              value() {
                document.querySelector('.textinfo_button-notSelected').style.display = 'none';
                const e = this.state.itemsFit.length;

                const t = Math.floor(Math.random() * e);

                const a = [];
                a.push(this.state.itemsFit[t]),
                  this.setState({ itemsFitMutable: a }),
                  (document.querySelector('.totalTime').style.display = 'none');
              },
            },
            {
              key: 'render',
              value() {
                return s.a.createElement(
                  'div',
                  { className: 'app' },
                  s.a.createElement(
                    'div',
                    { className: 'inputs' },
                    s.a.createElement('h1', null, ' Who are you? '),
                    s.a.createElement('input', {
                      className: 'inputs_nick',
                      placeholder: 'your nickname',
                      value: this.state.nick,
                      onChange: this.handleChange.bind(this),
                    }),
                    s.a.createElement('h1', null, ' How much time do we have? '),
                    s.a.createElement('input', {
                      className: 'inputs_time',
                      placeholder: 'only numbers!',
                      value: this.state.time,
                      onChange: this.handleChange.bind(this),
                    }),
                    s.a.createElement('h1', null, ' How many people?'),
                    s.a.createElement('input', {
                      className: 'inputs_players',
                      placeholder: 'type the number',
                      value: this.state.players,
                      onChange: this.handleChange.bind(this),
                    }),
                    s.a.createElement(
                      'div',
                      { className: 'inputs_button' },
                      s.a.createElement(
                        'button',
                        {
                          className: 'inputs_button_search',
                          onClick: this.handleClick.bind(this),
                        },
                        ' go ',
                      ),
                      s.a.createElement(
                        'button',
                        { className: 'inputs_button_clear', onClick: this.init.bind(this) },
                        ' clear ',
                      ),
                    ),
                  ),
                  s.a.createElement(
                    'div',
                    { className: 'loader' },
                    s.a.createElement('div', { className: 'loader_dot1' }),
                    s.a.createElement('div', { className: 'loader_dot2' }),
                    s.a.createElement('div', { className: 'loader_dot3' }),
                  ),
                  s.a.createElement(
                    'div',
                    { className: 'buttonSection' },
                    s.a.createElement(
                      'h1',
                      null,
                      'Something new',
                      s.a.createElement(
                        'button',
                        {
                          className: 'buttonSection_notPlayed',
                          onClick: this.checkForNumOfPlays.bind(this),
                        },
                        '>',
                      ),
                    ),
                    s.a.createElement(
                      'h1',
                      null,
                      'Something what I know',
                      s.a.createElement(
                        'button',
                        {
                          className: 'buttonSection_played',
                          onClick: this.checkForNumOfPlays.bind(this),
                        },
                        '>',
                      ),
                    ),
                    s.a.createElement(
                      'h1',
                      null,
                      ' Something random ',
                      s.a.createElement(
                        'button',
                        {
                          className: 'buttonSection_random',
                          onClick: this.randomGame.bind(this),
                        },
                        '>',
                      ),
                    ),
                  ),
                  s.a.createElement(
                    'h1',
                    { className: 'totalTime' },
                    ' Total time: ',
                    s.a.createElement('span', null, this.state.totalTime),
                    ' ',
                  ),
                  s.a.createElement(
                    'div',
                    { className: 'results' },
                    s.a.createElement(
                      'ul',
                      { className: 'gameCollection' },
                      s.a.createElement(p, {
                        itemsFit: this.state.itemsFitMutable,
                        onClick: this.checkForSelection,
                      }),
                    ),
                  ),
                );
              },
            },
          ]),
          t
        );
      })(s.a.Component);
      Boolean(
        window.location.hostname === 'localhost' ||
          window.location.hostname === '[::1]' ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
      );
      i.a.render(s.a.createElement(b, null), document.getElementById('root')),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
  },
  [[12, 1, 2]],
]);
// # sourceMappingURL=main.c994a332.chunk.js.map
