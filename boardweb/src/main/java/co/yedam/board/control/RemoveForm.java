package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class RemoveForm implements Control {
	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String bno = req.getParameter("bno");
		
		BoardService svc = new BoardServiceImpl();
		Board board = svc.getBoard(Integer.parseInt(bno));
		
		req.setAttribute("board", board);
		
		String path = "board/deleteForm.tiles";
	
		req.getRequestDispatcher(path).forward(req,resp);
		
		// WEB-INF/view/deleteForm.jsp 
		
	}
}
