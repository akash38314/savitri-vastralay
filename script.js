// ===== SAVITRI VASTRALAY - COMPLETE JAVASCRIPT =====
(function() {
    // ===== LIVE DATE =====
    const liveDate = document.getElementById('liveDate');
    
    function updateDate() {
        const now = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        liveDate.textContent = now.toLocaleDateString('en-IN', options);
    }
    updateDate();
    setInterval(updateDate, 1000);

    // ===== FORM ELEMENTS =====
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const livePreview = document.getElementById('livePreview');
    const recentList = document.getElementById('recentList');

    // ===== PRODUCT CHIPS =====
    const chips = document.querySelectorAll('.product-chip');
    
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const product = this.textContent.trim();
            messageInput.value = `Interested in ${product}`;
            updateMessagePreview();
            
            this.style.background = '#a13e5c';
            this.style.color = 'white';
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 300);
            
            showToast(`✨ ${product} selected! Call 9903853162`);
        });
    });

    // ===== MESSAGE PREVIEW =====
    function updateMessagePreview() {
        const msg = messageInput.value.trim();
        const count = msg.length;
        charCount.textContent = `${count}/120`;
        
        if (msg === '') {
            livePreview.innerHTML = '<i class="fas fa-quote-left"></i> Your message will appear here... <i class="fas fa-quote-right"></i>';
        } else {
            livePreview.innerHTML = `<i class="fas fa-quote-left"></i> ${msg} <i class="fas fa-quote-right"></i>`;
        }
    }
    
    messageInput.addEventListener('input', updateMessagePreview);

    // ===== PHONE VALIDATION =====
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });

    // ===== STORE CONNECTIONS =====
    let connections = JSON.parse(localStorage.getItem('savitriConnections')) || [];

    // ===== FORM SUBMIT =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!nameInput.value.trim()) {
            showToast('Please enter your name', 'error');
            return;
        }
        
        const phone = phoneInput.value.trim();
        if (!phone || phone.length !== 10) {
            showToast('Valid 10-digit phone required', 'error');
            return;
        }
        
        const connection = {
            id: Date.now(),
            name: nameInput.value.trim(),
            phone: phone,
            email: document.getElementById('email').value.trim() || '—',
            message: messageInput.value.trim() || 'No message',
            time: new Date().toLocaleTimeString(),
            initial: nameInput.value.trim().charAt(0).toUpperCase()
        };
        
        connections.push(connection);
        localStorage.setItem('savitriConnections', JSON.stringify(connections));
        updateRecentList();
        
        showToast(`✅ Thank you ${connection.name}! Owner 9903853162 will call you`);
        
        form.reset();
        updateMessagePreview();
    });

    // ===== UPDATE RECENT LIST =====
    function updateRecentList() {
        if (connections.length === 0) {
            recentList.innerHTML = '<div class="empty-state"><i class="fas fa-star"></i> No connections yet · Be the first</div>';
            return;
        }
        
        let html = '';
        const recent = connections.slice(-5).reverse();
        
        recent.forEach(conn => {
            html += `
                <div class="connection-item">
                    <div class="connection-avatar">${conn.initial}</div>
                    <div class="connection-info">
                        <div class="connection-name">${conn.name}</div>
                        <div class="connection-msg">${conn.message.substring(0, 30)}${conn.message.length > 30 ? '...' : ''}</div>
                    </div>
                    <div class="connection-time">${conn.time}</div>
                </div>
            `;
        });
        
        recentList.innerHTML = html;
    }
    updateRecentList();

    // ===== COPY ADDRESS & OWNER =====
    const copyBtn = document.getElementById('copyBtn');
    const ownerDiv = document.querySelector('.owner-info');
    
    copyBtn.addEventListener('click', function() {
        const address = "Lalan Complex, Rajendra Path, opp. Canara Bank, Babhnauli, Siwan, Bihar 841226";
        navigator.clipboard.writeText(address).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#4caf50';
            this.style.color = 'white';
            setTimeout(() => {
                this.innerHTML = '<i class="far fa-copy"></i>';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
            showToast('📍 Address copied!');
        });
    });
    
    ownerDiv.addEventListener('click', function() {
        const number = '9903853162';
        navigator.clipboard.writeText(number).then(() => {
            showToast('📞 Owner number copied!');
        });
    });

    // ===== FOOTER FUNCTIONALITY =====
    const quickCallBtn = document.getElementById('quickCallBtn');
    const quickWhatsappBtn = document.getElementById('quickWhatsappBtn');
    const quickMapBtn = document.getElementById('quickMapBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    // Call Button
    if (quickCallBtn) {
        quickCallBtn.addEventListener('click', function() {
            window.location.href = 'tel:9903853162';
        });
    }
    
    // WhatsApp Button
    if (quickWhatsappBtn) {
        quickWhatsappBtn.addEventListener('click', function() {
            const message = encodeURIComponent('Hi, I am interested in your products.');
            window.open(`https://wa.me/919903853162?text=${message}`, '_blank');
        });
    }
    
    // Map/Direction Button - Updated with exact location
    if (quickMapBtn) {
        quickMapBtn.addEventListener('click', function() {
            const address = encodeURIComponent('Lalan Complex, Rajendra Path, opposite Canara Bank, Babhnauli, Siwan, Bihar 841226');
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        });
    }
    
    // Share Button
    if (shareBtn) {
        shareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navigator.share) {
                navigator.share({
                    title: 'SAVITRI VASTRALAY',
                    text: 'Women\'s Fashion Store - Suits, Sarees, Lehengas and more',
                    url: window.location.href
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied! Share on WhatsApp');
                });
            }
        });
    }

    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = type === 'success' ? '#a13e5c' : '#f44336';
        toast.style.color = 'white';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '50px';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        toast.style.border = '3px solid white';
        toast.style.animation = 'slideIn 0.3s';
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== MOUSE MOVE COLOR SPLASH =====
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) {
            const splash = document.createElement('div');
            splash.style.position = 'fixed';
            splash.style.left = e.clientX + 'px';
            splash.style.top = e.clientY + 'px';
            splash.style.width = '30px';
            splash.style.height = '30px';
            splash.style.background = `radial-gradient(circle, ${['#ff6b6b', '#ffb3c6', '#a13e5c'][Math.floor(Math.random() * 3)]} 0%, transparent 70%)`;
            splash.style.borderRadius = '50%';
            splash.style.pointerEvents = 'none';
            splash.style.zIndex = '9998';
            splash.style.animation = 'fadeOut 1s forwards';
            document.body.appendChild(splash);
            setTimeout(() => splash.remove(), 1000);
        }
    });

    // ===== ADD ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeOut {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();
