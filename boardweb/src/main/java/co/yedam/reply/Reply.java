package co.yedam.reply;

import java.util.Date;

import lombok.Data;

@Data
public class Reply {
	private int replyNo; //댓글번호
	private int boardNo; //원본글번호
	private String reply; 
	private String replyer; 
	private Date replyDate; 
}
