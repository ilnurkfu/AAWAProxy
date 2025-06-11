(function(){
    /* 1. создаём кнопку-кружок 🤖 */
    const btn = document.createElement('div');
    btn.id = 'robot-launcher';
    btn.innerHTML = '🤖';
    document.body.appendChild(btn);
  
    /* 2. создаём iframe, где будет жить mini-chat */
    const frame = document.createElement('iframe');
    frame.id  = 'robot-frame';
    frame.src = 'widget.html';           // ← путь к скопированной странице
    frame.title = 'Mars-Bot chat';
    document.body.appendChild(frame);
  
    /* 3. по клику показываем / скрываем */
    btn.onclick = () => {
      frame.style.display =
        frame.style.display === 'block' ? 'none' : 'block';
    };
  })();

  /* ───────── DRAG: таскаем iframe за header ───────── */
(() => {
  const frame   = document.getElementById('robot-frame');
  const header  = frame.contentWindow ? null : document.getElementById('header'); // если внутри того же дока
  /* если header находится внутри iframe — ждём загрузки */
  const getHeader = () => header || frame.contentDocument?.getElementById('header');

  let startX, startY, startLeft, startTop, dragging=false;

  const onDown = e => {
    const h = getHeader(); if(!h) return;
    const btn = document.getElementById('robot-launcher');
    if(e.target !== h && e.target !== btn) return;
    dragging=true;
    h.classList.add('dragging');
    startX = e.clientX; startY = e.clientY;
    const rect = frame.getBoundingClientRect();
    startLeft = rect.left; startTop = rect.top;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',  onUp);
    e.preventDefault();
  };

  const onMove = e => {
    if(!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    frame.style.left = `${startLeft + dx}px`;
    frame.style.top  = `${startTop  + dy}px`;
    frame.style.right = 'auto';   /* сброс фикс. right/bottom */
    frame.style.bottom= 'auto';
  };

  const onUp = () => {
    dragging=false;
    const h=getHeader(); if(h) h.classList.remove('dragging');
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup',   onUp);
  };

  /* слушатель ставим на document, чтобы ловить иконку / header */
  document.addEventListener('mousedown', onDown);
})();
  