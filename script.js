const container = document.querySelector('.carousel-container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// Calculate scroll based on visible container width
function getScrollAmount() {
    return container.clientWidth * 0.8; 
}

function updateButtons() {}
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // LEFT BUTTON: Slide in after we move past card #1
    if (scrollLeft > 20) {
        leftBtn.classList.add('active');
    } else {
        leftBtn.classList.remove('active');
    }

    // RIGHT BUTTON: Slide out only at the very end (card #10)
    if (scrollLeft >= maxScroll - 20) {
        rightBtn.classList.add('hidden');
    } else {
        rightBtn.classList.remove('hidden');
    }

rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

container.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons); // Re-check on screen resize
updateButtons();

function updateButtons() {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // LEFT BUTTON: Only active when we have scrolled right
    if (scrollLeft > 10) {
        leftBtn.classList.add('active');
    } else {
        leftBtn.classList.remove('active');
    }

    // RIGHT BUTTON: Active unless we have reached the very end
    // Use -5 to account for sub-pixel rounding in different browsers
    if (scrollLeft >= maxScroll - 5) {
        rightBtn.classList.remove('active');
    } else {
        rightBtn.classList.add('active');
    }
}

// Initial state check
updateButtons();

// MODAL LOGIC
const modal = document.getElementById('movie-modal');
const closeModal = document.querySelector('.close-modal');
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.getAttribute('data-img');
        const logo = card.getAttribute('data-logo'); 
        const tags = card.getAttribute('data-tags') || ""; // Fallback to empty string if tags are missing
        const desc = card.getAttribute('data-desc');
        const year = card.getAttribute('data-year'); // Fetch the year attribute

        document.getElementById('modal-image').src = img;
        document.getElementById('modal-logo').src = logo; 
        document.getElementById('modal-description').innerText = desc;
        
        // Dynamically build metadata tags
        const metadata = document.querySelector('.metadata');
        
        // 1. Clean and filter tags: remove empty strings and the year if it duplicates
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
        const filteredTags = tagsArray.filter(tag => tag !== year);
        
        // 2. Build HTML: Only include the year span if the year is not null
        const yearSpan = year ? `<span>${year}</span>` : "";
        const tagsHTML = filteredTags.map(tag => `<span class="tag">${tag}</span>`).join('');

        metadata.innerHTML = yearSpan + tagsHTML;
        
        modal.classList.add('show');
        document.body.style.overflowY = 'hidden'; 
    });
});

const hideModal = () => {
    modal.classList.remove('show');
    document.body.style.overflowY = 'auto';
};

closeModal.addEventListener('click', hideModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});

// FAQ TOGGLE
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});