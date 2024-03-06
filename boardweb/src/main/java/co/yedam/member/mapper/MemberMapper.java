package co.yedam.member.mapper;

import java.util.List;

import co.yedam.member.Member;

public interface MemberMapper {
	Member selectMember(Member member);
	
	// mapper: insertMember
	
	int insertMember(Member member);
	
	List<Member> memberList();
	
}
