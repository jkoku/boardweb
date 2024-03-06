package boardweb;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import co.yedam.common.DataSource;
import co.yedam.reply.mapper.ReplyMapper;

public class MapperTest {
	 public static void main(String[] args) {
//		 Center c1 = new Center();
//		 c1.setId(1);
//		 c1.setCenterName("center1");
//		 c1.setSido("sido1");
//		 c1.setPhoneNumber("010-1111");
//		 c1.setAddress("address1");
//		 
//		 Center c2 = new Center();
//		 c2.setId(2);
//		 c2.setCenterName("center2");
//		 c2.setSido("sido2");
//		 c2.setPhoneNumber("010-2222");
//		 c2.setAddress("address2");
//		 Center[] list = {c1, c2};
//		 
//		 ReplyMapper mapper = DataSource.getInstance().openSession(true).getMapper(ReplyMapper.class);
//		 
//		 //System.out.println(mapper.insertCenter(list));
//		 
//		 
//		 System.out.println(mapper.deleteCenter(list));
		 
		 ReplyMapper mapper = DataSource.getInstance().openSession(true).getMapper(ReplyMapper.class);
		 
		 List<Map<String, Object>> list = mapper.countPerSido();
		 for (Map<String, Object> map : list) {
			Set<Entry<String, Object>> set =  map.entrySet();
			for(Entry<String, Object> entry : set) {
				System.out.println(entry.getKey() + ":" + entry.getValue());
			}
		   System.out.println("========================");
		 } 
	 }
}
//		SqlSession session = DataSource.getInstance().openSession(true);	
//		ReplyMapper mapper = session.getMapper(ReplyMapper.class);
//		
//		//등록
//		Reply rep = new Reply();
//		rep.setBoardNo(122);
//		rep.setReply("122번 댓글입니다...");
//		rep.setReplyer("newbie");
//		mapper.insertReply(rep); // insert mapper기능 호출
//		//mapper.deleteReply(6); // 삭제매퍼기능 호출
//		
//		System.out.println(rep); 
//			mapper.selectList(122) // List<Reply>
//		.forEach(reply -> System.out.println(reply.toString()));
//		
//		SearchVO search = new SearchVO();
//		search.setBno(122);
//		search.setRpage(5);
//		
		
//		mapper.selectList(search) // List<Reply>
//				.forEach(reply -> System.out.println(reply.toString()));
//	
//	 }
	 
	 

