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

export class WorkCard {
    stat: IWorkStat;
    assignedEmployees: ApplicantCard[];

    constructor(stat: IWorkStat) {
        this.stat = stat;
        this.assignedEmployees = [];
    }

    assign(applicant: ApplicantCard) {
        this.assignedEmployees.push(applicant);
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