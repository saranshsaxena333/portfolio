document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(li => {
            li.querySelector('a').classList.remove('active');
            if (li.querySelector('a').getAttribute('href').includes(current)) {
                li.querySelector('a').classList.add('active');
            }
        });
    });

    // --- Typing Animation ---
    const roleElement = document.querySelector('.role');
    const roles = ["Frontend Developer", "Software Developer", "React Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate counters if inside the revealed element
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);

                    let count = 0;
                    const updateCounter = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count) + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCounter();
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageInput.parentElement.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Prepare for Formspree or similar service in the future
            // const formData = new FormData(contactForm);

            // Simulation of API call
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success state
                submitBtn.innerText = 'Message Sent!';
                submitBtn.style.background = '#22c55e';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            } catch (error) {
                console.error('Error submitting form:', error);
                submitBtn.innerText = 'Error! Try again.';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        }
    });

    // --- Magnetic Button Effect (Optional Polish) ---
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Subtle movement
            // btn.style.transform = `translate(${(x - rect.width/2)/5}px, ${(y - rect.height/2)/5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // btn.style.transform = 'translate(0, 0)';
        });
    });
});
