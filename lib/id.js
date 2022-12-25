module.exports = (d,c,m,msg,args,conf,cn) => {
    if(!args[1]){
        return d.m.s(msg, msg.author.id);
    }
    if(args[1].startsWith('-')){
        options = args[1].substring(1)
        if(options.indexOf('h') !== -1){
            var help = '';
                help += 's : 서버 ID\n'
                help += 'c : 채널 ID\n'
                help += 'r : 역할 ID\n'
                help += 'u : 사용자 ID\n'
            var res = {
                color: 0x0099ff,
                title: '명령어 도움말',
                author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                timestamp: new Date(),
                fields: [
                    {name: '옵션', value: help+'ᅟ'},
                    {name: '파라미터', value: '채널이나 사용자를 멘션할 경우 해당 채널/사용자의 ID를 표시합니다.'}
                ],
                footer: {
                    icon_url: msg.guild.iconURL(),
                    text: msg.guild.name
                }
            }
            d.m.s(msg, {embed: res})
        }else if(options.indexOf('s') !== -1)
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