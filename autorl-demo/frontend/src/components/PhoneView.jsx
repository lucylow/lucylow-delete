import React from 'react';

export default function PhoneView({src, title}){
  return (
    <div style={{width:280, height:520, background:'#fff', borderRadius:18, boxShadow:'0 8px 30px rgba(2,4,10,0.35)', overflow:'hidden'}}>
      <iframe title={title||'phone'} src={src} style={{width:'100%', height:'100%', border:'none'}}/>
    </div>
  );
}
