package co.yedam.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.yedam.board.control.AddBoard;
import co.yedam.board.control.AddBookControl;
import co.yedam.board.control.AddForm;
import co.yedam.board.control.BoardControl;
import co.yedam.board.control.BoardListControl;
import co.yedam.board.control.BookListControl;
import co.yedam.board.control.ModifyBoard;
import co.yedam.board.control.RemoveBoard;
import co.yedam.board.control.RemoveBookControl;
import co.yedam.board.control.RemoveForm;
import co.yedam.board.control.UpdateForm;
import co.yedam.member.control.AddMemberControl;
import co.yedam.member.control.AddMemberForm;
import co.yedam.member.control.LoginControl;
import co.yedam.member.control.LoginForm;
import co.yedam.member.control.LogoutControl;
import co.yedam.member.control.MemberForm;
import co.yedam.reply.control.AddReplyControl;
import co.yedam.reply.control.RemoveReplyControl;
import co.yedam.reply.control.ReplyListControl;
import co.yedam.reply.control.ReplyTotalCount;

// FrontController은 servlet이어야한다.(extends HttpServlet) 프론트컨트롤에서 쓸수있는 control그래야 service가능하다.
public class FrontController extends HttpServlet {

	//Map타입으로 url과 실행할 클래스 등록.
	Map<String, Control> controls;
	
	public FrontController() {
		controls = new HashMap<>();
	}
	
	// init. // 최초한번실행
	@Override
	public void init(ServletConfig config) throws ServletException {
		System.out.println("init 실행.");
//		controls.put("/b.do", new Bcontrol()); // init은 한번실행되서 삭제되어도 가능.  a.do가 들어오면 acontrol 실행. 
//		controls.put("/resume.do", new ResumeForm());
		controls.put("/main.do", new MainControl());
		// 게시글 목록 이동컨트롤
		controls.put("/boardList.do", new BoardListControl()); // /boardList.do가 키/ new BoardListControl()는 밸류이고 구현클래스이다. 
		                                              //newboardlistcontrol로 서버로부터받아와서 페이지로 넘겨주는
		controls.put("/board.do", new BoardControl());
		controls.put("/updateForm.do", new UpdateForm());// 수정화면으로 이동.
		controls.put("/modifyBoard.do", new ModifyBoard()); // 수정처리 후 목록.
		controls.put("/removeForm.do", new RemoveForm()); // 삭제화면으로 이동.
		controls.put("/removeBoard.do", new RemoveBoard()); // 삭제처리 후 목록.
		controls.put("/addForm.do", new AddForm()); // 등록화면.
		controls.put("/addBoard.do", new AddBoard()); // 등록처리.
		
		
		// 회원관련.
		controls.put("/loginForm.do", new LoginForm());
		controls.put("/login.do", new LoginControl());
		controls.put("/logout.do", new LogoutControl());
	    
		// 회원등록.
		controls.put("/addMember.do", new AddMemberControl()); // 회원등록처리
		controls.put("/addMemberForm.do", new AddMemberForm()); // 화면
		controls.put("/memberList.do", new MemberForm()); // 회원 목록
	
		// 기타.
		controls.put("/productList.do", new ProductListControl());
		controls.put("/cartList.do", new CartListControl());
	
	
		// 자바스크립트 연습.
		controls.put("/userList.do", new UserListControl());
	
		//Ajax 연습.
		controls.put("/bookList.do", new BookListControl());
		controls.put("/addBook.do", new AddBookControl());
		controls.put("/removeBook.do", new RemoveBookControl());
	
		
		// 댓글관련.
		controls.put("/replyList.do", new ReplyListControl());
		controls.put("/removeReply.do", new RemoveReplyControl());
		controls.put("/addReply.do", new AddReplyControl());
		controls.put("/getTotal.do", new ReplyTotalCount());
	
		controls.put("/registerCenter.do", new RegisterCenter());
		controls.put("/getSidoInfo.do", new getSidoInfoControl());
	
		controls.put("/dataTable.do", new DataTableControl());
	}
	
	
	

	// service. 요청때마다 실행.
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");  //post일경우
		//System.out.println("service 실행");
		String uri = req.getRequestURI(); // 현재 페이지의 url.
		String context = req.getContextPath();
		String path = uri.substring(context.length());
		System.out.println("path " + path);
	
		Control control = controls.get(path); // path에 boardList.do넣어주면 BoardListControl()객체가 반환된다.
		control.exec(req, resp); // 요청 url 에 따른 실행컨트롤을 호출. //실행컨트롤연결. 키를넣어주면 value를 반환해주는데 value가 컨트롤 타입. 
 	}
}
