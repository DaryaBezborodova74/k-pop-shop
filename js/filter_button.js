document.addEventListener('DOMContentLoaded', function() {
    const btnShowFilterPanel = document.getElementById("btn-show-filter-panel");
    const filterPanel = document.querySelector(".catalog__filter");

    // Create and insert a cross (close) button into the filter panel (if not present)
    function insertMobileCloseButton() {
        if (!filterPanel) return;
        let closeBtn = filterPanel.querySelector('.filter-panel__close-btn');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'filter-panel__close-btn';
            closeBtn.setAttribute('aria-label', 'Закрыть меню');
            closeBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FD0266" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `;
            filterPanel.insertBefore(closeBtn, filterPanel.firstChild);

            closeBtn.addEventListener('click', function() {
                filterPanel.classList.remove("show-filter-panel");
            });
        }
    }

    // Show/hide burger button and sidebar depending on screen size
    function handleMobileSidebar() {
        if (window.innerWidth <= 768) {
            if (btnShowFilterPanel) btnShowFilterPanel.style.display = 'flex';
        } else {
            if (btnShowFilterPanel) btnShowFilterPanel.style.display = 'none';
            if (filterPanel) filterPanel.classList.remove("show-filter-panel");
        }
    }

    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);

    // Show sidebar and insert cross button on burger click
    if (btnShowFilterPanel && filterPanel) {
        btnShowFilterPanel.addEventListener("click", function() {
            filterPanel.classList.add("show-filter-panel");
            insertMobileCloseButton();
        });
    }

    // Hide sidebar on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && filterPanel && filterPanel.classList.contains("show-filter-panel")) {
            filterPanel.classList.remove("show-filter-panel");
        }
    });
});
