/*
script.js
*/


console.log("script.js")
console.log(document);
/*버튼을 찾아오는데 클래스btn인 button을 찾아옴  //버튼에 클릭이벤트가 발생하면 clickFnc를 실행 //이벤트를 매개값으로 받는다. e는 변수 이벤트핸들러*/
document.querySelector('button.btn').addEventListener('click', clickFnc);
function clickFnc(ev) {
	console.log(ev);
	let userValue = document.querySelector('input#name').value; /*input태그의 아이디값 name을 기준으로 값으로 해당되는 요소를선택 밸류라는 값이들어가는 속성*/
	let liTag = document.createElement('li');
	liTag.innerText = userValue + ' '; /*li라고 하는 태그의 이너텍스트라는 속성 <li>김민수</li>*/
	document.querySelector('#list').append(liTag);
	// 버튼생성.
	let btn = document.createElement('button');
	btn.innerText = '삭제';
	liTag.appendChild(btn);

	document.querySelector('#list').appendChild(liTag);
	// init. 초기화
	document.querySelector('#name').value = '';
}

// addRow 
document.querySelector('#addBtn').addEventListener('click', addRow);
function addRow() {
	let sno, sname, score; // 아이디값 지정.
	sno = document.querySelector('#sno').value;
	sname = document.querySelector('#sname').value;
	score = document.querySelector('#score').value;
	if (!sno || !sname || !score) {// 자바스크립트에서 null 공백 은 false
		alert('빈값을 채워주세요')
		return; // 함수종료 
	}
	let obj = { sno, sname, score } //속성과 값이 같으면 하나로 사용가능하다. sno: sno, sname: sname, score: score
	let tr = makeRow(obj); // 매개값활용한 tr
	document.querySelector('#studList').appendChild(tr);

	doucument.querySelectorAll('#stdTable input')
		.forEach(function(item, idx, ary) {
			item.value = '';
			// 하위 인풋태그 모두 가져와서
		});
}

function makeRow(student = { sno: 1, sname: 'test', score: 90 }) { //데이터 한 건알려주는 기능.
	let tr = document.createElement('tr');
	//tr에 클릭이라는 이벤트걸기
	tr.addEventListener('click', dispalyRow) // 	tr.('click',dispalyRow , true) 
	for (let prop in student) {
		let td = document.createElement('td');
		td.innerText = student[prop];
		tr.appendChild(td);
	}
//삭제 버튼 추가.
	let btn = document.createElement('button');
	btn.addEventListener('click', deleteRow); //이벤트등록. 매개값이 두개 이벤트유형과 이벤트핸들러  deleteRow()으로 넣으면 무조건 실행되어서 deleteRow로 넣는다.
	btn.innerText = '삭제';
	let td = document.createElement('td');
	td.appendChild(btn);
	tr.appendChild(td);
	return tr;

}

// 삭제.
function deleteRow(e) { // 클릭이라는 이벤트가 발생해야 함수실행.
	e.stopPropagation(); // 하 -> 상 이벤트 처리 차단. 더 이상 상위요소에는 기능 실행하지 않겠습니다.
	console.log(e.target)
	e.target.parentElement.parentElement.remove();
}
// 상세. 
function dispalyRow(e) {
	//e.stopPropagation();
	//	console.log(e.target, this) //this를 기준으로 값을 여기서는 this가 tr
	//console.log(this.children[0].innerText) //첫번째td 의 텍스트

	document.querySelector('#sno').value = this.children[0].innerText
	//name
	document.querySelector('#sname').value = this.children[1].innerText
	//score
	document.querySelector('#score').value = this.children[2].innerText
}

// 수정.
// 수정버튼에 클릭이벤트 등록수정누르면 101값과 같은 tr을 찾아서(대상이되는 tr을 쿼리셀렉올을 해준다. 
// tr기준으로 1,2,3데이터를 가져오기. 돌면서 tr의 첫번째값의 innerText 가 같을경우 tr의 첫뻔재 경우 
document.querySelector('#editBtn').addEventListener('click', editRow);
function editRow(e) {
	let list = document.querySelectorAll('#studList tr');
	for (let std of list) {//i=0;i<list.length; i++
		if (std.children[0].innerText == document.querySelector('#sno').value) {
			std.children[2].innerText = document.querySelector('#score').value;
			std.children[1].innerText = document.querySelector('#sname').value; //value는 input select
		}
	}
}

// str에 값을 활용해서 화면 출력.
function makeTr() {
	for (let student of str) { 	// for of 반복문사용. 
		console.log(student);
		// tr생성.
		let tr = makeRow(student); // 아래 주석과 동일
		/* let tr = document.createElement('tr');
		   
		   for (let s in student) { // {sno: 101, sname:"김학생", score: 80},
			  // td*3 생성
			  let td = document.createElement('td'); // 값 하나하나
			  td.innerText = student[s]; //  for (let s in student) s 텍스트 
			  tr.appendChild(td);
			}*/


		// tr을 tbody.appendChild
		document.querySelector('#studList').appendChild(tr);
	}
}
makeTr();






