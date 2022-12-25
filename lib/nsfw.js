module.exports = (d,c,m,msg,args,conf,cn) => {
    if(msg.channel.nsfw == true) {
        const fetch = require('node-fetch')
        fetch('https://api.taejung.kro.kr/meme/nsfw')
            .then(r => r.json())
            .then(r => {
                var emb = {
                    color: 0x0099ff,
                    title: 'NSFW',
                    description: '사진을 성공적으로 가져왔습니다.',
                    author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                    timestamp: new Date(),
                    image: {
                        url: r.url
                    },
                    footer: {
                        icon_url: msg.guild.iconURL(),
                        text: msg.guild.name
                    }
                }
                d.m.s(msg, {embed: emb})
            })
    }else
        d.err(d,m,msg,202);
}