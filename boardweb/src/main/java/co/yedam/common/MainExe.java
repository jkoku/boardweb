package co.yedam.common;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.board.service.BoardService;
import co.yedam.board.service.BoardServiceImpl;

public class MainExe {
	public static void main(String[] args) {
		
		SearchVO search = new SearchVO();
		search.setPage(2);
		search.setSearchCondition("T");
		search.setKeyword("example");
		
		BoardService svc = new BoardServiceImpl();
		List<Board> list =svc.boardList(search);
		
		for(Board board : list) {
			System.out.println(board.toString());
		}
	}
}


//public class MainExe {
//	public static void main(String[] args) {
//		SqlSessionFactory factory = DataSource.getInstance();
//		SqlSession session = factory.openSession();
//		
////		List<Board> list = session.selectList("co.yedam.board.mapper.BoardMapper.boardList");
//		
//		BoardMapper mapper = session.getMapper(BoardMapper.class);
//		List<Board> list = mapper.boardList(); //mapper파일의 기능 
//		for(Board board : list) {
//			System.out.println(board.toString());
//		}
//	
//	}
//}
