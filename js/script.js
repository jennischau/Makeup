new Swiper('.story-wrapper', {
    loop: true,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints:{
        0: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 6
        },
        
    }
  })

const stories = document.querySelectorAll('video');
    
    stories.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Reset video to the beginning
        });
    });
const toggleButton = document.getElementById("toggle-button");
const hiddenContent = document.getElementById("hidden-content");

toggleButton.addEventListener("click", () => {
    if (hiddenContent.classList.contains("hidden")) {
    hiddenContent.classList.remove("hidden");
    toggleButton.textContent = "Thu gọn";
    } else {
    hiddenContent.classList.add("hidden");
    toggleButton.textContent = "Xem thêm";
    }
});