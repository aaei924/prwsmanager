module.exports = (d,c,m,msg,args,conf,cn) => {
    if(!d.m.p(msg,'ADMINISTRATOR'))
        return d.err(d,m,msg,200);
    
    if(!args[1])
        return d.err(d,m,msg,301);
    
    if(args[1] == 'clear'){
        cn.execute('DELETE FROM `bot_op_alert` WHERE server=?',[msg.guild.id], function(err,results,fields){
            if(err) {
                d.err(d,m,msg,400)
                console.log(err)
            }else
                d.m.s(msg, m.result.logging.clear)
        })
    }else if(args[1].startsWith('-')){
        var options = args[1].substring(1);
        if(options.indexOf('r') == -1){
            if(options.indexOf('u') !== -1){
                cn.execute('INSERT INTO `bot_op_alert` (server,user) VALUES (?,?)',[msg.guild.id,msg.mentions.members.first().id], function(err,results,fields){
                    if(err) {
                        d.err(d,m,msg,400)
                        console.log(err)
                    }else
                        d.m.s(msg, m.result.logging.insert)
                })
            }else if(options.indexOf('c') !== -1){
                cn.execute('INSERT INTO `bot_op_alert` (server, channel) VALUES (?,?)',[msg.guild.id,msg.channel.id], function(err,results,fields){
                    if(err) {
                        d.err(d,m,msg,400)
                        console.log(err)
                    }else
                        d.m.s(msg, m.result.logging.insert)
                })
            }
        }else{
            if(options.indexOf('u') !== -1){
                cn.execute('DELETE FROM `bot_op_alert` WHERE server=? AND user=?',[msg.guild.id,msg.mentions.members.first().id], function(err,results,fields){
                    if(err) {
                        d.err(d,m,msg,400)
                        console.log(err)
                    }else
                        d.m.s(msg, m.result.logging.delete)
                })
            }else if(options.indexOf('c') !== -1){
                cn.execute('DELETE FROM `bot_op_alert` WHERE server=? AND channel=? ',[msg.guild.id,msg.channel.id], function(err,results,fields){
                    if(err) {
                        d.err(d,m,msg,400)
                        console.log(err)
                    }else
                        d.m.s(msg, m.result.logging.delete)
                })
            }
        }
    }
}