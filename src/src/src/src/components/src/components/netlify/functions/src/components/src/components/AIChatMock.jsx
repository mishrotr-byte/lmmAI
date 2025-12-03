import React, {useState, useEffect, useRef} from 'react';
import { set, get } from 'idb-keyval';

export default function AIChatMock(){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const ref = useRef();

  useEffect(()=> {
    (async ()=>{
      const h = await get('mit_chat_history') || [];
      setMessages(h);
    })();
  },[]);

  useEffect(()=> {
    if(ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  },[messages]);

  async function send(){
    if(!text) return;
    const user = {role:'user', text, t:Date.now()};
    const newMsgs = [...messages, user];
    setMessages(newMsgs);
    await set('mit_chat_history', newMsgs);
    setText('');

    // Простой локальный генератор ответов (mock)
    const reply = {role:'ai', text: simpleReply(text), t:Date.now()};
    const withReply = [...newMsgs, reply];
    setTimeout(async ()=> {
      setMessages(withReply);
      await set('mit_chat_history', withReply);
    }, 600);
  }

  function simpleReply(input){
    input = input.toLowerCase();
    if(input.includes('привет')) return 'Привет! Я твой помощник Mitrsht. Чем помочь?';
    if(input.includes('сделай стиль')) return 'Сделаю стиль чёрно-оранжевым и добавлю кубы.';
    if(input.includes('минимальная игра')) return 'Добавил мини-платформер в Dashboard -> Games.';
    return 'Понял. Я могу: менять стиль, генерировать аватар, создать мир. Скажи "создай мир".';
  }

  return (
    <div className="card" style={{height:380,display:'flex',flexDirection:'column'}}>
      <div ref={ref} style={{flex:1,overflow:'auto',padding:8}}>
        {messages.map((m,i)=>(
          <div key={i} style={{margin:6, textAlign: m.role==='user' ? 'right' : 'left'}}>
            <div style={{display:'inline-block',padding:8,borderRadius:8,background:m.role==='user'?'rgba(255,255,255,0.06)':'rgba(255,122,24,0.12)'}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Напиши сообщение..." style={{flex:1,padding:8,borderRadius:8}}/>
        <button onClick={send} style={{padding:'8px 12px'}}>Отправить</button>
      </div>
    </div>
  );
}
