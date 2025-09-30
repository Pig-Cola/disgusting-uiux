# Disgusting UX UI

웹 서핑을 하다보면 불편한 사용성과 UI들을 마주합니다.  
'개발자가 의도적으로 사용성과 UI를 더 불편하게 만든다면 어떻게 될까?'  
라는 생각으로 만들어보았습니다.

## 소개

이 프로젝트는 **불편한 UX/UI**를 일부러 구현하여  
"최악의 사용자 경험"이 무엇인지 직접 체험할 수 있도록 만든 웹사이트입니다.  
React와 Docusaurus 기반으로 제작되었습니다.

## 주요 불편 UX/UI 예시

- **Tilt Slider (기울어지는 슬라이더)**
  - 마우스를 위/아래로 움직이면 슬라이더 전체가 기울어집니다.
  - 각도에 따라 값이 미묘하게 변해, 사용자가 원하는 값을 맞추기 매우 어렵습니다.
  - **불편 포인트:**  
    - 슬라이더가 기울어져서 직관적으로 조작이 불가능  
    - 각도에 따라 값이 비선형적으로 변함  
    - 조작 중 실수로 값이 튀는 현상 발생

- **Reverse Slider (반전 슬라이더)**
  - 일반적인 슬라이더와 달리, 좌우 방향이 반전되어 있습니다.
  - 오른쪽으로 움직이면 값이 줄고, 왼쪽으로 움직이면 값이 늘어납니다.
  - **불편 포인트:**  
    - 직관과 반대되는 동작  
    - 사용자가 원하는 값을 맞추기 위해 혼란을 겪음

## 폴더 구조

- `src/pages` : 메인 페이지 및 라우팅
- `src/components/disgusting/commons/control/slider/tilt` : 기울어지는 슬라이더 컴포넌트
- `src/components/disgusting/commons/control/slider/reverse` : 반전 슬라이더 컴포넌트
- `docs/` : Docusaurus 기반의 문서

## 실행 방법

1. Node.js 18 이상 설치
2. 패키지 설치  
   ```bash
   pnpm i
   ```
3. 개발 서버 실행  
   ```bash
   pnpm run start
   # or
   pnpm start
   ```
4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속
