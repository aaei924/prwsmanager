module.exports = (d,c,m,msg,args,conf,cn) => {
    if (args[1] !== '-h' && (!args[1] || !args[2]))
        return d.err(d,m,msg,301)
    
    const crypto = require('crypto')
    if(conf.opensslAlgos.indexOf(args[1]) !== -1){
        if(args[3] !== 'hex' || args[3] !== 'base64' || args[3] !== 'latin1')
            var digest = 'base64';
        else
            var digest = args[3];
        var enc = crypto.createHash(args[1]).update(args[2]).digest(digest);
    }else if(args[1] == 'hcs'){
        const JSEncrypt = require('node-jsencrypt')
        const jse = new JSEncrypt();
        jse.setPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA81dCnCKt0NVH7j5Oh2+SGgEU0aqi5u6sYXemouJWXOlZO3jqDsHYM1qfEjVvCOmeoMNFXYSXdNhflU7mjWP8jWUmkYIQ8o3FGqMzsMTNxr+bAp0cULWu9eYmycjJwWIxxB7vUwvpEUNicgW7v5nCwmF5HS33Hmn7yDzcfjfBs99K5xJEppHG0qc+q3YXxxPpwZNIRFn0Wtxt0Muh1U8avvWyw03uQ/wMBnzhwUC8T4G5NclLEWzOQExbQ4oDlZBv8BM/WxxuOyu0I8bDUDdutJOfREYRZBlazFHvRKNNQQD2qDfjRz484uFs7b5nykjaMB9k/EJAuHjJzGs9MMMWtQIDAQAB';
        var enc = jse.encrypt(args[2]);
    }else if(args[1] == '-h'){
        var enc = {embed: {
            color: 0x0099ff,
            title: '명령어 도움말',
            author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
            fields: [
                {name: '사용 가능한 알고리즘:', value: conf.opensslAlgos.join(', ')+'\nᅟ'},
                {name: '사용 가능한 다이제스트:', value: conf.hashDigests.join(', ')}
            ],
            timestamp: new Date(),
            footer: {
                icon_url: msg.guild.iconURL(),
                text: msg.guild.name
            }
        }}
    }
    if(!enc)
        return d.err(d,m,msg,300);
    else
        d.m.s(msg, enc);
}