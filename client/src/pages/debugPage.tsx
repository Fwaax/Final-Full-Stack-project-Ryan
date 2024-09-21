import React from 'react'
import Dice from '../components/dice'
import CreationStatRoll from '../components/creationStatRoll'

const DebugPage = () => {
    return (
        <div>
            <button>Roll Dice</button>
            <Dice />
            <CreationStatRoll />
        </div>
    )
}

export default DebugPage
