import React  from "react";

import { TextField, Dropdown, Checkbox, IDropdownOption, IDropdownStyles, PrimaryButton } from "@fluentui/react";

/** Formik */

import { Formik } from "formik";

/** Yup */
import * as Yup from "yup";

export interface IAutoFormField<T> {
    id: string, // a distinct id
    key: string, // key lookup value
    label: string, // display value
    onGetErrorMessage: (value: string) => string, // error message
    schema: Yup.StringSchema, // Yup validation schema
    type: typeof TextField | typeof Dropdown | typeof Checkbox // Supported controls
    initialValue: T // An inital/selected value is required for inital render
  }
  
  // This is where it gets intereting. Interfaces only have meaning at compile time. We are using them as a hint here but cannot add any contraints on type signature
  // The result is any issues here will be resolved at runtime when the (trans)compiled versions of the code can be evaluated.
  // Example usage: var userProfileForm = new AutoForm<UserProfile>(UserProfile); return <> {userProfileForm.render()} </>
  export class AutoForm<T> {
  
    _entity: T
    _fields?: IAutoFormField<T>[]
    _schema?: any
    _lookup: Array<{ key: string; options: IDropdownOption[]; }> = []
  
    _dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
  
    constructor(entity: T) {
      this._entity = entity
      this._fields = undefined
      this._schema = this.generateSchema()
      this._lookup = []
    }
  
    generateSchema() {
  
    }
  
    generateField(key: string, v: any) {
      if (v === 'Undefined') {
        return <Dropdown
          label="Location Code"
          selectedKey={v ? v ?? '' : undefined}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={() => console.log("ok")}
          placeholder="Select an option"
          options={this._lookup.filter(x => x.key === key)[0].options}
          styles={this._dropdownStyles}
        />
      } else {
        var capitalArray : Array<string> = [];
        key.split(/(?=[A-Z])/).map(word => capitalArray.push(word[0].toUpperCase() + word.substr(1))); // capitalize each word into a new array
        var prettyLabel = capitalArray.join(' ')
        return <TextField disabled={key === 'id'} label={prettyLabel} id={key} value={v} />
      }
    }
  
    render(entity: T) {
      if(!entity) {
        return (<h3>No record to parse.</h3>)
      }
      return(
        <Formik
          initialValues={entity}
          validationSchema={this.generateSchema()}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => {
            const {
              isValid,
              dirty
            } = formik;
              return (
                <div>
                  {Object.entries(entity).map(x => {
                    return this.generateField(x[0], x[1])
                  })
                  }
                                    <br />
                    <PrimaryButton
                      style={{backgroundColor: '#FFC700'}}
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)}
  
                    >
                      CREATE
                    </PrimaryButton>
                    <br />
                    <hr />
                    <p>
                      <em>
                        <small>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </small>
                      </em>
                    </p>
                </div>
              )
            }
          }
        </Formik>);
    }
  }