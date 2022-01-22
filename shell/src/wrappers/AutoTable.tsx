/* BEGIN: Form Builder */

import { IExampleItem } from "@fluentui/example-data";
import { IBreadcrumbItem, IColumn, IconButton, ICommandBarItemProps, IButtonProps, IStackItemStyles, IStackTokens, IStackStyles, Stack, MessageBar, MessageBarButton, MessageBarType, Link, Breadcrumb, CommandBar, Panel, DetailsList, DetailsListLayoutMode } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import React from "react";
import { AutoButton } from "../widgets/AutoButton";
import { AutoForm } from "./AutoForm";

export type AutoTableProps<T> = {
    id: string
    title: string
    newButtonText: string
    newButtonOpen?: any | undefined
    selectedEntity?: T
    initialValues?: T
    items?: T[]
    current: any
    send: any
    isActive: boolean
    isCompact?: boolean
    allowCrud: boolean
    actions?: Array<any>
    tables?: Array<any>
    isOpen: boolean,
    onActiveItemChange: (item?: T, index?: number, ev?: React.FocusEvent<HTMLElement>) => void
    customCrumbRoot?: () => IBreadcrumbItem[]
  }
  
  export type AutoTableState<T> = {
    initialValues?: T
    items?: T[]
    isOpen: boolean,
    activeKey?: string
  }
  
  export class AutoTable<T> extends React.Component<AutoTableProps<T>, AutoTableState<T>> {
  
    state: AutoTableState<T> = { 
      isOpen: this.props.isOpen
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
  
    onDelete() {
      //this.items = this._items.filter((el: any) =>  JSON.stringify(el) !== JSON.stringify(this._selectedEntity))
    }
  
    handleSubmit(){
      this.props.send({
        type: "<NEED_WAY_TO_GET_POLYPHORPHIC_COMMAND_BY_CONVENTION>",
        value: this.props.items
      })
    }
  
    handleChange(event: any, newValue?: string) {
      var key : string = event.target.id;
      var value : any = event.target.value;
      let delta = { [key]: value };
      Object.assign(this.props.selectedEntity, delta);
    }
  
    columns() {
      var res: IColumn[] = Object.entries(this.props.initialValues ? this.props.initialValues : {}).map(x => {
        var capitalArray : Array<string> = [];
        x[0].split(/(?=[A-Z])/).map(word => capitalArray.push(word[0].toUpperCase() + word.substr(1))); // capitalize each word into a new array
        var prettyLabel = capitalArray.join(' ')
        var minWidth = x[0] === 'id' || this.props.isCompact ? 200 : (x[0] === 'actions') ? 500 : 300
        return {
          key: x[0],
          name: prettyLabel,
          minWidth: minWidth
        }
      })
  
      res.push({
        key: 'action',
        name: 'Action(s)',
        minWidth: 200
      })
  
      return res;
    }
  
    render() {
  
      /* BEGIN: BreadCrumbs */
  
      function _onBreadcrumbItemClicked(ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem): void {
        console.log(`Breadcrumb item with key "${item?.id}" has been clicked.`);
      }
  
      /* END: BreadCrumbs */
  
      const onRenderItemColumn = (item: any, index: number | undefined, column: IColumn | undefined): JSX.Element | React.ReactText => {
        if (column === undefined) return <></>
  
        if (column && column.key && column.key === 'action') {
          
          let results = this.props.actions?.map(x => {
            
            if(x.props.stateTrigger && x.props.stateTrigger !== '' && x.props.stateTrigger !== undefined) {
              return <IconButton 
                        style={{ marginRight: '20px' }}
                        iconProps={
                          { 
                            iconName: x.props.iconName,
                            style: { fontSize: '24px', color: '#000000' } 
                          }
                        } 
                        title={x.props.title} 
                        key={x.props.key} 
                        onClick={(e) => {
                          if(x.props.customSend) { x.props.customSend(item) } 
                          x.props.send({type: x.props.stateTrigger, value: item })
                        } 
                        }
                      /> 
            }
            return <AutoButton<T> ordinal={1} crumb={{ text: x.props.title, key: x.props.key }} current={this.props.current} iconName={x.props.iconName} send={this.props.send} title={x.props.title} key={x.props.key} onClick={x.props.onClick} onDismiss={x.props.onDismiss} entity={item} isOpen={x.props.isOpen} />
          })
          return <span style={{ fontSize: '18px', color: '#000000' }}>{results}</span>
        }
  
        return item[column.key as keyof IExampleItem];
      };
  
      var capitalArray : Array<string> = [];
      this.props.title.split(/(?=[A-Z])/).map(word => capitalArray.push(word[0].toUpperCase() + word.substr(1))); // capitalize each word into a new array
      var prettyLabel = capitalArray.join(' ')
  
      let itemsWithHeading: IBreadcrumbItem[] = [] 

      if(this.props.customCrumbRoot){
        let crumbs = this.props.customCrumbRoot()
        itemsWithHeading = [...itemsWithHeading, ...crumbs]
      } else {
        itemsWithHeading.push({ text: prettyLabel, key: this.props.id, onClick: _onBreadcrumbItemClicked })
      }

      this.props.actions?.forEach(x => {
        if(x.crumb) {
          var c = x.crumb as IBreadcrumbItem
          itemsWithHeading.push(c) 
        }
      })
      
      const _items: ICommandBarItemProps[] = [
        {
          key: 'newItem',
          text: this.props.newButtonText,
          iconProps: { iconName: 'Add' },
          onClick: (e) => {
            if (this.props.newButtonOpen) {
              this.props.newButtonOpen()
            } 
            this.open() 
          }
        }
      ];
  
      const NavPanel: React.FunctionComponent = () => {
        // Non-mutating styles definition
        const stackItemStyles: IStackItemStyles = {
          root: {
            alignItems: 'center',
            // background: DefaultPalette.themePrimary,
            // color: DefaultPalette.white,
            display: 'flex',
            height: 50,
            justifyContent: 'center',
            overflow: 'hidden',
          },
        };
        
        const nonShrinkingStackItemStyles: IStackItemStyles = {
          root: {
            alignItems: 'center',
            // background: DefaultPalette.themePrimary,
            // color: DefaultPalette.white,
            display: 'flex',
            height: 50,
            justifyContent: 'left',
            overflow: 'hidden',
            width: 500,
          },
        };
  
        // Tokens definition
        const outerStackTokens: IStackTokens = { childrenGap: 5 };
        const innerStackTokens: IStackTokens = {
          childrenGap: 5,
          padding: 10,
        };
  
        const [stackWidth/*, setStackWidth */] = React.useState<number>(100);
  
          // Mutating styles definition
          const stackStyles: IStackStyles = {
            root: {
              // background: DefaultPalette.themeTertiary,
              overflow: 'hidden',
              width: `${stackWidth}%`,
            },
          };
  
        return (
          <Stack tokens={outerStackTokens}>
            <Stack horizontal styles={stackStyles} tokens={innerStackTokens}>
              <Stack.Item grow styles={nonShrinkingStackItemStyles}>
                <Crumbs />
              </Stack.Item>
              <Stack.Item grow styles={stackItemStyles}>
                {this.props.current.matches('load_applications.notifications.show') && <Toast />}
              </Stack.Item>
            </Stack>
          </Stack>
        );
      }
      
      const Toast: React.FunctionComponent = () => {
          return (
          <MessageBar
            actions={
              <div>
                <MessageBarButton 
                  onClick={(e) => this.props.send('DISMISS_NOTIFICATION') }
                >
                  Ok
                </MessageBarButton>
              </div>
            }
            messageBarType={MessageBarType.success}
            isMultiline={false}
          >
            Success MessageBar with single line and action buttons.
            <Link href="www.bing.com" target="_blank" underline>
              Visit our website.
            </Link>
          </MessageBar>
        );      
      }
  
      const Crumbs: React.FunctionComponent = () => {
        return (
          <div>
            <Breadcrumb
              items={itemsWithHeading}
              ariaLabel="With last item rendered as heading"
              overflowAriaLabel="More links"
              style={{ marginTop: "-15px", marginBottom: "10px", paddingTop: "0px" }}
            />
          </div>
        );
      };
      
      if(!this.props.items && this.props.isActive) {
        return <div> No items to display!</div>
      }
  
      return (
        <ThemeProvider>
          <div style={{background: '#E5E5E5'}}>
            <div style={{ display: this.props.isActive ? 'block' : 'none' }}>
              <NavPanel />
              <CommandBar
                style={{ display: this.props.allowCrud ? 'block' : 'none' }}
                items={_items}
                ariaLabel="New"
              />
                <Panel
                  headerText={`Create ${this.props.title}`}
                  isOpen={this.state.isOpen}
                  onDismiss={(e) => this.close() }
                  // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                  closeButtonAriaLabel="Close"
                >
                  <hr />
                  {
                    new AutoForm<T>(this.props.initialValues? this.props.initialValues : {} as T).render(this.props.initialValues? this.props.initialValues : {} as T) 
                  }
                </Panel>
              <div style={{maxHeight: '625px', minWidth: '95%', display: this.props.isActive ? 'block' : 'none' , overflowX: 'hidden', overflowY: 'scroll', background: '#E5E5E5'}}>
                <DetailsList 
                  setKey="hoverSet" 
                  items={this.props.items ?? []} 
                  columns={this.columns()} 
                  compact={this.props.isCompact? this.props.isCompact : false }
                  layoutMode={DetailsListLayoutMode.fixedColumns}
                  onActiveItemChanged={this.props.onActiveItemChange} 
                  onRenderItemColumn={onRenderItemColumn}
                  onRenderDetailsHeader={ (props, defaultRender) => (
                    <div>
                      {props && defaultRender && defaultRender({...props, styles: {root: {background: '#E5E5E5', color: '#000000', fontWeight: 700, fontFamily: 'Karla', fontSize: '18px'}}})}            
                    </div>
                  ) }
                  onRenderRow={ (props, defaultRender) => (
                    <div>
                      {props && defaultRender && defaultRender({...props, styles: {root: {background: '#E5E5E5', color: '#000000', fontWeight: 400, fontFamily: 'Karla', fontSize: '18px' }}})}            
                    </div>
                  ) }
                  styles={{ root: { fontSize: '24px', background: '#E5E5E5' }}}
                />
                {this.props.tables &&
                  Object.entries(this.props.tables).map(x => {
                    return x
                  })
                }
              </div>
            </div>
            {this.props.children}
          </div>
        </ThemeProvider>
      );
    }
  }