import React from 'react';

import Item from './TodoItem.jsx';

export default function(props) {
  return(
    <ul className="list-unstyled">
      {
        props.items.map((item, index) => {
          return (
            <Item
              key={item.uid || index}
              item={item}
              deleteItem={props.deleteItem}
              toggleItemIsDone={props.toggleItemIsDone}
            />
          );
        })
      }
    </ul>
  );
}
