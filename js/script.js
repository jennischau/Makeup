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


// Picture model
document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.img img')); // Lấy tất cả ảnh
    const modal = document.getElementById('pictureModal');
    const modalImage = modal.querySelector('img');
    const closeModal = document.getElementById('closeModalPicture');
    const prevButton = document.getElementById('prevPicture');
    const nextButton = document.getElementById('nextPicture');
    let currentImageIndex = 0; // Vị trí ảnh hiện tại

    // Hiển thị modal với ảnh tại vị trí index
    function openModal(index) {
        currentImageIndex = index;
        modalImage.src = images[currentImageIndex].src;
        modal.style.display = 'flex'; // Hiển thị modal
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    // Đóng modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Chuyển sang ảnh trước
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }

    // Chuyển sang ảnh kế tiếp
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }

    // Gắn sự kiện click vào mỗi ảnh
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Gắn sự kiện cho nút đóng modal
    closeModal.addEventListener('click', hideModal);

    // Gắn sự kiện cho nút điều hướng trái/phải
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Đóng modal khi nhấn phím ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
});