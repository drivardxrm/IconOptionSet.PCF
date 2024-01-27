//import * as React from 'react';
//import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { Meta, StoryObj } from '@storybook/react';

import { useArgs } from '@storybook/preview-api';
import IconOptionsetControl from '../IconOptionset/IconOptionsetControl';

// export default {
//   title: 'IconOptionSet/Demo',
//   component: IconOptionsetControl,
//   decorators: [
//     (Story) => (
//       <div style={{ margin: '3em' , maxWidth:'350px'}}>
//         {Story()}
//       </div>
//     )
//   ],
//   args:{
//     selected: undefined,
//     icons: [{key:1,icon:"EmojiDisappointed",text:"Very Negative"},
//             {key:2,icon:"Sad",text:"Negative"},
//             {key:3,icon:"EmojiNeutral",text:"Neutral"},
//             {key:4,icon:"Emoji2",text:"Positive"},
//             {key:5,icon:"Emoji",text:"Very Positive"}],
//     readonly:false,
// 	masked:false,							
// 	selectedcolor:"#005A9E"
//   }
// } as Meta<typeof IconOptionsetControl>;


const meta: Meta<typeof IconOptionsetControl> = {
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
  },
};
export default meta;
type Story = StoryObj<typeof IconOptionsetControl>;

// const Template: Story = {
  
//   const [, updateArgs] = useArgs();
//   args.onChange = (selected:number|undefined) => {
//     updateArgs({selected: selected})
//   }
//   return <IconOptionsetControl {...args} />;
// } 

export const Default: Story = {

 };

//export const Default = Template.bind({});

export const DisabledEmpty:Story = {
  args: {
    ...Default.args,
    readonly: true
  }, 
}

export const DisabledSelected:Story = {
  args: {
    ...Default.args,
    selected: 3,    
    readonly: true
  }, 
}

export const Masked:Story = {
  args: {
    ...Default.args,
    selected: 3,    
    masked: true
  }, 
}


// export const DisabledSelected = Template.bind({});
// DisabledSelected.args = {
//     selected: 3,    
//     readonly: true
// }

// export const Masked = Template.bind({});
// Masked.args = {
//     selected: 3,    
//     masked: true
// }


