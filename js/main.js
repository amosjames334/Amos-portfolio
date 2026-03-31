(function ($) {
    "use strict";

    // ================================
    // Loading Screen
    // ================================
    $(window).on('load', function () {
        setTimeout(function () {
            $('#page-loader').addClass('fade-out');
        }, 500);
    });

    // ================================
    // Navbar — always visible, add scrolled class
    // ================================
    let ticking = false;

    $(window).scroll(function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                const scrollTop = $(window).scrollTop();

                // Scrolled class for compact navbar
                if (scrollTop > 80) {
                    $('.navbar').addClass('scrolled');
                } else {
                    $('.navbar').removeClass('scrolled');
                }

                // Scroll progress bar
                const docHeight = $(document).height() - $(window).height();
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                $('#scroll-progress').css('width', progress + '%');

                // Back to top / scroll to bottom buttons
                if (scrollTop > 200) {
                    $('.back-to-top').fadeIn('slow');
                    $('.scroll-to-bottom').fadeOut('slow');
                } else {
                    $('.back-to-top').fadeOut('slow');
                    $('.scroll-to-bottom').fadeIn('slow');
                }

                ticking = false;
            });
            ticking = true;
        }
    });

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

    // (scroll handling consolidated into the main scroll handler above)

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
        if (typeof $.fn.waypoint !== 'undefined') {
            $('.skill').waypoint(function () {
                $('.progress .progress-bar').each(function () {
                    $(this).css("width", $(this).attr("aria-valuenow") + '%');
                });
            }, {offset: '80%'});
        }
    }

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
    
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1200, 'easeInOutExpo');
        return false;
    });

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

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = $('#sendMessageButton');
        const successDiv = $('#success');
        
        form.find('.form-control').removeClass('is-invalid');
        successDiv.html('');
        
        let isValid = true;
        const errors = [];
        
        const name = $('#name').val().trim();
        if (!name || name.length < 2) {
            $('#name').addClass('is-invalid');
            errors.push('Please enter a valid name (at least 2 characters).');
            isValid = false;
        }
        
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            errors.push('Please enter a valid email address.');
            isValid = false;
        }
        
        const subject = $('#subject').val().trim();
        if (!subject || subject.length < 3) {
            $('#subject').addClass('is-invalid');
            errors.push('Please enter a subject (at least 3 characters).');
            isValid = false;
        }
        
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

        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        
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
                
                setTimeout(function() {
                    successDiv.fadeOut('slow', function() {
                        $(this).html('').show();
                    });
                }, 8000);
            }
        });
    });

    $('#contactForm input, #contactForm textarea').on('input blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        $this.removeClass('is-invalid is-valid');
        
        if ($this.attr('id') === 'name' && value.length >= 2) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'subject' && value.length >= 3) {
            $this.addClass('is-valid');
        } else if ($this.attr('id') === 'message' && value.length >= 10) {
            $this.addClass('is-valid');
        }
        
        if ($('#success .alert-danger').length && value) {
            $('#success').html('');
        }
    });

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
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

    $(document).ready(function() {
        try {
            const resumeLink = document.createElement('link');
            resumeLink.rel = 'prefetch';
            resumeLink.href = 'download/Amos_Jaimes_Resume_.pdf';
            document.head.appendChild(resumeLink);
            
            const profileLink = document.createElement('link');
            profileLink.rel = 'preload';
            profileLink.href = 'img/profile1.jpg';
            profileLink.as = 'image';
            document.head.appendChild(profileLink);
            
        } catch (error) {
            console.warn('Resource preloading failed:', error);
        }
    });

    $(document).ready(function() {
        $('#videoModal').on('shown.bs.modal', function() {
            $(this).find('.close').focus();
        });
        
        $('#portfolio-flters li').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            }
        });
        
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

    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    if (window.performance && window.performance.mark) {
        window.addEventListener('load', function() {
            performance.mark('portfolio-loaded');
        });
    }

    // ================================
    // Scroll Reveal Animation System
    // ================================
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('active');
        });
    }

    // ================================
    // Hero Particle Animation
    // ================================
    (function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        const PARTICLE_COUNT = 50;
        const CONNECTION_DISTANCE = 120;

        function resize() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.4 + 0.1
            };
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(11, 206, 175, ' + p.opacity + ')';
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < CONNECTION_DISTANCE) {
                        const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = 'rgba(11, 206, 175, ' + lineOpacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            animationId = requestAnimationFrame(draw);
        }

        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                resize();
            }, 250);
        });

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) draw();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0 });

        heroObserver.observe(canvas.parentElement);
        init();
        draw();
    })();

    // ================================
    // Active Nav Link on Scroll
    // ================================
    (function initActiveNav() {
        const sections = document.querySelectorAll('section[id], div[id="qualification"], div[id="skill"]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (!sections.length || !navLinks.length) return;
        
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });
        
        sections.forEach(section => navObserver.observe(section));
    })();

})(jQuery);
