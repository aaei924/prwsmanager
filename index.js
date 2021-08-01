/* 

******** PRWS MANAGER ********

메시지 속성
channel, deleted, id, type, content, author, member, pinned, tts

기능 msg.reply : 멘션함
msg.channel.send : 멘션없음

*/
const conf = require('./config.json').config;

const m = require('./msg/'+conf.language+'.json').msg;

const d = require("./PDL");
const request = require("request");
const requestp = require("request-promise");
const Discord = require('discord.js');
const c = new Discord.Client();

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

d.o.r(c, () => { //봇이 준비되었을때
        console.log('PRWS ready.'); //콘솔에 준비되었다고 띄우고
        d.u.sa(c, '정상작동', "PLAYING");
    })
    
d.o.m(c, msg => {
    if (d.m.a(msg).equals(d.u.u(c)) || d.m.b(msg)) return;
    if (!d.m.c(msg).startsWith(conf.prefix)) return;
    var args = d.m.c(msg).substring(conf.prefix.length + 1).split(" ")

    switch (args[0]) {
        case "cl": // 청소
            if (args[1] == 'test'){
                for (i=0; i<args[2]; i++){
                    d.m.s(msg, i+1)
                    sleep(1000);
                }
                d.m.s(msg, 'Done!');
                break;
            }
            
            if (!args[1])
                var err = 'E301: '+m.error[301]
            if (isNaN(args[1]))
                var err = 'E303: '+m.error[303]
            if (args[1] < 1)
                var err ='E302: '+m.error[302]
            if(err)
                return d.m.r(msg,err);
            var count = args[1]
            
            while (count >= 1){
            if(count > 100) var countTemp = 100;
            else var countTemp = count;
            d.m.d.b(msg,countTemp).catch((err) => {
                console.log(err)
                return d.m.r(msg, 'ERROR');
            })
            count -= 100
            }
                
            break;

        case "ssh":
          if (!args[1]){
              var err = 'E301: '+m.error[301]
              return d.m.r(msg,err);
          }
          
          if (msg.author == '466176598651961344') {
             var exec = require('ssh-exec')
             she = exec(args.slice(1).join(' '), {user: '',host: '',password: ''}).pipe(process.stdout , function (err, stdout, stderr) {
                 if ( err ) { console.log(err); }
             })
          } else
              var err = 'E200: '+m.error[200]
              d.m.r(msg,err);
            break;

        case 'nslookup':
            var options = '';
            if (!args[1]){
                var err = 'E301: '+m.error[301]
                return d.m.r(msg,err)
            }
            if (args[2] && args[1].startsWith('-')){
                host = args[2];
                options = args[1].substring(1);
            }else if(!args[2])
                host = args[1];
            const dns = require('dns');
            dnsdata = '';
            var result = '';
            if(options == 'z'){
                dns.resolveAny(host, (err, records) => {
                   for (var rk in records) {
                      var r = records[rk]
                       switch(r.type){
                           case 'A':
                           case 'AAAA':
                               dnsdata += r.ttl+' IN A '+r.address+'\n'
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
                               break;
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
                result += 'Name: '+host+'\n'
                result += dnsdata;
                d.m.s(msg, result);
                })
                
                })
                
            }else{
            
            dns.lookup(host, {all: true}, (err, addresses) => {
                for (var a in addresses) {
                    dnsdata += 'Address: '+addresses[a].address+'\n'
                    
                }
                result += 'Non-authoritative answer: \n'
            result += 'Name: '+host+'\n'
            result += dnsdata;
            d.m.s(msg, result);
            })
            
            }
            break; 
        
        case "rm":
            if (!args[1]) {
                var err = 'E301: '+m.error[301]
                return d.m.r(msg,err)
            }
            break;

        case "야":
            if (d.m.a(msg).id == '466176598651961344') d.m.r(msg,'예, 각하');
            if (msg.author.id != '466176598651961344') d.m.r(msg,'뭐 임마');
            break;

        case "id":
            d.m.s(msg, d.m.a(msg).id);
            break;

        case "hash":
            if (!args[1]){
                var err = 'E301: '+m.error[301]
                d.m.r(msg,err)
            }
            

            
            break;
        case '':
            break;
        case '-h':
            /*const helpembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('도움말')
                .setURL('https://prws.kr/')
                .setAuthor('PRWS Discord Manager', 'https://prws.kr/favicon.ico', 'https://prws.kr')
                .setDescription('봇 명령어 도움말')
                .addFields({ name: 'cl <count>', value: '메시지를 삭제합니다.', inline: true },{ name: 'nslookup [options...] <host>', value: '호스트의 DNS 정보를 불러옵니다.', inline: true }, { name: 'Powered by PRWS.kr', value: '', inline: true })
                .setTimestamp()
                .setFooter('PRWS Discord Manager', 'https://prws.kr/favicon.ico');

            msg.channel.send(helpembed);*/
            var help = '';
            help += '> 도움말\n'
            
            help += '.sudo cl <count> : 메시지 삭제\n'
            help += '.sudo nslookup [options..] <host> : DNS 조회\n'
            help += '.sudo -h : 도움말\n'
            d.m.s(msg, help)
            break;
    }

});

d.l(c, conf.token)
