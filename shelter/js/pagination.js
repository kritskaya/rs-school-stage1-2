let currentPage = 1;

let visiblePageCards = 8;

const lastPageBtn = document.querySelector(".last-page-btn");

export const lastPageBtnClickHandler = () => {

	lastPageBtn.addEventListener("click", () => {
		showPage(1);
	})
}

const showPage = (pageNumber) => {
	if (document.documentElement.clientWidth > 1279) {
		visiblePageCards = 8;
	} else if (document.documentElement.clientWidth > 767) {
		visiblePageCards = 6;
	} else {
		visiblePageCards = 3;
	}


}