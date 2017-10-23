(function(){

    function CompInput(conf){
        
            let inp =  `<div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
            `
            
            switch(conf.type){
                case "text" : {
                    inp = `<input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
                }
                case "number" : {
                    inp = `<input type="number" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
                }
                case "email" : {
                    inp = `<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
                }
                case "password": {
                    inp = `<input type="password" class="form-control" id="exampleInputEmail1" placeholder="Email">`;
                }
            }
        
            var $wrapper = componentWrapper();
        
            $wrapper.append(inp);
        
        
        }
        
        function componentWrapper(fr,lbl){
            return  $(`<div class="form-group">
                        <label for="${fr}">${lbl}</label>
                    </div>`)
        }
})()
