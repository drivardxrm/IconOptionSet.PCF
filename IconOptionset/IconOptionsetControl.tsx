import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { initializeIcons } from '@uifabric/icons';



export interface IProps {
    selected: number | undefined;
    icons: Array<IIconSetup>;
    
    selectedcolor: string | undefined;
    onChange: (selected:number|undefined) => void;
}

export interface IIconSetup {
    key : number
    icon: string;
    text: string;
}

export interface IState {
    selectedvalue: string;
}


export class IconOptionsetControl extends React.Component<IProps,IState> {

    constructor(props: Readonly<IProps>) {

        initializeIcons();
        super(props);
        this.state = { selectedvalue: (props.selected === undefined ? "" : props.selected.toString())};
        this.onChange = this.onChange.bind(this);

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

    render() {
        
            
            if(this.props.icons.length > 5)
            {
                return <div>ERROR : this control is designed for 5 icons or less</div>
            }


            var options = this.props.icons.map(iconsetup=>getChoiceGroupOption(iconsetup,this.props.selectedcolor,this.state.selectedvalue))
            

            function getChoiceGroupOption(iconsetup:IIconSetup,selectedcolor:string|undefined, selectedvalue:string):IChoiceGroupOption{
                let key:string = iconsetup.key.toString();
                let choicegoupoption:IChoiceGroupOption = {key:key,
                                                            text:iconsetup.text,
                                                            iconProps:{
                                                                iconName:iconsetup.icon,
                                                                style:{
                                                                    color:key==selectedvalue?selectedcolor:undefined
                                                                }
                                                            }
                                                        };
                
                return choicegoupoption;
            }

            return (
                
                <ChoiceGroup
                    selectedKey={this.state.selectedvalue}
                    options = {options}
                    
                    onChange={this.onChange}
                />
            );
    }

}

