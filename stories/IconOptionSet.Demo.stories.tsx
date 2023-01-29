import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useArgs } from '@storybook/client-api';
import IconOptionsetControl from '../IconOptionset/IconOptionsetControl';

export default {
  title: 'IconOptionSet/Demo',
  component: IconOptionsetControl,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' , maxWidth:'350px'}}>
        {Story()}
      </div>
    )
  ],
  args:{
    selected: undefined,
    icons: [{key:1,icon:"EmojiDisappointed",text:"Very Negative"},
            {key:2,icon:"Sad",text:"Negative"},
            {key:3,icon:"EmojiNeutral",text:"Neutral"},
            {key:4,icon:"Emoji2",text:"Positive"},
            {key:5,icon:"Emoji",text:"Very Positive"}],
    readonly:false,
	masked:false,							
	selectedcolor:"#005A9E"
  }
} as ComponentMeta<typeof IconOptionsetControl>;

const Template: ComponentStory<typeof IconOptionsetControl> = (args) => {
  
  const [, updateArgs] = useArgs();
  args.onChange = (selected:number|undefined) => {
    updateArgs({selected: selected})
  }
  return <IconOptionsetControl {...args} />;
} 

export const Default = Template.bind({});

export const DisabledEmpty = Template.bind({});
DisabledEmpty.args = {    
    readonly: true
}

export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
    selected: 3,    
    readonly: true
}

export const Masked = Template.bind({});
Masked.args = {
    selected: 3,    
    masked: true
}


