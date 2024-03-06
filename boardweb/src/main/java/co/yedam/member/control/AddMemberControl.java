package co.yedam.member.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

import co.yedam.common.Control;
import co.yedam.member.Member;
import co.yedam.member.service.MemberService;
import co.yedam.member.service.MemberServiceImpl;

public class AddMemberControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 1) 요청정보 첫번째값은 요청정보   req
		// 2) 저장경로  파일이 저장되는 경로  savePath
		// 3) 최대파일크기 업로드파일의 최대크기지정할수있다. maxSize
		// 4) 인코딩   인코딩방식지정 enc
		// 5) 리네임정책  서버에파일을 올리면 똑같은 파일의 이름이 있으면 새업로드되는파일이름을 새로지정하는 방식 new DefaultFileRenamePolicy()
		String savePath = req.getServletContext().getRealPath("images");
		int maxSize = 1024*1024*5; // 최대크기 5메가바이트로 제한
		String enc = "utf-8"; 
        //  new DefaultFileRenamePolicy() 리네임정책 구현한 클래스
		MultipartRequest multi = new MultipartRequest(req,savePath,maxSize,enc, new DefaultFileRenamePolicy());
		
		String id = multi.getParameter("id");
		String pw = multi.getParameter("pw");
		String name = multi.getParameter("name");
		String img = multi.getFilesystemName("image"); // 변경된 파일의 이름.
		
		// mapper: insertMember
		// service: addMember
		// 게시글 목록 이동/ 에러페이지로 이동
		
		Member member = new Member();
		member.setId(id);
		member.setPw(pw);
		member.setName(name);
		member.setImage(img);
		
		MemberService svc = new MemberServiceImpl();
		
		if(svc.addMember(member)) { 
			resp.sendRedirect("boardList.do"); // 성공하면 
		} else {
			req.setAttribute("message", "등록 중 에러가 발생했습니다.");
	    	String path = "WEB-INF/view/error.jsp";
	    	req.getRequestDispatcher(path).forward(req, resp);
		}
	}
}
