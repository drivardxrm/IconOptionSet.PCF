import { FontIcon, mergeStyles, Stack, TextField } from '@fluentui/react';
import * as React from 'react';


// eslint-disable-next-line no-undef
const MaskedInput = (): JSX.Element => {

    
    //STYLES
    const maskedclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });

    
    return (
        <Stack tokens={{ childrenGap: 2 }} horizontal>
            <FontIcon iconName="Lock" className={maskedclass} />     
            <TextField value="*********" style={{width:"100%"}}/>
        </Stack>
    )
    
}


export default MaskedInput;


