const btnShowFilterPanel = document.getElementById("#btn-show-filter-panel-");
const filterPanel = document.querySelector(".catalog__filter");

btnShowFilterPanel.addEventListener("click", () => {
    filterPanel.classList.add("show-filter-panel");
    
})