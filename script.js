// ===== SAVITRI VASTRALAYA - COMPLETE JAVASCRIPT =====
(function() {
    // ===== LIVE DATE & TIME - STYLISH TIMER =====
    const liveDate = document.getElementById('liveDate');
    const liveTime = document.getElementById('liveTime');
    
    function updateDateTime() {
        const now = new Date();
        
        // Date: Tue, 24 Feb 2026
        const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        liveDate.textContent = now.toLocaleDateString('en-IN', dateOptions);
        
        // Time: 9:01:44 PM
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        liveTime.textContent = now.toLocaleTimeString('en-IN', timeOptions);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ===== FORM ELEMENTS =====
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const livePreview = document.getElementById('livePreview');
    const recentList = document.getElementById('recentList');

    // ===== PRODUCT CHIPS =====
    document.querySelectorAll('.product-chip').forEach(chip => {
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
        charCount.textContent = `${msg.length}/120`;
        livePreview.innerHTML = msg ? `<i class="fas fa-quote-left"></i> ${msg} <i class="fas fa-quote-right"></i>` 
                                   : '<i class="fas fa-quote-left"></i> Your message will appear here... <i class="fas fa-quote-right"></i>';
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
        
        if (!nameInput.value.trim()) return showToast('Please enter your name', 'error');
        
        const phone = phoneInput.value.trim();
        if (!phone || phone.length !== 10) return showToast('Valid 10-digit phone required', 'error');
        
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
        showToast(`✅ Thank you ${connection.name}! Owner will call you`);
        form.reset();
        updateMessagePreview();
    });

    // ===== UPDATE RECENT LIST =====
    function updateRecentList() {
        if (!connections.length) {
            recentList.innerHTML = '<div class="empty-state"><i class="fas fa-star"></i> No connections yet · Be the first</div>';
            return;
        }
        
        let html = '';
        connections.slice(-5).reverse().forEach(conn => {
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
    document.getElementById('copyBtn').addEventListener('click', function() {
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
    
    document.querySelector('.owner-info').addEventListener('click', function() {
        navigator.clipboard.writeText('9903853162').then(() => showToast('📞 Owner number copied!'));
    });

    // ===== FOOTER BUTTONS =====
    document.getElementById('quickCallBtn')?.addEventListener('click', () => window.location.href = 'tel:9903853162');
    
    document.getElementById('quickWhatsappBtn')?.addEventListener('click', () => {
        window.open(`https://wa.me/919903853162?text=${encodeURIComponent('Hi, I am interested in your products.')}`, '_blank');
    });
    
    document.getElementById('quickMapBtn')?.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Lalan Complex, Rajendra Path, opposite Canara Bank, Babhnauli, Siwan, Bihar 841226')}`, '_blank');
    });
    
    document.getElementById('shareBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.share) {
            navigator.share({ title: 'SAVITRI VASTRALAYA', text: 'Women\'s Fashion Store', url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied!'));
        }
    });

    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `position:fixed; bottom:20px; right:20px; background:${type === 'success' ? '#a13e5c' : '#f44336'}; color:white; padding:1rem 2rem; border-radius:50px; z-index:9999; box-shadow:0 10px 30px rgba(0,0,0,0.3); border:3px solid white; animation:slideIn 0.3s;`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.animation = 'slideOut 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    // ===== GALLERY DATA WITH PRODUCT DETAILS =====
    const galleryImages = [
        // SUITS (4 images)
        { id: 1, category: 'suits', title: 'Classic Suit', description: 'Elegant designer suit', size: 'S, M, L, XL', originalPrice: '₹2999', discountPrice: '₹1999', discount: '30% OFF', label: 'HOT', url: 'images/suits/Classic Suit.jpg', thumbnail: 'images/suits/Classic Suit.jpg' },
        { id: 2, category: 'suits', title: 'Wedding Suit', description: 'Premium wedding wear', size: 'M, L, XL', originalPrice: '₹4999', discountPrice: '₹3499', discount: '30% OFF', label: 'WEDDING', url: 'images/suits/Wedding Suit.jpg', thumbnail: 'images/suits/Wedding Suit.jpg' },
        { id: 3, category: 'suits', title: 'Designer Suit', description: 'Modern party wear', size: 'S, M, L', originalPrice: '₹3999', discountPrice: '₹2799', discount: '30% OFF', label: 'NEW', url: 'images/suits/Designer Suit.jpg', thumbnail: 'images/suits/Designer Suit.jpg' },
        { id: 4, category: 'suits', title: 'Party Suit', description: 'Stylish party suit', size: 'S, M, L, XL', originalPrice: '₹3499', discountPrice: '₹2449', discount: '30% OFF', label: 'HOT', url: 'images/suits/Party Suit.jpg', thumbnail: 'images/suits/Party Suit.jpg' },
        
        // SAREES (4 images)
        { id: 5, category: 'sarees', title: 'Cotton Saree', description: 'Comfortable cotton', size: '6.5 m', originalPrice: '₹1999', discountPrice: '₹1399', discount: '30% OFF', label: 'BESTSELLER', url: 'images/sarees/Cotton Saree.jpg', thumbnail: 'images/sarees/Cotton Saree.jpg' },
        { id: 6, category: 'sarees', title: 'Silk Saree', description: 'Pure Banarasi silk', size: '6.5 m', originalPrice: '₹5999', discountPrice: '₹4199', discount: '30% OFF', label: 'LUXURY', url: 'images/sarees/Silk Saree.jpg', thumbnail: 'images/sarees/Silk Saree.jpg' },
        { id: 7, category: 'sarees', title: 'Designer Saree', description: 'Contemporary design', size: '6.5 m', originalPrice: '₹4499', discountPrice: '₹3149', discount: '30% OFF', label: 'TRENDING', url: 'images/sarees/Designer Saree.jpg', thumbnail: 'images/sarees/Designer Saree.jpg' },
        { id: 8, category: 'sarees', title: 'Party Saree', description: 'Party wear saree', size: '6.5 m', originalPrice: '₹3999', discountPrice: '₹2799', discount: '30% OFF', label: 'HOT', url: 'images/sarees/Party Saree.jpg', thumbnail: 'images/sarees/Party Saree.jpg' },
        
        // FROCKS (4 images)
        { id: 9, category: 'frocks', title: 'Baby Frock', description: 'Cute baby frock', size: '0-6 months', originalPrice: '₹899', discountPrice: '₹629', discount: '30% OFF', label: 'CUTE', url: 'images/frocks/Baby Frock.jpg', thumbnail: 'images/frocks/Baby Frock.jpg' },
        { id: 10, category: 'frocks', title: 'Summer Frock', description: 'Light summer dress', size: '2-4 years', originalPrice: '₹1299', discountPrice: '₹909', discount: '30% OFF', label: 'SUMMER', url: 'images/frocks/Summer Frock.jpg', thumbnail: 'images/frocks/Summer Frock.jpg' },
        { id: 11, category: 'frocks', title: 'Floral Frock', description: 'Beautiful floral', size: '4-6 years', originalPrice: '₹1499', discountPrice: '₹1049', discount: '30% OFF', label: 'FLORAL', url: 'images/frocks/Floral Frock.jpg', thumbnail: 'images/frocks/Floral Frock.jpg' },
        { id: 12, category: 'frocks', title: 'Party Frock', description: 'Party wear for kids', size: '6-8 years', originalPrice: '₹1999', discountPrice: '₹1399', discount: '30% OFF', label: 'PARTY', url: 'images/frocks/Party Frock.jpg', thumbnail: 'images/frocks/Party Frock.jpg' },
        
        // DUPATTAS (3 images)
        { id: 13, category: 'dupattas', title: 'Printed Dupatta', description: 'Colorful printed', size: '2.5 m', originalPrice: '₹899', discountPrice: '₹629', discount: '30% OFF', label: 'PRINTED', url: 'images/dupattas/Printed Dupatta.jpg', thumbnail: 'images/dupattas/Printed Dupatta.jpg' },
        { id: 14, category: 'dupattas', title: 'Embroidered Dupatta', description: 'Hand embroidered', size: '2.5 m', originalPrice: '₹1499', discountPrice: '₹1049', discount: '30% OFF', label: 'EMBROIDERED', url: 'images/dupattas/Embroidered Dupatta.jpg', thumbnail: 'images/dupattas/Embroidered Dupatta.jpg' },
        { id: 15, category: 'dupattas', title: 'Designer Dupatta', description: 'Designer style', size: '2.5 m', originalPrice: '₹1299', discountPrice: '₹909', discount: '30% OFF', label: 'DESIGNER', url: 'images/dupattas/Designer Dupatta.jpg', thumbnail: 'images/dupattas/Designer Dupatta.jpg' },
        
        // LEHENGAS (3 images)
        { id: 16, category: 'lehengas', title: 'Wedding Lehenga', description: 'Bridal collection', size: 'Free size', originalPrice: '₹12999', discountPrice: '₹9099', discount: '30% OFF', label: 'WEDDING', url: 'images/lehengas/Wedding Lehenga.jpg', thumbnail: 'images/lehengas/Wedding Lehenga.jpg' },
        { id: 17, category: 'lehengas', title: 'Party Lehenga', description: 'Party wear', size: 'S, M, L', originalPrice: '₹8999', discountPrice: '₹6299', discount: '30% OFF', label: 'PARTY', url: 'images/lehengas/Party Lehenga.jpg', thumbnail: 'images/lehengas/Party Lehenga.jpg' },
        { id: 18, category: 'lehengas', title: 'Designer Lehenga', description: 'Designer piece', size: 'S, M, L', originalPrice: '₹9999', discountPrice: '₹6999', discount: '30% OFF', label: 'DESIGNER', url: 'images/lehengas/Designer Lehenga.jpg', thumbnail: 'images/lehengas/Designer Lehenga.jpg' },
        
        // GOWNS (2 images)
        { id: 19, category: 'gowns', title: 'Ball Gown', description: 'Elegant ball gown', size: 'S, M, L', originalPrice: '₹7999', discountPrice: '₹5599', discount: '30% OFF', label: 'ELEGANT', url: 'images/gowns/Ball Gown.jpg', thumbnail: 'images/gowns/Ball Gown.jpg' },
        { id: 20, category: 'gowns', title: 'Evening Gown', description: 'Evening party wear', size: 'S, M, L', originalPrice: '₹6999', discountPrice: '₹4899', discount: '30% OFF', label: 'EVENING', url: 'images/gowns/Evening Gown.jpg', thumbnail: 'images/gowns/Evening Gown.jpg' },
        
        // SKIRTS (3 images)
        { id: 21, category: 'skirts', title: 'Pleated Skirt', description: 'Pleated design', size: '28-34 inch', originalPrice: '₹1499', discountPrice: '₹1049', discount: '30% OFF', label: 'PLEATED', url: 'images/skirts/Pleated Skirt.jpg', thumbnail: 'images/skirts/Pleated Skirt.jpg' },
        { id: 22, category: 'skirts', title: 'Mini Skirt', description: 'Trendy mini', size: 'S, M, L', originalPrice: '₹1299', discountPrice: '₹909', discount: '30% OFF', label: 'MINI', url: 'images/skirts/Mini Skirt.jpg', thumbnail: 'images/skirts/Mini Skirt.jpg' },
        { id: 23, category: 'skirts', title: 'Denim Skirt', description: 'Denim style', size: 'S, M, L', originalPrice: '₹1699', discountPrice: '₹1189', discount: '30% OFF', label: 'DENIM', url: 'images/skirts/Denim Skirt.jpg', thumbnail: 'images/skirts/Denim Skirt.jpg' },
        
        // NIGHTIES (3 images)
        { id: 24, category: 'nighties', title: 'Comfort Nighty', description: 'Ultra comfort', size: 'S, M, L, XL', originalPrice: '₹999', discountPrice: '₹699', discount: '30% OFF', label: 'COMFORT', url: 'images/nighties/Comfort Nighty.jpg', thumbnail: 'images/nighties/Comfort Nighty.jpg' },
        { id: 25, category: 'nighties', title: 'Cotton Nighty', description: 'Pure cotton', size: 'S, M, L, XL', originalPrice: '₹899', discountPrice: '₹629', discount: '30% OFF', label: 'COTTON', url: 'images/nighties/Cotton Nighty.jpg', thumbnail: 'images/nighties/Cotton Nighty.jpg' },
        { id: 26, category: 'nighties', title: 'Silk Nighty', description: 'Luxury silk', size: 'S, M, L', originalPrice: '₹1999', discountPrice: '₹1399', discount: '30% OFF', label: 'SILK', url: 'images/nighties/Silk Nighty.jpg', thumbnail: 'images/nighties/Silk Nighty.jpg' },
        
        // KIDS WEAR (3 images)
        { id: 27, category: 'kidswear', title: 'Kids Suit', description: 'Kids party suit', size: '2-4 years', originalPrice: '₹1499', discountPrice: '₹1049', discount: '30% OFF', label: 'KIDS', url: 'images/kidswear/Kids Suit.jpg', thumbnail: 'images/kidswear/Kids Suit.jpg' },
        { id: 28, category: 'kidswear', title: 'Kids Frock', description: 'Kids party frock', size: '2-4 years', originalPrice: '₹1299', discountPrice: '₹909', discount: '30% OFF', label: 'KIDS', url: 'images/kidswear/Kids Frock.jpg', thumbnail: 'images/kidswear/Kids Frock.jpg' },
        { id: 29, category: 'kidswear', title: 'Kids Dress', description: 'Kids casual dress', size: '4-6 years', originalPrice: '₹1399', discountPrice: '₹979', discount: '30% OFF', label: 'KIDS', url: 'images/kidswear/Kids Dress.jpg', thumbnail: 'images/kidswear/Kids Dress.jpg' },
        
        // LADIES WEAR (3 images)
        { id: 30, category: 'ladieswear', title: 'Ladies Kurta', description: 'Casual kurta', size: 'S, M, L, XL', originalPrice: '₹1499', discountPrice: '₹1049', discount: '30% OFF', label: 'KURTA', url: 'images/ladieswear/Ladies Kurta.jpg', thumbnail: 'images/ladieswear/Ladies Kurta.jpg' },
        { id: 31, category: 'ladieswear', title: 'Ladies Suit', description: 'Designer suit', size: 'S, M, L, XL', originalPrice: '₹2499', discountPrice: '₹1749', discount: '30% OFF', label: 'SUIT', url: 'images/ladieswear/Ladies Suit.jpg', thumbnail: 'images/ladieswear/Ladies Suit.jpg' },
        { id: 32, category: 'ladieswear', title: 'Ladies Top', description: 'Casual top', size: 'S, M, L', originalPrice: '₹999', discountPrice: '₹699', discount: '30% OFF', label: 'TOP', url: 'images/ladieswear/Ladies Top.jpg', thumbnail: 'images/ladieswear/Ladies Top.jpg' }
    ];

    // ===== GALLERY FUNCTIONALITY =====
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    let currentFilter = 'all';
    let visibleCount = 6;

    function getFilteredImages() {
        return currentFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === currentFilter);
    }

    function renderGallery() {
        const filtered = getFilteredImages();
        const imagesToShow = filtered.slice(0, visibleCount);
        
        if (!imagesToShow.length) {
            galleryGrid.innerHTML = '<div class="no-images"><i class="fas fa-image"></i> No images found</div>';
            viewMoreBtn.style.display = 'none';
            return;
        }
        
        viewMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
        
        galleryGrid.innerHTML = imagesToShow.map(img => `
            <div class="gallery-item" onclick="event.preventDefault(); openLightbox('${img.url}', '${img.title} - ${img.description} | ${img.size} | ${img.discountPrice}')">
                <img src="${img.thumbnail}" alt="${img.title}">
                <span class="discount-badge">${img.discount}</span>
                <span class="category-badge">${img.category.toUpperCase()}</span>
                <div class="gallery-item-overlay">
                    <div class="product-category">${img.label}</div>
                    <div class="product-title">${img.title}</div>
                    <div class="product-desc">${img.description}</div>
                    <div class="product-size">📏 ${img.size}</div>
                    <div class="product-price">
                        <span class="original-price">${img.originalPrice}</span>
                        <span class="discount-price">${img.discountPrice}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ===== LIGHTBOX FUNCTION =====
    window.openLightbox = function(imageUrl, title) {
        const lightboxHTML = `
            <div id="customLightbox" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:10000; display:flex; align-items:center; justify-content:center; cursor:pointer; backdrop-filter:blur(5px);">
                <img src="${imageUrl}" style="max-width:90%; max-height:85%; border-radius:20px; border:5px solid white; box-shadow:0 0 50px rgba(255,255,255,0.3); object-fit:contain;">
                <div style="position:absolute; top:20px; right:30px; color:white; font-size:3rem; cursor:pointer; font-weight:bold; width:50px; height:50px; background:#a13e5c; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 0 20px #ffb3c6;" onclick="closeLightbox()">&times;</div>
                <div style="position:absolute; bottom:30px; left:0; right:0; text-align:center; color:white; font-size:1.1rem; background:linear-gradient(135deg, #a13e5c, #c45d7a); padding:1rem; margin:0 20px; border-radius:50px; border:2px solid white; box-shadow:0 5px 20px rgba(0,0,0,0.5);">${title}</div>
            </div>
        `;
        
        const existingLightbox = document.getElementById('customLightbox');
        if (existingLightbox) existingLightbox.remove();
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    window.closeLightbox = function() {
        const lightbox = document.getElementById('customLightbox');
        if (lightbox) lightbox.remove();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            visibleCount = 6;
            renderGallery();
        });
    });

    viewMoreBtn.addEventListener('click', () => {
        visibleCount += 6;
        renderGallery();
    });

    document.querySelectorAll('.product-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const targetBtn = Array.from(filterBtns).find(btn => btn.dataset.filter === this.dataset.category);
            if (targetBtn) {
                targetBtn.click();
                document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    renderGallery();

    // ===== ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        @keyframes fadeOut { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
    `;
    document.head.appendChild(style);

    // ===== MOUSE MOVE COLOR SPLASH =====
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) {
            const splash = document.createElement('div');
            splash.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; width:30px; height:30px; background:radial-gradient(circle, ${['#ff6b6b','#ffb3c6','#a13e5c'][Math.floor(Math.random()*3)]} 0%, transparent 70%); border-radius:50%; pointer-events:none; z-index:9998; animation:fadeOut 1s forwards;`;
            document.body.appendChild(splash);
            setTimeout(() => splash.remove(), 1000);
        }
    });
})();
