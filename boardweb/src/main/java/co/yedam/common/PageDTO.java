package co.yedam.common;

import lombok.Data;
//DTO(Data Transfer Object, 데이터 전송 객체)란 프로세스 간에 데이터를 전달하는 객체
@Data
public class PageDTO {  
	private int page;
	private int startPage, endPage; // << 11 12 13 14 15 ... 20 >>
	private boolean prev, next;
	
	//매개값으로 페이지와 토탈값을 받아오면 만들어주는...
	public PageDTO(int page, int totalCnt) {
		this.page = page; // 현재 페이지.
		int realEnd = (int) Math.ceil(totalCnt / 5.0); // 실제 데이터 기준 마지막 페이지.
		
		this.endPage = (int) Math.ceil(page/10.0)* 10;  // 
		this.startPage = this.endPage - 9;
		
		this.endPage = this.endPage > realEnd ? realEnd : this.endPage;
		
		this.prev = this.startPage > 1;
		this.next = this.endPage < realEnd;

	}
}
