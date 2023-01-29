import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from "@fluentui/react";

export const ChoiceGroupOptionStyles = (props:IChoiceGroupOptionStyleProps):IChoiceGroupOptionStyles  => {
    const { checked, disabled, theme } = props;
    const { semanticColors } = theme;
    
    return{
        innerField:[
             disabled && { opacity: 0.5}
        ],
        field: [
            {
              selectors: {
                // The circle
                ':before': [
                  disabled && {
                    backgroundColor: semanticColors.bodySubtext,
                  }
                ],     
                '.ms-ChoiceFieldLabel': {
                  color: disabled ? semanticColors.bodySubtext : semanticColors.bodyText,
                },
              },
            },
            checked &&
              disabled && {
                borderColor: semanticColors.bodyText,
              },
          ],
    }            
   };