function addCapture(e) {
    var name=prompt("please entre name of this capture","");
    if(name!=null & name!=""){
        var data = {"cname":name,"lat":e.latlng.lat,"lng":e.latlng.lng};
        $.ajax({
            url:'/config',
            type:'post',
            data: data,
            success: function(data,status){
                if(status == 'success'){ 
                    location.href = 'home';
                }
            },
            error: function(data,status){ 
                if(status == 'error'){ 
                    location.href = 'home';
                }
            }
        });     
    }
}

map.on('click', addCapture);
