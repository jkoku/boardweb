/**
 * 
 */
console.log('center.js')

let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=fZuXw1FsJq%2BFEk2ITOBrgoKf%2Be7lpJLdNObFRPAK12QVhxUcRd2kL%2BQhrQCyCrLOC%2Br8wbYjSbQckwNE7zxKLQ%3D%3D'

let showFields = ['id', 'centerName', 'phoneNumber','sido'];
let tbody = document.querySelector('#list');
let searchSido = document.querySelector('#searchSido');
let centerList = [];
let filterAry = []; // 시도정보만 담기위한 배열

/*fetch(url)
  .then(resolve => resolve.json())
  .then(result=>{
 	 console.log(result);
	 result.data.forEach(center => {
	   let tr = document.createElement('tr');
	   showFields.forEach(field => { 
		   let td = document.createElement('td');
		   if (field == 'centerName') {
			   td.innerText = center[field].substring('코로나19'.length);
		   } else {
			   td.innerText = center[field]
		   }
		   tr.append(td);
	   })
	   tbody.append(tr);
	 })
})
.catch(err => console.log(err));*/

// 데이터한건으로 tr 생성.
function makeRow(center = {}) {
	let tr = document.createElement('tr');
	tr.addEventListener('click', function(e){
		//window.location.href ='map.jsp?lat='+center.lat+'&lng='+center.lng; // tr을 클릭하면 이 url /window.쓰지않아도됨
		 
		 window.open('map.jsp?lat='+center.lat+'&lng='+ center.lng+ '&name=' + center.centerName);
	})
	// 보여줄 항목 지정.
 	showFields.forEach(field => { 
		   let td = document.createElement('td');
		   if (field == 'centerName') {
			   td.innerText = center[field].substring('코로나19'.length);
		   } else {
			   td.innerText = center[field]
		   }
		   tr.append(td);
	   })
	   return(tr)
}

// 전체목록 보여주기.
fetch(url)
  .then(resolve => resolve.json())
  .then(result => {
	  centerList = result.data;
	  console.log(centerList);
	  console.log()
	  result.data.forEach(center => { 
		  tbody.append(makeRow(center)) // 배열에 담아오기 위한 변수
  		if(filterAry.indexOf(center.sido) == -1) { 
			 filterAry.push(center.sido); // 동일한 값이 없으면 추가.
		  }
	  }) // 화면에 전체데이터 출력.
  	// 시도 정보만 담고 있는 배열을 활용해서 option 생성하기. 
   // 화면에 전체 데이터 출력
    console.log(filterAry);
    filterAry.forEach(sido => {
	 let opt = document.createElement('option')
	 opt.innerText = sido;
	 searchSido.append(opt);
 })
 //change 발생하면 새로운 목록을 출력하도록 한다.  
  })
 .catch(err => console.log(err));  
  
  
// 조회버튼 클릭시 입력값(keyword)과 비교해서 동일한 시도정보만 출력한다.
document.querySelector('#searchBtn').addEventListener('click', function(e){
	tbody.innerHTML = '';
	let kw = document.querySelector('#keyword').value;
	centerList.filter(center => center.sido.indexOf(kw) > 0)  // 시도 값이 같은 배열. filter():특정조건 만족하는 요소추출
      .forEach(center =>  tbody.append(makeRow(center)));
}) 

/*document.querySelector('keyword').addEventListener('keyup', function(e){
	tbody.innerHTML = ''; 'click'에 'change' 'keyup'
	let kw = document.querySelector('#keyword').value;
	centerList.filter(center => center.sido.indexOf(kw) == 0)  // 시도 값이 같은 배열. filter():특정조건 만족하는 요소추출
      .forEach(center =>  tbody.append(makeRow(center)));
})*/ 

//includes
//centerList.includes(keyword)
  
// 시도목록이 변경이 되면 동일한 시도 정보만 출력.
document.querySelector('#searchSido').addEventListener('change', function(e){
	let kw = this.value; // document.querySelector('#searchSido').value;
	tbody.innerHTML = '';
	centerList.filter(center => center.sido == kw)  // 시도 값이 같은 배열.
      .forEach(center =>  tbody.append(makeRow(center)));
})


// json 전송 db에 입력기능.
document.getElementById('registerData').addEventListener('click', function(e) {
	fetch('../registerCenter.do', {
		method: 'post',
		headers:{
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(centerList)
	})
	.then(resolve => resolve.text())
	.then(result => console.log(result))
	.catch(err => console.log(err))
	
})




