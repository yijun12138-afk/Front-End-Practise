// 导航栏"更多"下拉菜单功能
const moreItem = document.querySelector('.more');
const dropdown = document.querySelector('.dropdown');
moreItem.addEventListener('mouseenter', function() {
    dropdown.style.display = 'block';
});
moreItem.addEventListener('mouseleave', function() {
    dropdown.style.display = 'none';
});
dropdown.addEventListener('mouseenter', function() {
    dropdown.style.display = 'block';
});
dropdown.addEventListener('mouseleave', function() {
    dropdown.style.display = 'none';
});
// 轮播图
const slideImages = document.querySelectorAll('.box-img');         
const slideIndicators = document.querySelectorAll('.box-choses li');
const prevBtn = document.querySelector('.box-left');        
const nextBtn = document.querySelector('.box-right');             
let index = 0;                                             
let slideTimer = null;                                              
//切换轮播图
function switchSlide(targetIndex) {
    
    slideImages[index].classList.remove('active');
    slideIndicators[index].classList.remove('active');
            
    if (targetIndex >= slideImages.length) {
        index = 0;
    } else if (targetIndex < 0) {
        index = slideImages.length - 1;
    } else {
        index = targetIndex;
    }

    slideImages[index].classList.add('active');
    slideIndicators[index].classList.add('active');
}
//自动轮播功能
function startAutoSlide() {
    // 清除已有定时器，避免重复创建
    if (slideTimer) clearInterval(slideTimer);

    slideTimer = setInterval(() => {
        switchSlide(index + 1);
    }, 4000);
}

// 左箭头
prevBtn.addEventListener('click', function() {
    switchSlide(index - 1);
    startAutoSlide(); // 点击后重置定时器
});
// 右箭头
nextBtn.addEventListener('click', function() {
    switchSlide(index + 1);
    startAutoSlide();
});
//绑定指示器点击事件
slideIndicators.forEach((indicator, index) => {//foreach遍历数组
    indicator.addEventListener('click', function() {//给每个小圆点绑定点击事件
        switchSlide(index);//点击第n个小圆点，就切换到索引为n的图片
        startAutoSlide();
    });
});
//初始化
slideImages[0].classList.add('active');
slideIndicators[0].classList.add('active');

startAutoSlide();

