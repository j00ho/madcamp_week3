# madcamp_week3

# 🐽 대학생을 위한 지출 관리 플랫폼, 돈모아

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d46d48e8-cea4-4b6c-b549-dfeae497aa0d/Untitled.png)

## 탄생 배경

> ***“돈 관리의 시작은 지출 관리”***
> 
- 2030의 재테크에 대한 관심이 높아져가는 요즘, 하고는 싶은데 뭐부터 해야 할지 모르겠고,
- 분명 아껴쓴 것 같은데 어느새 통장잔고가 바닥이 되고,
- 버는 돈은 없는데 쓰는 돈이 많아 불안하고!

우리네 대학생들의 이런 고민으로부터 돈모아가 탄생했습니다. 돈 관리의 시작은 바로 지출 관리입니다. 돈모아로 자신의 지출 내역을 관리하고, 분석하고, 공부해보세요.

## 돈모아의 뜻

### Don

> 돼지하면 뭐가 떠오르시나요? 바로 돼지저금통이죠. 돼지를 뜻하는 한자가 “돈”인 것도 우연만은 아닐 겁니다. 귀여운 돼지 이미지를 차용해 Don을 표현했으며, D는 돼지코를 형상화했습니다.
> 

### More

> 돈을 더 많이 (more) 벌려면 일단 돈을 잘 ‘모아’아겠죠. 언어 유희를 통해 돈모아의 귀엽고 밝은 이미지를 의도했습니다.
> 

## 팀원 및 개발환경

> **팀원**
> 
> - 송주호
> - 김기현

> **FE**
> 
> - React
> - Javascript
> 
> **BE**
> 
> - NodeJS
> - MySQL

## 페이지별 기능 소개

### 메인페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d46d48e8-cea4-4b6c-b549-dfeae497aa0d/Untitled.png)

<aside>
📌 **배너**
배너는 **마이페이지, 소비분석 페이지, 교육 및 강연 페이지로** 구성되어 있습니다.
마이페이지와 소비분석 페이지를 클릭하면 로그인 창으로 이동합니다.
교육 및 강연 창은 로그인 없이 접근이 가능합니다.

</aside>

### 로그인/회원가입 창

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/bf37f1b2-fc8b-4dec-b658-c07925f319dc/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/30d8c0d4-5e52-4d61-bc7a-8ebaee7ed9e4/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/dff75762-f4ed-4db3-bc22-7617da2b4c01/Untitled.png)

- **로그인**은 이메일과 비밀번호를 입력하면 됩니다.
- **회원가입**시 모든 필드를 작성해야 버튼이 활성화되며, 비밀번호가 일치하지 않거나 누락된 필드가 있을 시 버튼은 비활성화돼있습니다.

### 마이페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a8db0cfd-7377-4472-a139-e59d964c7210/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f38053c5-4066-4774-8fa8-64fc3b23266b/Untitled.png)

- **마이페이지**에서는 캘린더 날짜를 클릭해 지출 정보를 추가/수정/조회/삭제할 수 있습니다.
- 유형(수입, 지출), 금액, 태그, 메모 작성이 가능하며 총 22개의 태그 중에 2개까지 선택이 가능합니다.
- 태그는 19개의 수입 및 소비 항목과 3개의 소비 상황으로 나눴습니다. 예컨대 식비 중에서 혼밥으로 쓴 돈/데이트할 때 쓴 돈/동아리 회식으로 쓴 돈을 구분하여 기록하고 싶은 사용자는 태그를 2개 선택함으로써 소비 내역을 세세히 분류하고 분석할 수 있습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/12120131-c50f-4e1c-848a-a8fc6117fd6c/Untitled.png)

- 날짜를 클릭하면 작성한 내역을 조회할 수 있고, 수정/삭제 버튼을 통해 추가 작업을 할 수 있습니다.

### 소비분석 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/0fa3ab32-7072-4f43-bad9-ea909af7af46/Untitled.png)

- **소비 분석** 페이지 상단에서는 일별/주별/월별 총 지출 현황을 확인할 수 있습니다.
- 하단에서는 항목별 지출 내역을 조회할 수 있습니다.
- 그래프는 React의 **ApexChart** 라이브러리를 이용했습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a3427de1-20b7-4a5d-8a7e-32d9efa7803c/Untitled.png)

- 태그를 선택하면 해당 태그가 다른 태그에 차지하는 금액을 시각적으로 확인할 수 있습니다.
- 예컨대 태그로 ‘식비’ 선택 시, 순식비는 31500원(파란색), 연애하면서 쓴 식비는 31000원(분홍색)인 것을 확인할 수 있습니다. 이는 ‘연애’ 그래프에서 식비가 차지하는 액수 31000원과 일치합니다.
- **CHAT GPT API**를 이용해 지출 내역을 피드백하는 기능을 구현했습니다. 사용자는 소비 패턴을 자신의 주관 아닌 데이터를 통해 객관적으로 분석할 수 있습니다.

### 교육 및 강연 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/ff87fdc5-3bc0-41dd-a7b4-91d1faa7969f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d0d7cc8b-ed2e-4df5-aba4-e025949ef73f/Untitled.png)

- **교육 및 강연 페이지**는 지출과 관련한 여러 영상들을 확인할 수 있는 공간입니다.
- 공부는 하고 싶은데 뭐부터 봐야할지 모르는 사용자를 위해 마련했습니다.
- 사용자는 태그별로 유용한 영상을 추려서 볼 수 있습니다.
