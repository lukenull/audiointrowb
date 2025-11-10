function dget(id) {
    return document.getElementById(id)
}
function qget(query) {
    return document.querySelector(query)
}
function qgetc(c,query) {
    return c.querySelector(query)
}
function wait(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000));
}

import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
import soundwave from './web-audio.js'

const doc={
    welcome:dget("mtext"),
    circle:qget('.circ1'),
    circcont:dget('circcont'),
    canvas:dget("sinec"),
    hr:qget("shr"),
    soundpanels:{
        sine1:dget("sp-sine1"),
        sine1play:qgetc(dget("sp-sine1"),".soundpanel-button"),
        sine1time:qgetc(dget("sp-sine1"),".soundpanel-time")
    }
}
doc.welcome.innerHTML = doc.welcome.textContent
  .split(" ")
  .map(word => {
      return `<span class="wordspan">${[...word].map(c => `<span class="letter1span">${c}</span>`).join('')}</span>`;
  })
  .join(' ');


anime({
    targets: '.letter1span',
    translateY: ['100%','0%'],
    scaleX: ['0%','100%'],
    opacity: [0, 1],
    easing:'easeInOutSine',
    duration:2500,
    delay:anime.stagger(30),

});
async function go() {
    for (let i=0;i<3;i++)  {
        const cc=doc.circle.cloneNode();
        circcont.appendChild(cc);
        
    }
    anime({
        targets: '.circ1',
        scale:['0%','2000%'],
        opacity: [1,0],
        easing:'easeOutSine',
        duration:2400,
        delay:anime.stagger(400),

    });
    await wait(1);
        
    anime({
        targets: '.shr',
        scaleX: ['0%','100%'],
        opacity: [0, 1],
        easing:'easeInOutSine',
        duration:2500,
        delay:anime.stagger(30),

    });
}
await go()
    // const canvas = doc.canvas;
    // const ctx = canvas.getContext('2d');

    // canvas.width = window.innerWidth;
    // canvas.height = 300;

    // let time = 0;
    // let p=0

const audiosine1=soundwave((time)=>{
    return Math.sin(time*Math.PI*440);
},5);
doc.soundpanels.sine1play.addEventListener('click',()=>{
    audiosine1.start()
    
    anime({
        targets: '#sinetime1',
        translateX: ['0cqw','100cqw'],
        easing:'linear',
        duration:audiosine1.duration,
        

    });
})

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // const amplitude = 100; // wave height
    // const wavelength = 300; // distance between peaks
    // const speed = 2; // speed of wave movement
    // const yOffset = canvas.height / 2;

    // ctx.beginPath();
    // for (let x = 0; x < canvas.width; x++) {
    //     // Wave moves to the right over time
    //     const y = yOffset + amplitude * Math.sin((x / wavelength * 2 * Math.PI) - (time / 50));
    //     ctx.lineTo(x, y);
    // }
    // ctx.strokeStyle = '#110099';
    // ctx.lineWidth = 2;
    // ctx.shadowColor='#3300dd';
    // ctx.shadowBlur=20;
    // ctx.globalAlpha=p;
    // ctx.stroke();
    // if (p<1) {
    //     p+=0.002
    // }
    // time += speed;
    doc.soundpanels.sine1time.style.translateX=''
    
    requestAnimationFrame(draw);
}

//draw();

