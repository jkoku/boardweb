/**
 *boardService 
 */

// .pagination>a click 이벤트.
let page = 1; 

function pagingFunc() {
 document.querySelectorAll('.pagination>a') //NodeList.    paginatino하위의 a태그 모두
	.forEach(item => { //여기서 item 은 a태그 반복문
	 	console.log(item);
	 	item.addEventListener('click', function(e) { // 클릭이벤트 등록
			e.preventDefault(); //링크의 기능을 차단.
		   // page =item.innerText; // page로 사용. 
			page = item.dataset.pno; 	//page로 사용. 각 페이지마다 데이터 5건씩 만들어오는 기능  = item.getAttribute()
			replyList(page); // 링크를 클릭할때마다 목록을 새롭게 그리고
			pageList(); // 페이지목록을 새롭게 그리고.
			})
		
			/*const rlistHtp = new XMLHttpRequest(); //댓글목록 })
			rlistHtp.open('get', 'replyList.do?bno='+bno+'&page='+page);
			rlistHtp.send();
			rlistHtp.onload = function(e) {
			let result = JSON.parse(rlistHtp.responseText);
			console.log(result);
			}*/
})
}

//등록이벤트.
document.querySelector('.addReply').addEventListener('click', addReplyFnc);
async function addReplyFnc(e) {
	let reply = document.querySelector('input[name="reply"]').value;
	if(!reply) {
		alert('댓글입력하세요');
		return; //여기서 멈춤 . 아래쪽으로 진행되지않음. 
	}
	if(!replyer) {
		alert('로그인하세요');
		return;
	}
	
	// ajax 호출.
	try{
	let resolve = await fetch('addReply.do', {
		method: 'post',
		headers : {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body :'bno='+ bno +'&reply='+ reply + '&replyer=' + replyer
	});
	
	let result = await resolve.json();
	 if (result.retCode =='OK'){
		 alert('등록성공')
		 document.querySelector('#reply').value ='';
		 resolve = await fetch('getTotal.do?bno='+ bno)
		 result = await resolve.json();
		 page = Math.ceil(result.totalCount/5);
		 replyList(page);
		 pageList();
	 	} else {
			 alert('처리실패')
	 	}
	 } catch(err) {
		 console.log(err);
	 } // end of ajax호출
}

 // 댓글 목록 출력
 function makeRow(obj = {}) { //object 타입으로 값을 받아오도록
	let fields = ['replyNo', 'reply', 'replyer']; // 반복문쓰려고 배열형태로  obj.replyNo obj.reply obj.replyer obj.replyDate
 	let liTag = document.createElement('li'); //ul li span
 	liTag.setAttribute('data-rno', obj.replyNo); 
	fields.forEach(prop => { // 매개값이 정해져있다 . prop
		let span = document.createElement('span'); //span
		span.innerText = obj[prop]; 
		liTag.appendChild(span);
		if (prop =='reply') {
			span.className = 'col-sm-6';
		} else {
	 		span.className ='col-sm-2';
		}
	}); 
	//삭제버튼. 은 추가적인 기능이니까 필드밖에다가 생성
		let span = document.createElement('span');
		span.className = 'col-sm-2' ;
		let btn = document.createElement('button');
		btn.addEventListener('click', deleteRow) //ajax 호출하도록 이벤트 등록 
		btn.innerText = '삭제'; // 버튼의 라벨은 삭제
		span.appendChild(btn);
		liTag.appendChild(span);
	
 	return liTag; // 만들어진 li요소 반환.
 }
 
 // makeRow2
 function makeRow2(obj ={}) {
	 let clon = document.querySelector('.content>ul>li:nth-of-type(1)') // 대상을 가져와서 clon node 라는 함수 사용
 		.cloneNode(true); 
 		clon.setAttribute('data-rno', obj.replyNo); 
 		console.log(clon);			
 		clon.querySelector('span:nth-of-type(1)').innerText = obj.replyNo; // li span요소 첫번째 값의 이너텍스트에 obj의 리플라이넘버
 		clon.querySelector('span:nth-of-type(2)').innerText = obj.reply;
 		clon.querySelector('span:nth-of-type(3)').innerText = obj.replyer; 
 		// 삭제버튼
 		let btn = document.createElement('button');
		btn.addEventListener('click', deleteRow) //ajax 호출하도록 이벤트 등록 
		btn.innerText = '삭제'; // 버튼의 라벨은 삭제
		clon.querySelector('span:nth-of-type(4)').innerText='';
		clon.querySelector('span:nth-of-type(4)').appendChild(btn); 
 		return clon;
 }
 

 // 삭제함수. 한건삭제
 function deleteRow(e) {
	let rno = this.parentElement.parentElement.dataset.rno; //this는 버튼
	//                                       /여기까지가 litag
	let li = this.parentElement.parentElement;
	
	// 작성자와 로그인 비교
	console.dir(this.parentElement);
	let writer = this.parentElement.previousElementSibling.innerText; // this 지금 span태금의 previousElementSibling 앞에 있는 span태그 의 innerText
	if(replyer != writer ) {
		alert('삭제권한이 없습니다.')	
		return;
	}
	fetch('removeReply.do', {
	  method: 'post',
	  headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body:   'rno=' + rno
	})
	.then(resolve => resolve.json())
	.then(result => {
		if(result.retCode == 'OK'){
			alert('result.retMsg')
			replyList(page);
			pageList();
		} else {
			alert('result.retMsg')
		}
	})
	.catch(err => console.log(err));
 }
 
 
 // 목록함수  
  function replyList(rpage = 1) { // 댓글에 대한 페이징 
	fetch('replyList.do?bno=' + bno + '&page=' +rpage)
 	  .then(resolve => resolve.json())
 	  .then(function(result){
		 //기존목록 삭제.
 		document.querySelectorAll('li[data-rno]').forEach(item => item.remove());
 	   //목록.
	  	result.forEach(item => {
	  	document.querySelector('.reply ul').appendChild(makeRow2(item));
		})
	  //목록이 없을 경우
	    if(!data.length && page > 1){
			page--;
			replyList(page);
			pageList();
		} 
	   })
	   .catch(err => console.log(err));
	 }
replyList(); //호출(실행)
//pageList();
/* // 목록함수
function replyList() {
const xhtp = new XMLHttpRequest();
xhtp.open('get', '[replyList.do?bno=](http://replylist.do/?bno=)' + bno);
xhtp.send();
xhtp.onload = function(e) {
console.log(xhtp.responseText); // .responseText 처리된결과값을 담아오는 속성
const data = JSON.parse(xhtp.responseText); // xhtp.responseText json형태 파싱
   //목록.
  	data.forEach(item => {
  	document.querySelector('.reply ul').appendChild(makeRow2(item));
	})
 }
}
replyList(); // 호출 (실행)*/


// 페이징 목록.
function pageList() {
	//ajax 호출.
  fetch('getTotal.do?bno=' + bno)
  	.then(resolve => resolve.json())
  	.then(createPageElement)
	.catch(err => console.log(err)
	)};  
	
		function createPageElement(result) {
		// 기존 페이지 삭제. 
		document.querySelector('div.pagination').innerHTML='';
		
		let totalCnt = result.totalCount;
		let startPage, endPage; // 1~5, 6~10
		let next, prev;
		let realEnd = Math.ceil(totalCnt / 5)
		endPage = Math.ceil(page/5) * 5 ; 
		startPage = endPage - 4;
		
		endPage = endPage > realEnd ? realEnd : endPage;
		next = endPage < realEnd ? true : false;
		prev = startPage > 1;
		
		if(prev) {
			let aTag = document.createElement('a');
			//aTag.innerText = startPage - 1;
			aTag.innerHTML = '&laquo;'; //
			aTag.setAttribute("data-pno",  startPage - 1); //data- 데이터 다시  data- 값을담아놓고있는컬렉션관리  startPage - 1 이전페이지
			aTag.href ='#';
			document.querySelector('div.pagination').appendChild(aTag);
		}
		for(let p = startPage; p <= endPage; p++) {
			let aTag = document.createElement('a');
			aTag.innerText = p;
			aTag.setAttribute("data-pno", p);
			aTag.href ='#';
			if (p == page) {
			  aTag.className = 'active'; 
			 }
			document.querySelector('div.pagination').appendChild(aTag);
		}
		if(next) {
			let aTag = document.createElement('a');
			aTag.innerHTML = '&raquo;'; //
			aTag.setAttribute("data-pno",  endPage + 1); //  endPage + 1 
			aTag.href ='#';
			document.querySelector('div.pagination').appendChild(aTag);
		}
		pagingFunc();
	   }

pageList();
