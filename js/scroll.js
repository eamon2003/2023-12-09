let scl = document.getElementById('scroll')
window.onbeforeunload = function () {
    //刷新后页面自动回到顶部
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;  
}
let isScrolling = false;
let scrollEndTimer;
let lst = [0, 2000, 3000, 5000, 8500]
let action = false
// 监听滚动事件
window.addEventListener('scroll', () => {
    let scroll = window.scrollY;
    // scl.innerText = window.scrollY
    let lockRepeat = false
    scrollEndTimer = setTimeout(function () {
        const scrollDistance = window.scrollY;
        if (lst.includes(scrollDistance)) {
            lockRepeat = true;
        }
        if (!lockRepeat) {
            if (scrollDistance == scroll) {
                if (scrollDistance < 800) {
                    smoothScroll(0);
                } else if (scrollDistance < 2500) {
                    smoothScroll(2000);
                } else if (scrollDistance < 3600) {
                    smoothScroll(3000)
                } else if (scrollDistance < 6500) {
                    smoothScroll(5000)
                } else {
                    smoothScroll(8500)
                }
            }
        }
    }, 500);
});

function smoothScroll(targetDistance) {
    let scrollDistance = window.scrollY;
    let absDistance = Math.abs(scrollDistance - targetDistance);
    let smoothTime = absDistance;
    smoothTime *= 2
    if (smoothTime < 300) smoothTime = 300 // 最小缓动时间为500m
    const animeInstance = anime({
        targets: document.scrollingElement, // 或者可以使用 document.documentElement
        scrollTop: [scrollDistance, targetDistance],
        duration: smoothTime, // 持续时间，单位是毫秒
        easing: 'easeOutQuart' // 缓动函数，可以根据需要选择不同的缓动效果
    });
    window.addEventListener('wheel',()=>{
        animeInstance.pause();
    })
}