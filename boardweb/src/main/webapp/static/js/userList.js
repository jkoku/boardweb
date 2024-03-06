/**
 * userList.js
 */

console.log('userList.js')

let str = `[{"id":1,"first_name":"Nickie","last_name":"Adcock","email":"nadcock0@epa.gov","gender":"Female","salary":3530},
{"id":2,"first_name":"Wilbert","last_name":"Babin","email":"wbabin1@twitpic.com","gender":"Male","salary":3063},
{"id":3,"first_name":"Selinda","last_name":"Rodrigo","email":"srodrigo2@telegraph.co.uk","gender":"Female","salary":2903},
{"id":4,"first_name":"Mab","last_name":"Bott","email":"mbott3@ebay.co.uk","gender":"Female","salary":4803},
{"id":5,"first_name":"Waldon","last_name":"Strike","email":"wstrike4@cdc.gov","gender":"Male","salary":2448},
{"id":6,"first_name":"Mel","last_name":"Normington","email":"mnormington5@flavors.me","gender":"Female","salary":3943},
{"id":7,"first_name":"Curr","last_name":"True","email":"ctrue6@jugem.jp","gender":"Male","salary":3570},
{"id":8,"first_name":"Chrissie","last_name":"Gapp","email":"cgapp7@businesswire.com","gender":"Male","salary":3457},
{"id":9,"first_name":"Nate","last_name":"Duchasteau","email":"nduchasteau8@webmd.com","gender":"Male","salary":3196},
{"id":10,"first_name":"Ole","last_name":"Benbow","email":"obenbow9@eepurl.com","gender":"Male","salary":3947},
{"id":11,"first_name":"Valma","last_name":"Chetwin","email":"vchetwina@facebook.com","gender":"Female","salary":2447},
{"id":12,"first_name":"Benni","last_name":"Lowder","email":"blowderb@mozilla.com","gender":"Female","salary":3788},
{"id":13,"first_name":"Jerrold","last_name":"Chishull","email":"jchishullc@list-manage.com","gender":"Male","salary":2327},
{"id":14,"first_name":"David","last_name":"Pratty","email":"dprattyd@tmall.com","gender":"Male","salary":3422},
{"id":15,"first_name":"Lesly","last_name":"Wiz","email":"lwize@cmu.edu","gender":"Female","salary":3017}]` 

// json 문자열을 자바스크립트 오브젝트타입 객체 타입으로 바꿔주는 함수

let json = JSON.parse(str); // 문자열 -> object 로 전환하는 기능. 출력해보면 배열. 
console.log(json);

document.addEventListener('DOMContentLoaded', function(e) {
document.querySelector('#name').value='홍길동';
 
 // thead 생성.
 let title = json[0];
 let tr =  document.createElement('tr');
 for (let prop in title) {
 	console.log(title);
	 let th = document.createElement('th');
	 th.innerText = prop;	
	 tr.appendChild(th); 
 }
document.querySelector('#tableList thead').appendChild(tr);
 
 //tbody 영역
  json.forEach(function(item, idx) { // 배열에는 forEach 사용가능
 	console.log(item, idx); // item => {}
	if (idx < 10 ) { // 최초에는 10건만 출력하기.
	let tr = makeRow(item);
	document.querySelector('#tableList tbody').appendChild(tr);
		}
   }); 
		
 //  change 이벤트 처리.
 document.querySelector('#genderList')
 .addEventListener('change', function(e){
	//showList(this.value);
	filterList(this.value);
	reduceList(this.value); 
 }); 
 
});// end of DOMContentonLoaded


 // 한건생성.
 function makeRow(obj = {}) {
	 let tr = document.createElement('tr');
	 for (let prop in obj) {
		let td = document.createElement('td');
		td.innerText = obj[prop];
		tr.appendChild(td);
	 }
 	return tr;
 }
 
  //
/* json.forEach(function(item, idx) {
   console.log(item, idx) // item 하나가 데이터 한건  item=>{}
 	if(item.gender =='Female') {
 	let tr = document.createElement('tr');
	for(let prop in item) {
	let td = document.createElement('td');
	 td.innerText = item[prop];
	 tr.appendChild(td);
	}
 	document.querySelector('#tableList thead').appendChild(tr); 
	} 
  });*/
  

// 성별에 따른 목록출력.
function showList(gender = 'Male') { //초기값.
	
	// 조회목록 초기화
	document.querySelector('tbody').innerHTML ='';
	
	json.forEach(function(item) {
		if (item.gender == gender || gender == 'All') {
		document.querySelector('tbody').appendChild(makeRow(item))
		}	
	})
}


 //tbody 영역
/* json.forEach(function(item, idx) {
   console.log(item, idx) // item 하나가 데이터 한건  item=>{}
 	let tr = document.createElement('tr');
	for(let prop in item) {
	let td = document.createElement('td');
	 td.innerText = item[prop];
	 tr.appendChild(td);
	}
 	document.querySelector('#tableList thead').appendChild(tr); 
  });*/
 