document.addEventListener('DOMContentLoaded', function() {
    // 导航栏"更多"下拉菜单功能
    const moreItem = document.querySelector('.more');
    const dropdown = document.querySelector('.dropdown');

    moreItem.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';//当鼠标进入 "更多" 选项时，显示下拉菜单
    });

    moreItem.addEventListener('mouseleave', function() {
        dropdown.style.display = 'none';//当鼠标离开 "更多" 选项时，隐藏下拉菜单
    });

    dropdown.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';//当鼠标进入下拉菜单本身时，保持下拉菜单显示
    });

    dropdown.addEventListener('mouseleave', function() {
        dropdown.style.display = 'none';//当鼠标离开下拉菜单时，隐藏下拉菜单
    });

    // 轮播图核心功能代码
    // 1. 获取轮播相关DOM元素
    const slideImages = document.querySelectorAll('.box-img');         // 所有轮播图片
    const slideIndicators = document.querySelectorAll('.box-choses li'); // 所有轮播指示器
    const prevBtn = document.querySelector('.box-left');                // 左箭头按钮
    const nextBtn = document.querySelector('.box-right');               // 右箭头按钮
    let currentIndex = 0;                                               // 当前显示的图片索引（初始为0，即第一张）
    let slideTimer = null;                                              // 自动轮播定时器

     // 2. 核心函数：切换轮播图（根据目标索引显示对应图片）
    function switchSlide(targetIndex) {
        // 2.1 隐藏当前显示的图片：移除active类（透明度从1→0）
        slideImages[currentIndex].classList.remove('active');
        slideIndicators[currentIndex].classList.remove('active');
                
        // 2.2 更新当前索引（处理边界：超过最后一张回到第一张，小于第一张回到最后一张）
        if (targetIndex >= slideImages.length) {
            currentIndex = 0;
        } else if (targetIndex < 0) {
            currentIndex = slideImages.length - 1;
        } else {
            currentIndex = targetIndex;
        }
                
        // 2.3 显示目标图片：添加active类（透明度从0→1，触发transition过渡）
        slideImages[currentIndex].classList.add('active');
        slideIndicators[currentIndex].classList.add('active');
    }

    // 3. 自动轮播功能（4秒切换一次）
    function startAutoSlide() {
        // 清除已有定时器，避免重复创建
        if (slideTimer) clearInterval(slideTimer);
        // 每4000毫秒（4秒）执行一次切换，显示下一张
        slideTimer = setInterval(() => {
            switchSlide(currentIndex + 1);
        }, 4000);
    }

    // 4. 绑定左右箭头点击事件
    // 左箭头：显示上一张
    prevBtn.addEventListener('click', function() {
        switchSlide(currentIndex - 1);
        startAutoSlide(); // 点击后重置定时器，避免连续点击后轮播混乱
    });

    // 右箭头：显示下一张
    nextBtn.addEventListener('click', function() {
        switchSlide(currentIndex + 1);
        startAutoSlide(); // 点击后重置定时器
    });

    // 5. 绑定指示器点击事件（点击小圆点切换图片）
    slideIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            switchSlide(index);
            startAutoSlide(); // 点击后重置定时器
        });
    });

    // 6. 初始化：给第一张图片添加active类（关键！确保页面加载时第一张图显示）
    slideImages[0].classList.add('active');
    slideIndicators[0].classList.add('active');
    // 7. 初始化自动轮播（页面加载完成后立即开始）
    startAutoSlide();
});
