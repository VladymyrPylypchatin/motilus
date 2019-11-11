class CategoryManager {
    constructor() {
        this.titleElem = document.querySelector(".menu-header__title");
        this.containerElem = document.querySelector(".menu-body");
        this.backBtn = document.querySelector(".menu-header__back-btn svg");

        this.categoryTitle = 'Category Name';
        this.categories = [];

        this.subCategoryTitle = '';
        this.menuItems = [];

        this.allServices = [];

        this.backBtn.addEventListener("click", this.backBtnHandler.bind(this));
    }

    backBtnHandler() {
        this.renderCategories();
        this.backBtn.parentElement.classList.add("hidden");
    }

    setCategoryData(title, menuItems, allServices) {
        this.categoryTitle = title;
        this.categories = menuItems;
        this.allServices = allServices;

        if(!menuItems.length) {
            this.subCategoryTitle = title;
            this.menuItems = allServices;
        }
    }

    render(itemName) {
        if (itemName === 'cat') {
            this.renderCategories();
        }
        if (itemName === 'subCat') {
            this.renderItems();
        }

        if (itemName === 'renderBareItems') {
            this.renderBareItems();
        }
    }

    renderCategories() {
        this.titleElem.innerHTML = this.categoryTitle;
        this.containerElem.innerHTML = "";
        this.categories.forEach((item) => {
            this.renderCategory(item);
        });
    }

    renderCategory(itemObj) {
        const item = document.createElement("div");
        item.classList.add("menu-item");
        item.innerHTML = itemObj.title;
        item.setAttribute("data-id", itemObj._id);
        item.addEventListener("click", this.selectCategoryHandler.bind(this));
        this.containerElem.appendChild(item);
    }

    selectCategoryHandler(event) {
        console.log("Select Category Handler");
        const id = event.currentTarget.getAttribute('data-id');
        const cat = this.categories.find(category => category._id === id);
        this.subCategoryTitle = cat.title;
        this.menuItems = cat.servicesList;
        this.render('subCat');

    }

    renderItems() {
        this.titleElem.innerHTML = this.subCategoryTitle;
        this.containerElem.innerHTML = "";
        this.menuItems.forEach(item => {
            this.renderItem(item);
        });
        this.backBtn.parentElement.classList.remove("hidden");
    }

    renderBareItems() {
        this.titleElem.innerHTML = this.subCategoryTitle;
        this.containerElem.innerHTML = "";
        this.menuItems.forEach(item => {
            this.renderItem(item);
        });
    }

    renderItem(itemObj) {
        const item = document.createElement("div");
        item.classList.add("menu-item");
        if(itemObj.disabled) item.classList.add('disabled');
        item.innerHTML = `
            <span>
                ${itemObj.title}
            </span>
            <span>
                ${!itemObj.disabled ? '$' + itemObj.price + '/hr' : 'Coming soon'}
            </span>
        `;
        item.setAttribute('data-slug', itemObj.id);
        item.addEventListener('click', this.selectServiceHandler.bind(this));
        this.containerElem.appendChild(item);
    }

    selectServiceHandler(event) {
        const slug = event.currentTarget.getAttribute('data-slug');
        window.parent.postMessage({
            action: "select",
            serviceSlug: slug
        }, '*')

        document.querySelector('body').classList.add("disabled");
        event.currentTarget.classList.add("selected");
    }
}