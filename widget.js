(function(){
  /* кнопка 🤖 */
  const btn = Object.assign(document.createElement('div'), {
    id:'robot-launcher', textContent:'🤖'
  });
  document.body.appendChild(btn);

  /* оболочка */
  const shell = document.createElement('div'); shell.id='robot-shell';

  /* ручка */
  const handle = document.createElement('div');
  handle.id='robot-handle'; handle.textContent='Mars-Bot';
  shell.appendChild(handle);

  /* iframe */
  const frame = document.createElement('iframe');
  frame.id='robot-frame';
  frame.src='https://aawa-proxy.vercel.app/widget.html';
  frame.title='Mars-Bot chat';
  shell.appendChild(frame);
  document.body.appendChild(shell);

  /* показать / спрятать */
  btn.onclick=()=> shell.classList.toggle('open');

  /* ─ drag только за handle ─ */
  let drag=false,sx=0,sy=0,sl=0,st=0;
  handle.addEventListener('mousedown',e=>{
    drag=true;handle.classList.add('dragging');
    sx=e.clientX; sy=e.clientY;
    const r=shell.getBoundingClientRect(); sl=r.left; st=r.top;
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
    e.preventDefault();
  });
  function move(e){
    if(!drag) return;
    shell.style.left  = (sl + e.clientX - sx) + 'px';
    shell.style.top   = (st + e.clientY - sy) + 'px';
    shell.style.right = 'auto'; shell.style.bottom='auto';
  }
  function up(){
    drag=false; handle.classList.remove('dragging');
    document.removeEventListener('mousemove',move);
    document.removeEventListener('mouseup',up);
  }
})();
