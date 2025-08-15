<script>
    // Ambil elemen HTML yang dibutuhkan
    const bukaUndanganBtn = document.getElementById('bukaUndanganBtn');
    const page1 = document.getElementById('page-1');
    const mainContent = document.getElementById('main-content');
    const transitionOverlay = document.getElementById('transition-overlay');
    const body = document.body;
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicIcon = document.getElementById('music-icon');

    // Target tanggal pernikahan (Ganti sesuai tanggal acara)
    const weddingDate = new Date('October 5, 2025 08:00:00').getTime();

    // Variabel untuk Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animated-item').forEach(item => {
        observer.observe(item);
    });

    // Fungsi untuk mengontrol musik
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleBtn.classList.add('is-playing');
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
        } else {
            backgroundMusic.pause();
            musicToggleBtn.classList.remove('is-playing');
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        }
    }

    // Event listener untuk tombol Buka Undangan
    bukaUndanganBtn.addEventListener('click', () => {
        // Animasi transisi overlay
        transitionOverlay.classList.remove('invisible', 'opacity-0');
        transitionOverlay.classList.add('opacity-100');

        setTimeout(() => {
            page1.classList.remove('active');
            mainContent.classList.add('active');
            body.style.overflowY = 'auto'; // Mengaktifkan scrolling setelah transisi
            
            // Mulai memutar musik dan tampilkan tombol musik
            backgroundMusic.play();
            musicToggleBtn.classList.add('is-visible', 'is-playing');
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            
            // Sembunyikan overlay setelah transisi selesai
            transitionOverlay.classList.remove('opacity-100');
            transitionOverlay.classList.add('opacity-0', 'invisible');
        }, 500); // Durasi transisi
    });

    // Event listener untuk tombol musik
    musicToggleBtn.addEventListener('click', () => {
        toggleMusic();
    });
    
    // Memilih semua tombol salin
    const copyButtons = document.querySelectorAll('.copy-btn');
    const copyMessage = document.getElementById('copy-message');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-clipboard-target');
            const targetElement = document.querySelector(targetId);
            
            // Gunakan document.execCommand untuk kompatibilitas yang lebih baik
            const el = document.createElement('textarea');
            el.value = targetElement.innerText;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            // Tampilkan pesan sukses
            copyMessage.classList.remove('hidden');
            copyMessage.classList.add('show');

            // Sembunyikan pesan setelah 3 detik
            setTimeout(() => {
                copyMessage.classList.remove('show');
                setTimeout(() => {
                    copyMessage.classList.add('hidden');
                }, 500); // Sembunyikan sepenuhnya setelah transisi opacity selesai
            }, 3000);
        });
    });

    // Fungsi untuk mengupdate countdown timer setiap detik
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Hitung waktu untuk hari, jam, menit, dan detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Tampilkan hasil di elemen yang sesuai
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        // Jika hitung mundur selesai
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "Wedding Day!";
        }
    }, 1000);
</script>
