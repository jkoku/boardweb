/**
 * boardService3.js
 */
import service from './boardAjax.js';

let page = 1;
// 댓글목록 5건 출력.
service.replyList({ bno: bno, page: page }, // 인자값1.(파라메터값)  
	replyListCall,
	err => console.log('error=>', err)
);
//
function replyListCall(result) {
	let ul = $('.content>ul')
	if (!result.length && page > 1) {
		page--;
		service.replyList({ bno: bno, page: page }, // 인자값1.(파라메터값)  
			replyListCall,
			err => console.log('error=>', err),
		)
		//페이지 리스트 생성. 
		service.pageList(bno,
			createPageElement,
			err => console.log('error=>', err)
		)
	}

	// 기존 목록 삭제.
	$('.content>ul>li:gt(1)').remove(); //:gt 선택한 요소 중에서 인덱스가 n보다 큰 요소를 모두 선택.

	console.log(result)
	$(result).each(function(idx, item) {
		let clon = $('.content>ul>li').eq(0).clone();
		let delBtn = $('<button>삭제</button>');
		delBtn.click(function(e) {
			service.removeReply(item.replyNo,
				function(result) {
					if (result.retCode == 'OK') {
						alert('댓글 삭제 성공.')
						service.replyList({ bno: bno, page: page }, // 인자값1.(파라메터값)  
							replyListCall,
							err => console.log('error=>', err)
						)
					} else {
						alert('댓글 삭제 실패.')
					}
				},
				err => console.log('error=>', err)
			)
		})
		clon.find('span:eq(0)').text(item.replyNo); // 각버튼마다만들어지는 텍스트값// $(복사 대상).clone() span태그 찾아옴. span:eq(0) 을 .text()는 선택한 요소 안의 내용을 가져오거나, 다른 내용으로 바꿉.
		clon.find('span:eq(1)').text(item.reply);
		clon.find('span:eq(2)').text(item.replyer);
		clon.find('span:eq(3)').html(delBtn);
		ul.append(clon);
	});

	//페이지 리스트 생성. 
	service.pageList(bno,
		createPageElement,
		err => console.log('error=>', err)
	)
}

// 페이지 목록 출력. 
/*service.pageList(bno, 
	 createPageElement,
	  err => console.log('error=>',err)
)*/

// 페이지 목록 생성. 
function createPageElement(result) {
	// 기존 페이지 삭제. 
	let pagination = $('div.pagination');
	pagination.html(''); //초기화
	
	let totalCnt = result.totalCount;
	let startPage, endPage; // 1~5, 6~10
	let next, prev;
	let realEnd = Math.ceil(totalCnt / 5)
	endPage = Math.ceil(page / 5) * 5;
	startPage = endPage - 4;

	endPage = endPage > realEnd ? realEnd : endPage;
	next = endPage < realEnd ? true : false;
	prev = startPage > 1;

	if (prev) {
		$('<a />').attr('href', '#').attr('data-page', startPage - 1).html('&laquo;').appendTo(pagination);
	}
	for (let p = startPage; p <= endPage; p++) {
		let aTag = $('<a />').attr('href', '#').attr('data-page', p).html(p).appendTo(pagination);
		if (p == page) {
			aTag.addClass('active');
		}
	}
	if (next) {
		$('<a />').attr('href', '#').attr('data-page', endPage + 1).html('&raquo;').appendTo(pagination);
	}
}

// 페이지 이동.
$('.pagination').on('click', 'a', function(e) {
	//console.log(this)
	page = $(this).data('page'); //this를 기준으로 data라는 제공되는 함수안에다가 페이지라는 속성의 값을 가져오도록
	service.replyList({ bno: bno, page: page }, // 인자값1.(파라메터값)  
		replyListCall,
		err => console.log('error=>', err)
	);
})


// 등록. 댓글 등록 버튼에 기능.. 댓글 보여주는 기능 호출..
$('.addReply').on('click', function(e) {
	let reply = $('#reply').val();
	service.addReply({ bno, reply, replyer },
		function(result) {
			if (result.retCode == 'OK') {
				alert('댓글 입력 성공')
				//$('.content>ul').append(makeRow(result.retVal))
				// 마지막 페이지로 이동 후 목록 보여주기.
				service.pageList(bno,
					result => {
						page = Math.ceil(result.totalCount / 5) // 마지막페이지계산
						service.replyList({ bno: bno, page: page }, // 인자값1.(파라메터값)  
						  replyListCall,
						  err => console.log('error=>', err)
						);
					},
					err => console.log('error=>', err))
			} else {
				alert('댓글 입력 실패.')
			}
		}
		);
})



