// Copyright (c) 2018 https://github.com/makitosan . All rights reserved.

// reference https://developer.chrome.com/extensions/downloads#type-DownloadItem
chrome.downloads.onChanged.addListener(function(item) {
  console.log(item);
  if (item.state && item.state.current === "complete") {
    console.log("do something id: " + item.id);
    chrome.downloads.search({id: item.id}, function(results) {
      console.log(results);
      if (results.length !== 1) throw "results has more than one element : " + results.length;
      console.log(results.length);
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          console.log("get local data completed");
          // file.blobData = this.response;
          console.log(this.response);
          // to upload blobData see https://stackoverflow.com/questions/21132971/upload-file-as-a-form-data-through-chrome-extension
        }
      }
      xhr.open('GET', "file://" + results[0].filename);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
});
