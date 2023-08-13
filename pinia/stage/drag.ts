import { IApplicantStats, IWorkStat, dummyEmployeeStats } from "~~/composables/dummy";
import { defineStore } from "pinia";
import { buildUpdatedWorkStat } from "~~/composables/stage/work";

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

    assignedEmployees: ApplicantCard[];

    constructor(stat: IWorkStat) {
        this.stat = stat;
        this.social_point = stat.social_condition;
        this.develop_point = stat.develop_condition;
        this.assignedEmployees = [];
        this.social_status = "idle";
        this.develop_status = "idle";
    }

    assign(applicant: ApplicantCard) {
        this.assignedEmployees.push(applicant);

        this.update();
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
                
                drag.workCards = drag.workCards.map(work => {
                    if(work === workParam) {
                        work.assign(card); // card === selectedCard
                    }
    
                    return work;
                })

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
        })
    }

    return {
        drag,
        onInit,
        activateEmployee,
        assignWork
    }
});