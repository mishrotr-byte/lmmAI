import React from 'react';
import DragDropUploader from '../components/DragDropUploader';
import WorldCanvas from '../components/WorldCanvas';

export default function Dashboard(){
  function onFiles(files){ alert('Загружено ' + files.length + ' файла(ов) (локально).'); }
  return (
    <>
      <div className="card">
        <h2>Dashboard</h2>
        <p>Здесь будут мини-игры, редактор мирков, статистика, Steam-вкладка.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:20,marginTop:16}}>
        <div>
          <WorldCanvas />
          <div style={{marginTop:12}}><DragDropUploader onFiles={onFiles}/></div>
        </div>
        <div>
          <div className="card">
            <h4>Интерактивные панели</h4>
            <p>Botpress-кубики mock (в разработке)</p>
          </div>
        </div>
      </div>
    </>
  );
}
