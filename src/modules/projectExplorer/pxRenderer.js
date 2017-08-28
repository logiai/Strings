var fs = require('fs'),
    path = require('path');

function getTreeObj(folderPath) {
    var dirContents = [];
    fs.readdirSync(folderPath).forEach(file => {
        var filePath = path.join(folderPath, file);
        var isDir = fs.statSync(filePath).isDirectory();
        var treeObj = {
            "id": filePath, // ID of the node -> used while sending a AJAX request
            "text": file, // Text appearing on the node
            "icon": isDir ? 'glyphicon glyphicon-folder-open' : 'glyphicon glyphicon-file',
            "state": {
              "opened": false, // should the node be opened on load
              "disabled": false, // is the node disabled?
              "selected": false // is the node selected [checkbox plugin]
            },
            "li_attr": { // custom attrs to li tag
              "file_path": filePath, // path of the current file
              "isLeaf": !isDir // is this node a leaf?
            },
            "children": isDir // does this node have children
          }
        dirContents.push(treeObj);
    });
    return dirContents;
}

function handleClick(evt, data) {
    var filePath = data.node.li_attr.file_path;
    if(fs.statSync(filePath).isFile()) {
        $EG.EditorTabs.createNewTab(path.basename(filePath), filePath);
    } 
}
$EG.PxTree = {
    getTreeObj: getTreeObj,
    handleClick: handleClick
}