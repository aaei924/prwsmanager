module.exports = (d,c,m,msg,args,conf,cn) => {
    cn.connect();
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
                var res = {
                    color: 0x65D46E,
                    title: '로깅 설정 초기화',
                    author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                    description: m.result.logging.clear,
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.guild.iconURL(),
                        text: msg.guild.name
                    }
                }
                d.m.s(msg, {embed: res})
        })
    }else if(args[1].startsWith('-')){
        var options = args[1].substring(1);
        if(options.indexOf('h') !== -1){
            var help = '';
                help += 'r : 설정 삭제 - 추가 옵션 필요\n'
                help += 'c : 채널에다 로깅\n'
                help += 'u : 사용자 DM에다 로깅\nᅟ'
            var res = {
                color: 0x0099ff,
                title: '로깅 도움말',
                author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                timestamp: new Date(),
                fields: [
                    {name: '옵션', value: help},
                    {name: '기타', value: 'clear : 해당 서버에서의 로깅 설정 초기화'}
                ],
                footer: {
                    icon_url: msg.guild.iconURL(),
                    text: msg.guild.name
                }
            }
            d.m.s(msg, {embed: res})
        }else if(options.indexOf('r') == -1){
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
                    }else{
                        var res = {
                            color: 0x65D46E,
                            title: '로깅 설정 변경',
                            author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                            description: m.result.logging.insert,
                            timestamp: new Date(),
                            footer: {
                                icon_url: msg.guild.iconURL(),
                                text: msg.guild.name
                            }
                        }
                        d.m.s(msg, {embed: res})
                    }
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
                    }else{
                        var res = {
                            color: 0x65D46E,
                            title: '로깅 설정 변경',
                            author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                            description: m.result.logging.delete,
                            timestamp: new Date(),
                            footer: {
                                icon_url: msg.guild.iconURL(),
                                text: msg.guild.name
                            }
                        }
                        d.m.s(msg, {embed: res})
                    }
                })
            }
        }
    }
}