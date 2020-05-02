
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  IconOptionsetControl, {IProps, IIconSetup } from "./IconOptionsetControl";

export class IconOptionset implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _selected: number | undefined;

	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _props: IProps = { selected: undefined, 
								icons: [],
								readonly:false,
								masked:false,
								nullable:false,								
								selectedcolor:"", 
								onChange : this.notifyChange.bind(this) };
	
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{

		// Add control initialization codeà
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");

		container.appendChild(this._container);
	}

	notifyChange(selected: number|undefined) {
		
		this._selected = selected;
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		let isVisible = context.mode.isVisible
		
		// If the form is diabled because it is inactive or the user doesn't have access
		// isControlDisabled is set to true
		let isReadOnly = context.mode.isControlDisabled;

		let isMasked = false;
		// When a field has FLS enabled, the security property on the attribute parameter is set
		if (context.parameters.optionset.security) {
			isReadOnly = isReadOnly || !context.parameters.optionset.security.editable;
			isVisible = isVisible && context.parameters.optionset.security.readable;
			isMasked = isVisible && !context.parameters.optionset.security.readable
		}

		if(!isVisible || context.parameters.optionset.attributes == null){
			return;
		}
		this._selected = context.parameters.optionset.raw !== null ? context.parameters.optionset.raw : undefined;

		let options:ComponentFramework.PropertyHelper.OptionMetadata[] 
				= context.parameters.optionset.attributes.Options;

		let icons:Array<string> = [context.parameters.icon1.raw || "",
									context.parameters.icon2.raw || "",
									context.parameters.icon3.raw || "",
									context.parameters.icon4.raw || "",
									context.parameters.icon5.raw || ""];
		
		
		this._props.selected = this._selected;
		this._props.icons = this.getIconSetups(options,icons);
		this._props.selectedcolor = context.parameters.selectedcolor.raw || "";
		this._props.readonly = isReadOnly;
		this._props.masked = isMasked;
		this._props.nullable = true; //todo add as a parameter in mamnifest

		ReactDOM.render(
			React.createElement(IconOptionsetControl, this._props)
			, this._container
		);

		
		
	}

	
	private getIconSetups(options:Array<ComponentFramework.PropertyHelper.OptionMetadata>, icons:Array<string>) : Array<IIconSetup>
	{
		return options.map((option,index)=>this.getIconSetup(option,icons[index]));
	}

	private getIconSetup(option:ComponentFramework.PropertyHelper.OptionMetadata, icon:string) : IIconSetup
	{
		return {key:option.Value,icon:icon,text:option.Label};
	}


	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			optionset: this._selected
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}