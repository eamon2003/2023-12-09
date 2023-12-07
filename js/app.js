import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    template: `
    <div class="card" v-for="cardImg in cardImgs" @click="clickPic($event)">
        <img class='card_img' :src='cardImg'/>
    </div>
    `,
    setup() {
        const cardImgsList = [];
        for (let i = 1; i <= 32; i++) {
            cardImgsList[i] = new Image();
            cardImgsList[i].src = './static/' + i + '.jpg'
        }
        const cardImgs = [];
        for (let i = 1; i <= 32; i++) {
            cardImgs.push(cardImgsList[i].src)
        };
        const discribes = [
            '2023.05.21\n\n去格子汉堡吃了汉堡，还有自助饮料和配料，背后一直在放海绵宝宝，我们穿的情侣服呢',
            '2023.08.16\n\n嘻嘻，在清远玩，愉快的四人旅途，不过现在提起来好像不太好，毕竟有你闺蜜的前夫哥，当时正要去那边玩呢',
            '2023.08.03\n\n你的自拍，是你的自拍，确实是你的自拍，所以我忘记你那时候干啥来着',
            '2023.09.28\n\n中秋节哦，有人给我做了很好看的灯笼，是谁呢',
            '2023.03.01\n\n为啥这个照片是3月1日，那时候我们应该开学了吧',
            '2023.09.16\n\n东大百年校庆，我很兴奋的要拍中国银行',
            '2023.07.20\n\n这怎么又是你，你镜头真多',
            '2023.02.06\n\n在空气湃玩，之前还说下次再去呢',
            '2023.03.01\n\n哇哦，我有好多重复的照片①',
            '2023.08.16\n\n正好几乎没拍到前夫哥，哈哈',
            '2023.05.16\n\n我过生日哦，有人还嫌我衣服丑，明明一点都不丑',
            '2023.11.28\n\n瞧这小手，诶呦我滴妈，咋怎小捏',
            '2023.06.06\n\n少有的合拍，因为某人太懒根本不给我发照片',
            '2023.05.21\n\n我们穿的情侣服呢，背后一直在放海绵宝宝，还有自助饮料和配料，去格子汉堡吃了汉堡',
            '2023.09.16\n\n你说这是为什么呢②',
            '2023.08.16\n\n被你闺蜜拍了，这背景真的绿绿绿绿绿',
            '2023.10.06\n\n有人在这卖萌，对此五星上将麦克阿瑟表示，好卖好卖',
            '2023.09.28\n\n在寻找一个合适的拍照角度，毕竟必须精选一下再发朋友圈，不然哪来那么多赞',
            '2023.05.01\n\n两个人拍照加起来不会用超过一个手势',
            '2023.07.22\n\nHi，去哪玩呢美女，有没有人陪你呢',
            '2023.02.06\n\n偷拍的一个正在努力玩碰碰车的人',
            '2023.08.17\n\n也让你闺蜜出一下镜吧，麻烦跟你闺蜜传达一下，这样我在她心目中的地位能高一些',
            '2023.10.22\n\n抽这玩意太离谱了，还好工作人员人美心善，可能是看你可爱哈哈',
            '2023.08.16\n\n摩天轮摩天轮摩天轮，就是那地方的夜景看起来很一般',
            '2023.09.28\n\n震惊，两人竟重叠在一起，UC说叫我明天去上班',
            '2023.08.16\n\n模糊了模糊了模糊了',
            '2023.05.16\n\n这张是真的糊，但是没有更清楚的了，所以只能是它',
            '2023.09.28\n\n因为我们的照片太少了，你听懂什么意思了吗③',
            '2023.09.16\n\n你们两个跟剪刀手绕不开了？',
            '2023.05.25\n\n小学生在线自拍',
            '2023.08.16\n\n你好前夫哥',
            '2023.02.06\n\n我旁边开花了嘿嘿，就是我这发型是什么玩意',
        ]

        // 计算中心点的坐标
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // console.log(centerX, centerY);
        let mouseX, mouseY;
        let cards = document.getElementById('cards');
        document.addEventListener('scroll', () => mouseMove())
        function mouseMove() {
            if (window.scrollY >= 7500) {
                document.addEventListener('mousemove', (event) => {
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                    cards.style.transform = `translate(${(centerX - mouseX) * 0.05}px, ${(centerY - mouseY) * 0.05}px)`;
                });
            }
        }
        function setCopyCard(copyCard) {
            copyCard.classList.add('card');
            copyCard.style.position = 'absolute'
            copyCard.style.transform = 'scale(2.5)'
            copyCard.style.borderRadius = '10px 0 0 10px'
            copyCard.style.top = '539px';
            copyCard.style.left = window.innerWidth / 2 - 270 + 'px';
            copyCard.style.zIndex = 9999;
        }
        function setDisc(disc) {
            disc.style.position = 'absolute';
            disc.style.zIndex = 9999;
            disc.style.borderRadius = '0 10px 10px 0'
            disc.style.backgroundColor = '#fff';
            disc.style.transform = 'scale(2.5)'
            disc.style.top = '539px';
            disc.style.left = window.innerWidth / 2 + 271 + 'px';
        }
        function clickPic(event) {
            let card = event.target;
            let img_src = card.getElementsByTagName('img')[0].src;
            let index = img_src.split('/')[img_src.split('/').length - 1].split('.')[0];
            let copyCard = card.cloneNode(true);
            let cover = document.createElement('div');
            let disc = document.createElement('div');
            cover.classList.add('cover');
            disc.classList.add('disc');
            disc.innerText = discribes[index - 1];

            setCopyCard(copyCard);
            setDisc(disc);
            cover.addEventListener('click', function () {
                cover.remove();
            });
            cover.appendChild(copyCard);
            cover.appendChild(disc);
            document.getElementById('cards').appendChild(cover);
        }
        return {
            cardImgs,
            mouseX,
            mouseY,
            centerX,
            centerY,
            clickPic,
            mouseMove,
            setCopyCard,
            setDisc,
            cards,
        };
    },


});
app.mount('#cards');
