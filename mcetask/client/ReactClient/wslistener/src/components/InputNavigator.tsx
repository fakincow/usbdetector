import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export function FileSystemNavigator({ tree }) {
  const [mainCategory, setMainCategory] = React.useState([]);

  let initNumber = 0;
  React.useEffect(() => {
    let newMenu = [];
    for (let key in tree) {
      let catItem = {
        name: key,
        children: tree[key]
      }
      newMenu.push(catItem);
    }
    setMainCategory(newMenu)
  }, [tree]);
  return (
    <div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 340, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {mainCategory.map((e, i) => {
          initNumber++
          return <TreeItem nodeId={initNumber.toString()} label={e.name} key={i}>
            {e.children.map((e, i) => {
              initNumber++
              return <TreeItem nodeId={initNumber.toString()} label={e['productId']} key={i} />
            })}
          </TreeItem>
        })}
      </TreeView>
    </div>
  );
}