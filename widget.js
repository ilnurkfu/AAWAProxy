(function(){
  /* кнопка 🤖 */
  const btn = Object.assign(document.createElement('div'), {
    id:'robot-launcher', textContent:'🤖'
  });
  document.body.appendChild(btn);

  /* оболочка + iframe */
  const shell = document.createElement('div');
  shell.id = 'robot-shell';
  const frame = document.createElement('iframe');
  frame.id  = 'robot-frame';
  frame.src = 'https://aawa-proxy.vercel.app/widget.html';
  frame.title = 'Mars-Bot chat';
  shell.appendChild(frame);
  document.body.appendChild(shell);

  /* показать / скрыть */
  btn.onclick = () => {
    shell.classList.toggle('open');
  };

  /* ── DRAG: тянем за верхние 36 px оболочки ── */
  let drag=false, sx=0, sy=0, sl=0, st=0;

  shell.addEventListener('mousedown', e => {
    if(e.clientY - shell.getBoundingClientRect().top > 36) return; // только шапка
    drag=true; sx=e.clientX; sy=e.clientY;
    const r=shell.getBoundingClientRect(); sl=r.left; st=r.top;
    document.addEventListener('mousemove',move); document.addEventListener('mouseup',up);
    e.preventDefault();
  });

  function move(e){
    if(!drag) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    shell.style.left = (sl+dx)+'px';
    shell.style.top  = (st+dy)+'px';
    shell.style.right='auto'; shell.style.bottom='auto';
  }
  function up(){
    drag=false;
    document.removeEventListener('mousemove',move);
    document.removeEventListener('mouseup',up);
  }
})();
