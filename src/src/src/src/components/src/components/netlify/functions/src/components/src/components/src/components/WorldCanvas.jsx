import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WorldCanvas(){
  const mountRef = useRef();

  useEffect(()=>{
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0,0,8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,5,5);
    scene.add(light);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({ color:0xff7a18, metalness:0.2, roughness:0.3 });

    const cubes = [];
    for(let i=0;i<12;i++){
      const m = new THREE.Mesh(geometry, material);
      m.position.set((Math.random()-0.5)*6, (Math.random()-0.5)*3, (Math.random()-0.5)*4);
      group.add(m);
      cubes.push(m);
    }

    let mouseX=0, mouseY=0;
    function onMove(e){
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMove);

    function animate(){
      requestAnimationFrame(animate);
      group.rotation.y += 0.002 + mouseX*0.005;
      group.rotation.x += 0.001 + mouseY*0.003;
      cubes.forEach((c,i)=> {
        c.rotation.x += 0.01 + i*0.0003;
        c.rotation.y += 0.01 + i*0.0002;
      });
      renderer.render(scene, camera);
    }
    animate();

    function onResize(){ renderer.setSize(mount.clientWidth, mount.clientHeight); camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); }
    window.addEventListener('resize', onResize);

    return ()=> {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
    };
  },[]);

  return <div ref={mountRef} style={{width:'100%',height:360}} className="card"></div>;
}
