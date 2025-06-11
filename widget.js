/* widget.js  ─ кнопка-лаунчер + drag-&-drop за header внутри iframe  */
(function () {
  /* ─── создаём кнопку 🤖 ─── */
  const btn = document.createElement('div');
  btn.id = 'robot-launcher';
  btn.innerHTML = '🤖';
  document.body.appendChild(btn);

  /* ─── создаём iframe (виджет) ─── */
  const frame = document.createElement('iframe');
  frame.id  = 'robot-frame';
  frame.src = 'https://aawa-proxy.vercel.app/widget.html';   // ваш URL
  frame.title = 'Mars-Bot chat';
  document.body.appendChild(frame);

  /* ─── показать / скрыть панель ─── */
  btn.onclick = () => {
    const open = frame.style.display === 'block';
    frame.style.display = open ? 'none' : 'block';
  };

  /* ───────────────── drag-&-drop ───────────────── */
  let startX, startY, startLeft, startTop, dragging = false;

  /* после загрузки iframe получаем header и вешаем обработчик */
  frame.addEventListener('load', () => {
    const hdr = frame.contentDocument.getElementById('header');
    if (!hdr) return;

    hdr.style.cursor = 'grab';        /* визуальный намёк */
    hdr.addEventListener('mousedown', onDown);
  });

  function onDown(e) {
    dragging = true;
    e.currentTarget.style.cursor = 'grabbing';

    startX = e.clientX;
    startY = e.clientY;
    const rect = frame.getBoundingClientRect();
    startLeft = rect.left;
    startTop  = rect.top;

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',  onUp);
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    frame.style.left   = `${startLeft + dx}px`;
    frame.style.top    = `${startTop  + dy}px`;
    frame.style.right  = 'auto';
    frame.style.bottom = 'auto';
  }

  function onUp(e) {
    dragging = false;
    const hdr = frame.contentDocument.getElementById('header');
    if (hdr) hdr.style.cursor = 'grab';

    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup',   onUp);
  }
})();