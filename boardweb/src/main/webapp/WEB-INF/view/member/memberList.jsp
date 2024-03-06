<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
    

<h3> 회원목록 </h3>
  <table class = "table">
   <form action = "memberList.do"  method="get">
    <tr>
       <th>회원아이디</th>
       <th>회원이름</th>
       <th>권한</th>
       <th>이미지</th>
    </tr>
    <c:forEach var="member" items="${list }">    
    <tr>
       <td>${member.id  }</td>
       <td>${member.name }</td>
       <td>${member.auth } </td>
       <td>${member.image }</td>
    </tr>
    </c:forEach>

  </table>

