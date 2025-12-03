import React, {useState} from 'react';

export default function GodButton(){
  const [open,setOpen] = useState(false);
  const [pwd,setPwd] = useState('');
  const [msg,setMsg] = useState('');

  async function submit(){
    try{
      const res = await fetch('/.netlify/functions/godmode',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ password: pwd })
      });
      const j = await res.json();
      if(j.ok){
        setMsg('God mode: активирован ✅');
        // можно добавить локальное состояние админа
        localStorage.setItem('mit_god', '1');
      } else setMsg('Неверный пароль');
    }catch(e){
      setMsg('Ошибка сервера');
    }
  }

  return (
    <div className="god-wrap">
      <button className="god-btn" onClick={()=>setOpen(!open)}>G</button>
      {open && (
        <div className="card" style={{marginTop:12,width:260}}>
          <div style={{marginBottom:8}}>Войти в режим бога</div>
          <input value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Пароль" style={{width:'100%',padding:8,borderRadius:8,marginBottom:8}}/>
          <div style={{display:'flex',gap:8}}>
            <button onClick={submit} style={{flex:1,padding:8}}>Войти</button>
            <button onClick={()=>{setPwd('');setMsg('');}} style={{flex:1,padding:8}}>Очистить</button>
          </div>
          <div style={{marginTop:8,color:'#ffb'}}> {msg} </div>
        </div>
      )}
    </div>
  );
}
