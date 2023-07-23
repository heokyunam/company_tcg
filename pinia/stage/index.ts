import { CommonUtil } from "~~/composables/common";
import { defineStore } from "pinia";
import { IApplicantStats, IWorkStat } from "composables/dummy";


export const useStage = defineStore('stage', () => {
    const stage = reactive({
        applicants: [],
        works: [],
        employees: {
            
        },
        turnIdx: 1,
    })

    const onStageInit = () => {
        stage.turnIdx = 1;

        // TODO: Work 클래스 생성 필요
        stage.works = dummyStageDatas[stage.turnIdx].map(value => dummyWorkStats[value]);
    }

    const onTurnStart = () => {
        // TODO: Applicant, Employee(Work에 할당 된 Applicant) 클래스 생성 필요
        hidden.applicants = CommonUtil.getRandomSubArray<IApplicantStats>(dummyEmployeeStats, 5);
    }

    return {
        stage
    }
})