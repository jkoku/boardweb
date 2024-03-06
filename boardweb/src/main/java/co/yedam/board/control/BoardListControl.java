package co.yedam.board.control;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;
import co.yedam.common.Control;
import co.yedam.common.PageDTO;
import co.yedam.common.SearchVO;

public class BoardListControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String page = req.getParameter("page");
		page = page == null ? "1" : page; // 값을 안넣어주면 기본적으로 1페이지  
		
		String searchCond = req.getParameter("searchCondition");
		String keyword = req.getParameter("keyword");
		
		//검색조건.
		SearchVO search = new SearchVO(); // vo value object 하나의데이터를 가지고와서 담는..  
		search.setPage(Integer.parseInt(page));
		search.setSearchCondition(searchCond);
		search.setKeyword(keyword);

		BoardService svc = new BoardServiceImpl();
		List<Board> list = svc.boardList(search);
		
		PageDTO pageDTO = new PageDTO(Integer.parseInt(page), svc.boardTotalCnt(search));
		
		// boardList.do 페이지에서 boardList.jsp 로 데이터 전달.
		req.setAttribute("list", list); // "list"내가 정한이름 , list 참조변수값 을 attribute에 담아줌. getattribute로 값을 읽어올수있다.
		req.setAttribute("page", pageDTO);
		req.setAttribute("searchCondition", searchCond);
		req.setAttribute("keyword", keyword);
		String path = "board/boardList.tiles";
		req.getRequestDispatcher(path).forward(req, resp); //페이지 재지정.
	}
}
