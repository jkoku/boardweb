package co.yedam.member.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.yedam.common.DataSource;
import co.yedam.member.Member;
import co.yedam.member.mapper.MemberMapper;

public class MemberServiceImpl implements MemberService {

	SqlSession session = DataSource.getInstance().openSession(true); 
	MemberMapper mapper = session.getMapper(MemberMapper.class); // 변수 mapper = 인스턴스생성. 
	
	
	@Override
	public Member loginCheck(Member member) {
		return mapper.selectMember(member);
	}

	@Override
	public boolean addMember(Member member) {
		// TODO Auto-generated method stub
		return mapper.insertMember(member) == 1;
	}

	@Override
	public List<Member> memberList() {
		// TODO Auto-generated method stub
		return mapper.memberList();
	}

}
