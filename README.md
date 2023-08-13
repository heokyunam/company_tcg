# COMPANY TCG

IT 회사 운영을 기반으로 하는 Turn Card Game입니다.

## TODO

* <s>인물 카드를 만든다.</s>
* <s>WORK 카드를 만든다.</s>
* UI 배치를 개발한다.
    * <s>가운데 정렬</s>
    * <s>Work 위로 인물이 배치될 수 있게 공간을 비워둔다.</s>
* 인물카드를 WORK 카드에 배정한다.
    * <s>배정시 비용 지불이 가능한지 확인한다.</s>
    * <s>인물이 빈자리에 empty 상태로 둔다.</s>
    * 인물 배치에 따라 work stat 변경
    * 카드 2개로 제한
* 턴 종료 관련
    * 작업 완료된 일이 골드 추가로 이어짐
        * 작업 완료 칸으로 work 이동
        * gold 칸 위로 + 애니메이션
    * 끝내지 못한 일은 남은 값 만큼 다시 worklist로 들어간다.
        * 남은 일 값만큼 hp가 감소하는 - 애니메이션
    * 할당되어있는 모든 직원을 지원자 리스트로 이동시킨다.
        * 스탯 칸 위로 + 애니메이션


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
    * WORK에서 성장 스탯이 있을 경우 Applicant(Employee)의 능력과 골드값이 올라간다.
* 편의성 기능
    * 초기화 버튼: 해당 턴에 복잡하게 할당했던 작업을 초기화한다.
    * 할당 후 WORK 카드 hover시 아래로 쭉 인물이 그려진다.


## DEVELOP DESIGN
* LOGIC
    * gold 10, work 제공, applicant 제공
    * 턴 플레이
        * applicant to work 할당(gold 반영)
        * applicant 할당 빼기(gold 반영)
        * 턴 초기화
        * work에 할당 된 applicant 보기
    * 턴 종료
        * 해결한 work 보상
            * 새 work or gold
        * applicant 재배치
            * applicant 성장
* DESIGN PATTERN
    * 턴 플레이
        * 커맨드
        * UI Observer
    * 턴 종료
        * 커맨드
        * UI Observer
* CLASS
    * Stat
        * ApplicantStat
        * WorkStat
        * StageInfo
    * Command
        * AssignWork: 골드가 충분한지 확인
        * UnassignWork
        * RevertTurn
        * EndTurn
    * Manager(pinia)
        * CommandManager: 턴당 커맨드 insert & revert(턴 플레이)
        * PlayerManager: work list, applicant list, gold, heart
        * TurnManager: 턴 종료 관련 처리
    * AnimationExecutor
        * WorkAnimation: work 할당/해제, turn revert, 할당된 applicant hover view
        * TurnEndAnimation: 턴 종료 후 일어나는 일들에 대한 애니메이션
            * rewardWork, growApplicant, heart 감소
    * UIEntity
        * Applicant
        * Work
    * Entity
        * Applicant: 스탯, 성장 수치
        * Work: 스탯, 실패/성공/대기 상태
* SEQUENCE
    * 카드할당
        * Applicant 클릭 => Work 클릭 => 할당 가능 여부 확인 => Applicant 할당 => 할당 애니메이션 => WORK 조건 충족시 특수 효과
    * 할당해제
        * Applicant 클릭 => 핸드에 + 아이콘 추가 => + 클릭시 역순으로 빠지는 지 확인 후 할당 해제 => 할당 해제 애니메이션
    * 턴 revert
        * CommandManager 역순으로 Revert Animation 실행
    * 턴 종료 - WORK 충족 실패
        * WORK 실패 애니메이션 => 하트 감소하는 애니메이션 => 하트 감소
    * 턴 종료 - WORK 연계
        * 새로운 WORK 등장 => 기존 WORK 성공 애니메이션 => work list 조정
    * 턴 종료 - gold 수급
        * WORK 성공 애니메이션 => work list 조정 => gold 수급 => gold UI 반영
    * 턴 종료 - Applicant 성장
        * Applicant 가운데 등장 => Applicant 스탯이 변화(다른 색상) => applicants로 이동
