# COMPANY TCG

IT 회사 운영을 기반으로 하는 Turn Card Game입니다.

## TODO

* 인물 카드를 만든다.
* WORK 카드를 만든다.
* 인물 카드를 팀 리스트로 드래그한다.
* 인물카드를 WORK 카드에 배정한다.

## TEST TODO

* 인물 더미 데이터를 만든다.
* WORK 더미 데이터를 만든다.
* 스테이지 WORK 데이터를 만든다.

## DESIGN

* 인물 카드에는 social energy와 develop energy가 있음
* 매턴마다 WORK 카드가 주어진다.
* 인물카드가 패에 있고 현재 가진 금액으로 원하는 인물을 채용 후 WORK를 배정한다.
* WORK 카드는 1턴에서 부터 매턴 추가 카드가 생기는 방식으로 진행된다.
* 6턴이 지나면 게임이 종료된다.
* WORK를 5개 이상 놓치면 패배하게 된다.
* 턴을 마치고 나면 applicants로 되돌아가며 봉급이 +2되고 social+1, develop+1 된다.