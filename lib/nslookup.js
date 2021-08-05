module.exports = (d,c,m,msg,args,conf,cn) => {
    var options = '';
    if (!args[1])
        return d.err(d,m,msg,301);
    
    if (args[2] && args[1].startsWith('-')){
        host = args[2];
        options = args[1].substring(1);
    }else if(!args[2]){
        host = args[1];
        options = '';
    }
    const dns = require('dns');
    dnsdata = '';
    if(options == 'z'){
        dns.resolveAny(host, (err, records) => {
            for (var rk in records) {
                var r = records[rk]
                switch(r.type){
                    case 'A':
                    case 'AAAA':
                        dnsdata += r.ttl+' IN '+r.type+' '+r.address+'\n'
                        break;
                    case 'CNAME':
                        dnsdata += 'CNAME: ' + r.value + '\n'
                        break;
                    case 'MX':
                        dnsdata += 'MX: '+r.priority+' '+r.exchange+'\n'
                        break;
                    case 'NAPTR':
                        dnsdata += 'NAPTR: '+r.order+' '+r.preference+' \"'+r.flags+'\" \"'+r.service+'\" \"'+r.regexp+'\" '+r.replacement+'\n'
                        break;
                    case 'NS':
                        dnsdata += 'NS: '+r.value+'\n'
                        break;
                    case 'PTR':
                        dnsdata += 'PTR: '+r.value+'\n'
                        break;
                    case 'SOA':
                        dnsdata += 'SOA: '+r.nsname+' '+r.hostmaster+'('+r.serial+' '+r.refresh+' '+r.retry+' '+r.expire+' '+r.minttl+')\n'
                        break;
                    case 'SRV':
                        dnsdata += 'SRV: '+r.priority+' '+r.weight+' '+r.port+' '+r.name+'\n'
                        break;
                    case 'TXT':
                        r.entries.forEach(e => {
                            dnsdata += 'TXT: \"'+e+'\"\n'
                        })
                }
            }
            dns.resolveCaa(host, (err, records) => {
                if(records){
                    for (var rk in records) {
                        r = records[rk]
                        if(r.iodef) var inf = 'iodef'
                        if(r.issue) var inf = 'issue'
                        if(r.future) var inf = 'future'
                        dnsdata += 'CAA: '+r.critical+' '+inf+' \"'+r[inf]+'\"'
                    }
                }
                logcon = {
                    fields: [
                        {name: '대상 도메인', value: args[2]},
                        {name: '조회 결과', value: dnsdata}
                    ],
                    color: 0x0099ff,
                    title: 'DNS Lookup',
                    author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.guild.iconURL(),
                        text: msg.guild.name
                    }
                }
                d.m.s(msg, {embed: logcon});
            })
        })
    }else{
        dns.lookup(host, {all: true}, (err, addresses) => {
            for (var a in addresses)
                dnsdata += addresses[a].address+'\n'  
            
            logcon = {
                fields: [
                    {name: 'Name', value: host},
                    {name: 'Addresses', value: dnsdata}
                ],
                color: 0x0099ff,
                title: 'Non-authoritative answer:',
                author: {name: msg.author.tag, icon_url: msg.author.displayAvatarURL()},
                timestamp: new Date(),
                footer: {
                    icon_url: msg.guild.iconURL(),
                    text: msg.guild.name
                }
            }
            d.m.s(msg, {embed: logcon});
        })
    }
}