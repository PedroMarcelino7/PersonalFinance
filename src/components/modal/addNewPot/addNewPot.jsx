import React from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'

const AddNewPot = () => {
    return (
        <div>
            <DefaultInput label={'Pot Name'} />

            <DefaultInput label={'Target'} />
        </div>
    )
}

export default AddNewPot