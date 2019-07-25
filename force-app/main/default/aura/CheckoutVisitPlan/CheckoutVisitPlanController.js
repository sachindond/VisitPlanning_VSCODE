({
	// method to upload files on visit planning record
    uploadFilesOnVisitPlan: function (component, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
        var arrayOfFiles=[];
        console.log("**uploadedFiles",uploadedFiles);
        // code here to show file names;
        if(uploadedFiles.length>0){
            for(var i=0;i<uploadedFiles.length;i++){
                arrayOfFiles.push(uploadedFiles[i].name);  
            }
            console.log("****arry of files",arrayOfFiles.join(","));
            component.set("v.uploadedFilesList",arrayOfFiles.join(","));
        }
    },
    // on save checkout button need to save checkout comment 
    onClickSaveVisitPlanRecordCheckoutDetailsButton:function (component,event,helper) {
        console.log('***** Save in Checkout Cmp ****');
        helper.getLatLongOfLoggedInUser(component,event,helper);
    },
    doInit: function (component,event,helper) {
         console.log('***** doInit ****');
    }
    
})