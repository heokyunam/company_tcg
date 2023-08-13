import { IApplicantStats, IWorkStat, dummyEmployeeStats } from "~~/composables/dummy";
import { defineStore } from "pinia";

export enum DragStatus {
    IDLE_FOR_APPLICANT, WAIT_FOR_WORK
}

export class ApplicantCard implements IApplicantStats {
    selected: boolean;
    empty: boolean;
    id: number;
    name: string;
    image_url: string;
    social_enery: number;
    develop_energy: number;
    salary: number;

    constructor(stat: IApplicantStats) {
        this.selected = false;
        this.empty = false;
        this.id = stat.id;
        this.name = stat.name;
        this.image_url = stat.image_url;
        this.social_enery = stat.social_enery;
        this.develop_energy = stat.develop_energy;
        this.salary = stat.salary;

    }

    pop() {
        this.empty = true;
    }
}

declare type StatStatus = "idle" | "proceeding" | "solved";

export class WorkCard {
    social_point: number;
    develop_point: number;
    social_status: StatStatus;
    develop_status: StatStatus;
    stat: IWorkStat;
    css_class: string;

    assignedEmployees: ApplicantCard[];

    constructor(stat: IWorkStat) {
        this.stat = stat;
        this.social_point = stat.social_condition;
        this.develop_point = stat.develop_condition;
        this.assignedEmployees = [];
        this.social_status = "idle";
        this.develop_status = "idle";

        this.css_class = "";
    }

    assign(applicant: ApplicantCard) {
        if(this.assignedEmployees.length < 2) {
            this.assignedEmployees.push(applicant);
    
            this.update();

            return true;
        } else {
            alert("하나의 일에 2명 이상이 할당 될 수 없습니다!");

            return false;
        }
    }

    update() {
        const develop_sum = this.assignedEmployees
            .map(employee => employee.develop_energy)
            .reduce((a, b) => a + b);
        const social_sum = this.assignedEmployees
            .map(employee => employee.social_enery)
            .reduce((a, b) => a + b);

        this.social_point = Math.max(this.stat.social_condition - social_sum, 0);
        this.develop_point = Math.max(this.stat.develop_condition - develop_sum, 0);

        this.social_status = getStatStatus(this.social_point, this.stat.social_condition);
        this.develop_status = getStatStatus(this.develop_point, this.stat.develop_condition);
    }

    moveToSolvedArea() {
        this.css_class = " solved ";
    }
}

const getStatStatus = (point: number, condition: number): StatStatus => {
    if(point === 0) {
        return "solved";
    } else if(point < condition) {
        return "proceeding";
    } else {
        return "idle";
    }
}

export interface DragReactive {
    status: DragStatus,
    applicantCards: ApplicantCard[],
    workCards: WorkCard[],
}

const CARD_MAX_COUNT = 5;

export const useDrag = defineStore('drag', () => {
    const drag = reactive<DragReactive>({
        status: DragStatus.IDLE_FOR_APPLICANT,
        applicantCards: [],
        workCards: []
    })

    const onInit = () => {
        const tempEmployees = dummyEmployeeStats.sort(() => {
            return Math.random() * 2 - 1;
        });

        drag.applicantCards = tempEmployees.slice(0, CARD_MAX_COUNT).map(stat => {
            return new ApplicantCard(stat);
        });

        const tempWorks = dummyWorkStats.sort(() => {
            return Math.random() * 2 - 1;
        })

        drag.workCards = tempWorks.slice(0, CARD_MAX_COUNT).map(stat => {
            return new WorkCard(stat);
        })
    }

    const activateEmployee = (param: ApplicantCard) => {
        drag.applicantCards = drag.applicantCards.map(card => {
            return (param === card)? {
                ...card,
                selected: true
            }: {
                ...card,
                selected: false
            };
        })

        drag.status = DragStatus.WAIT_FOR_WORK;
    }

    const assignWork = (workParam: WorkCard) => {
        drag.applicantCards = drag.applicantCards.map(card => {
            if(card.selected) {
                let assignCount = 0;
                drag.workCards = drag.workCards.map(work => {
                    if(work === workParam) {
                        const isAssigned = work.assign(card); // card === selectedCard
                        if(isAssigned) assignCount++;
                    }
    
                    return work;
                })

                if(assignCount > 0) {
                    return {
                        ...card,
                        empty: true,
                        selected: false,
                    }
                } else {
                    return {
                        ...card,
                        selected: false,
                    }
                }
            } else {
                return {
                    ...card,
                    selected: false,
                }
            }
        })
    }

    const endTurn = () => {
        // 작업 완료 칸으로 work 이동
        // gold 칸 위로 + 애니메이션
        // 끝내지 못한 일은 남은 값 만큼 다시 worklist로 들어간다.
        // 남은 일 값만큼 hp가 감소하는 - 애니메이션
        // 할당되어있는 모든 직원을 지원자 리스트로 이동시킨다.
        // 스탯 칸 위로 + 애니메이션

        drag.workCards = drag.workCards.map(workCard => {
            workCard.moveToSolvedArea();

            return workCard;
        })
    }

    return {
        drag,
        onInit,
        activateEmployee,
        assignWork,
        endTurn,
    }
});