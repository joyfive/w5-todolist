# Welcome to REACT! 3nd React.app 😎
![](https://velog.velcdn.com/images/joyfive/post/dcd2814e-58ee-430f-a572-a732272cf00a/image.gif)



▶️[Go to Project](https://w4-todolist.vercel.app/)

## 페이지 소개
리액트의 기본 기능을 연습하고 Redux를 활용한 투두리스트 웹앱 (프론트범위만 진행)
- Form (Form, input, button 요소를 활용하여 투두 추가, 삭제, 인풋값 리셋, 추가 시 벨리데이터 구현)
- List (객체의 isDone 값으로 할일 리스트, 완료 리스트 구성)
- Detail (라우터 및 Link, Navigate 활용하여 디테일 페이지 <-> 홈 연결)

## 기술 스택
> CSS / REACT(JS, JSX) / vercel

## 컴포넌트 구성 및 WF
![](https://velog.velcdn.com/images/joyfive/post/befd1444-9acc-40cb-99d4-a1a3b7849783/image.png)


```jsx
// home 
<Todolist>
    <Header />
    <Form />
    <List>
        <Todo />
    </List>
    <Footer />
</Todolist>

// Detail
<Detail />
```
## 구현 기능
### 기능1: Add 버튼
- input field 사용자 입력 데이터를 List에 추가하는 Submit 버튼
- [Redux] todos module에서 액션크리에이터 / 리듀서로 함수 구현 후 Form 컴포넌트에서는 dispatch로 변환여부 추적 
<strong>Validation 추가</strong>
- 제목, 내용 필드 각각 입력값 존재여부를 확인하는 **useState** 생성
- 각각의 입력값이 없는 경우 add 불가 및 인풋 필드 하단에 안내문구 고지
- ADD 혹은 RESET 이벤트가 발생할때마다 벨리데이터의 안내문구도 함께 리셋됨

### 기능2: Reset 버튼
- [Redux]버튼 클릭 시 setState를 "" 로 변환
- onClick 이벤트로 'OnReset' 함수 선언, 다중 필드 데이터 동시 변환

### 기능3: 추가된(등록된) 투두아이템의 삭제 기능
- [Redux]onDelete 함수 선언 
- filter로 이벤트가 발생한 아이템과 id가 같지않은 아이템만 리턴 (아이디가 동일한 아이템만 삭제)

### 기능4 : 추가된(등록된) 투두아이템의 상태 수정 기능
- [Redux]switchStatus 함수 선언, map 함수를 활용하여 이벤트가 발생한 아이템과 id가 일치하는 아이템의 'isdone' 값을 반대로 스위치
- 버튼 변경 : {isdone: true} 면 현재 완료 상태이므로 [취소]버튼 노출, {isdone: false} 면 현재 완료하지 않은 '할일' 이므로 [완료]버튼 노출 (버튼 및 버튼 스타일 변경)
- 위치 변경 : 할일 리스트 - {isdone: false} 완료 리스트 - {isdone: true}

### 기능5 : 다중 페이지 구현 
- Router를 활용하여 다중 페이지 구현

<strong>기존 W3에서 구현한 기능을 `Redux를 도입하여 확장리팩토링` 진행한 프로젝트입니다. 기능 자체는 W3과 거의 동일하며, 일부 기능추가 및 코드만 개선되었습니다. </strong>

## 디자인 & css
### Styled Components
- 드디어 css 파일이 아닌 `styled compponents`를 도입했습니다. 
- GlobalStyle.jsx 를 활용한 `전역 스타일 설정` 및 개별 컴포넌트, 페이지 내에서 스타일링을 진행했습니다.
- 조건부 Styled Components `props` 사용하기 :
Todo 컴포넌트의 <Todobox />`border, color 요소를 isdone의 value에 따라 다르게 적용되도록 props를 활용했습니다. 
- Link 스타일링을 위한 `props.children` 사용


### react-icons
- 텍스트아이콘 라이브러리 활용
![](https://velog.velcdn.com/images/joyfive/post/e2962000-b4bf-449c-8be6-e96d66358216/image.png)

### Flex & Grid
- 페이지 및 컴포넌트의 영역 설정을 위한 Grid 활용
- 컴포넌트 내 요소들의 행/열 정렬을 위한 Flex 활용

레이아웃을 위한 CSS 구조적 스타일링을 연습하고 있습니다.


### Mobile responsive web

![](https://velog.velcdn.com/images/joyfive/post/fb749009-c672-4aca-a800-4460f9a17cd7/image.gif)
- 일반 CSS와 마찬가지로 스타일드 컴포넌트 내에서 'media query'를 활용했습니다.
- PC에서는 고정된 박스에서 스크롤링이 되는 방식, MO에서는 투두 아이템이 추가될수록 박스가 늘어나느 형식을 차용하였습니다.
(overflow:auto; 및 스크린 너비에 따른 height 조정)


## 배운점 & 아쉬운점
### 배운점👍
- 지난 프로젝트에서 실패한 푸터(정확히는 미묘하게 div의 흰색여백이 생기는 현상)를 예쁘게 넣는데 성공했습니다.
- Redux를 새롭게 배우니, React와는 친밀해진 것 같습니다. React 정도면 양반이지🙄
- Redux에서 store 생성 및 모듈 생성하여 컴포넌트 페이지를 가볍게 관리할 수 있는 방법을 익힌것 같습니다. <br> 아직 언제 redux를 쓰는게 효율적인지 useState가 더 효율적인지 구분하는데 익숙치 않지만, <br> 추후 이어지는 프로젝트에서 점차 효율적인 상태관리를 능숙하게 되리라 기대됩니다.
- 스타일 컴포넌트를 도입한 제법 리액트 다운 앱을 만들었습니다. <br>반복되는 프로젝트마다 여러가지 스타일링을 시도해보면서 css 가 익숙해졌는지, <br>스타일드 컴포넌트는 새로운 라이브러리지만 익혀야 한다는 부담감보다 이전보다 더 쉽고 효율적인 방식이라는 생각이 먼저 들었습니다. 
- 벨리데이션을 도입했습니다. 알럿이 아닌, 필드의 캡션형태로 UI로 구현하여 보다 사용자 친화적인 방식을 고민했습니다.

### 아쉬운점👀
- 해야할일과 완료된 할일의 모바일 버전에서 1열로 배치하는 것 뿐 아니라, 토글로 구현하고 싶은 욕심이 있었지만 Detail 페이지 디버깅이 지연되어 시간 내 구현하지 못했습니다. 다음 프로젝트에서는 토글 방식을 도입해보려고 합니다.


## 진도체크

### 이전 목표 : *Success!*<br> 
1. ~~`<div>` 떡칠 말고, html 구조적으로 짜는 연습하기~~<br>
2. ~~푸터 포함한 css 디자인 적용 연습하기~~<br>
3. ~~마이크로 인터랙션, 마이크로 기능들 확장해서 작업하기~~ <br>

### 다음 목표 : *TODO*
1. CRUD, useStae, Redux 활용 다지기<br>
2. 토글 UI 연습하기

Copyright 2022. hang-hae99 9th joyfive. all rights reserved.
