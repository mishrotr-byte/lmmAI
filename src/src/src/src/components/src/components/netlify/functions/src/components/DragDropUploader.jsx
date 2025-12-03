import React from 'react';

export default function DragDropUploader({onFiles}){
  function onDrop(e){
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if(onFiles) onFiles(files);
  }
  return (
    <div className="drop card" onDrop={onDrop} onDragOver={(e)=>e.preventDefault()}>
      Перетащи файлы сюда (PDF, image...). Загрузка реализована локально (без сервера).
    </div>
  );
}
