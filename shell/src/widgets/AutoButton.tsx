import { BaseButton, Button, IBreadcrumbItem, IconButton, Panel } from "@fluentui/react";
import React, { MouseEventHandler, SyntheticEvent } from "react";
import { AutoForm } from "../wrappers/AutoForm";

export type AutoButtonProps<T> = {
    current: any
    send: any
    title: string,
    iconName: string,
    key: string,
    onClick: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement | undefined>
    onDismiss: (ev?: SyntheticEvent<HTMLElement, Event> | undefined) => void
    entity: T,
    isOpen: boolean, // the state we will use to trigger panel open
    stateTrigger?: string // The state we are waiting for to be considered 'active'
    crumb?: IBreadcrumbItem,
    ordinal: number
  }
  
  export type AutoButtonState<T> = {
    current: any
    send: any
    title: string,
    iconName: string,
    key: string,
    entity?: T,
    isOpen: boolean, // the state we will use to trigger panel open
    stateTrigger?: string
  }
  
  export class AutoButton<T> extends React.Component<AutoButtonProps<T>, AutoButtonState<T>> {
  
    state: AutoButtonState<T> = { 
      current: undefined, 
      send: undefined, 
      iconName: 'Edit',
      title: "<REPLACE>", 
      key: "<REPLACE",
      isOpen: false
    }
  
    open() {
      this.setState({
        isOpen: true
      });
    }
  
    close() {
      this.setState({
        isOpen: false
      });
    }
  
    render() {
      return <span style={{marginRight: '13px'}}>
          <IconButton iconProps={{ iconName: this.props.iconName, style: { fontSize: '24px', color: '#666666', marginRight: '12px' } }} title={this.props.title} ariaLabel={this.props.title} onClick={(e) => { this.open() } }  />
          <Panel
            headerText={`Edit ${this.props.title}`}
            isOpen={this.state.isOpen}
            onDismiss={(e) => this.close() }
            // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
            closeButtonAriaLabel="Close"
          >
            <hr />
            { 
              new AutoForm<T>(this.props.entity).render(this.props.entity) 
            }
          </Panel>
        </span>
    }
  }