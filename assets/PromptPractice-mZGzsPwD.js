import{r as g,j as e,L as u}from"./index-eVDbVToZ.js";import{S as b}from"./SEOHead-D8mWMAzt.js";const v=[{id:1,category:"이메일",title:"거래처 납기 지연 사과 이메일",situation:"자재 수급 문제로 거래처에 약속한 납기를 1주일 못 지키게 되었습니다. 사과와 함께 대안을 제시해야 합니다.",goal:"공손하고 전문적인 사과 이메일을 작성하는 프롬프트를 만드세요.",keywords:["사과","납기","지연","대안","일정","원인","재발방지"],roleKeywords:["담당자","전문가","역할","비서","매니저"],formatKeywords:["문단","형식","제목","서명","이메일","구성","순서"],exampleAnswer:`너는 우리 회사의 영업 담당자야.
거래처에 보낼 납기 지연 사과 이메일을 작성해줘.

[상황]
- 원자재 수급 지연으로 납품이 1주일 지연
- 기존 납기 4/25 → 변경 5/2
- 대안: 일부 물량 4/28 선납품 가능

[조건]
- 공손하고 전문적인 비즈니스 어투
- 사과 → 원인 → 대안 → 재발방지 순서, 3문단
- 마지막에 담당자 서명 포함`},{id:2,category:"보고서",title:"주간 업무 보고서 작성",situation:"이번 주에 처리한 일(미팅 2건, 제안서 1건, 재고 실사)을 팀장 보고용 주간 보고서로 정리해야 합니다.",goal:"체계적인 주간 보고서를 요청하는 프롬프트를 작성하세요.",keywords:["주간","보고","실적","계획","이슈","진행"],roleKeywords:["담당자","사원","팀원","역할","전문가"],formatKeywords:["표","목록","항목","형식","분량","페이지","구성"],exampleAnswer:`너는 우리 팀의 실무 담당자야.
아래 메모로 팀장 보고용 주간 업무 보고서를 작성해줘.

[이번 주 실적]
- 신규 거래처 미팅 2건
- 제안서 작성 1건 제출
- 재고 실사 및 오차 정리

[형식]
1) 금주 실적 (표: 업무/내용/결과)
2) 주요 이슈
3) 차주 계획 3가지
- A4 1페이지 이내, 간결한 보고체`},{id:3,category:"데이터",title:"매출 데이터 분석 요청",situation:"최근 6개월 매출 데이터의 추세를 분석하고 다음 분기를 전망하는 자료가 필요합니다.",goal:"데이터 분석과 전망을 요청하는 프롬프트를 작성하세요.",keywords:["분석","추세","비교","증감","전망","원인","매출"],roleKeywords:["분석가","전문가","역할","컨설턴트"],formatKeywords:["표","그래프","항목","형식","요약","구성"],exampleAnswer:`너는 데이터 분석 전문가야.
아래 6개월 매출 데이터를 분석해줘.

[데이터]
- 1월 1.0억 / 2월 1.1억 / ... (수치 입력)

[분석 내용]
1) 월별 추세 요약 (표)
2) 전월·전년 대비 증감과 원인 추정
3) 다음 분기 전망
4) 개선 제안 3가지
- 숫자와 비율 중심, A4 1페이지`},{id:4,category:"마케팅",title:"신메뉴 SNS 홍보 문구",situation:"카페 신메뉴를 인스타그램에 홍보할 문구가 필요합니다. 여러 톤으로 받아 고르고 싶습니다.",goal:"여러 버전의 홍보 문구를 요청하는 프롬프트를 작성하세요.",keywords:["홍보","신메뉴","톤","대상","SNS","인스타"],roleKeywords:["마케터","전문가","역할","카피라이터"],formatKeywords:["개","버전","해시태그","형식","목록"],exampleAnswer:`너는 카페 마케터야.
신메뉴 '흑임자 라떼' 인스타그램 홍보 문구를 5가지 톤으로 만들어줘.
(감성 / 유머 / 정보전달 / 짧고 강렬 / MZ 말투)

- 각 버전은 2문장 내외
- 버전마다 해시태그 5개 포함
- 20대 여성을 주 대상으로`},{id:5,category:"회의",title:"회의록 정리 요청",situation:"회의 중 받아 적은 거친 메모를 정식 회의록으로 정리해야 합니다.",goal:"메모를 회의록으로 정리하는 프롬프트를 작성하세요.",keywords:["회의","결정","안건","실행","메모","정리"],roleKeywords:["담당자","전문가","역할","비서"],formatKeywords:["표","구조","항목","형식","담당","기한"],exampleAnswer:`너는 회의 운영 담당자야.
아래 회의 메모를 정식 회의록으로 정리해줘.

[형식]
- 일시 / 참석자 / 안건 / 결정사항 / 실행항목
- 실행항목은 표로 (담당자·기한 포함)

[메모]
"""
(회의 메모 붙여넣기)
"""`},{id:6,category:"개인",title:"학습 계획 요청",situation:"직장인이 퇴근 후 하루 1시간씩 새 분야를 4주 안에 배우려고 합니다.",goal:"나에게 맞는 학습 계획을 요청하는 프롬프트를 작성하세요.",keywords:["학습","계획","주차","목표","기간","하루"],roleKeywords:["튜터","전문가","코치","역할"],formatKeywords:["표","주차별","항목","형식","목록"],exampleAnswer:`너는 학습 코치야.
나는 직장인이고 하루 1시간 공부 가능해. '엑셀 데이터 분석'을 4주에 배우고 싶어.

[요청]
- 주차별 학습 계획표 (표: 주차/목표/학습내용/실습과제)
- 무료로 볼 수 있는 자료 추천
- 매주 복습 퀴즈 아이디어도`}];function k(s,f){const c=s.toLowerCase().replace(/\s+/g," "),d=s.trim().length,t=[];let l=0;const p=f.keywords.filter(x=>c.includes(x.toLowerCase()));p.length>=5?l=20:p.length>=3?l=15:p.length>=2?l=10:p.length>=1&&(l=5),l<15&&t.push(`상황/맥락 키워드를 더 포함하세요 (예: ${f.keywords.slice(0,3).join(", ")})`);let n=0;/\d+/.test(s)&&(n+=5),/[가-힣]+(주|건|개|명|억|만|원|%|km|m)/.test(s)&&(n+=5),/(20\d{2}|[0-9]+월|[0-9]+일|[0-9]+시간|[0-9]+분)/.test(s)&&(n+=5),/\[.+\]|"""/.test(s)&&(n+=5),n<10&&t.push("구체적인 숫자·날짜·조건([상황] 등)을 추가하면 점수가 올라갑니다");let r=0;const j=/(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출|번역)/,a=(s.match(new RegExp(j,"g"))||[]).length;j.test(s)&&(r+=8),a>=2&&(r+=6),/(해줘|해주세요|부탁|하시오|만들어)/.test(s)&&(r+=3),d>=100&&(r+=3),r=Math.min(r,20),r<10&&t.push('"~작성해줘", "~분석해줘" 등 명확한 지시문을 포함하세요');let i=0;const y=f.formatKeywords.filter(x=>c.includes(x.toLowerCase()));y.length>=2?i+=8:y.length>=1&&(i+=4),/[1-9][.)]\s|[-·•]\s|#{1,3}\s|[①②③④⑤]/.test(s)&&(i+=6),/(페이지|문단|자|단어|이내|분량|줄|A4|표)/.test(s)&&(i+=6),i=Math.min(i,20),i<10&&t.push("출력 형식(표·목록·분량 등)을 지정하면 더 좋은 결과를 얻습니다");let o=0;const w=f.roleKeywords.filter(x=>c.includes(x.toLowerCase())),N=/(너는|당신은|역할|전문가|담당자|으로서)/.test(s);(N||w.length>0)&&(o+=8),/(금지|하지 ?마|제외|제한|조건|주의|참고|단,|어투|톤)/.test(s)&&(o+=4),/(예[시를:]|예를 들|예컨대|다음과 같|sample|example)/.test(s)&&(o+=4),d>=200&&(o+=2),d>=400&&(o+=2),o=Math.min(o,20),!N&&w.length===0&&t.push('"너는 ~전문가야" 등 역할 설정을 추가하세요');const h=l+n+r+i+o;d<50&&t.unshift("프롬프트가 너무 짧습니다. 100자 이상으로 작성해보세요."),d>=300&&h>=60&&t.push("프롬프트 길이와 구조 모두 우수합니다!");let m="D";return h>=90?m="S":h>=80?m="A":h>=65?m="B":h>=50&&(m="C"),{total:h,situation:l,context:n,objective:r,responseFormat:i,extras:o,feedback:t,grade:m}}const S={S:"#00855A",A:"#1B2A4A",B:"#3D6FE0",C:"#D4760A",D:"#C8102E"},A=[{key:"situation",label:"구체성·맥락"},{key:"context",label:"데이터"},{key:"objective",label:"명확한 지시"},{key:"responseFormat",label:"출력 형식"},{key:"extras",label:"역할·제약"}],E=()=>{const[s,f]=g.useState(v[0]),[c,d]=g.useState(""),[t,l]=g.useState(null),[p,n]=g.useState(!1),r=a=>{f(a),d(""),l(null),n(!1)},j=()=>{c.trim().length>0&&l(k(c,s))};return e.jsxs(e.Fragment,{children:[e.jsx(b,{title:"프롬프트 작성 실습",description:"시나리오에 맞는 프롬프트를 직접 쓰고 SCORE 기준으로 점수·피드백을 받는 실습"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"Prompt Practice"}),e.jsx("h2",{children:"프롬프트 작성 실습"}),e.jsx("p",{children:"상황에 맞는 프롬프트를 직접 작성하면, SCORE 5기준으로 점수와 개선 피드백을 드립니다."})]})}),e.jsx("section",{className:"section-ed",style:{paddingTop:"var(--s-6)"},children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"aifree-pp-layout",children:[e.jsxs("aside",{className:"aifree-pp-side",children:[e.jsx("div",{className:"aifree-ex-side-title",children:"시나리오"}),v.map(a=>e.jsxs("button",{className:`aifree-pp-scenario${s.id===a.id?" active":""}`,onClick:()=>r(a),children:[e.jsx("span",{className:"aifree-pp-cat",children:a.category}),e.jsx("span",{children:a.title})]},a.id))]}),e.jsxs("div",{className:"aifree-pp-main",children:[e.jsxs("div",{className:"aifree-pp-brief",children:[e.jsx("h3",{children:s.title}),e.jsxs("p",{children:[e.jsx("strong",{children:"상황"})," ",s.situation]}),e.jsxs("p",{children:[e.jsx("strong",{children:"목표"})," ",s.goal]})]}),e.jsx("textarea",{className:"aifree-pp-input",value:c,onChange:a=>{d(a.target.value),l(null)},placeholder:"여기에 프롬프트를 작성하세요. (역할·맥락·지시·형식·제약을 담아보세요)",rows:9}),e.jsxs("div",{className:"aifree-pp-actions",children:[e.jsxs("span",{className:"aifree-pp-len",children:[c.trim().length,"자"]}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("button",{className:"btn btn-ghost",onClick:()=>n(a=>!a),children:p?"모범답안 숨기기":"모범답안 보기"}),e.jsx("button",{className:"btn btn-primary",onClick:j,disabled:!c.trim(),children:"평가받기"})]})]}),t&&e.jsxs("div",{className:"aifree-pp-result",children:[e.jsxs("div",{className:"aifree-pp-score",children:[e.jsx("div",{className:"aifree-pp-grade",style:{background:S[t.grade]},children:t.grade}),e.jsxs("div",{children:[e.jsxs("div",{className:"aifree-pp-total",children:[t.total,e.jsx("span",{children:" / 100"})]}),e.jsx("div",{className:"aifree-pp-total-label",children:"SCORE 종합 점수"})]})]}),e.jsx("div",{className:"aifree-pp-bars",children:A.map(a=>{const i=t[a.key];return e.jsxs("div",{className:"aifree-pp-bar-row",children:[e.jsx("span",{className:"aifree-pp-bar-label",children:a.label}),e.jsx("div",{className:"aifree-pp-bar",children:e.jsx("div",{className:"aifree-pp-bar-fill",style:{width:`${i/20*100}%`}})}),e.jsxs("span",{className:"aifree-pp-bar-val",children:[i,"/20"]})]},a.key)})}),t.feedback.length>0&&e.jsxs("div",{className:"aifree-pp-feedback",children:[e.jsxs("strong",{children:[e.jsx("i",{className:"fa-solid fa-comment-dots"})," 개선 피드백"]}),e.jsx("ul",{children:t.feedback.map((a,i)=>e.jsx("li",{children:a},i))})]})]}),p&&e.jsxs("div",{className:"aifree-pp-answer",children:[e.jsx("div",{className:"aifree-ex-prompt-head",children:e.jsx("span",{children:"모범 프롬프트 예시"})}),e.jsx("pre",{className:"aifree-ex-prompt",children:s.exampleAnswer})]}),e.jsxs("div",{className:"aifree-note",style:{marginTop:"var(--s-5)"},children:[e.jsx("i",{className:"fa-solid fa-circle-info"}),e.jsxs("div",{children:["점수는 키워드·구조 기반 자동 추정입니다. 기준이 궁금하면"," ",e.jsx(u,{to:"/prompt/learn",children:"프롬프트 학습(SCORE)"}),"을, 실제 답변은"," ",e.jsx(u,{to:"/playground",children:"실습실"}),"에서 받아보세요."]})]})]})]})})})]})};export{E as default};
