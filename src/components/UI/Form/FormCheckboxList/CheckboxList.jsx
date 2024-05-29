import React from 'react';

const CheckboxList = ({register, searchData, setItems, listItems, children, icon}) => {
    const itemComponent = (data) => {
        const childrenClone = React.Children.map(children, (child) => {
            return React.cloneElement(child, {...child.props, register, icon, searchData, setItems, data});
        });

        return childrenClone;
    }

    return listItems?.map(item => itemComponent(item));
};

export default CheckboxList;