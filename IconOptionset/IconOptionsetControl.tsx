import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import { initializeIcons, IIconProps, IconButton, Stack, ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";

import { ChoiceGroupOptionStyles } from './Styles/ChoiceGroupOptionStyle';
import MaskedInput from './MaskedInput';

export interface IIconOptionsetProps {
    selected: number | undefined;
    icons: Array<IIconSetup>;
    readonly: boolean;
    masked: boolean; 
    selectedcolor: string | undefined;
    onChange: (selected:number|undefined) => void;
}

export interface IIconSetup {
    key : number
    icon: string;
    text: string;
}

initializeIcons();


const IconOptionsetControl = (props : IIconOptionsetProps): React.JSX.Element => {

    //STATE VARIABLES
    const [selectedValue, setSelectedValue] = useState<string|null>(props.selected == undefined ? null : props.selected.toString());
    const [options, setOptions] = useState<IChoiceGroupOption[]>(() => {
        return props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup))
    });

    const firstUpdate = useRef(true);

    // //EFFECT HOOKS
    useEffect(() => {
        if (firstUpdate.current) { // skip on first update 
            firstUpdate.current = false;
             return;
        }
        let updatedValue = selectedValue == undefined ? undefined : Number(selectedValue)
        props.onChange(updatedValue);
        setOptions(props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup)))
        
    }, [selectedValue]);

    useEffect(() => {
        setSelectedValue(props.selected == undefined ? null : props.selected.toString());
    }, [props.selected]);

    const onChange=(ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) => { 
        if(option != undefined)
        {
            setSelectedValue(option.key);            
        }                         
    }

    const onCancel = () => {
        setSelectedValue(null)  
    }

    function getChoiceGroupOption(iconsetup:IIconSetup):IChoiceGroupOption {
        let key:string = iconsetup.key.toString();
        let choicegoupoption:IChoiceGroupOption = { styles: ChoiceGroupOptionStyles,
                                                    key:key,
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

    const cancelIconProps:IIconProps = {iconName:"Cancel"}

    if(props.icons.length > 5)
    {
        return <div>ERROR : this control is designed for 5 icons or less</div>
    }else if(props.masked){
        return(
            <MaskedInput/>
        )
    }else{
    return (
                <Stack horizontal>
                    {!props.readonly &&
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


