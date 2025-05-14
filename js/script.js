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

const stories = document.querySelectorAll('.story-link video');
    
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

// Load story
// Select elements
const storyItems = document.querySelectorAll('.story-item');
const modal = document.getElementById('storyModal');
const modalVideo = modal.querySelector('video');
const modalTitle = modal.querySelector('.title'); // Sửa từ "modelTitle" thành ".title"
const closeModal = document.getElementById('closeModal');
const prevStory = document.getElementById('prevStory');
const nextStory = document.getElementById('nextStory');
let currentIndex = -1; 
// Event listener for story items
storyItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index; // Ghi lại index hiện tại
        openModal(index);
    });
});
function openModal(index) {
    const item = storyItems[index];
    const videoSrc = item.getAttribute('data-video');
    const title = item.querySelector('.story-title');

    modalVideo.src = videoSrc;
    modalTitle.innerText = title.innerText;
    modal.style.display = 'flex';
}

// Navigate to previous video
prevStory.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex >= 0) {
        openModal(currentIndex);
    }else{
        currentIndex=storyItems.length - 1;
        openModal(currentIndex);
    }
});

// Navigate to next video
nextStory.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > storyItems.length - 1) {
        openModal(0);
    }else{
        openModal(currentIndex);
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    closeModalHandler();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Close modal and reset video
function closeModalHandler() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    modalTitle.innerText = '';
}