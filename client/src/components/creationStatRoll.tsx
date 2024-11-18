import React, { useState, useEffect } from 'react';

const CreationStatRoll: React.FC = () => {
    const [statRoll, setStatRoll] = useState([] as number[]);

    function generateStat(): number {
        let singleStatArr: number[] = [];
        for (let i = 0; i < 4; i++) {
            singleStatArr.push(Math.floor(Math.random() * 6) + 1);
        }
        singleStatArr.sort();
        singleStatArr = singleStatArr.slice(1);
        return singleStatArr.reduce((acc, curr) => acc + curr, 0);
    }

    function generateStats(): number[] {
        let rollArray: number[] = [];
        for (let i = 0; i < 6; i++) {
            rollArray.push(generateStat());
        }
        return rollArray;
    }

    useEffect(() => {
        setStatRoll(generateStats());
    }, []);

    return (
        <div className="flex flex-col gap-2 items-center p-4 sm:p-6">
            <div>
                <button
                    className="border border-[#bfbfba] border-solid h-[50px] w-[150px] rounded-md text-[#bfbfba] 
                    hover:bg-gray-200 transition-colors duration-300 sm:w-[120px] sm:h-[45px] md:w-[130px] md:h-[48px]"
                    onClick={() => setStatRoll(generateStats())}
                >
                    Roll
                </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                {statRoll.map((roll, index) => (
                    <div
                        className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full 
    text-sm md:text-base"
                        key={index}
                    >
                        <span className="font-semibold">Stat Roll {index + 1}:</span>
                        <span className="font-bold text-green-700 w-[20px] text-center">{roll}</span>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default CreationStatRoll;
