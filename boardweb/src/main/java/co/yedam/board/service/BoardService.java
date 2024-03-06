package co.yedam.board.service;

import java.util.List;

import co.yedam.board.Board;
import co.yedam.board.Book;
import co.yedam.common.SearchVO;

public interface BoardService {
	
	List<Board> boardList(SearchVO search); 
	int boardTotalCnt(SearchVO search);
	
	// 단건조회.
	Board getBoard(int bno);

	// 글 수정
	boolean modifyBoard(Board board);

	boolean removeBoard(int bno);
	
	//등록
	boolean addBoard(Board board);
	
	//도서관련
	List<Book> bookList();
	boolean addBook(Book book);
	boolean removeBook(String bcode);
}
