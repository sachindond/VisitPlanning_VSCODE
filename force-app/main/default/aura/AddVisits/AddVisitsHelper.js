({
    // helper to get list of object from custom setting thru apex controller
    getObjectList : function(component, event, helper) {
        var action = component.get("c.getObjectListFromCustomSetting");
        action.setCallback(this,function(res){
            if(res.getState()==="SUCCESS"){
                console.log("*** return object list *** ",res.getReturnValue());
                var options = [];
                var returnObjectList = res.getReturnValue();
                console.log("*** returnObjectList length *** ",returnObjectList.length);
                if(returnObjectList.length>0){
                    for(var i=0;i<returnObjectList.length;i++){
                        if(i==0){
                            component.set('v.selectedValue', returnObjectList[i].objectAPIName);
                            options.push({value:returnObjectList[i].objectAPIName,label:returnObjectList[i].objectLabel,selected:true});
                        }else{
                            options.push({value:returnObjectList[i].objectAPIName,label:returnObjectList[i].objectLabel});
                        }
                    }
                    component.set('v.ObjectOptions', options);
                }
                console.log("**Object OPtions ***",options);
            }
        });
        $A.enqueueAction(action);
    },
    showToastMessage : function(message,title,type){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title":title ,
            "message": message,
            "type":type
        });
        toastEvent.fire();
    }
    
})