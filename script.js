// Index variables for videos and photos
let videoIndex = 0;
let photoIndex = 0;

// Select the video and photo gallery elements
const videos = document.querySelector('.video-gallery');
const photos = document.querySelector('.photo-gallery');
const photoItems = photos.children;

// Function to scroll videos
function scrollVideos(direction) {
    const videoWidth = videos.children[0].offsetWidth + 20; // Adjust the scroll step based on video size + gap
    videoIndex += direction;

    // Calculate the max index for videos
    const maxVideoIndex = Math.floor(videos.children.length / 3) - 1;

    // Ensure the index stays within bounds
    if (videoIndex < 0) videoIndex = maxVideoIndex;
    if (videoIndex > maxVideoIndex) videoIndex = 0;

    // Scroll the video gallery
    videos.scrollBy({ left: videoWidth * direction, behavior: 'smooth' });
}

// Function to scroll photos
function scrollPhotos(direction) {
    const photoWidth = photoItems[0].offsetWidth + 20; // Adjust the scroll step based on photo size + gap
    const visibleItems = 3; // Number of visible photos at a time
    const maxPhotoIndex = photoItems.length - visibleItems; // Total scrollable items

    // Update the current index based on direction
    photoIndex += direction;

    // Ensure the index stays within bounds
    if (photoIndex < 0) photoIndex = 0;
    if (photoIndex > maxPhotoIndex) photoIndex = maxPhotoIndex;

    // Scroll the photo gallery to the current index
    photos.style.transform = `translateX(-${photoIndex * photoWidth}px)`;
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item img');
const closeBtn = document.querySelector('.close');

let currentIndex;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        lightboxImg.src = item.src; // Set the lightbox image source
        lightbox.style.display = 'flex'; // Show the lightbox
    });
});

// Close the lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Navigate to the previous image in lightbox
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
    lightboxImg.src = galleryItems[currentIndex].src; // Update the lightbox image source
});

// Navigate to the next image in lightbox
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
    lightboxImg.src = galleryItems[currentIndex].src; // Update the lightbox image source
});

// Close the lightbox on click outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Wait for DOM content to load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for the video buttons
    document.querySelector('.video-prev-btn').addEventListener('click', () => {
        scrollVideos(-1); // Scroll left for videos
    });

    document.querySelector('.video-next-btn').addEventListener('click', () => {
        scrollVideos(1); // Scroll right for videos
    });

    // Photo gallery controls
    const prevGalleryBtn = document.querySelector('.photo-prev-btn');
    const nextGalleryBtn = document.querySelector('.photo-next-btn');

    prevGalleryBtn.addEventListener('click', () => {
        scrollPhotos(-1); // Scroll left for photos
    });

    nextGalleryBtn.addEventListener('click', () => {
        scrollPhotos(1); // Scroll right for photos
    });

    // Initial display of the gallery
    updateGallery();
});
