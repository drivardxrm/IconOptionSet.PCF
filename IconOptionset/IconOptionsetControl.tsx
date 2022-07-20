import * as React from 'react';
import { useState, useEffect } from "react";

import { initializeIcons, mergeStyles, FontIcon, TextField, IconButton,IIconProps, ChoiceGroup, IChoiceGroupOption, Stack} from "@fluentui/react";
import { useConst } from '@uifabric/react-hooks';

export interface IProps {
    selected: number | undefined;
    icons: Array<IIconSetup>;
    readonly: boolean;
    masked: boolean;
    nullable: boolean;  
    selectedcolor: string | undefined;
    
    
    onChange: (selected:number|undefined) => void;
}

export interface IIconSetup {
    key : number
    icon: string;
    text: string;
}

export interface IState {
    selectedvalue: string | undefined;
}

const IconOptionsetControl = (props : IProps): JSX.Element => {

    //STATE VARIABLES
    const [selectedValue, setSelectedValue] = useState<string|undefined>(props.selected == undefined ? undefined : props.selected.toString());
    const [options, setOptions] = useState<IChoiceGroupOption[]>(() => {
        return props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,props,selectedValue))
    });
    const [cancelIconProps, setCancelIconProps] = useState<IIconProps>(() => {
        return {iconName:"Cancel"};
    });


    //-Initialization : will happen only once = like a contructor
    useConst(() => {
        initializeIcons();
    });

    //EFFECT HOOKS
    useEffect(() => {
    
        setSelectedValue(props.selected == undefined ? undefined : props.selected.toString());
        setOptions(props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,props,selectedValue)))
        
    }, [props.selected]);


    useEffect(() => {
        selectedValue == undefined ? props.onChange(undefined) :
                                    props.onChange(Number(selectedValue));       
    }, [selectedValue]);

    const onChange=(ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) => {
        if(option != undefined)
        {
            setSelectedValue(option.key);            
        } 
    }

    const onCancel = () => {
        setSelectedValue(undefined);
    }

    

    function getChoiceGroupOption(iconsetup:IIconSetup, props:IProps, selectedValue:string|undefined):IChoiceGroupOption {
        let key:string = iconsetup.key.toString();
        let choicegoupoption:IChoiceGroupOption = {key:key,
                                                    text:iconsetup.text,
                                                    disabled: props.readonly,
                                                    iconProps:{
                                                        iconName:iconsetup.icon,
                                                        style:{
                                                            color:key==selectedValue?
                                                                        props.selectedcolor:
                                                                        undefined
                                                        }
                                                    }
                                                };
        
        return choicegoupoption;
    }

    //STYLES
    const maskedclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });

    //RENDERING
    if(props.icons.length > 5)
    {
        return <div>ERROR : this control is designed for 5 icons or less</div>
    }else if(props.masked){
        return(
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                <FontIcon iconName="Lock" className={maskedclass} />     
                <TextField value="*********" style={{width:"100%"}}/>
            </Stack>
        )
    }else{
    return (
                <Stack horizontal>
                    {props.nullable &&
                        <IconButton 
                            iconProps={cancelIconProps}
                            title="Cancel" 
                            ariaLabel="Cancel" 
                            onClick={onCancel}
                        />
                    }

                    <ChoiceGroup
                        selectedKey={selectedValue}
                        options = {options}
                        onChange={onChange}
                    />
                </Stack>
                
            );
        }

}
export default IconOptionsetControl;


