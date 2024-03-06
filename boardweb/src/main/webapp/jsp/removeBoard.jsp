<%@page import="co.yedam.board.BoardDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> <!-- 정보들, 지시코드들 안에넣는다. 꺽쇄 퍼센트 안의 영역은 자바코드가능 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 <h3>게시글 삭제기능.</h3>
 <!-- jsp/removeBoard.jsp -->

  <%
   //자바영역. 자바코드 사용  
	BoardDAO dao = new BoardDAO(); // import 는 ctrl+space로 넣어줄 수 있다.
  	String bno = request.getParameter("bno");
	//request는 jsp에서 쓰이는 내장객체
	if (dao.deleteBoard(Integer.parseInt(bno))) {
  %>		
	 <p>삭제되었습니다.</p>
  <% 
	} else {
  %>  
 
  <p> 처리중 에러.</p>
  <%		
	}
  %>
  	
</body>
</html>