/* BEGIN: Auto Picker */

import { IBasePicker, IBasePickerSuggestionsProps, IInputProps, ITag, Label, TagPicker } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React from "react";

export const AutoPicker = <T extends any> (props: {
    label: string
    indexProp: string,
    title: string
    items: T[]
    current: any
    send: any
    getTagKeyName: (entity: T) => string
    getTagKeyValue: (entity: T) => string
    sendOnChange?: (item: any) => void
  }) => {
    // All pickers extend from BasePicker specifying the item type.
    const picker = React.useRef<IBasePicker<ITag>>(null);
    const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);
    const {items, label, getTagKeyName, getTagKeyValue, sendOnChange } = props
  
    const inputProps: IInputProps = {
      onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
      onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
    };
    
    const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: 'Suggested tags',
      noResultsFoundText: 'No color tags found',
    };
    
   const tags: ITag[] = items.map(item => ({ key: getTagKeyName(item), name: getTagKeyValue(item) }));
    
   const listContainsTagList = (tag?: ITag, tagList?: ITag[]) => {
      if (!tagList || !tagList.length || tagList.length === 0) {
        return false;
      }
      return tagList.some(compareTag => tag && compareTag.key === tag.key);
    };
    
    const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
      return filterText
        ? tags.filter(
            tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList),
          )
        : [];
    };
    
    const filterSelectedTags = (filter: string, selectedItems?: ITag[]): ITag[] => {
      return filter ? tags.filter(tag => tag.name.toLowerCase().indexOf(filter.toLowerCase()) === 0) : [];
    };
    
    const getTextFromItem = (item: ITag) => item.name;
  
    const onItemSelected = React.useCallback((item?: ITag): ITag | null => {
      if (picker.current && listContainsTagList(item, picker.current.items)) {
        return null;
      }
  
      if(sendOnChange) sendOnChange(item)
  
      return item ?? null;
    }, []);
  
    return(<>
      <Label>{label}</Label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={1}
        disabled={tagPicker}
        inputProps={{
          ...inputProps,
          id: 'picker2',
        }}
      />
    </>)
  
  }