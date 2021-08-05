module.exports = (d,c,m,msg,args,conf,cn) => {
    function sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }
    
    if (args[1] == 'test'){
        if(msg.author !== conf.master)
            return d.err(d,m,msg,200);
        
        for (i=0; i<args[2]; i++){
            d.m.s(msg, i+1)
            sleep(1000);
        }
        return d.m.s(msg, 'Done!');
    }
    var mc = parseInt(args[1]);
    if (!args[1])
        var code = 301
    else if (isNaN(mc))
        var code = 303
    else if (mc < 1)
        var code = 302
    else if (mc > 500 && msg.author !== conf.master)
        var code = 304
    if(code){
        return d.err(d,m,msg,code);;
    }
    var count = mc + 1;
    
    while (count >= 1){
        if(count > 100)
            var countTemp = 100;
        else
            var countTemp = count;
        d.m.d.b(msg,countTemp).catch((err) => {
            console.log(err)
            return d.m.r(msg, 'ERROR');
        })
        count -= 100
    }
}
