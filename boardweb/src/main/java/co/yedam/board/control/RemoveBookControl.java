package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class RemoveBookControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String bcode = req.getParameter("bcode");
		
		BoardService svc = new BoardServiceImpl();
	
		if(svc.removeBook(bcode)) {
			 resp.getWriter().print("{\"retCode\": \"OK\"} ");
		} else {
			resp.getWriter().print("{\"retCode\": \"NG\"} ");
		}
	}

}
