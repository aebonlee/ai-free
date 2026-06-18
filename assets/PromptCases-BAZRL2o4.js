import{r as n,j as e,l as p}from"./index-BXW0EjzL.js";import{S as c}from"./SEOHead-BXlvup10.js";const d=["전체","보고서/문서","이메일/공문","데이터/분석","기획/전략","회의/협업","교육/발표","마케팅/홍보","개인/일상"],a=[{id:1,category:"보고서/문서",level:"초급",title:"주간 업무 보고서",situation:"한 주 동안 한 일을 메모만 가지고 보고서로 정리할 때",prompt:`너는 우리 팀의 실무 담당자야. 아래 메모로 팀장 보고용 주간 업무 보고서를 작성해줘.

[이번 주 한 일]
- (메모를 불릿으로 나열)
[다음 주 계획]
- (메모를 불릿으로 나열)

형식: 1) 금주 실적 요약  2) 상세 내역(표: 업무/내용/결과)  3) 주요 이슈  4) 차주 계획
어투: 간결한 공식 보고체 · A4 1페이지 이내`,tip:"메모를 불릿으로 나열하면 AI가 구조화하기 쉽습니다. 형식을 명확히 지정하세요."},{id:2,category:"보고서/문서",level:"중급",title:"월간 실적 분석 보고서",situation:"월 실적 수치를 경영진 보고용으로 분석할 때",prompt:`너는 경영 분석 전문가야. 아래 월 실적을 분석한 보고서를 작성해줘.

[이번 달 실적] (항목: 목표/실적/달성률, 매출/전월·전년 대비)
- (수치 입력)

구성: 1) 핵심 KPI 요약  2) 부문별 분석  3) 전월·전년 비교  4) 미달 원인과 개선안  5) 다음 달 전망
분량: A4 2페이지 이내 · 숫자와 비율 중심`,tip:'숫자를 구체적으로 줄수록 분석 품질이 올라갑니다. "표로", "비율 중심"을 명시하세요.'},{id:3,category:"보고서/문서",level:"초급",title:"품의서/기안문 작성",situation:"구매·지출 승인을 받기 위한 품의서가 필요할 때",prompt:`너는 행정 업무 전문가야. 아래 내용으로 품의서를 작성해줘.

제목: (예) 노트북 교체 구매 품의
목적 / 사유 / 품목·수량·단가 / 총비용(VAT 포함) / 납기 / 공급처
형식: 회사 품의서 양식, 표 포함, 결재란 표시`,tip:"목적·사유·금액·납기를 항목으로 주면 누락 없이 정식 문서가 나옵니다."},{id:4,category:"이메일/공문",level:"초급",title:"정중한 사과/양해 메일",situation:"일정 지연·실수에 대해 거래처에 사과해야 할 때",prompt:`너는 우리 회사 담당자야. 거래처에 보낼 사과 이메일을 작성해줘.

[상황] (무엇이/왜 지연·문제인지, 변경 일정, 대안)
조건: 정중·전문적 어투 / 사과→원인→대안→재발방지 순서 / 3문단 / 끝에 서명`,tip:"사실 정보를 [상황]에 적어주면 지어내지 않고, 순서를 정하면 빠짐없이 작성됩니다."},{id:5,category:"이메일/공문",level:"중급",title:"받은 메일 요약 + 답장",situation:"길고 복잡한 메일에 답장해야 할 때",prompt:`다음 이메일에 답장해줘. (1) 상대 요청을 3가지로 요약하고 (2) 정중한 답장 초안을 작성해줘.

"""
(받은 메일 본문 붙여넣기 — 개인정보·금액은 가리고)
"""`,tip:"먼저 요약을 시키면 AI가 메일을 제대로 이해했는지 눈으로 확인할 수 있습니다."},{id:6,category:"이메일/공문",level:"초급",title:"공지/안내문 작성",situation:"사내·고객 대상 공지문을 빠르게 만들 때",prompt:`너는 홍보 담당자야. 아래 내용으로 안내 공지문을 작성해줘.

[알릴 내용] 대상 / 일시 / 장소 / 핵심 안내 / 유의사항 / 문의처
형식: 제목 + 본문(개조식) + 맺음말, 정중하고 명확하게`,tip:'"개조식"으로 요청하면 핵심만 깔끔하게 정리됩니다.'},{id:7,category:"데이터/분석",level:"초급",title:"엑셀 수식 만들기",situation:"원하는 계산을 어떤 함수로 해야 할지 모를 때",prompt:`엑셀에서 A열 날짜, B열 금액이 있을 때 "이번 달 합계"를 구하는 수식을 알려줘.
- 수식 + 각 부분 설명
- 함수를 모르는 사람도 따라 할 수 있게 단계로`,tip:"데이터가 어느 열에 있는지 알려주면 정확한 수식이 나옵니다."},{id:8,category:"데이터/분석",level:"중급",title:"줄글을 비교표로 변환",situation:"정리 안 된 텍스트를 비교 가능한 표로 만들 때",prompt:`다음 내용을 비교표로 만들어줘. (열: 항목 / 가격 / 특징 / 추천대상)
"""
(여러 항목 설명 붙여넣기)
"""
표 아래에 가성비 추천 1개와 이유도 적어줘.`,tip:"열(비교 기준)을 직접 정해주면 원하는 형태로 정리됩니다. 결과는 시트에 바로 붙여넣기 가능."},{id:9,category:"데이터/분석",level:"고급",title:"설문 주관식 분석",situation:"주관식 응답이 많아 경향 파악이 어려울 때",prompt:`다음 설문 주관식 답변을 분석해줘.
1) 자주 나온 의견 Top5(빈도)  2) 긍정/부정/중립 비율 추정  3) 개선 제안 3가지
"""
(응답 붙여넣기 — 개인정보 제외)
"""`,tip:"긴 텍스트 분석은 Claude가 강합니다. 무료 한도 내에서 활용하세요."},{id:10,category:"기획/전략",level:"초급",title:"아이디어 30개 발산",situation:"기획 초기에 아이디어를 폭넓게 모을 때",prompt:`"(주제)" 아이디어를 30개 만들어줘.
- 각 아이디어에 비용/난이도(상중하) 표시
- 마지막에 실행하기 쉬운 5개를 골라줘`,tip:"많이 뽑게 한 뒤 추리면 발산→수렴이 한 번에 됩니다. 고른 1개로 실행계획을 이어 요청하세요."},{id:11,category:"기획/전략",level:"중급",title:"간단 기획안 작성",situation:"행사·캠페인·프로젝트 기획안을 빠르게 만들 때",prompt:`"(행사/프로젝트)"를 기획해줘.
- 목적 / 대상 / 일정 / 프로그램(타임테이블) / 예산(표) / 준비물 체크리스트
- 예산은 1인 (금액) 기준으로`,tip:"인원·시간·예산 제약을 주면 현실적인 안이 나옵니다."},{id:12,category:"기획/전략",level:"고급",title:"SWOT 분석 + 전략",situation:"사업/제품/진로를 구조적으로 분석할 때",prompt:`"(대상)"에 대해 SWOT 분석을 표로 해줘. 각 항목 3개씩.
마지막에 분석을 종합한 전략 제안 3가지(강점활용/약점보완)를 추가해줘.`,tip:"프레임워크를 지정하면 막연한 고민이 구조적으로 정리됩니다. 결과는 비판적으로 검토하세요."},{id:13,category:"회의/협업",level:"초급",title:"회의록 정리",situation:"받아 적은 거친 메모를 정식 회의록으로",prompt:`다음 회의 메모를 정식 회의록으로 정리해줘.
- 일시/참석자/안건/결정사항/실행항목(담당자·기한) 구조
- 실행항목은 표로
"""
(메모 붙여넣기)
"""`,tip:"실행항목을 담당자·기한이 있는 표로 만들면 그대로 협업툴에 옮길 수 있습니다."},{id:14,category:"회의/협업",level:"중급",title:"킥오프 미팅 안건 설계",situation:"프로젝트 첫 회의의 안건과 진행안을 짤 때",prompt:`너는 프로젝트 매니저야. "(프로젝트)" 킥오프 회의 안건을 설계해줘.
- 목표 / 안건 목록(시간 배분) / 역할(R&R) / 리스크 점검 / 결정해야 할 사항 / Q&A
- 총 60분 기준 타임테이블`,tip:"시간(60분)을 정하면 안건별 시간 배분까지 만들어 줍니다."},{id:15,category:"교육/발표",level:"중급",title:"발표 슬라이드 구성안",situation:"발표자료의 흐름과 슬라이드 내용을 설계할 때",prompt:`"(주제)" 10분 발표용 슬라이드 구성안을 만들어줘.
- 슬라이드별 (제목 / 핵심 메시지 / 들어갈 내용 3줄), 총 8~10장
- 마지막에 오프닝 멘트`,tip:"이 구성안을 Genspark AI Slides나 Gamma에 넣으면 슬라이드가 자동 생성됩니다."},{id:16,category:"교육/발표",level:"초급",title:"어려운 개념 쉽게 설명",situation:"낯선 용어/개념을 교육 자료로 풀어쓸 때",prompt:`"(개념)"을 3단계로 설명해줘.
1) 초등학생도 이해할 비유  2) 직장인용 한 문단 설명  3) 핵심 용어 5개와 뜻
마지막에 이해도 확인 질문 3개도 내줘.`,tip:"난이도를 단계로 나누면 같은 개념을 여러 수준으로 받아 교육에 바로 쓸 수 있습니다."},{id:17,category:"마케팅/홍보",level:"초급",title:"SNS 홍보 문구 5종",situation:"신제품·이벤트 홍보 글을 여러 버전으로 뽑을 때",prompt:`"(상품/이벤트)" 인스타그램 홍보 문구를 5가지 톤으로 만들어줘.
(감성 / 유머 / 정보전달 / 짧고 강렬 / MZ 말투)
각 버전에 해시태그 5개도 함께.`,tip:"톤을 명시해 여러 개 받으면 우리 브랜드에 맞는 버전을 골라 쓸 수 있습니다."},{id:18,category:"마케팅/홍보",level:"중급",title:"이미지 생성 프롬프트",situation:"원하는 홍보 이미지를 잘 묘사하는 프롬프트가 필요할 때",prompt:`"(이미지 용도)" 생성용 영어 프롬프트를 3가지 스타일로 만들어줘.
(미니멀 / 따뜻한 감성 / 모던 광고)
각 프롬프트에 구도·조명·색감 키워드를 포함해줘.`,tip:"무료요금제는 이미지 생성 횟수가 제한적이니 프롬프트를 먼저 다듬으세요."},{id:19,category:"개인/일상",level:"초급",title:"학습 계획표 만들기",situation:"새 분야를 정해진 기간에 공부하고 싶을 때",prompt:`나는 직장인, 하루 1시간 가능. "(주제)"를 4주에 배우고 싶어.
주차별 계획표를 표로(주차/목표/학습내용/실습과제) 만들고, 무료 자료도 추천해줘.`,tip:"내 조건(시간·기간·목표)을 구체적으로 줄수록 현실적인 계획이 나옵니다."},{id:20,category:"개인/일상",level:"초급",title:"문장 교정/문체 변환",situation:"작성한 글의 오탈자·어색한 표현을 다듬을 때",prompt:`다음 글을 교정해줘.
1) 맞춤법/띄어쓰기 교정본  2) 어색한 문장 표(원문|수정|이유)
"""
(글 붙여넣기)
"""
가능하면 "공문체로", "더 친근하게" 버전도 함께.`,tip:'"이유"를 함께 받으면 무엇이 왜 어색했는지 배우게 됩니다.'}],m={초급:"#00855A",중급:"#1B2A4A",고급:"#C8102E"},x=({c:i})=>{const{showToast:l}=p(),[s,t]=n.useState(!1),r=async()=>{try{await navigator.clipboard.writeText(i.prompt),l("프롬프트를 복사했습니다.","success")}catch{l("복사에 실패했습니다.","error")}};return e.jsxs("div",{className:`aifree-ex-card${s?" open":""}`,children:[e.jsxs("div",{className:"aifree-ex-head",onClick:()=>t(o=>!o),children:[e.jsxs("div",{className:"aifree-ex-head-main",children:[e.jsx("span",{className:"aifree-level",style:{background:m[i.level]},children:i.level}),e.jsx("span",{className:"aifree-ex-title",children:i.title})]}),e.jsx("i",{className:`fa-solid fa-chevron-${s?"up":"down"}`})]}),e.jsx("div",{className:"aifree-ex-scenario",children:i.situation}),s&&e.jsxs("div",{className:"aifree-ex-body",children:[e.jsxs("div",{className:"aifree-ex-prompt-head",children:[e.jsx("span",{children:"프롬프트"}),e.jsxs("button",{className:"aifree-copy-btn",onClick:r,children:[e.jsx("i",{className:"fa-solid fa-copy"})," 복사"]})]}),e.jsx("pre",{className:"aifree-ex-prompt",children:i.prompt}),e.jsxs("div",{className:"aifree-ex-tips",children:[e.jsxs("strong",{children:[e.jsx("i",{className:"fa-solid fa-lightbulb"})," 팁"]}),e.jsx("ul",{children:e.jsx("li",{children:i.tip})})]})]})]})},u=()=>{const[i,l]=n.useState("전체"),s=i==="전체"?a:a.filter(t=>t.category===i);return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"프롬프트 사례",description:"업무별로 바로 응용하는 실전 프롬프트 사례 모음"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"eyebrow",children:["Prompt Cases · ",a.length]}),e.jsx("h2",{children:"프롬프트 사례"}),e.jsx("p",{children:"업무 상황별로 정리한 실전 프롬프트입니다. 괄호 안만 내 상황으로 바꿔 복사해 쓰세요."})]})}),e.jsx("section",{className:"section-ed",style:{paddingTop:"var(--s-6)"},children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"aifree-filter",children:d.map(t=>{const r=t==="전체"?a.length:a.filter(o=>o.category===t).length;return e.jsxs("button",{className:`aifree-filter-btn${i===t?" active":""}`,onClick:()=>l(t),children:[t," ",e.jsx("span",{children:r})]},t)})}),e.jsx("div",{className:"aifree-ex-grid",children:s.map(t=>e.jsx(x,{c:t},t.id))})]})})]})};export{u as default};
