/**
 * boardAjax.js       // 기능
 */

const service = {  //객체
	//댓글목록(한페이지에 5개씩 보여주는 기능)
	replyList(param = { bno: 1, page: 1 }, successCall, errorCall) {   // 객체라는 의미로 . replylist 호출할때 파라메터 세개 넘김. 
		$.ajax({
			url: 'replyList.do',
			method: 'get', // 따로 명시하지않으면 get 방식.
			data: param, // 파라메터 자체를 데이터로 사용
			dataType: 'json'
		})
			.done(successCall) // 기능을 받아온다. 기능은boardService에서 
			.fail(errorCall)
	},
	pageList(bno = 1, successCall, errorCall) { // 값이 안들어오면 1 로 넣겠다. , 성공했을때 함수, 실패했을때함수
		$.ajax({
			url: 'getTotal.do?bno=' + bno,
			dataType: 'json'
		})
			.done(successCall) // 기능을 받아온다. 기능은boardService에서 
			.fail(errorCall)
	},
	// 삭제 
	removeReply(rno = 1, successCall, errorCall) {
		$.ajax({
			url: 'removeReply.do',
			method: 'post',
			data: { rno },
			dataType: 'json'
		})
			.done(successCall) // 기능을 받아온다. 기능은boardService에서 
			.fail(errorCall)
	},
	//등록
	addReply(param = { rno: 1, page: 1 }, successCall, errorCall) {
		$.ajax({
			url: 'addReply.do',
			method: 'post',
			data: param,
			dataType: 'json'
		})
			.done(successCall) 
			.fail(errorCall)
	}
}

export default service 
/*function test() {}
import service from './boardAjax.js';
export { service, test} ; // 여러가지 import가능 . 
import {service} from './boardAjax.js'*/


