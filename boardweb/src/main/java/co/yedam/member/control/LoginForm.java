package co.yedam.member.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.common.Control;

public class LoginForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		// 로그인 화면 이동. 
		String path = "board/loginForm.tiles"; // web-inf/view/loginForm.jsp를 열어주는데 tiles가 적용된 jsp를 열어주는 url
		req.getRequestDispatcher(path).forward(req, resp);
		
	}
}
