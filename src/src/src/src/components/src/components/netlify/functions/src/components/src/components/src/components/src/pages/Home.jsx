import React, {useEffect} from 'react';
import WorldCanvas from '../components/WorldCanvas';
import AIChatMock from '../components/AIChatMock';

export default function Home(){
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    function show(){ els.forEach((el,i)=> setTimeout(()=> el.classList.add('visible'), i*120)); }
    show();
  },[]);
  return (
    <>
      <div className="card reveal" style={{marginBottom:20}}>
        <h1>Mitrsht — Adaptive AI Worlds</h1>
        <p>Чёрно-оранжевая тема. Demo: кубы, локальный AI, drag-and-drop, God mode, профиль.</p>
      </div>

      <div className="card reveal" style={{marginBottom:20}}>
        <WorldCanvas/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:20}}>
        <div className="reveal">
          <div className="card" style={{padding:18}}>
            <h3>Основные фишки</h3>
            <ul>
              <li>Анимации при скролле</li>
              <li>Перетаскивание файлов</li>
              <li>Локальный AI-чат</li>
              <li>God mode (серверная проверка через Netlify Function)</li>
            </ul>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Drag & Drop</h4>
            {/* импорт компонента */}
            <div style={{marginTop:8}}><strong>Перетащи файл прямо сюда</strong></div>
          </div>
        </div>

        <div className="reveal">
          <AIChatMock />
        </div>
      </div>
    </>
  );
}
