import * as React from 'react';
import { IconButton,IIconProps, ChoiceGroup, IChoiceGroupOption, Button , Stack} from 'office-ui-fabric-react';
import { TextField} from "office-ui-fabric-react/lib/index"; 
import { FontIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { initializeIcons } from '@uifabric/icons';
import { useState, useEffect } from "react";


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
    const [options, setOptions] = useState<IChoiceGroupOption[]|undefined>(undefined);
    const [cancelIconProps, setCancelIconProps] = useState<IIconProps|undefined>(undefined);


    //EFFECT HOOKS
    //-Initialization : will happen only once = like a contructor
    useEffect(() => {
        initializeIcons();
        setOptions(props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,props,selectedValue)))
        setCancelIconProps({iconName:"Cancel"});
    }, []); 

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

    if(props.icons.length > 5)
    {
        return <div>ERROR : this control is designed for 5 icons or less</div>
    };

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
    if(props.masked){
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


// export class IconOptionsetControl extends React.Component<IProps,IState> {

//     constructor(props: Readonly<IProps>) {

//         initializeIcons();
//         super(props);
//         this.state = { selectedvalue: (props.selected === undefined ? undefined : props.selected.toString())};
//         this.onChange = this.onChange.bind(this);
//         this.onCancel = this.onCancel.bind(this);

//     }

//     componentWillReceiveProps(props: IProps) {

//         this.setState({selectedvalue : props.selected == undefined ? "" : props.selected.toString()});

//     }

    

//     onChange(ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) {
//         if(option != undefined)
//         {
            
//             let selected = Number(option.key)

//             this.setState({selectedvalue: option.key},)
//             this.props.onChange(selected);
            
//         }
        
//     }

//     onCancel() {
         
//         this.setState({selectedvalue: undefined});
//         this.props.onChange(undefined);   
         
//     }

    

//     render() {
        
            
//             if(this.props.icons.length > 5)
//             {
//                 return <div>ERROR : this control is designed for 5 icons or less</div>
//             }


//             var options = this.props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,this.props,this.state))
            

//             function getChoiceGroupOption(iconsetup:IIconSetup, props:IProps, state:IState):IChoiceGroupOption{
//                 let key:string = iconsetup.key.toString();
//                 let choicegoupoption:IChoiceGroupOption = {key:key,
//                                                             text:iconsetup.text,
//                                                             disabled: props.disabled,
//                                                             iconProps:{
//                                                                 iconName:iconsetup.icon,
//                                                                 style:{
//                                                                     color:key==state.selectedvalue?props.selectedcolor:undefined
//                                                                 }
//                                                             }
//                                                         };
                
//                 return choicegoupoption;
//             }

 

//             return (
//                 <Stack horizontal>
//                     {this.props.nullable &&
//                         <IconButton 
//                             iconProps={{iconName:"Cancel"}}
//                             title="Cancel" 
//                             ariaLabel="Cancel" 
//                             onClick={this.onCancel}
//                         />
//                     }

//                     <ChoiceGroup
//                         selectedKey={this.state.selectedvalue}
//                         options = {options}
//                         onChange={this.onChange}
//                     />
//                 </Stack>
                
//             );
//     }

// }

