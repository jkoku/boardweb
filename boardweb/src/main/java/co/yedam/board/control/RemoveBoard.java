package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class RemoveBoard implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String bno = req.getParameter("bno"); 
		
	
		// mapper=> int deleteBoard(int)
		// service=. boolean removeBoard(int)
		// 정상삭제되면 목록이동, error 페이지로 이동
		BoardService svc = new BoardServiceImpl();		
		
		if(svc.removeBoard(Integer.parseInt(bno))) {
					resp.sendRedirect("boardList.do"); // "boardList.do 페이지가 실행,  sendRedirect를쓰고 포워딩을 쓰지않은이유 파라미터의 값을 넘겨줄수있는데 sendRedirect는 값을 넘겨줄수없고 단순히 페이지를 넘긴다. 전체페이지 넘길때는 값넘길필요없으니까 
				} else {
					req.setAttribute("message", "삭제 중 에러가 발생했습니다.");
					String path = "board/errors.tiles";
					req.getRequestDispatcher(path).forward(req, resp);
				}

	}

}
