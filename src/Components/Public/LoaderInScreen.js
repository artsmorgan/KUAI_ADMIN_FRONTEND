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


// export const Loader2 = (props) => {
//   const override = css`margin:10px auto; width:45px;`;
//   const { loading } = props
//   return (
//     <PulseLoader loading={ loading } css={override} sizeUnit={"px"} size={120} color={'#92491e'}/>
//   )
// }