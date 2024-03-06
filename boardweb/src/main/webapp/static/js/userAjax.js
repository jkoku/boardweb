/**
 * userAjax.js
 */
console.log('userAjax.js')

document.addEventListener('DOMContentLoaded', function(e) {
	// 등록 이벤트(click)
	document.getElementById('addBtn').addEventListener('click', function(e) { // id값이 addBtn 을 찾고 이벤트등록
		// 서블릿호출(서블릿도 실행하고)서버에 데이터 전송도 하고(입력값을 서버에 전달)), 화면제어(정상적을 되었으면 화면도)
		let bookCode = document.getElementById('bcode').value;
		let bname = document.getElementById('bname').value;
		let author = document.getElementById('bauthor').value;
		let press = document.getElementById('bpress').value;
		let price = document.getElementById('bprice').value;
		let obj = { bcode, bname, author, press, price }


		const addAjax = new XMLHttpRequest();
		addAjax.open('post', 'addBook.do'); // 입력 post
		addAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // post타입으로 데이터를 보낼때는 컨텐트타입으로 지정해주어야한다.
		addAjax.send('bcode=' + bookCode + '&bname=' + bname + '&bauthor=' + author + '&bpress=' + press + '&bprice=' + price) // key+ value
		addAjax.onload = function(e) {
			let result = JSON.parse(addAjax.responseText)
			console.log(result) // {retCode:"OK"}
			if (result.retCode == 'OK') {
				document.querySelector('#show tbody').appendChild(makeRow(obj));
			} else if (result.retCode == 'NG') {
				alert('처리중 에러')
			}
		}
	}) // end of add.


	// Asynchronous JAvaScript and XML  비동기방식으로 서버에 데이터를 처리해주는 방식을 Ajax라고 한다. XML은 태그 태그로 데이터를 처리
	let json = "";
	const xhtp = new XMLHttpRequest() // 새 객체 생성.  비동기방식 XMLHttpRequest객체는 처리방식이 다르다. 특정 코드가 끝날때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것을
	xhtp.open('get', 'bookList.do'); // get방식, 요청하는 url 읽어들일 페이지지정하는 메소드 는 open
	xhtp.send();// 페이지 요청 처리결과 받아옴
	xhtp.onload = function(e) { //on~ 이벤트 관련메소드.  load 이벤트가 발생하면 이 함수를 실행 이벤트값이 매개값으로 넘어감.
		json = JSON.parse(xhtp.responseText)
		console.log('onload', json);	// responseText서버에서 읽어들인 값을 그대로 보여줌

		// 타이틀.
		let title = json[0];
		let tr = document.createElement('tr');
		for (let prop in title) {
			console.log(title);
			let th = document.createElement('th');
			th.innerText = prop;
			tr.appendChild(th);
		}
		let th = document.createElement('th');
		th.innerText = '삭제';
		tr.appendChild(th);
		document.querySelector('#tableList thead').appendChild(tr);

		// 데이터.
		json.reduce((acc, item) => {
			acc.appendChild(makeRow(item));
			return acc;
		}, document.querySelector('#show tbody')); // 초기값으로 쓰여짐 acc

	} // end of onload.
	console.log('out', json);

}); // end of DOMContentLoaded

// 한건생성.
function makeRow(obj = {}) {
	let tr = document.createElement('tr');
	tr.setAttribute('id', 'book_' + obj.bookCode);
	tr.setAttribute('data-code', obj.bookCode);
	for (let prop in obj) {
		let td = document.createElement('td');
		td.innerText = obj[prop];
		tr.appendChild(td);
	}

	// 삭제버튼.
	let btn = document.createElement('button');
	btn.addEventListener('click', deleteRow, true); //이벤트등록. 매개값이 두개 이벤트유형과 이벤트핸들러  deleteRow()으로 넣으면 무조건 실행되어서 deleteRow로 넣는다.
	btn.innerText = '삭제';
	let td = document.createElement('td');
	td.appendChild(btn);
	tr.appendChild(td);

	return tr;
}// end of makeRow

// 삭제함수.
function deleteRow(e) {
	let tr = this.parentElement.parentElement;	 // this 는 이벤트받는 대상
	let bcode = tr.dataset.code;
	
	const removeAjax = new XMLHttpRequest();
	removeAjax.open('post', 'removeBook.do'); // 입력 post
	removeAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // post타입으로 데이터를 보낼때는 컨텐트타입으로 지정해주어야한다.
	removeAjax.send('bcode=' + bcode) // key+ value
	removeAjax.onload = function(e) {
		let result = JSON.parse(removeAjax.responseText)
		console.log(result) // {retCode:"OK"}
		if (result.retCode == 'OK') {
			tr.remove()
		} else if (result.retCode == 'NG') {
			alert('처리중 에러')
		}
	}

}
