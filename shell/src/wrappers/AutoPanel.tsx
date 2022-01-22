/* Imports: React
*/
import { Panel, PanelType, IconButton, IBreadcrumbItem } from '@fluentui/react';
import { send } from 'process';
import React from 'react';
import { AppContext } from '../types/AppContext';

/**
 * Auto Panel: State Machine
 *
 */

/**
 * Auto Panel: Props & State
 *
 */


export type AutoTableProps<T> = {
  id: string
  key: string
  title: string
  current: any
  send: any
  actions?: Array<{ crumb: IBreadcrumbItem, content: unknown }>
  isOpen: boolean
}

export type AutoTableState<T> = {
  initialValues?: T
  items?: T[]
  isOpen: boolean,
  activeKey?: string
}


/**
 * Auto Panel: Component
 *
 */

export const AutoPanel = (props: any) => {
    const { current, send } = props

    if(!current || !current.matches) return <></>

    return (
      <Panel
      style={{ top: '43px', paddingLeft: '12px' }}
      isOpen={props.isOpen}
      hasCloseButton={props.hasCloseButton}
      isLightDismiss={true}
      // Use this prop to do special handling *only* for light dismiss.
      // If you provide this, the normal onDismiss won't be called for light dismiss.
      // onLightDismissClick={showDialog}
      // onDismiss={dismissPanel}
      headerText=""
      isBlocking={false}
      type={PanelType.customNear}
      customWidth="74px"
      layerProps={ {hostId: "header" }}
    >
      {props.children}  
    </Panel> 
    )
  };
  