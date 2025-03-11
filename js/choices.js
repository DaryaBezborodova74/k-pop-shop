const element = document.querySelector('.filter-sort-choices');
const filterSortChoices = new Choices(element, {
    noResultsText: '',
    searchEnabled: false,
    itemSelectText: ''
});

let rangePrice = document.querySelector('input[type="range"].filter-price__slider');
rangePrice.style.setProperty('--value', rangePrice.value);
rangePrice.style.setProperty('--min', rangePrice.min == '' ? '0' : rangePrice.min);
rangePrice.style.setProperty('--max', rangePrice.max == '' ? '50' : rangePrice.max);
rangePrice.addEventListener('input',
    () => rangePrice.style.setProperty('--value', rangePrice.value)
); 