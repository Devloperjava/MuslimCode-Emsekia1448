"use strict";

const MoonPhase=(function(){
  function render(day,size){
    size=size||100;
    const r=38,cx=50,cy=50;
    const ill=0.08+((day-1)/29)*0.92;
    const p=build(ill,r,cx,cy);
    return '<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" xmlns="http://www.w3.org/2000/svg">'+
      '<defs><radialGradient id="mg'+day+'" cx="35%" cy="30%" r="80%">'+
      '<stop offset="0%" stop-color="#ffffff"/>'+
      '<stop offset="60%" stop-color="#f5f5f5"/>'+
      '<stop offset="100%" stop-color="#e0e0e0"/>'+
      '</radialGradient></defs>'+
      (p?'<path d="'+p+'" fill="url(#mg'+day+')"/>':'')+
      '</svg>';
  }
  function build(ill,r,cx,cy){
    if(ill<0.02)return "";
    if(ill>=0.98){
      return "M "+(cx-r)+","+cy+" a "+r+","+r+" 0 1,0 "+(2*r)+",0 a "+r+","+r+" 0 1,0 "+(-2*r)+",0 Z";
    }
    const rx=Math.abs(r*(1-2*ill));
    if(ill>0.5){
      return "M "+cx+","+(cy-r)+" A "+r+","+r+" 0 0,1 "+cx+","+(cy+r)+" A "+rx+","+r+" 0 0,1 "+cx+","+(cy-r)+" Z";
    }else{
      return "M "+cx+","+(cy-r)+" A "+r+","+r+" 0 0,1 "+cx+","+(cy+r)+" A "+rx+","+r+" 0 0,0 "+cx+","+(cy-r)+" Z";
    }
  }
  return {render:render};
})();
if(typeof window!=="undefined")window.MoonPhase=MoonPhase;
