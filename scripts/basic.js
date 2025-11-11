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
function soundpanelobj(element) {
    const data={
        self:element,
        parent:element.parentElement,
        canvas:qgetc(element,'.soundpanel-canvas'),
        playbutton:qgetc(element,'.soundpanel-button'),
        timebar:qgetc(element,'.soundpanel-time'),
        visor:qgetc(element,'.soundpanel-vis')
    }
    return data
}
function animetext(div) {
    const classn=div.id+"-letter";
    const nstyle=document.createElement("style")
    
    div.innerHTML = div.textContent
        .split(" ")
        .map(word => {
            return `<span class="wordspan">${[...word].map(c => `<span class="${classn}">${c}</span>`).join('')}</span>`;
        })
        .join(' ');

    console.log(div.getBoundingClientRect().top,div.getBoundingClientRect().bottom)
    const data={
        div:div,
        animate:()=>{
            console.log("animating")
            anime({
                targets: `.${classn}`,
                translateY: ['100%','0%'],
                scaleX: ['0%','100%'],
                opacity: [0, 1],
                easing:'easeInOutSine',
                duration:2500,
                delay:anime.stagger(30),

            });
        },
        y:div.getBoundingClientRect().top+window.scrollY,
    }
    // nstyle.textContent=`.${classn} {
    //     transform:translateY(100%);
    //     opacity: 0;
    //     display: inline-block;
    // }`;
    // document.head.appendChild(nstyle);
    return data
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
        sine1:soundpanelobj(dget("sp-sine1"))
        
    },
    stexts:{
        swinfo:animetext(dget("swinfo")),
    }
}
const scrollpoints=[
    {position:doc.stexts.swinfo.y,passed:false,action:()=>{doc.stexts.swinfo.animate()}},
]


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
    return Math.sin(time*2*Math.PI*440);
},2);
doc.soundpanels.sine1.playbutton.addEventListener('click',()=>{
    if (audiosine1.playing) {return}
    audiosine1.start()
    
    anime({
        targets: '#sinetime1',
        translateX: [0,doc.soundpanels.sine1.visor.offsetWidth],
        easing:'linear',
        duration:audiosine1.duration*1000,
        

    });
});
{
    const cv=doc.soundpanels.sine1.canvas;
    const ctx=cv.getContext('2d');
    ctx.clearRect(0,0,cv.width,cv.height)
    ctx.beginPath();
    for (let x=0;x<cv.width;x++) {
        ctx.lineTo(x,cv.height/2*(1-Math.sin(x/50)));
    }
    ctx.strokeStyle='#110099';
    ctx.lineWidth=2;
    ctx.shadowColor='#3300dd';
    ctx.shadowBlur=20;
    ctx.stroke()
}


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
window.addEventListener('scroll',()=>{
    for (let k of scrollpoints) {
        console.log(window.scrollY,k.position+100)
        if (k.passed==false && window.scrollY>k.position+100) {
            k.passed=true;
            k.action();
        }
    }
})

//draw();

