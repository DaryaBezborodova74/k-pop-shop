function changeCheckbox(elem) {
    let item = document.getElementById(elem);
    switch (item.getAttribute("aria-checked")) {
        case "true":
            item.setAttribute("aria-checked", "false");
            break;
        case "false":
            item.setAttribute("aria-checked", "true");
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const colorLabels = document.querySelectorAll('.filter-color__label');
    colorLabels.forEach(label => {
        label.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                event.preventDefault();
                changeCheckbox(this.id);
            }
        });
    });
});