/* Imports: React
*/
import React from 'react';

import { Panel, PanelType } from '@fluentui/react';

/**
 * Auto Nav: State Machine
 *
 */

/**
 * Auto Nav: Props
 *
 */

export interface IAutoNavProps {}
 
/**
 * Auto Nav: State
 *
 */

export interface IAutoNavState {}


/**
 * Auto Nav: Component
 *
 */

export const AutoNav = (props: any) => {
    // const { current, send } = props

    return (
      <Panel
      style={{ top: '47px', paddingLeft: '12px' }}
      isOpen={true}
      isLightDismiss={true}
      // Use this prop to do special handling *only* for light dismiss.
      // If you provide this, the normal onDismiss won't be called for light dismiss.
      // onLightDismissClick={showDialog}
      // onDismiss={dismissPanel}
      headerText=""
      isBlocking={false}
      hasCloseButton={false}
      type={PanelType.customNear}
      customWidth="74px"
      layerProps={ {hostId: "header" }}
    >
      {props.children}
    </Panel>
    )
  };
  
  