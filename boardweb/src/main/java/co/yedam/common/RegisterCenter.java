package co.yedam.common;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.yedam.reply.service.ReplyService;
import co.yedam.reply.service.ReplyServiceImpl;

public class RegisterCenter implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// byte stream =>  객체.(id, centerName, sido,......) => 객체[] // 객체타입을 여러건 담을수있는 타입으로 변환 //pom.xml에 라이브러리
		ServletInputStream sis = req.getInputStream();
		String json = StreamUtils.copyToString(sis, StandardCharsets.UTF_8);
		
		ObjectMapper mapper = new ObjectMapper();
		Center[] list = mapper.readValue(json, Center[].class); // 센터의 배열타입으로 바꾸겠다.
		
		ReplyService svc = new ReplyServiceImpl();
		int cnt = svc.addCenter(list);		
		System.out.println(cnt);
		
		// 처리된 건수.
		resp.getWriter().print(cnt);
	}
}
