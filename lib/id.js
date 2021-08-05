module.exports = (d,c,m,msg,args,conf,cn) => {
    if(!args[1]){
        return d.m.s(msg, msg.author.id);
        }
    if(args[1].startsWith('-')){
                options = args[1].substring(1)
                if(options.indexOf('s') !== -1)
                    var res = msg.guild.id
                else if(options.indexOf('u') !== -1){
                    if(msg.mentions.users.first())
                        var res = msg.mentions.users.first().id
                    else if(!args[2])
                        var res = msg.author.id
                    else
                        var res = d.err305(d,m,msg)
                }
                else if(options.indexOf('r') !== -1){
                    if(msg.mentions.roles.first())
                        var res = msg.mentions.roles.first().id
                    else
                        var res = d.err305(d,m,msg)
                }else if(options.indexOf('c') !== -1){
                    if(msg.mentions.channels.first())
                        var res = msg.mentions.channels.first().id
                    else if(!args[2])
                        var res = msg.channel.id
                    else
                        var res = d.err305(d,m,msg)
                }
            d.m.s(msg, res);
            }else{
                d.err(d,m,msg,301)
            }
    }