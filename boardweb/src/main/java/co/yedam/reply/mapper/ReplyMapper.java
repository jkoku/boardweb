package co.yedam.reply.mapper;

import java.util.List;
import java.util.Map;

import co.yedam.common.Center;
import co.yedam.common.SearchVO;
import co.yedam.reply.Reply;

public interface ReplyMapper {
	//목록, 등록, 삭제
		List<Reply> selectList(SearchVO search); // 페이징처리가 되어진 목록 @Param("bno") int bno, @Param("page")
		int insertReply(Reply reply); 
		int deleteReply(int rno);	
		//페이지계산하기위한 전체건수.
		int selectCount(int bno); //댓글은 원본글에 있어서 파라메터 bno 건수를 받아와야하니까 int로 선언 selectCount 쿼리아이디


		// 여러건 등록(센터)
		int insertCenter(Center[] array);
		int deleteCenter(Center[] array);
		
		// chart.
		List<Map<String, Object>> countPerSido();
		
}
