import React from 'react'
import { css } from '@emotion/core';
import {DotLoader} from 'react-spinners'


const LoaderInScreen = (props) => {
    const override=css`display:block; margin:auto;`;
    return (
        <DotLoader loading={ true } size={50} css={override} color={'#B40DFF'}/>
    )
}

export default LoaderInScreen