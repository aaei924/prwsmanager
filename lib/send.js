module.exports = (d,c,m,msg,args,conf,cn) => {
    if (!args[1] || !args[2])
        return d.err(d,m,msg,301);
            
    var chn = msg.guild.channels.cache.find(args[1])
    c.channels.cache.get(chn).send(args.slice(2).join(' '));
}
