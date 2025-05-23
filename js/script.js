document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });

    const gallerySlides = document.querySelectorAll('.gallery__slide');
    if (gallerySlides.length > 0) {
        let currentSlide = 0;
        gallerySlides[0].style.display = 'block';

        setInterval(function() {
            gallerySlides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % gallerySlides.length;
            gallerySlides[currentSlide].style.display = 'block';
        }, 5000);

        gallerySlides.forEach(slide => {
            slide.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                const img = document.createElement('img');
                img.src = this.querySelector('img').src;
                modal.appendChild(img);
                document.body.appendChild(modal);
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            });
        });
    }

    const reviews = document.querySelectorAll('.review');
    if (reviews.length > 0) {
        let currentReview = 0;
        reviews[0].style.display = 'block';

        document.querySelector('.next-btn').addEventListener('click', function() {
            reviews[currentReview].style.display = 'none';
            currentReview = (currentReview + 1) % reviews.length;
            reviews[currentReview].style.display = 'block';
        });

        document.querySelector('.prev-btn').addEventListener('click', function() {
            reviews[currentReview].style.display = 'none';
            currentReview = (currentReview - 1 + reviews.length) % reviews.length;
            reviews[currentReview].style.display = 'block';
        });
    }

    document.getElementById('excursion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const nameInput = this.querySelector('input[name="name"]');
        if (nameInput.value.length < 3) {
            alert('Имя должно содержать минимум 3 символа');
            isValid = false;
        }

        if (!this.querySelector('input[name="agree"]').checked) {
            alert('Необходимо ваше согласие');
            isValid = false;
        }

        if (isValid) {
            alert('Спасибо! Мы скоро с вами свяжемся!');
            this.reset();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  let interval;
  
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  function startSlider() {
    interval = setInterval(() => {
      goToSlide((currentIndex + 1) % slides.length);
    }, 1500);
  }
  
  function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  prevBtn.addEventListener('click', () => {
    clearInterval(interval);
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
    startSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    clearInterval(interval);
    goToSlide((currentIndex + 1) % slides.length);
    startSlider();
  });

  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', startSlider);
  
  startSlider();
});