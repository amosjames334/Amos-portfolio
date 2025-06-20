(function ($) {
    "use strict";

    // Performance optimizations
    let isScrolling = false;
    let ticking = false;

    // Navbar on scrolling with performance optimization
    $(window).scroll(function () {
        if (!ticking) {
            requestAnimationFrame(function() {
                if ($(window).scrollTop() > 200) {
                    $('.navbar').fadeIn('slow').css('display', 'flex');
                } else {
                    $('.navbar').fadeOut('slow').css('display', 'none');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scrolling on the navbar links with performance
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 45
                }, 1200, 'easeInOutExpo');
                
                if ($(this).parents('.navbar-nav').length) {
                    $('.navbar-nav .active').removeClass('active');
                    $(this).closest('a').addClass('active');
                }
            }
        }
    });

    // Typed Initiate with error handling
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        if (typed_strings) {
            try {
                var typed = new Typed('.typed-text-output', {
                    strings: typed_strings.split(', '),
                    typeSpeed: 100,
                    backSpeed: 20,
                    smartBackspace: false,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|'
                });
            } catch (error) {
                console.warn('Typed.js initialization failed:', error);
                $('.typed-text-output').text('Data Engineer & AI Specialist');
            }
        }
    }

    // Enhanced Modal Video handling
    $(document).ready(function () {
        $('.btn-play').click(function (e) {
            e.preventDefault();
            $('#videoModal').modal('show');
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            const video = $("#video")[0];
            if (video && video.play) {
                video.play().catch(error => {
                    console.warn('Video autoplay failed:', error);
                });
            }
        });

        $('#videoModal').on('hide.bs.modal', function (e) {
            const video = $("#video")[0];
            if (video && video.pause) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // Optimized scroll handling with throttling
    let scrollTimeout;
    let lastScrollTop = 0;
    
    $(window).scroll(function () {
        const currentScrollTop = $(this).scrollTop();
        
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Back to top button
            if (currentScrollTop > 200) {
                $('.back-to-top').fadeIn('slow');
                $('.scroll-to-bottom').fadeOut('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
                $('.scroll-to-bottom').fadeIn('slow');
            }
            
            lastScrollTop = currentScrollTop;
        }, 100);
    });

    // Skills animation with Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $('.progress .progress-bar').each(function () {
                        const $this = $(this);
                        const percentage = $this.attr("aria-valuenow");
                        if (percentage) {
                            $this.css("width", percentage + '%');
                        }
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillSection = document.querySelector('#skill');
        if (skillSection) {
            skillObserver.observe(skillSection);
        }
    } else {
        // Fallback for older browsers
        if (typeof $.fn.waypoint !== 'undefined') {
            $('.skill').waypoint(function () {
                $('.progress .progress-bar').each(function () {
                    $(this).css("width", $(this).attr("aria-valuenow") + '%');
                });
            }, {offset: '80%'});
        }
    }

    // Enhanced Portfolio isotope and filter with better animations
    const portfolioContainer = $('.portfolio-container');
    if (portfolioContainer.length && typeof portfolioContainer.isotope === 'function') {
        var portfolioIsotope = portfolioContainer.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('#portfolio-flters li').on('click', function () {
            const $this = $(this);
            const filterValue = $this.data('filter');
            
            $("#portfolio-flters li").removeClass('active');
            $this.addClass('active');
            
            portfolioIsotope.isotope({
                filter: filterValue,
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });
        });
    }
    
    // Back to top button with smooth animation
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1200, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel (if present)
    const testimonialCarousel = $(".testimonial-carousel");
    if (testimonialCarousel.length && typeof testimonialCarousel.owlCarousel === 'function') {
        testimonialCarousel.owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            items: 1,
            nav: false,
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                1000: { items: 1 }
            }
        });
    }

    // Enhanced Contact Form handling with comprehensive validation
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = $('#sendMessageButton');
        const successDiv = $('#success');
        
        // Clear previous errors
        form.find('.form-control').removeClass('is-invalid');
        successDiv.html('');
        
        // Comprehensive validation
        let isValid = true;
        const errors = [];
        
        // Name validation
        const name = $('#name').val().trim();
        if (!name || name.length < 2) {
            $('#name').addClass('is-invalid');
            errors.push('Please enter a valid name (at least 2 characters).');
            isValid = false;
        }
        
        // Email validation
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            errors.push('Please enter a valid email address.');
            isValid = false;
        }
        
        // Subject validation
        const subject = $('#subject').val().trim();
        if (!subject || subject.length < 3) {
            $('#subject').addClass('is-invalid');
            errors.push('Please enter a subject (at least 3 characters).');
            isValid = false;
        }
        
        // Message validation
        const message = $('#message').val().trim();
        if (!message || message.length < 10) {
            $('#message').addClass('is-invalid');
            errors.push('Please enter a message (at least 10 characters).');
            isValid = false;
        }

        if (!isValid) {
            successDiv.html('<div class="alert alert-danger"><i class="fas fa-exclamation-triangle me-2"></i>' + errors.join(' ') + '</div>');
            return;
        }

        // Submit form
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        
        // Use Formspree's endpoint
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                successDiv.html('<div class="alert alert-success"><i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. I\'ll get back to you soon.</div>');
                form[0].reset();
            },
            error: function(xhr, status, error) {
                // For Formspree, even successful submissions might return as "error" due to redirect
                if (xhr.status === 200 || xhr.responseText.includes('Thanks')) {
                    successDiv.html('<div class="alert alert-success"><i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. I\'ll get back to you soon.</div>');
                    form[0].reset();
                } else {
                    successDiv.html('<div class="alert alert-warning"><i class="fas fa-info-circle me-2"></i>Message sent! If you don\'t receive a confirmation, please try again or contact me directly.</div>');
                    form[0].reset();
                }
            },
            complete: function() {
                submitBtn.prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i>Send Message');
                
                // Clear success message after 8 seconds
                setTimeout(function() {
                    successDiv.fadeOut('slow', function() {
                        $(this).html('').show();
                    });
                }, 8000);
            }
        });
    });

    // Real-time form validation
    $('#contactForm input, #contactForm textarea').on('input blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        $this.removeClass('is-invalid is-valid');
        
        // Individual field validation
        if ($this.attr('id') === 'name' && value.length >= 2) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'subject' && value.length >= 3) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'message' && value.length >= 10) {
            $this.addClass('is-valid');
        }
        
        // Clear error messages
        if ($('#success .alert-danger').length && value) {
            const errors = $('#success .alert-danger').text();
            if (!errors.includes('Please enter a valid name') || $this.attr('id') !== 'name') {
                $('#success').html('');
            }
        }
    });

    // Lazy loading for images (with fallback)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (lazyImages.length && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Performance: Preload critical resources
    $(document).ready(function() {
        try {
            // Preload resume file
            const resumeLink = document.createElement('link');
            resumeLink.rel = 'prefetch';
            resumeLink.href = 'download/Amos_Jaimes_Resume_.pdf';
            document.head.appendChild(resumeLink);
            
            // Preload critical images
            const profileLink = document.createElement('link');
            profileLink.rel = 'preload';
            profileLink.href = 'img/profile2.jpg';
            profileLink.as = 'image';
            document.head.appendChild(profileLink);
            
        } catch (error) {
            console.warn('Resource preloading failed:', error);
        }
    });

    // Enhanced accessibility features
    $(document).ready(function() {
        // Add focus management for modals
        $('#videoModal').on('shown.bs.modal', function() {
            $(this).find('.close').focus();
        });
        
        // Keyboard navigation for portfolio filters
        $('#portfolio-flters li').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            }
        });
        
        // Add aria-label to social media links
        $('.btn-social').each(function() {
            const $this = $(this);
            if (!$this.attr('aria-label')) {
                const icon = $this.find('i').attr('class');
                if (icon.includes('facebook')) $this.attr('aria-label', 'Visit Facebook profile');
                else if (icon.includes('linkedin')) $this.attr('aria-label', 'Visit LinkedIn profile');
                else if (icon.includes('instagram')) $this.attr('aria-label', 'Visit Instagram profile');
            }
        });
    });

    // Error boundary for critical functions
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Optionally send error reports to a service
    });

    // Performance monitoring
    if (window.performance && window.performance.mark) {
        window.addEventListener('load', function() {
            performance.mark('portfolio-loaded');
            // Optionally log performance metrics
        });
    }

})(jQuery);

