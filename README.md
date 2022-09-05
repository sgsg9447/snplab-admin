## 1. 프로젝트 설치 및 실행

```
git clone https://github.com/Wanted-Pre-Onboarding-FE-Team5/snplab-admin.git

npm i

npm start 

//windows 운영체제에서 npm start 명령어로 json-server 실행이 안될 경우 추가로 아래 명령어 사용
npm run server 

```

> 랜딩페이지 = path="/" = 시작(홈) 페이지 <br>
> 지원 현황 페이지 = path="/admin" -> 주소창에 url 파라미터로 수동 입력해서 이동 <br>

## 2. 프로젝트 소개

원티드 프리온보딩 프론트엔드 코스 기업과제 첫번째, (주)에스앤피랩 기업 과제 수행 

## 3. 프로젝트 목표

기업에서 제공한 기획안을 정확히 이해하고 구현한다.

## 4. 프로젝트 진행 방향

**기획안 분석**

1. 레이아웃, 스타일

전부 기획안을 베이스로 구현
메인 컬러는 (주)에스앤피랩 웹사이트를 참고

2. 페이지 구분

 - (home)랜딩 페이지 : 지원하기 버튼 click시 지원 폼 페이지 이동

 - 지원 폼 페이지 : 웹 브라우저 기준 중앙에 모바일 사이즈로 구현

 - '개인정보 처리방침', '제3자 정보제공 동의 안내' 페이지 : 동일한 contents로 확인되어 제목만 바꿔서 하나의 컴포넌트 재사용,  router로 페이지 이동 예정

 - admin 페이지 : 랜딩페이지와 더불어 웹 브라우저 크기로 레이아웃 구현

**각자 코드 작업 들어가기 전 프로젝트 기본 작업**

- git organization에 new repository 생성
- git 컨벤션, issue 카드 template 생성
- CRA (npx create-react-app "project name" —template typescript)
- 임시 database 구현
- 임시 디렉토리 구조 나누기
- 라우터 설정 
- styled-components의 globalstyle 생성 및 reset 적용

**기획안을 두 파트로 나눠서 각각 task를 분배하여 구현**

1. 지원 폼

 - 폼은 form 태그과 input 태그로 구현
 - 거주지역 선택 정보입력과 지원완료 후 뜨는 메세지는 모달로 구현
 - 유효성 검사 및 폼데이터 제출은 react-hook-form 사용
 - 제출 버튼은 disabled 속성을 사용해서 유효성 검사 모두 통과시 true, 통과하지 못하면 false 값을 주어 활성화 여부 구현

2. 지원 현황 admin 페이지

 - 각각의 탭에 렌더링 할 데이터는 특정 기간을 임의로 정해서 각각의 탭에 할당된 기간동안의 데이터를 불러오기로 정함.

## 5. 기술스택
typescript json-server recoil styled-components styled-reset react-hook-form react-router-dom mui

## 6. 역할 분담

1. 지원 폼

| 팀원 이름                               | 기능                                                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [김슬기](https://github.com/sgsg9447)   | 지원 폼 유효성 검사, 지원하기 버튼 활성화 로직 |
| [이유미](https://github.com/ymStudyLog) | 페이지 레이아웃(admin 제외), 지원 폼 레이아웃 및 각종 스타일링 |
| [김연진](https://github.com/yunjink)    | 모달(거주지 선택, 지원 완료, 정보 제공 동의서)구현, 선택된 거주지 데이터는 리코일로 상태관리 |

2. 지원 현황 admin 페이지 

| 팀원 이름                               | 기능                                                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [김슬기](https://github.com/sgsg9447)   | database에서 각 탭에 할당된 기간에 맞는 데이터를 불러와 테이블 형식으로 렌더링, 엑셀 다운로드 버튼 구현 |
| [이유미](https://github.com/ymStudyLog) | 검색 창 구현, 검색어 입력할 filter 드롭다운 구현 |
| [김연진](https://github.com/yunjink)    | admin 페이지 레이아웃, 탭과 페이지네이션은 mui 사용 |

## 7. 프로젝트 구조

```
📦database
 ┣ 📜database.json
📦src
 ┣ 📂api
 ┃ ┗ 📜api.ts
 ┣ 📂asset
 ┃ ┣ 📜logo-snplab.png
 ┃ ┣ 📜privacypolicy.ts
 ┃ ┗ 📜transportations.ts
 ┣ 📂components
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜CSV.tsx
 ┃ ┃ ┣ 📜FullWidthTabs.tsx
 ┃ ┃ ┣ 📜GetItem.tsx
 ┃ ┃ ┣ 📜PaginationRounded.tsx
 ┃ ┃ ┗ 📜Search.tsx
 ┃ ┣ 📂form
 ┃ ┃ ┣ 📜Form.tsx
 ┃ ┃ ┗ 📜FormInput.tsx
 ┃ ┣ 📂modal
 ┃ ┃ ┣ 📜ConfirmModal.tsx
 ┃ ┃ ┣ 📜ModalBackground.tsx
 ┃ ┃ ┣ 📜ModalPortal.tsx
 ┃ ┃ ┣ 📜PrivacyModal.tsx
 ┃ ┃ ┣ 📜RegionModal.tsx
 ┃ ┃ ┗ 📜ThirdPartyModal.tsx
 ┃ ┣ 📂privacy
 ┃ ┃ ┣ 📜Privacy.tsx
 ┃ ┃ ┗ 📜ThirdParty.tsx
 ┣ 📂pages
 ┃ ┣ 📜Admin.tsx
 ┃ ┣ 📜ApplicationForm.tsx
 ┃ ┗ 📜Landing.tsx
 ┣ 📂router
 ┃ ┗ 📜Router.tsx
 ┣ 📂store
 ┃ ┣ 📜atom.tsx
 ┃ ┗ 📜radioAtom.tsx
 ┣ 📂styles
 ┃ ┣ 📜Admin.styled.tsx
 ┃ ┣ 📜ConfirmModal.styled.tsx
 ┃ ┣ 📜Form.styled.tsx
 ┃ ┣ 📜globalStyles.tsx
 ┃ ┣ 📜Privacy.styled.tsx
 ┃ ┣ 📜RegionModal.styled.tsx
 ┃ ┣ 📜Search.styled.tsx
 ┃ ┗ 📜template.tsx
 ┣ 📂types
 ┃ ┣ 📜Apply.type.tsx
 ┃ ┣ 📜CSV.type.tsx
 ┃ ┣ 📜Form.type.tsx
 ┃ ┣ 📜FormInput.type.tsx
 ┃ ┣ 📜ModalProps.type.tsx
 ┃ ┣ 📜Region.type.tsx
 ┃ ┗ 📜TabPanel.type.tsx
 ┗ 📜index.tsx
```
