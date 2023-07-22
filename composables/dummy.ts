
export class EmployeeStats implements IEmployeeStats {
    id: number;
    name: string;
    image_url: string;
    social_enery: number;
    develop_energy: number;
    salary: number;

    constructor(args: IEmployeeStats) {
        this.id = args.id;
        this.name = args.name;
        this.image_url = args.image_url;
        this.social_enery = args.social_enery;
        this.develop_energy = args.develop_energy;
        this.salary = args.salary;
    }
}

export interface IEmployeeStats {
    id: number;
    name: string;
    image_url: string;
    social_enery: number;
    develop_energy: number;
    salary: number;
}

export const dummyEmployeeStats: IEmployeeStats[] = [
    {
        id: 1,
        name: "James",
        image_url: "",
        social_enery: 3,
        develop_energy: 0,
        salary: 1,
    },
    {
        id: 2,
        name: "Liam",
        image_url: "",
        social_enery: 0,
        develop_energy: 3,
        salary: 1,
    },
    {
        id: 3,
        name: "Lucas",
        image_url: "",
        social_enery: 1,
        develop_energy: 2,
        salary: 1,
    },
    {
        id: 4,
        name: "Emma",
        image_url: "",
        social_enery: 2,
        develop_energy: 1,
        salary: 1,
    },
    {
        id: 5,
        name: "Ava",
        image_url: "",
        social_enery: 3,
        develop_energy: 0,
        salary: 1,
    },
    {
        id: 6,
        name: "Sophia",
        image_url: "",
        social_enery: 0,
        develop_energy: 3,
        salary: 1,
    },
]

export interface WorkStat {
    id: number;
    name: string;
    social_condition: number;
    develop_condition: number;
    next_work?: number;
    next_gold?: number;
    turn_gold?: number;
}

export const dummyWorkStats: WorkStat[] = [
    {
        id: 1,
        name: "웹사이트 게시판 계약 따기",
        social_condition: 3,
        develop_condition: 0,
        next_work: 2,
    },
    {
        id: 2,
        name: "웹사이트 게시판 개발",
        social_condition: 0,
        develop_condition: 3,
        next_gold: 10,
    },
    {
        id: 3,
        name: "모바일 어플 계약 따기",
        social_condition: 0,
        develop_condition: 3,
        next_gold: 10,
    },
    {
        id: 4,
        name: "모바일 어플 개발",
        social_condition: 0,
        develop_condition: 3,
        next_gold: 10,
    },
    {
        id: 4,
        name: "자체 컨텐츠 개발 계획 세우기",
        social_condition: 3,
        develop_condition: 0,
        next_work: 5,
    },
    {
        id: 5,
        name: "자체 컨텐츠 웹사이트 만들기",
        social_condition: 0,
        develop_condition: 3,
        next_work: 6,
    },
    {
        id: 6,
        name: "자체 컨텐츠 모바일 어플 만들기",
        social_condition: 0,
        develop_condition: 3,
        next_work: 7,
    },
    {
        id: 7,
        name: "자체 컨텐츠 마케팅 추진",
        social_condition: 3,
        develop_condition: 0,
        next_work: 8,
    },
    {
        id: 8,
        name: "자체 컨텐츠 수입",
        social_condition: 1,
        develop_condition: 0,
        turn_gold: 10,
        next_work: 8,
    },
]

export const dummyStageDatas = [
    [1, 3],
    [],
    [4],
    [],
    [4],
];