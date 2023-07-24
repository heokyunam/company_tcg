# COMPANY TCG

IT 회사 운영을 기반으로 하는 Turn Card Game입니다.

## TODO

* 인물 카드를 만든다.
* WORK 카드를 만든다.
* UI 배치를 개발한다.
* WORK 연계를 개발한다.
* 인물카드를 WORK 카드에 배정한다.
    * 배정시 비용 지불이 가능한지 확인한다.

## TEST TODO

* 인물 더미 데이터를 만든다.
* WORK 더미 데이터를 만든다.
* 스테이지 WORK 데이터를 만든다.

## DESIGN

* Applicant & Work
    * Applicant 카드에는 social energy와 develop energy가 있음
    * Work 카드에는 social condtion과 develop condition이 있음
* 인물 채용
    * 플레이어가 가진 골드로 Applicant를 채용할 수 있다.
    * 채용이라 하면 WORK 카드에 할당하는 행위를 의미한다.
    * WORK 카드에 할당하게 되면 Applicant의 energy만큼 condtion 값을 깍아준다.
    * Applicant의 gold 조건 만큼 플레이어의 골드가 감소한다.
* WORK
    * WORK 카드의 condition이 0이 되면 WORK 가 완료 판정이 된다.
    * WORK 카드의 condition이 0 이상이면 미완료 판정이 된다.
    * 스테이지 정보에 따른 추가 WORK도 있으며 과거 WORK로 인해 만들어진 새 WORK도 있다.
* 턴 종료
    * 플레이어의 초기 HEART는 5다.
    * 턴 종료시 미완료 WORK는 HEART를 감소시키며 해당 WORK는 사라진다.
    * 6턴이 지나면 게임이 종료된다.
    * 완료된 WORK는 다른 WORK를 주거나 골드를 준다.
    * 다른 WORK는 턴 시작시 나타난다.
    * 채용된 Applicant(Employee)는 다시 핸드로 이동한다.
    * WORK에서 성장 스탯이 잇을 경우 Applicant(Employee)의 능력과 골드값이 올라간다.
* 편의성 기능
    * 초기화 버튼: 해당 턴에 복잡하게 할당했던 작업을 초기화한다.
    * 할당 후 WORK 카드 hover시 아래로 쭉 인물이 그려진다.