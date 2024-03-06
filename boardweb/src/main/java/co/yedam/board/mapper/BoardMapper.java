package co.yedam.board.mapper;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.board.Book;
import co.yedam.common.SearchVO;

public interface BoardMapper {

	List<Board> boardList(SearchVO search); 
	int getTotalCnt(SearchVO search); 
	
	// 상세화면에 사용될 데이터.
	Board selectBoard(int bno);
	
	// 조회수 증가. //무조건 처리된 건수가 반환됨. 다른값을 반환할 수 없다. int로 
	int updateCount(int bno);
	
	// 글 내용 수정.
	int updateBoard(Board board); //보드를 넘겨주면 보드의 필드값이 파라미터로 쓰여진다. 처리된 건수니까 int
	
	// 삭제
	int deleteBoard(int bno); 
	
	//글 등록
	int insertBoard(Board board); 
	
	
	// 도서목록
	List<Book> bookList();
	
	// 도서 등록
	int insertBook(Book book);
	
	// 도서 삭제
	int deleteBook(String bcode);
	
}
