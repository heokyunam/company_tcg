import { IApplicantStats, IWorkStat, dummyEmployeeStats } from "~~/composables/dummy";
import { defineStore } from "pinia";

export enum DragStatus {
    IDLE_FOR_APPLICANT, WAIT_FOR_WORK
}

export class ApplicantCard {
    stat: IApplicantStats; // interface라서 warning이 뜬다
    selected: boolean;

    constructor(stat: IApplicantStats) {
        this.stat = stat;
        this.selected = false;
    }
}

export class WorkCard {
    stat: IWorkStat;
    assignedEmployees: ApplicantCard[];

    constructor(stat: IWorkStat) {
        this.stat = stat;
        this.assignedEmployees = [];
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
    }

    return {
        drag,
        onInit,
        activateEmployee,
    }
});