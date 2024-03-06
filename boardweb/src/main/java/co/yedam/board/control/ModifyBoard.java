package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class ModifyBoard implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String bno = req.getParameter("bno");
		String title = req.getParameter("title");
		String content = req.getParameter("content");
		
		Board board  = new Board();
		board.setBoardNo(Integer.parseInt(bno));
		board.setTitle(title);
		board.setContent(content);
	
		// boolean modifyBoard(Board) /잘처리되면 목록으로 이동하고 그렇지않으면 다른페이지로 이동하기위해 리턴되는 불린타입으로 선언.
		 
		BoardService svc = new BoardServiceImpl();
		
		if(svc.modifyBoard(board)) {
			resp.sendRedirect("boardList.do"); // "boardList.do 페이지가 실행,  sendRedirect를쓰고 포워딩을 쓰지않은이유 파라미터의 값을 넘겨줄수있는데 sendRedirect는 값을 넘겨줄수없고 단순히 페이지를 넘긴다. 전체페이지 넘길때는 값넘길필요없으니까 
		} else {
			req.setAttribute("message", "수정 중 에러가 발생했습니다.");
			String path = "board/error.tiles";
			req.getRequestDispatcher(path).forward(req, resp);
		}

	}
}
