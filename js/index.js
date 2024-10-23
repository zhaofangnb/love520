window.onload = () => {
    setCursor();
    setInterval(createRose,300)
    setWaterMark();
    ObserveVideo();
    ObserveTimeline();
     // 视差滚动效果
     window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            element.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    });
      // 页面滚动效果
      window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);

        // 滚动露出动画
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    });

    
};

function setCursor() {
    // 自定义光标效果
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    // 光标按下缩小
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// 创建草莓/玫瑰掉落
function createRose () {
    const rose = document.createElement('div');
    rose.classList.add('rose');
    rose.style.left = Math.random() * 100 + 'vw';
    rose.style.animationDuration = Math.random() * 2 + 3 + 's';
    rose.innerHTML = '🍓';
    document.body.appendChild(rose);

    setTimeout(() => {
        rose.remove();
    }, 5000);

}

// 水印
function setWaterMark ()  {
    let str = "5201314";
    let canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 150;
    let ctx = canvas.getContext("2d");
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.font = "12px Microsoft JhengHei"; 
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'gold'); // 渐变开始颜色（中心颜色）-金色
    gradient.addColorStop(1, 'rosybrown'); // 渐变结束颜色（边缘颜色）- 玫瑰橘色
    
    ctx.fillStyle = gradient;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(str, 10, canvas.height / 2);

    let div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.pointerEvents = "none";
    div.style.zIndex = "1000";
    div.style.background = "url(" + canvas.toDataURL("image/png") + ") left top repeat";
    document.body.appendChild(div);
}

// 当视频元素进入视口（即在浏览器窗口中可见）时，视频会自动播放；当视频元素离开视口时，视频会自动暂停。
function ObserveVideo() {
   const video = document.querySelector('.video-container video');
   const videoObserver = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               video.play();
           } else {
               video.pause();
           }
       });
   }, { threshold: 0.5 });

   videoObserver.observe(video);
}

// 时间线动画
function ObserveTimeline () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        })
    }, { threshold: 0.5});

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}
