module.exports = (d,c,m,msg,args,conf,cn) => {
    if (!args[1].startsWith('-') && args[1].substring(1).indexOf('r') == -1 && !args[2]) 
        return d.err(d,m,msg,301);
    else if(!d.m.p(msg,'MANAGE_CHANNELS'))
        return d.err(d,m,msg,200);
    else{
        if(!d.m.ph(msg,'MANAGE_CHANNELS'))
            return d.err(201)
        else if(msg.mentions.channels.first()){
            var emb = {
                color: 0x0099ff,
                title: '처리 완료',
                description: '명령이 정상적으로 처리되었습니다.',
                author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: msg.guild.iconURL(),
                    text: msg.guild.name
                }
            }
            msg.mentions.channels.first().delete().catch
            d.m.s(msg, {embed: emb})
        }
    }
}