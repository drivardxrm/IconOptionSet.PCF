import * as React from 'react';
import { IconButton,IIconProps, ChoiceGroup, IChoiceGroupOption, Button , Stack} from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';



export interface IProps {
    selected: number | undefined;
    icons: Array<IIconSetup>;
    disabled: boolean;
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


export class IconOptionsetControl extends React.Component<IProps,IState> {

    constructor(props: Readonly<IProps>) {

        initializeIcons();
        super(props);
        this.state = { selectedvalue: (props.selected === undefined ? undefined : props.selected.toString())};
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }

    componentWillReceiveProps(props: IProps) {

        this.setState({selectedvalue : props.selected == undefined ? "" : props.selected.toString()});

    }

    

    onChange(ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) {
        if(option != undefined)
        {
            
            let selected = Number(option.key)

            this.setState({selectedvalue: option.key},)
            this.props.onChange(selected);
            
        }
        
    }

    onCancel() {
         
        this.setState({selectedvalue: undefined});
        this.props.onChange(undefined);   
         
    }

    

    render() {
        
            
            if(this.props.icons.length > 5)
            {
                return <div>ERROR : this control is designed for 5 icons or less</div>
            }


            var options = this.props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,this.props,this.state))
            

            function getChoiceGroupOption(iconsetup:IIconSetup, props:IProps, state:IState):IChoiceGroupOption{
                let key:string = iconsetup.key.toString();
                let choicegoupoption:IChoiceGroupOption = {key:key,
                                                            text:iconsetup.text,
                                                            disabled: props.disabled,
                                                            iconProps:{
                                                                iconName:iconsetup.icon,
                                                                style:{
                                                                    color:key==state.selectedvalue?props.selectedcolor:undefined
                                                                }
                                                            }
                                                        };
                
                return choicegoupoption;
            }

 

            return (
                <Stack horizontal>
                    {this.props.nullable &&
                        <IconButton 
                            iconProps={{iconName:"Cancel"}}
                            title="Cancel" 
                            ariaLabel="Cancel" 
                            onClick={this.onCancel}
                        />
                    }

                    <ChoiceGroup
                        selectedKey={this.state.selectedvalue}
                        options = {options}
                        onChange={this.onChange}
                    />
                </Stack>
                
            );
    }

}

