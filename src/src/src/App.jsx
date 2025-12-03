import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Header from './components/Header';
import GodButton from './components/GodButton';

export default function App(){
  const [route, setRoute] = useState('home');
  useEffect(()=> {
    const onHash = ()=> setRoute(location.hash.replace('#','') || 'home');
    window.addEventListener('hashchange', onHash);
    onHash();
    return ()=> window.removeEventListener('hashchange', onHash);
  },[]);
  return (
    <>
      <Header onNavigate={(r)=> location.hash = r}/>
      <div className="container">
        {route==='home' && <Home/>}
        {route==='dashboard' && <Dashboard/>}
        {route==='profile' && <Profile/>}
      </div>
      <GodButton/>
    </>
  );
}
