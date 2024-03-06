/**
 * userService.js
 */


function filterList(gender = 'Male') {
document.querySelector('tbody').innerHTML='';

json //
  .filter(function(item) {
    return item.gender == gender || gender == 'All'; // item.gender와 매개값으로 들어온 gender가 같은ㅈl
  })//
  .forEach(function(item) {
	  document.querySelector('tbody').appendChild(makeRow(item));
  })
  //jAry.forEach()
}

function reduceList(gender = 'Female') {
  let tbody = document.querySelector('tbody') //변수선언	
  tbody.innerHTML=''; // 기존 값 지워줌.
  
  json.reduce((acc, item) => {
	 if(item.gender == gender){
		 let tr = makeRow(item);
		 tbody.appendChild(tr);
	 } 
	 return acc; 
  }, tbody); //tbody를 초기값으로 선언
}


// 이벤트
document.addEventListener('DOMContentLoaded', function(e){
console.clear();
console.log('userService.js');
// forEach() => 반환값은 없음.
	let fAry = json.filter(function(item, idx, ary){
	 	return true; // true 값이 반환되는 것들을 배열에 담아준다. 
	 //return item.salary > 3000 ; // 
	//return idx < 5 ; //0 1 2 3 4 5 idx가 0이면 만족하니까 그 시점에 아이템은 fAry이라는 새로운 배열에다가 차곡차곡 담는다. 
	}); //  filter() = 조건을 만족하는 새로운 배열 생성 A -> B // 필터는 똑같은 배열메소드인데 조건을 만족하는 것들로 생성
	

	// map() A -> A'   반환해주는 데이터를 변경. 해서 새로운 배열을 만들겠다는 의미.
	   	// item{id, fn, ln, email, salary}
	   	// item {id, name, salary}
 	let mAry = fAry.map(item => {      //화살표함수는 간략한 식을 만들 때 사용한다. 
	   	 	   return {id: item.id, 
	   	 			  name: item.first_name + '-' + item.last_name, 
	   	 			  salary: item.salary}
	   	 		});
	console.log(mAry)
	
	// reduce() => 새로운 값을 생성. 
	//json.reduce();
		
	let result = [1,3,2,4,5].reduce((acc, item, idx, ary) => {  
	 console.log(acc, item, idx); // acc 는 누적값 초기값?
	 acc.push(item*2) //
	 return acc;
	}, []); // 초기값 0, 초기값[] 배열로도지정가능. 새로운 
	
	
	
	result = json.reduce((acc, item) => {
	  if(item.gende == 'Male') {
		acc.push(item);
	  }
	  return acc;
	}, []); //초기값 선언. 필터링한 값을 담고싶으면 배열로 선언. reduce에 매개값이 두개이고 ,[] 위치는 초기값이 들어가는 위치이다. []배열이기때문에 push라는 메소드 사용가능.
	
	
	console.log(result);
}); // end of DOMContentLoaded



/*	// map() A -> A'   반환해주는 데이터를 변경. 해서 새로운 배열을 만들겠다는 의미.
 	let mAry = fAry.map((item, idx, ary) => {      //화살표함수는 간략한 식을 만들 때 사용한다. 
	   	// item{id, fn, ln, email, salary}
	   	// item {id, name, salary}
	   	let obj = {id: item.id, 
	   	           name: item.first_name + '-' + item.last_name, 
	   	           salary: item.salary}
	   	return obj; 
	});
	console.log(mAry)*/




