document.addEventListener('DOMContentLoaded', () => {
    const moneyRain = document.querySelector('.money-rain');
    
    // 创建金钱雨效果
    function createMoneyRain() {
        const money = document.createElement('div');
        money.className = 'money';
        money.textContent = '¥';
        // 修复金钱雨分布问题，确保覆盖整个屏幕宽度
        money.style.left = Math.random() * window.innerWidth + 'px';
        money.style.animationDuration = Math.random() * 2 + 2 + 's';
        money.style.fontSize = Math.random() * 20 + 10 + 'px';
        money.style.opacity = Math.random() * 0.5 + 0.5;
        
        moneyRain.appendChild(money);
        
        // 动画结束后移除元素
        money.addEventListener('animationend', () => {
            money.remove();
        });
    }
    
    // 定期创建新的金钱雨
    setInterval(createMoneyRain, 200);
    
    // 点击时增加金钱效果
    document.addEventListener('click', (e) => {
        addMoney(e);
    });
    
    // 添加长按功能
    let pressTimer = null;
    let isHolding = false;
    
    // 添加金钱的函数
    function addMoney(e) {
        const amount = document.querySelector('.amount');
        const currentAmount = parseInt(amount.textContent.replace(/,/g, ''));
        const newAmount = currentAmount + 1000000;
        amount.textContent = newAmount.toLocaleString();
        
        // 添加点击效果
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.textContent = '+1,000,000';
        clickEffect.style.left = (e ? e.clientX : Math.random() * window.innerWidth) + 'px';
        clickEffect.style.top = (e ? e.clientY : Math.random() * window.innerHeight / 2) + 'px';
        document.body.appendChild(clickEffect);
        
        setTimeout(() => {
            clickEffect.remove();
        }, 1000);
    }
    
    // 鼠标按下事件
    document.addEventListener('mousedown', (e) => {
        isHolding = true;
        pressTimer = setInterval(() => {
            if (isHolding) {
                addMoney(e);
            }
        }, 200); // 每200毫秒增加一次金钱
    });
    
    // 鼠标松开事件
    document.addEventListener('mouseup', () => {
        isHolding = false;
        clearInterval(pressTimer);
    });
    
    // 鼠标离开页面时停止
    document.addEventListener('mouseleave', () => {
        isHolding = false;
        clearInterval(pressTimer);
    });
});