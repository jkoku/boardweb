package co.yedam.member.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import co.yedam.common.Control;
import co.yedam.member.Member;
import co.yedam.member.service.MemberService;
import co.yedam.member.service.MemberServiceImpl;

public class LoginControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
	
		Member member = new Member();
		member.setId(id);
		member.setPw(pw);
		
		MemberService svc = new MemberServiceImpl();
		member = svc.loginCheck(member);
		
		if(member != null)  {                          // 아이디,비번 => 로그인 정상일 경우 //세션객체에 공유
			 HttpSession session =req.getSession() ;   // 사용자별로 다른 세션값. 
			 session.setAttribute("logid", id); // 세션에 attribute를 활용. "loginid"이름으로 값을 담아둔다  loginid값으로 읽어들였을때 있으면 계속  .사용자별로 만들어지는 세션 값. 로그아웃전까지는 계속 어느페이지든지 공유.
			 session.setAttribute("logName", member.getName());
			 session.setAttribute("auth", member.getAuth());
			 resp.sendRedirect("boardList.do");
		} else {
			req.setAttribute("message", "아이디와 비번을 확인하세요."); //요청정보에 attribute 요청할때마다 새롭게 만들어지는 객체값. 
			String path = "WEB-INF/view/member/loginForm.jsp";
			req.getRequestDispatcher(path).forward(req, resp);
		}	
	}
}
