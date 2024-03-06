package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class UpdateForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String bno = req.getParameter("bno"); //bno가져옴 .//화면에서 컨트롤쪽으로 넘겨줌.

		BoardService svc = new BoardServiceImpl();
		Board board = svc.getBoard(Integer.parseInt(bno)); 
		
		
		req.setAttribute("board", board); // board라는 값이 반환. // 컨트롤에서 화면jsp로 넘겨줄때.
		
		String path = "board/updateForm.tiles"; //jsp에다가 위의 updateForm를 전달.
		req.getRequestDispatcher(path).forward(req, resp); //포워딩(재정의)을 updateForm.jsp페이지로 재지정하도록 하겠다. 요청정보와 응답정보를 같이 전달하겠
	}
}
