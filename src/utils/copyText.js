const copyText = async text => await navigator.clipboard.writeText(text);
copyText('单行代码 前端世界');
