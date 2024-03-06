package co.yedam.board.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;

public class BoardControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String bno = req.getParameter("bno");//bno라는 파라미터의 값을받아와서 리퀘스트에 문자타입string으로 넘겨줌. int타입으로 받으려면 형변환. 
		// board_no 하나를 파라미터로 받아와서 한 건에대한 정보를 board.jsp에 데이터를 넘겨줌.
		//board.do에서 board.jsp에
		//req에는 정보가있따. 
		BoardService svc = new BoardServiceImpl();
		//board는 참조변수 객체값들은 모두 참조변수..?
		Board board = svc.getBoard(Integer.parseInt(bno)); 
		
		req.setAttribute("board", board); // board라는 값이 반환.
		
		String path = "board/board.tiles"; //jsp에다가 위의 board를 전달.
		req.getRequestDispatcher(path).forward(req, resp); //포워딩을 board.jsp페이지로 재지정하도록 하겠다. 요청정보와 응답정보를 같이 전달하겠다는 의미. req.resp을 파라미터로 넘긴다.
		
	}

}
