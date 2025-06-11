(function(){
  /* кнопка 🤖 */
  const btn = Object.assign(document.createElement('div'),
    { id:'robot-launcher', textContent:'🤖' });
  document.body.appendChild(btn);

  /* ── оболочка ── */
  const shell  = Object.assign(document.createElement('div'), { id:'robot-shell' });

  /* ручка для перетягивания */
  const handle = Object.assign(document.createElement('div'), { id:'robot-handle' });
  handle.textContent = 'Mars-Bot';         // короткий заголовок
  shell.appendChild(handle);

  /* сам iframe */
  const frame  = Object.assign(document.createElement('iframe'), {
    id:'robot-frame',
    src:'https://aawa-proxy.vercel.app/widget.html',
    title:'Mars-Bot chat'
  });
  shell.appendChild(frame);
  document.body.appendChild(shell);

  /* открыть/закрыть */
  btn.onclick = () => shell.classList.toggle('open');

  /* ── drag только за handle ── */
  let drag=false,sx=0,sy=0,sl=0,st=0;
  handle.addEventListener('mousedown', e=>{
    drag=true; handle.classList.add('dragging');
    sx=e.clientX; sy=e.clientY;
    const r=shell.getBoundingClientRect(); sl=r.left; st=r.top;
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
    e.preventDefault();
  });
  function move(e){
    if(!drag) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    shell.style.left  = (sl+dx)+'px';
    shell.style.top   = (st+dy)+'px';
    shell.style.right = 'auto';
    shell.style.bottom= 'auto';
  }
  function up(){
    drag=false; handle.classList.remove('dragging');
    document.removeEventListener('mousemove',move);
    document.removeEventListener('mouseup',up);
  }
})();
