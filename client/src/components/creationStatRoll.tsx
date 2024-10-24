import React, { useState, useEffect } from 'react';

const CreationStatRoll: React.FC = () => {
    const [statRoll, setStatRoll] = useState([] as number[]);

    // Function to generate a single stat
    function generateStat(): number {
        let singleStatArr: number[] = [];
        // let singleStatArr2 = [] as number[];
        for (let i = 0; i < 4; i++) {
            singleStatArr.push(Math.floor(Math.random() * 6) + 1);
        }
        singleStatArr.sort();
        singleStatArr = singleStatArr.slice(1); // Remove the lowest roll

        return singleStatArr.reduce((acc, curr) => acc + curr, 0); // Sum the remaining rolls
    }

    // Function to generate six stat rolls
    function generateStats(): number[] {
        let rollArray: number[] = [];
        for (let i = 0; i < 6; i++) {
            rollArray.push(generateStat());
        }
        return rollArray;
    }

    useEffect(() => {
        // Generate the stat rolls when the component mounts
        setStatRoll(generateStats());
    }, []); // Empty dependency array ensures this runs only once on component mount

    return (
        <div className='flex flex-col gap-2 items-center'>
            <div>
                <button className='border border-[#bfbfba] border-solid h-[50px] w-[150px] rounded-md text-[#bfbfba]' onClick={() => setStatRoll(generateStats())}>Roll</button>
            </div>
            <div className='flex flex-row gap-3'>
                {statRoll.map((roll, index) => (
                    <div className=' inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full' key={index}><span className="font-semibold">Stat Roll {index + 1}:</span>
                        <span className="font-bold text-green-700">{roll}</span></div>

                ))}
            </div>
        </div>
    );
};

export default CreationStatRoll;
