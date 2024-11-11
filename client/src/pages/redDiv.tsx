import React from 'react'

const redDiv = () => {
    return (
        <div>
            <div className='grid grid-rows-[2fr-2fr-3fr]'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-1 bg-blue-500'>
                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>STR</p>
                            <p>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>DEX</p>
                            <p>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>CON</p>
                            <p>PH</p>
                        </div>
                    </div>
                    <div className='col-span-1 bg-green-500'>
                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>INT</p>
                            <p>PH</p>
                        </div>

                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>WIS</p>
                            <p>PH</p>
                        </div>

                        <div className='flex flex-row gap-x-3 justify-around'>
                            <p>•</p>
                            <p>CHA</p>
                            <p>PH</p>
                        </div>
                    </div>
                    <div className='col-span-2 bg-yellow-500 flex justify-center'>
                        <p>Advantage display</p>
                    </div>
                    <div className='col-span-2 bg-purple-500 flex justify-center'>
                        <p>SAVING THROWS</p>
                    </div>

                </div>
            </div>
            {/* ----------------------------------------------------------- */}
            <div className='grid grid-rows-3 gap-4 w-[30%] justify-center'>
                <div className='flex flex-row gap-x-3 justify-around'>
                    <p>•</p>
                    <p>PASSTIVE PRECEPTION</p>
                    <p>PH</p>
                </div>
                <div className='flex flex-row gap-x-3 justify-around'>
                    <p>•</p>
                    <p>PASSIVE INVESTIGATION</p>
                    <p>PH</p>
                </div>
                <div className='flex flex-row gap-x-3 justify-between'>
                    <p>•</p>
                    <p>PASSIVE INSIGHT</p>
                    <p>PH</p>
                </div>
                <div className='flex justify-center'>
                    <p>Darkvision 15 ft.</p>
                </div>
                <div className='flex justify-center'>
                    <p>SENSES</p>
                </div>
            </div>

            {/* ------------------------------------------------ */}

            <div className='grid grid-cols-1 gap-4 w-[30%] justify-center'>
                <div className='flex flex-col items-center'>
                    <h6>ARMOR</h6>
                    <p>PH</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h6>WEAPONS</h6>
                    <p>PH</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h6>TOOLS</h6>
                    <p>PH</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h6>LANGUAGES</h6>
                    <p>PH</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h6>PROFICIENIES & TRAINING</h6>
                </div>
            </div>
        </div>
    )
}

export default redDiv
