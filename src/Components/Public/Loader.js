import React from 'react'
import { css } from '@emotion/core';
import { PulseLoader, DotLoader } from 'react-spinners'


const Loader = (props) => {
    // const override = css`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
    const override = css`display:block; margin:auto;`;
    const { loading, color } = props
    return (
        <DotLoader loading={ loading } css={override} sizeUnit={"px"} size={20} color={color}/>
    )
}

export default Loader