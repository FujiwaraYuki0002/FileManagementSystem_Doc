/**
 * ページング処理
 */

//ページングに必要なデータ
class Paginator {
	constructor(dataTable, data) {
		this.tableBody = document.getElementById(dataTable); // テーブルのボディ部分
		this.data = data; // 渡されたデータ
		this.currentPage = 1; // 初期ページ
		this.itemsPerPage = 10; // 1ページに表示するアイテム数
		this.totalPages = Math.ceil(this.data.length / this.itemsPerPage); // 総ページ数
	}
	
	// ページ更新
	updatePage(page) {
		this.currentPage = page;
		this.updatePageData();
	}
	
	// 現在のページに基づいたデータを更新
	updatePageData() {
		const startPage = (this.currentPage - 1) * this.itemsPerPage;
		const endPage = startPage + this.itemsPerPage;
		const currentData = this.data.slice(startPage, endPage); // 現在のページに対応するデータ
		
		this.updatePagingControls();
	}
	
	// ページネーションコントロールの更新
	updatePagingControls() {
		document.getElementById('pageNumber').textContent = this.currentPage;
		document.getElementById('totalPages').textContent = this.totalPages;
	}

}

// DOMContentLoaded時に処理を実行
document.addEventListener("DOMContentLoaded", () => {
	// サーバーから渡されたデータをJavaScriptで取得
	const files = /*[[${file}]]*/ [];
	const users = /*[[${user}]]*/ [];
	const posts = /*[[${post}]]*/ [];
	const teams = /*[[${team}]]*/ [];
	
	const filesPaginator = new Paginator('fileTableBody', files);
	filesPaginator.updatePageData; // ファイルデータのページネーションを初期化
	
	const usersPaginator = new Paginator('userTableBody', users);
	usersPaginator.updatePageData; // 会議データのページネーションを初期化
	
	const postsPaginator = new Paginator('postTableBody', posts);
	postsPaginator.updatePageData; // 会議データのページネーションを初期化
	
	const teamsPaginator = new Paginator('teamTableBody', teams);
	teamsPaginator.updatePageData; // 会議データのページネーションを初期化
	
	// ページネーションボタンのイベント処理
	document.getElementById('prevPage').addEventListener('click', () => {
		filesPaginator.updatePage(filesPaginator.currentPage - 1);
		usersPaginator.updatePage(usersPaginator.currentPage - 1);
		postsPaginator.updatePage(postsPaginator.currentPage - 1);
		teamsPaginator.updatePage(teamsPaginator.currentPage - 1);
	});
	
	document.getElementById('nextPage').addEventListener('click', () => {
		filesPaginator.updatePage(filesPaginator.currentPage + 1);
		usersPaginator.updatePage(usersPaginator.currentPage + 1);
		postsPaginator.updatePage(postsPaginator.currentPage + 1);
		teamsPaginator.updatePage(teamsPaginator.currentPage + 1);
	});
	
	document.getElementById('firstPage').addEventListener('click', () => {
		filesPaginator.updatePage(1);
		usersPaginator.updatePage(1);
		postsPaginator.updatePage(1);
		teamsPaginator.updatePage(1);
	});
	
	document.getElementById('nextPage').addEventListener('click', () => {
		filesPaginator.updatePage(filesPaginator.currentPage.totalPages);
		usersPaginator.updatePage(usersPaginator.currentPage.totalPages);
		postsPaginator.updatePage(postsPaginator.currentPage.totalPages);
		teamsPaginator.updatePage(teamsPaginator.currentPage.totalPages);
	});
});
