<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <label>시도</label><input type="text" name="" id="keyword">
    <button id="searchBtn">조회</button>
    
    <label>시도목록</label>
    <select id="searchSido"></select >
    
    <button id="registerData">데이터생성</button>
    
    <br>
    <div id ="show">
     <table border="1">
        <thead id="title">
            <tr>
                <th>센터id</th>
                <th>센터명</th>
                <th>연락처</th>
                <th>시도</th>
            </tr>    
        </thead>
        <tbody id="list"></tbody>
     </table>
    </div>
   <script src="center.js"></script>
   <script>
     // <select><option>1</option><option>2</option></select>
/*      const origAry = ['1','2','1','2','3']
     //console.log( ['1','2','3']).indexOf('1'));
     let filAry = []
     origAry.forEach(item => {
    	if (filAry.indexOf(item.sido) == -1) { //새로운배열에 있는지 //찾는 문자열이 없으면 -1을 리턴
    		 filAry.push(item.sido);           //없다면 추가
    	}
     })
     console.log(filAry); // 중복된값들이 제거된 새로운 배열
      */
   </script>
</body>
</html>