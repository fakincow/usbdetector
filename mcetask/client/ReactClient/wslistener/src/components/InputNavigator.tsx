import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Modal } from "antd";

export function FileSystemNavigator({ tree }) {
  const [mainCategory, setMainCategory] = React.useState([]);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [selectedItemLabel, setSelectedItemLabel] = React.useState();
  const [selectedItemDescription, setSelectedItemDescription] = React.useState();
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
  const onSelect = (e) => {
    console.log('onselect',e)
    setSelectedItemLabel(e.deviceName);
    setShowPrompt(true)

  }
  const handleOK = () => {
    setShowPrompt(false)

  }
  const handleCancel = () => {
    setShowPrompt(false)
  }
  return (
    <div className="bg-gray-100 w-full">
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height:440, flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
      >
        {mainCategory.map((e, i) => {
          initNumber++
          return <TreeItem nodeId={initNumber.toString()} label={e.name} key={i}>
            {e.children.map((e, i) => {
              initNumber++
              return <TreeItem nodeId={initNumber.toString()} label={e['productId']} key={i} onClick={()=> onSelect(e)} />
            })}
          </TreeItem>
        })}
      </TreeView>
      <Modal
      title={selectedItemLabel}
      visible={showPrompt}
      onOk={handleOK}
      onCancel={handleOK}
      okText="CLOSE"
      cancelText="CLOSE"
      closable={true}
    >
      SELECTED ITEM DETAILS
    </Modal>
    </div>
  );
}