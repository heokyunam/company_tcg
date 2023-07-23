

export const CommonUtil = {
    getRandomSubArray: <T>(array: T[], randomLength: number) => {
        let tempArray = [...array];
        const result = [];
    
        for(let i = 0; i < randomLength; i++) {
            const randomIdx = Math.floor(Math.random()*randomLength);
    
            result.push(tempArray[randomIdx]);
            tempArray = tempArray.filter((_, idx) => idx !== randomIdx);
        }
    
        return result;
    }
}