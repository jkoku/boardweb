package co.yedam.common;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ResumeForm implements Control{

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException,IOException {
	
	String path = "WEB-INF/resume.html";
	req.getRequestDispatcher(path).forward(req, resp);	
	}
}