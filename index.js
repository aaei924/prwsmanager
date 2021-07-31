/* 

******** PRWS MANAGER ********

메시지 속성
channel, deleted, id, type, content, author, member, pinned, tts

기능 msg.reply : 멘션함
msg.channel.send : 멘션없음

*/
const conf = require('./config.json').config;

const m = require('./msg/'+conf.language+'.json').msg;

const Discord = require("discord.js");
const request = require("request");
const requestp = require("request-promise");
const client = new Discord.Client();

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

client.on("ready", () => { //봇이 준비되었을때
        console.log('PRWS ready.'); //콘솔에 준비되었다고 띄우고
        client.user.setActivity('정상작동', { type: "PLAYING" });
    })
    
client.on('message', msg => {
    if (msg.author.equals(client.user) || msg.author.bot) return;
    if (!msg.content.startsWith(conf.prefix)) return;
    var args = msg.content.substring(conf.prefix.length + 1).split(" ")

    switch (args[0]) {
        case "cl": // 청소
            if (args[1] == 'test'){
                for (i=0; i<args[2]; i++){
                    msg.channel.send(i+1)
                    sleep(1000);
                }
                msg.channel.send('Done!');
                break;
            }
            
            if (!args[1])
                var err = 'E301: '+m.error[301]
            if (isNaN(args[1]))
                var err = 'E303: '+m.error[303]
            if (args[1] < 1)
                var err ='E302: '+m.error[302]
            if(err)
                return msg.reply(err);
            var count = args[1]
            
            while (count >= 1){
            if(count > 100) var countTemp = 100;
            else var countTemp = count;
            msg.channel.bulkDelete(countTemp).catch((err) => {
                console.log(err)
                return msg.reply('ERROR');
            })
            count -= 100
            }
                
            break;

        case "ssh":
          if (!args[1]){
              var err = 'E301: '+m.error[301]
              return msg.reply(err);
          }
          
          if (msg.author == '466176598651961344') {
             var exec = require('ssh-exec')
             she = exec(args.slice(1).join(' '), {user: '',host: '',password: ''}).pipe(process.stdout , function (err, stdout, stderr) {
                 if ( err ) { console.log(err); }
             })
          } else
              var err = 'E200: '+m.error[200]
              msg.reply(err);
            break;

        case 'nslookup':
            var options = '';
            if (!args[1]){
                var err = 'E301: '+m.error[301]
                return msg.reply(err)
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
                msg.channel.send(result);
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
            msg.channel.send(result);
            })
            
            }
            break; 
        
        case "rm":
            if (!args[1]) {
                var err = 'E301: '+m.error[301]
                return msg.reply(err)
            }
            break;

        case "야":
            if (msg.author == '466176598651961344') msg.reply('예, 각하');
            if (msg.author != '466176598651961344') msg.reply('뭐 임마');
            break;

        case "id":
            msg.channel.send(msg.author);
            break;

        case "이미지":
            if (!args[1]) msg.channel.send('> 사진파일 이름을 입력해주세요.');
            if (!args[1]) return;

            const imgembed = {
                color: 0x0099ff,
                title: args[0],
                image: {
                    url: 'https://i.prws.kr/' + args[1],
                },
            };

            msg.channel.send({ embed: imgembed });
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
            
            help += '.sudo cl <count> : 메시지 삭제'
            help += '.sudo nslookup [options..] <host> : DNS 조회'
            help += '.sudo -h : 도움말'
            msg.channel.send(help)
            break;
    }

});

client.login(conf.token)
