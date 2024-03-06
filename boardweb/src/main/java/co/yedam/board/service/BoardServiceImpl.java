package co.yedam.board.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.yedam.board.Board;
import co.yedam.board.Book;
import co.yedam.board.mapper.BoardMapper;
import co.yedam.common.DataSource;
import co.yedam.common.SearchVO;

// 업무로직을 담고있는 프로세스 처리해주는 기능.
// 데이터처리는 mapper에 기능 구현해둠. 
// BoardService 인터페이스 구현 클래스
public class BoardServiceImpl implements BoardService{

	//마이바티스 활용하여 쿼리. 
	SqlSession session = DataSource.getInstance().openSession(true); //기본값을 false / openSession()을true로 하면 자동커밋
	//DataSource.getInstance() sql session factory를 반환해주는 메소드
	
	BoardMapper mapper = session.getMapper(BoardMapper.class); // 변수 mapper = 인스턴스생성. 
	// BoardMapper.class boardmapper의 정보를 읽어온다. 객체를 만들어준다. 보드매퍼 인스턴스 생성.
	// session.getMapper(BoardMapper.class) 을 boardmapper.xml 로 생각하면.. 


	@Override
	public List<Board> boardList(SearchVO search) {
		System.out.println(search);
		return mapper.boardList(search);
	}
	
	@Override
	public int boardTotalCnt(SearchVO search) {
		return mapper.getTotalCnt(search);
	}	

	@Override
	//조회할때마다 카운트증가 /조회결과 가져옴
	public Board getBoard(int bno) {
		mapper.updateCount(bno); //조회할때마다 카운트증가 ==
		return mapper.selectBoard(bno); //xml안의 id가 selectbo~  
	}

	@Override
	public boolean modifyBoard(Board board) {
		return mapper.updateBoard(board) == 1 ;
	}

	@Override
	public boolean removeBoard(int bno) {
		// TODO Auto-generated method stub
		return mapper.deleteBoard(bno) == 1 ;

	}

	@Override
	public boolean addBoard(Board board) {
		// TODO Auto-generated method stub
		return mapper.insertBoard(board) == 1 ;
	}

	@Override
	public List<Book> bookList() {
		return mapper.bookList();
	}

	@Override
	public boolean addBook(Book book) {
		// TODO Auto-generated method stub
		return mapper.insertBook(book) == 1;
	}

	@Override
	public boolean removeBook(String bcode) {
		// TODO Auto-generated method stub
	return mapper.deleteBook(bcode) == 1;
	}
}
