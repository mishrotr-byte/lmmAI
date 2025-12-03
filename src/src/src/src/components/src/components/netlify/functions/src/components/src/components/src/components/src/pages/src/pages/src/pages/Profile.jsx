import React, {useEffect, useState} from 'react';
import { get, set } from 'idb-keyval';

export default function Profile(){
  const [name,setName] = useState('Player');
  useEffect(()=> {
    (async ()=> {
      const p = await get('mit_profile') || {};
      if(p.name) setName(p.name);
    })();
  },[]);

  async function save(){
    await set('mit_profile', { name });
    alert('Сохранено');
  }

  return (
    <div>
      <div className="card">
        <h2>Профиль</h2>
        <div style={{marginTop:8}}>
          <input value={name} onChange={e=>setName(e.target.value)} />
          <button onClick={save} style={{marginLeft:8}}>Сохранить</button>
        </div>
      </div>
      <div style={{marginTop:12}} className="card">
        <h4>Мини-мир</h4>
        <p>Тут будет мини-дом, достижения и аватарки.</p>
      </div>
    </div>
  );
}
